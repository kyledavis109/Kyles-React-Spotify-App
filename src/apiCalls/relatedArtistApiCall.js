/* API call for fetching related artists of the specified artists on the homepage in the dropdown menu
   from the Spotify API endpoint. */
export async function fetchRelatedArtists(artistID) {
    if (artistID === null || artistID === undefined) {
        throw Error('artistID param is required.');
    } else if (typeof artistID !== 'string') {
        throw TypeError('artistID param must be a string.');
    } else if (artistID.length < 22) {
        throw Error('artistID param must be 22 characters long.');
    };
    const url = `/api/relatedArtists/${artistID}`;
    const response = await fetch(url);
    if (response.status !== 200) {
        return {error: <div className='rainbow'>Failed to fetch related artist data.</div>};
    }
    const results = await response.json();
    return results;
};

export default fetchRelatedArtists;