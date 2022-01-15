import { token } from '../Token';

/* API call for fetching related artists of the specified artists on the homepage in the dropdown menu
   from the Spotify API endpoint. */
export async function fetchRelatedArtists(artistID) {
    const apiUrl = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
    const response = await fetch(apiUrl, { 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  };