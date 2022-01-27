import { useState } from 'react';
import fetchSearchArtists from '../apiCalls/searchArtistApiCall';
import createArtistImages from '../functions/createArtistImages';
import './styles/HomePage.css';

function HomePage() {

    const [searchValueState, setSearchValueState] = useState(null);
    const [searchArtistImages, setSearchArtistImages] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);


    async function handleSearch(artistSearchValue) {
        // Validation check for artistSearchValue parameter.
        if (artistSearchValue === null) {
            throw Error('artistSearchValue param is required.');
        } else if (typeof artistSearchValue !== 'string') {
            throw TypeError('artistSearchValue param must be a string.');
        } else if (artistSearchValue.trim() === '') {
            throw Error('artistSearchValue param must include a search value.');
        };
        const searchResults = await fetchSearchArtists(artistSearchValue);
        // Validation check for expected API call. Program will not continue if there is an error.
        if ('error' in searchResults) {
            return searchResults;
        }
        return searchResults;
    }

    async function handleSearchButtonPress() {
        try {
            setSearchLoading(true);
            const searchResults = await handleSearch(searchValueState);
            // Validation check for expected API call. Program will not continue if there is an error.
            if ('error' in searchResults) {
                throw searchResults.error;
            };
            const searchResultImages = createArtistImages(searchResults, 'showArtistName');
            setSearchArtistImages(searchResultImages);
        } catch (error) {
            if (typeof error === 'string') {
                setSearchArtistImages(<div className='rainbow'>{error}</div>);
                return
            };
            setSearchArtistImages(<div className='rainbow'>Failed to load...</div>);
        } finally {
            setSearchLoading(false);
        };
    };

    return (
        <div>
            <input
                className='input'
                type='text'
                id='searchInput'
                placeHolder='Search Artist...'
                onChange={(event) => setSearchValueState(event.target.value)}
            />
           <button
                className='button'
                id='searchInputButton'
                onClick={handleSearchButtonPress}
                disabled = {searchLoading}
           >
                Click To Search...
            </button>
            <div>{searchLoading ? <div className='rainbow'>Loading...</div> : searchArtistImages}</div>
        </div> 
    );
};

export default HomePage;
