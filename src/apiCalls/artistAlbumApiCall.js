/* API call for fetching albums of related artists of the specified artists on the homepage in the
   dropdown menu from the Spotify API endpoint. */
export async function getArtistAlbums(artistID) {
    const url = `/api/albums/${artistID}`
    const response = await fetch(url)
    const results = await response.json();
    return results
};