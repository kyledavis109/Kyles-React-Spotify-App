import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/albumTracksPage.css';
import { getAlbumTracks } from '../apiCalls/albumTrackApiCall';
import AlbumImage from '../components/AlbumImage';

function AlbumTracksPage() {

    const [albumDetails, setAlbumDetails] = useState([]);
    const { albumID } = useParams();
    const params = new URLSearchParams(window.location.search);
    const albumURL = params.get('albumURL')
        
    async function handleGetSongs(albumIDParam) {
        const albumDetails = await getAlbumTracks(albumIDParam);
        return albumDetails.items.map((song) => {
            const { id, name, track_number, duration_ms, disc_number } = song;
            return { id, name, track_number, duration_ms, disc_number };
        });
    };

    function renderSongs(songs) {
        return songs.map((song) => {
            const { id, name, track_number, duration_ms } = song;
            const cal = (ms) => {
                const minutes = Math.floor(duration_ms / 60000)
                const seconds = ((ms % 60000) / 1000).toFixed(0)
                return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
            }
            return(
                <div 
                    className='songContainer'
                    id={id}
                >
                    <span>{track_number}</span>
                    <span>{name}</span>
                    <span>{cal(duration_ms)}</span>
                </div>
            )
        })
    }

    useEffect(() => {
        async function createAlbumDetails() {
            const songs = await handleGetSongs(albumID);
            setAlbumDetails(renderSongs(songs));
        };
        createAlbumDetails();
    }, []);
    

    return (
        <div>
            <AlbumImage
                id={albumID}
                url={albumURL}
                showAlbumName={false}
                showTopAlbums={false}
            />
            <div className='box'>
                <p className='track'>Track #:</p>
                <p className='name'>Track Name:</p>
                <p className='duration'>Duration:</p>
                {albumDetails}
            </div>
        </div>
    );
};

export default AlbumTracksPage;