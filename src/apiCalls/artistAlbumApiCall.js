import { token } from '../Token';

/* API call for fetching albums of related artists of the specified artists on the homepage in the
   dropdown menu from the Spotify API endpoint. */
export async function getArtistAlbums(artistID) {
    const apiUrl2 = `https://api.spotify.com/v1/artists/${artistID}/albums`;
    const response = await fetch(apiUrl2, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const results = await response.json();
    return results.items
};