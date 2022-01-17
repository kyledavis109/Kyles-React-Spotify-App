/* API call for fetching related artists of the specified artists on the homepage in the dropdown menu
   from the Spotify API endpoint. */
export async function fetchRelatedArtists(artistID) {
    const url = `/api/relatedArtists/${artistID}`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
};