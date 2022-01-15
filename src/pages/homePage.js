import { useState, useEffect } from 'react';
import '../styles/homePage.css';
import { getArtistAlbums } from '../apiCalls/artistAlbumApiCall';
import { fetchRelatedArtists } from '../apiCalls/relatedArtistApiCall';
import AlbumImage from '../components/AlbumImage';

function HomePage() {

    const [artistDrop, setArtistDrop] = useState('The Beatles');
    const [artistResults, setArtistResults] = useState(null);
    const [currentSelectedArtist, setCurrentSelectedArtist] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState();


    function handleDropDown(event) {
        setArtistDrop(event.target.value);
    };

    async function handleRelatedArtistAlbums(artistID) {
        const artistAlbum = await getArtistAlbums(artistID);
        const albumDetails = artistAlbum.slice(0, 5).map((item) => item.name);
        setCurrentSelectedArtist({artist: artistID, albums: albumDetails});
    };

    async function getRelatedArtists(artistName) {
        const artistIdObject = {
            'The Beatles': '3WrFJ7ztbogyGnTHbHJFl2',
            SRV: '5fsDcuclIe8ZiBD5P787K1',
            'The Rolling Stones': '22bE4uQ6baNwSHPVcDxLCe'
        }
        const artistID = artistIdObject[artistName];
        const relatedArtists = await fetchRelatedArtists(artistID);
        return relatedArtists.artists.map((artist) => {
            const { id, images } = artist;
            const { width, height, url } = images[0];
            return { id, width, height, url };
        });
    };

    function createArtistImages(relatedArtistsData) {
        return relatedArtistsData.map((artist) => {
            const { url, id } = artist;
            return <AlbumImage 
                id={id}
                url={url}
                showAlbumName={false}
                showTopAlbums={true}
                currentSelectedArtistID={currentSelectedArtist.artist}
                topAlbums={currentSelectedArtist.albums}
                handleMouseOver={handleRelatedArtistAlbums}
            />
        });
    };

    useEffect(() => {
        async function handleRelatedArtists() {
            const results = await getRelatedArtists(artistDrop);
            setRelatedArtists(results);
        }
        handleRelatedArtists();
    }, [artistDrop]);

    useEffect(() => {
        if (relatedArtists) {
            const artistImages = createArtistImages(relatedArtists);
            setArtistResults(artistImages);
        }
    }, [relatedArtists, currentSelectedArtist]);

    return (
        <div>
            <select
            value={artistDrop}
            className="list" 
            onChange={ handleDropDown }
            >
                <option value='The Beatles'>The Beatles</option>
                <option value='SRV'>SRV</option>
                <option value='The Rolling Stones'>The Rolling Stones</option>
            </select>
            <div>{ artistResults }</div>
        </div>
    );
};

export default HomePage;
