import AlbumImage from '../components/AlbumImage';

function createArtistImages(relatedArtistsData, renderType = null, currentSelectedArtist = null, handleRelatedArtistAlbums = null) {
    if (relatedArtistsData === null || relatedArtistsData === undefined) {
        throw Error('relatedArtistsData is a required param.');
    } else if (!Array.isArray(relatedArtistsData)) {
        throw TypeError('relatedArtistsData param must be an array.');
    } else if (!renderType) {
        throw Error('renderType is required.');
    } else if (renderType !== 'showTopAlbums' && renderType !== 'showArtistName') {
        throw Error('renderType is invaid. Must be either: showTopAlbums or showArtistName');
    } else {
        relatedArtistsData.forEach((artistsData) => {
            if (typeof artistsData !== 'object') {
                throw TypeError('Element inside of relatedArtistsData must be an object.');
            } else if (!('url' in artistsData) || !('id' in artistsData)) {
                throw Error('Element inside relatedArtistsData is improper object shape. Must contain url and id keys.');
            } else if (artistsData.url === null || artistsData.url === undefined) {
                throw Error('url key inside element of relatedArtistsData cannot be null or undefined.');
            } else if (typeof artistsData.url !== 'string') {
                throw TypeError('url key inside element of relatedArtistsData must be a string.');
            } else if (artistsData.id === null || artistsData.id === undefined) {
                throw Error('id key inside element of relatedArtistsData cannot be null or undefined.');
            } else if(typeof artistsData.id !== 'string') {
                throw TypeError('id key inside element of relatedArtistsData must be a string.');
            };
        });
    };

    if (renderType === 'showTopAlbums') {
        if (currentSelectedArtist === null || currentSelectedArtist === undefined) {
            throw Error('currentSelectedArtist param is required.');
        } else if (typeof currentSelectedArtist !== 'object') {
            throw TypeError('currentSelectedArtist param must be an object.');
        } else if (!('artist' in currentSelectedArtist) || !('albums' in currentSelectedArtist)) {
            throw Error('currentSelectedArtist param must contain the keys artist and albums.');
        };
        if (handleRelatedArtistAlbums === null || handleRelatedArtistAlbums === undefined) {
            throw Error('handleRelatedArtistAlbums param is required.');
        } else if (typeof handleRelatedArtistAlbums !== 'function') {
            throw TypeError('handleRelatedArtistAlbums param must be a function');
        };
    };


    return relatedArtistsData.map((artist) => {
        const { url, id } = artist;
        if (renderType === 'showTopAlbums') {
            return <AlbumImage
                key={id} 
                id={id}
                url={url}
                showTopAlbums={true}
                currentSelectedArtistID={currentSelectedArtist.artist}
                topAlbums={currentSelectedArtist.albums}
                handleMouseOver={handleRelatedArtistAlbums}
            />
        } else if (renderType === 'showArtistName') {
            const artistName = artist.name
            return <AlbumImage
                key={id} 
                id={id}
                url={url}
                artistName={artistName}
                showArtistName={true}
            />
        };
    });
};

export default createArtistImages;