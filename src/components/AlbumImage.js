import { Fragment } from "react/cjs/react.production.min";
import './styles/AlbumImage.css';

function AlbumImage({
    id,
    url, 
    albumName, 
    topAlbums, 
    currentSelectedArtistID, 
    showAlbumName, 
    showTopAlbums,
    handleMouseOver
}) {
    function createAlbumList(albumsList) {
        return albumsList.map((album) => {
            return <li className='albumListItem' key={album}>{album}</li>
        });
    };

    const albumsView = () => {
        return (
            <Fragment>
                <div className='imgTitle'>Artist Albums</div>
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
        )
    };

    return (
        <div
            className='imgGroup'
            id={id}
            key={id}
            onMouseOver={
                showTopAlbums ? () => handleMouseOver(id) : null
            }
        >
            <img className='img' alt='' src={url}></img>
            <div className='imgHover imgHover--blur'>
                    <div className='imgDescrip'>
                        {showAlbumName ? albumNameView() : null}
                        {showTopAlbums ? albumsView() : null}
                    </div>
            </div>
        </div>
    )
}

export default AlbumImage;