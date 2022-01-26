import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getArtistAlbums from '../apiCalls/artistAlbumApiCall';
import AlbumImage from '../components/AlbumImage';
import RelatedArtists  from '../components/RelatedArtists';
import './styles/ArtistPage.css';

function ArtistAlbumsPage() {

    const [albumImages, setAlbumImages] = useState([]);
    const { artistID } = useParams();

    async function handleArtistAlbums(artistID) {
        if (artistID === null || artistID === undefined) {
            throw Error('artistID param is required.');
        } else if (typeof artistID !== 'string') {
            throw TypeError('artistID param must be a string.');
        } else if (artistID.length < 22) {
            throw Error('artistID param must be 22 characters long.');
        };
        const albumImages = await getArtistAlbums(artistID);
        if ('error' in albumImages) {
            return albumImages;
        };
        return albumImages.map((artist) => {
            const { id, images, name } = artist;
            const { width, height, url, key } = images[0];
            return { id, width, height, url, key, name };
        });
    };

    function createAlbumImages(artistAlbums) {
        return artistAlbums.slice(0, 12).map((image) => {
            const { url, id, name } = image;
            return <AlbumImage
                key={id}
                id={id}
                url={url}
                albumName={name}
                showAlbumName={true}
                showTopAlbums={false}
            />
        });
    };

    useEffect(() => {
        async function artistAlbums() {
            const results = await handleArtistAlbums(artistID);
            if ('error' in results) {
                // This will show error message instead of rendering images.
                setAlbumImages(results.error);
                return;
            };
            // Only run if not a error.
            // This is what causes the albumImage component to start rendering. 
            setAlbumImages(createAlbumImages(results));
        };
        artistAlbums();
    }, []);

    return (
        <div>
            <h1 className='rainbow'>Artist's Albums</h1>
            {albumImages}
            
            <h1 className='rainbow'>Related Artists</h1>
            <RelatedArtists
                artistID={artistID}
            />
        </div>
    );
};

export default ArtistAlbumsPage;