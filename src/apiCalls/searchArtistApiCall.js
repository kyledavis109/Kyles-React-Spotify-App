import './styles/searchArtistApiCall.css';

/* API call for fetching searched artist specified in home page search input box from the Spotify
   API endpoint. */
async function fetchSearchArtists(searchValue) {
    if (searchValue === null || searchValue === undefined) {
        throw Error('artistID param is required.');
    } else if (typeof searchValue !== 'string') {
        throw TypeError('artistID param must be a string.');
    }
    const url =  `/api/search?searchValue=${searchValue}`;
    const response = await fetch(url);
    if (response.status !== 200) {
        return {error: <div className='rainbow'>Failed to fetch searched artist data.</div>};
    }
    const results = await response.json();
    return results.map((artist) => {
        const { id, images, name } = artist;
        let width = 'NOT FOUND';
        let height = 'NOT FOUND';
        let url = 'NOT FOUND';
        if (images.length !== 0) {
            width = images[0].width;
            height = images[0].height;
            url = images[0].url
        }
        return { id, width, height, url, name };
    });
};

export default fetchSearchArtists;