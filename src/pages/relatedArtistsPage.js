import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/relatedArtistsPage.css';
import { getArtistAlbums } from '../apiCalls/artistAlbumApiCall';
import AlbumImage from '../components/AlbumImage';

function RelatedArtistsPage() {

    const [albumImages, setAlbumImages] = useState([]);
    const { artistID } = useParams();

    async function handleArtistAlbums(artistID) {
        const albumImages = await getArtistAlbums(artistID);
        return albumImages.map((artist) => {
            const { id, images, name } = artist;
            const { width, height, url, key } = images[0];
            return { id, width, height, url, key, name };
        });
    };

    function createAlbumImages(artistAlbums) {
        return artistAlbums.slice(0, 12).map((image) => {
            const { url, id, key, name } = image;
            return <AlbumImage
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
            setAlbumImages(createAlbumImages(results));
        };
        artistAlbums();
    }, []);

    return (
        <div>
            {albumImages}
        </div>
    );
};

export default RelatedArtistsPage;