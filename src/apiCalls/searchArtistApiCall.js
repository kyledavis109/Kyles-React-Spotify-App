// Comment.
export async function fetchSearchArtists(searchValue) {
    if (searchValue === null || searchValue === undefined) {
        throw Error('artistID param is required.');
    } else if (typeof searchValue !== 'string') {
        throw TypeError('artistID param must be a string.');
}
const url =  `https://api.spotify.com/v1/search?q=artist:${searchValue}&type=artist`;
const response = await fetch(url);
if (response.status !== 200) {
    return {error: 'Failed to fetch searched artist data.'};
}
const results = await response.json();
return results;
};