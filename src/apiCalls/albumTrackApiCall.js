/* API call for fetching album tracks of selected album of related artists of specified artists
   on the homepage in the dropdown menu from the Spotify API endpoint.  */
export async function getAlbumTracks(albumID) {
    const url = `/api/tracks/${albumID}`
    const response = await fetch(url)
    const results = await response.json();
    return results
};