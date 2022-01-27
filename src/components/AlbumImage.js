import { Fragment } from "react/cjs/react.production.min";
import './Styles/AlbumImage.css';

function AlbumImage({
    id = '',
    url = '', 
    albumName = '',
    artistName = '', 
    topAlbums = [], 
    currentSelectedArtistID = '', 
    showAlbumName = false,
    showArtistName = false,
    showTopAlbums = false,
    handleMouseOver = null
} = {}) {
    //Validation for AlbumImage props.
    if (id === '') {
        throw Error('id prop cannot be empty string.');
    } else if (typeof id !== 'string') {
        throw TypeError('id prop must be string.');
    };
    if (url === '') {
        throw Error('url prop cannot be empty string.');
    } else if (typeof url !== 'string') {
        throw TypeError('url prop must be string.');
    } 
    if (url !== 'NOT FOUND') {
        if (!url.includes('https://i.scdn.co/image/')) {
            throw Error('url prop was given invalid url. Must match pattern https://i.scdn.co/image/:imageID');
        } else {
            const urlImageID = url.split('/').slice(-1)[0];
            if (urlImageID.length !== 40) {
                throw Error('url prop is invalid, the image id is the incorrect length. Must be 40 characters long.');
            };
        };
    };
    if (typeof albumName !== 'string') {
        throw TypeError('albumName prop must be string.');
    };
    if (!Array.isArray(topAlbums)) {
        throw TypeError('topAlbums prop must be an array.');
    } else if (topAlbums.length !== 0) {
        topAlbums.forEach((album) => {
            if (typeof album !== 'string') {
                throw TypeError('element inside topAlbums prop must be a string.');
            };
        });
    };
    if (showAlbumName && typeof showAlbumName !== 'boolean') {
        throw TypeError('showAlbumName prop must be a boolean.');
    };

    if (showTopAlbums && typeof showTopAlbums !== 'boolean') {
        throw TypeError('showTopAlbums prop must be a boolean.');
    };

    if (handleMouseOver && typeof handleMouseOver !== 'function') {
        throw TypeError('handleMouseOver prop must be a function.');
    };

    if (showArtistName) {
        if (typeof showArtistName !== 'boolean') {
            throw TypeError('showArtistName prop must be a boolean.');
        } else if (artistName === '') {
            throw Error('artistName prop is required.');
        } else if (typeof artistName !== 'string') {
            throw TypeError('artistName prop must be a string.');
        };
    };

    function createAlbumList(albumsList) {
        return albumsList.map((album) => {
            return <li className='albumListItem' key={album}>{album}</li>
        });
    };

    const albumsView = () => {
        return (
            <Fragment>
                <div className='imgTitle'>Artist Albums:</div>
                {
                    id === currentSelectedArtistID
                    ? createAlbumList(topAlbums)
                    : null
                }
                <a className='link' href={`/artists/${id}`}>Click For Albums</a>
            </Fragment>
        );
    };

    const albumNameView = () => {
        return (
            <Fragment>
                <p className='albumName'>{albumName}</p>
                <a className='link' href={`/albums/${id}?albumURL=${url}`}>Click For Details</a>
            </Fragment>
        );
    };

    const artistNameView = () => {
        return (
            <Fragment>
                <h1 className='artistName'>{artistName}</h1>
                <a className='link' href={`/artists/${id}`}>Click For Details</a>
            </Fragment>
        );
    };

    return (
        <div
            className='imgGroup'
            id={id}
            key={id}
            onMouseEnter={
                showTopAlbums ? () => handleMouseOver(id) : null
            }
        >
            <img className='img' alt='' src={url}></img>
            <div className='imgHover imgHover--blur'>
                    <div className='imgDescrip'>
                        {showAlbumName ? albumNameView() : null}
                        {showTopAlbums ? albumsView() : null}
                        {showArtistName ? artistNameView() : null}
                    </div>
            </div>
        </div>
    );
};

export default AlbumImage;