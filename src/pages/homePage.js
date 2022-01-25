import { useState } from 'react';
import './styles/homePage.css';
import { fetchSearchArtists } from '../apiCalls/searchArtistApiCall';
import { createArtistImages } from '../functions/createArtistImages';

function HomePage() {

    const [searchValueState, setSearchValueState] = useState(null);
    const [searchArtistImages, setSearchArtistImages] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

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
        try {
            setSearchLoading(true)
            const searchResults = await handleSearch(searchValueState);
            if ('error' in searchResults) {
                throw searchResults.error
            }
            const searchResultImages = createArtistImages(searchResults, 'showArtistName')
            setSearchArtistImages(searchResultImages)
        } catch (error) {
            if (typeof error === 'string') {
                setSearchArtistImages(<div style={{backgroundColor: 'red'}}>{error}</div>)
                return
            }
            setSearchArtistImages(<div style={{backgroundColor: 'red'}}>'Failed to load...</div>)
        } finally {
            setSearchLoading(false)
        }
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
                disabled = {searchLoading}
           >
                Search Artist...
            </button>
            <div>{searchLoading ? <div style={{backgroundColor: 'white'}}>'Loading...'</div> : searchArtistImages }</div>
        </div>
    );
};

export default HomePage;
