import { useState, useEffect } from 'react';
import { fetchRelatedArtists } from '../apiCalls/relatedArtistApiCall';
import { getArtistAlbums } from '../apiCalls/artistAlbumApiCall';
import { createArtistImages } from '../functions/createArtistImages';

export function RelatedArtists({artistID = null}) {
    console.log(artistID)
    if (artistID === null) {
        throw Error('artistID prop is required.')
    } else if (typeof artistID !== 'string') {
        throw TypeError('artistID prop must be a string.')
    } else if (artistID.length !== 22) {
        throw Error('artistID prop must be atleast 22 characters long.')
    }

    const [currentSelectedArtist, setCurrentSelectedArtist] = useState({artist: null, albums: []});
    const [artistResults, setArtistResults] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);

    async function handleRelatedArtistAlbums(artistID) {
        if (artistID === null || artistID === undefined) {
            throw Error('artistID param is required.');
        } else if (typeof artistID !== 'string') {
            throw TypeError('artistID param must be a string.');
        } else if (artistID.length < 22) {
            throw Error('artistID param must be 22 characters long.');
        };

        const artistAlbum = await getArtistAlbums(artistID);
        const albumDetails = artistAlbum.slice(0, 5).map((item) => item.name);
        setCurrentSelectedArtist({artist: artistID, albums: albumDetails});
    };

    async function getRelatedArtists(artistID) {
        if (artistID === null || artistID === undefined) {
            throw Error('artistID param is required.');
        } else if (typeof artistID !== 'string') {
            throw TypeError('artistID param must be a string.');
        } else if (artistID.length !== 22) {
            throw Error('artistID param must be 22 characters long.')
        };
        const relatedArtists = await fetchRelatedArtists(artistID);
        if ('error' in relatedArtists) {
            return relatedArtists;
        }
        return relatedArtists.artists.map((artist) => {
            const { id, images } = artist;
            const { width, height, url } = images[0];
            return { id, width, height, url };
        });
    };

    useEffect(() => {
        async function handleRelatedArtists() {
            const results = await getRelatedArtists(artistID);
            if ('error' in results) {
                // This will show error message instead of rendering images.
                setArtistResults(results.error);
                return;
            };
            // Only run if not a error.
            // This is what causes the albumImage component to start rendering. 
            setRelatedArtists(results);
        }
        handleRelatedArtists();
    }, []);

    // This renders the albumImage components.
    // This will not run if there is an error from the useEffect above.
    useEffect(() => {
        if (relatedArtists) {
            const artistImages = createArtistImages(relatedArtists, 'showTopAlbums', currentSelectedArtist, handleRelatedArtistAlbums);
            setArtistResults(artistImages);
        }
    }, [relatedArtists, currentSelectedArtist]);

    if (!artistResults) {
        return 'Loading...'
    }

    return artistResults
    
}