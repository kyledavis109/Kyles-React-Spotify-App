import { useState } from 'react';
import './styles/homePage.css';
import { fetchSearchArtists } from '../apiCalls/searchArtistApiCall';
import { createArtistImages } from '../functions/createArtistImages';

function HomePage() {

    const [searchValueState, setSearchValueState] = useState(null);
    const [searchArtistImages, setSearchArtistImages] = useState(null);

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
            <div>{ searchArtistImages }</div>
        </div>
    );
};

export default HomePage;
