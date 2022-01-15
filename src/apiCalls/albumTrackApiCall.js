import { token } from '../Token';

/* API call for fetching album tracks of selected album of related artists of specified artists
   on the homepage in the dropdown menu from the Spotify API endpoint.  */
export async function getAlbumTracks(albumIDParam) {
    const url = `https://api.spotify.com/v1/albums/${albumIDParam}/tracks`;
    const response = await fetch(url, { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const results = await response.json();
    return results;
};