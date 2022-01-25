import { useState, useEffect } from 'react';
import { fetchRelatedArtists } from '../apiCalls/relatedArtistApiCall';
import { getArtistAlbums } from '../apiCalls/artistAlbumApiCall';
import AlbumImage from '../components/AlbumImage';

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

    function createArtistImages(relatedArtistsData, renderType = null) {
        if (relatedArtistsData === null || relatedArtistsData === undefined) {
            throw Error('relatedArtistsData is a required param.');
        } else if (!Array.isArray(relatedArtistsData)) {
            throw TypeError('relatedArtistsData param must be an array.');
        } else if (!renderType) {
            throw Error('renderType is required.')
        } else if (renderType !== 'showTopAlbums' && renderType !== 'showArtistName') {
            throw Error('renderType is invaid. Must be either: showTopAlbums or showArtistName')
        } else {
            relatedArtistsData.forEach((artistsData) => {
                if (typeof artistsData !== 'object') {
                    throw TypeError('Element inside of relatedArtistsData must be an object.');
                } else if (!('url' in artistsData) || !('id' in artistsData)) {
                    throw Error('Element inside relatedArtistsData is improper object shape. Must contai url and id keys.');
                } else if (artistsData.url === null || artistsData.url === undefined) {
                    throw Error('url key inside element of relatedArtistsData cannot be null or undefined.');
                } else if (typeof artistsData.url !== 'string') {
                    throw TypeError('url key inside element of relatedArtistsData must be a string.');
                } else if (artistsData.id === null || artistsData.id === undefined) {
                    throw Error('id key inside element of relatedArtistsData cannot be null or undefined.');
                } else if(typeof artistsData.id !== 'string') {
                    throw TypeError('id key inside element of relatedArtistsData must be a string.');
                };
            });
        };
        return relatedArtistsData.map((artist) => {
            const { url, id } = artist;
            if (renderType === 'showTopAlbums') {
                return <AlbumImage
                    key={id} 
                    id={id}
                    url={url}
                    showTopAlbums={true}
                    currentSelectedArtistID={currentSelectedArtist.artist}
                    topAlbums={currentSelectedArtist.albums}
                    handleMouseOver={handleRelatedArtistAlbums}
                />
            } else if (renderType === 'showArtistName') {
                const artistName = artist.name
                return <AlbumImage
                    key={id} 
                    id={id}
                    url={url}
                    artistName={artistName}
                    showArtistName={true}
                />
            }
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
            const artistImages = createArtistImages(relatedArtists, 'showTopAlbums');
            setArtistResults(artistImages);
        }
    }, [relatedArtists, currentSelectedArtist]);

    if (!artistResults) {
        return 'Loading...'
    }

    return artistResults
    
}