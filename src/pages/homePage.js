import { useState, useEffect } from 'react';
import './styles/homePage.css';
import { getArtistAlbums } from '../apiCalls/artistAlbumApiCall';
import { fetchRelatedArtists } from '../apiCalls/relatedArtistApiCall';
import { fetchSearchArtists } from '../apiCalls/searchArtistApiCall';
import AlbumImage from '../components/AlbumImage';

function HomePage() {

    const [artistDrop, setArtistDrop] = useState('The Beatles');
    const [artistResults, setArtistResults] = useState(null);
    const [currentSelectedArtist, setCurrentSelectedArtist] = useState({artist: null, albums: []});
    const [relatedArtists, setRelatedArtists] = useState(null);
    const [searchValueState, setSearchValueState] = useState(null);
    const [searchArtistImages, setSearchArtistImages] = useState(null);


    function handleDropDown(event) {
        setArtistDrop(event.target.value);
    };

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

    async function getRelatedArtists(artistName) {
        if (artistName === null || artistName === undefined) {
            throw Error('artistName param is required.');
        } else if (typeof artistName !== 'string') {
            throw TypeError('artistName param must be a string.');
        } else if (!['The Beatles', 'SRV', 'The Rolling Stones'].includes(artistName)) {
            throw Error('Provided artistName param is not a valid option, must be: The Beatles, SRV, or The Rolling Stones.');
        };
        const artistIdObject = {
            'The Beatles': '3WrFJ7ztbogyGnTHbHJFl2',
            SRV: '5fsDcuclIe8ZiBD5P787K1',
            'The Rolling Stones': '22bE4uQ6baNwSHPVcDxLCe'
        };
        const artistID = artistIdObject[artistName];
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

    async function handleSearch(artistSearchValue) {
        if (artistSearchValue === null) {
            throw Error('artistSearchValue param is required.')
        } else if (typeof artistSearchValue !== 'string') {
            throw TypeError('artistSearchValue param must be a string.')
        } else if (artistSearchValue.trim() === '') {
            throw Error('artistSearchValue param must include a search value.')
        }
        const searchResults = await fetchSearchArtists(artistSearchValue)
        if ('error' in searchResults) {
            return searchResults;
        }
        return searchResults;
    }

    async function handleSearchButtonPress() {
        const searchResults = await handleSearch(searchValueState);
        if ('error' in searchResults) {
            setSearchArtistImages(searchResults.error)
            return searchResults;
        }
        const searchResultImages = createArtistImages(searchResults, 'showArtistName')
        setSearchArtistImages(searchResultImages)
    }

    useEffect(() => {
        async function handleRelatedArtists() {
            const results = await getRelatedArtists(artistDrop);
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
    }, [artistDrop]);

    // This renders the albumImage components.
    // This will not run if there is an error from the useEffect above.
    useEffect(() => {
        if (relatedArtists) {
            const artistImages = createArtistImages(relatedArtists, 'showTopAlbums');
            setArtistResults(artistImages);
        }
    }, [relatedArtists, currentSelectedArtist]);

    return (
        <div>
            <input
                type='text'
                id='searchInput'
                onChange={(event) => setSearchValueState(event.target.value)}
            />
           <button 
                id='searchInputButton'
                onClick={handleSearchButtonPress}
           >
                Search Artist...
            </button>
            <select
                value={artistDrop}
                className="list" 
                onChange={ handleDropDown }
            >
                <option value='The Beatles'>The Beatles</option>
                <option value='SRV'>SRV</option>
                <option value='The Rolling Stones'>The Rolling Stones</option>
            </select>
            <div>{ searchArtistImages }</div>
            {/* <div>{ artistResults }</div> */}
        </div>
    );
};

export default HomePage;
