import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getAlbumTracks from '../apiCalls/albumTrackApiCall';
import AlbumImage from '../components/AlbumImage';
import './styles/AlbumPage.css';

function AlbumTracksPage() {

    const [albumDetails, setAlbumDetails] = useState([]);
    const { albumID } = useParams();
    const params = new URLSearchParams(window.location.search);
    const albumURL = params.get('albumURL');
        
    async function handleGetSongs(albumIDParam) {
        // Validation checks for albumIDParam parameter.
        if (albumIDParam === null || albumIDParam === undefined) {
            throw Error('albumIDParam param is required.');
        } else if (typeof albumIDParam !== 'string') {
            throw TypeError('albumIDParam param must be a string.');
        } else if (albumIDParam.length < 22) {
            throw Error('albumIDParam param must be 22 characters long.');
        }
        
        const albumDetails = await getAlbumTracks(albumIDParam);
        // Validation check for expected API call. Program will not continue if there is an error.
        if ('error' in albumDetails) {
            return albumDetails;
        };
        // Clean up API call.
        return albumDetails.items.map((song) => {
            const { id, name, track_number, duration_ms, disc_number } = song;
            return { id, name, track_number, duration_ms, disc_number };
        });
    };

    function renderSongs(songs) {
        // Validation check for songs parameter.
        if (songs === null || songs === undefined) {
            throw Error('songs param is required.');
        } else if (!Array.isArray(songs)) {
            throw TypeError('songs param must be an array.');
        } else {
            songs.forEach((song) => {
                if (!('id' in song)) {
                    throw Error('Element in songs is missing, required key id.');
                } else if (!('name' in song)) {
                    throw Error('Element in songs is missing, required key name.');
                } else if (!('track_number' in song)) {
                    throw Error('Element in songs is missing, required key track_number.');
                } else if (!('duration_ms' in song)) {
                    throw Error('Element in songs is missing, required key duration_ms.');
                };
            });
        };
        return songs.map((song) => {
            //Rendering of album tracks information.
            const { id, name, track_number, duration_ms } = song;
            const cal = (ms) => {
                const minutes = Math.floor(duration_ms / 60000);
                const seconds = ((ms % 60000) / 1000).toFixed(0);
                return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
            };
            return(
                <div 
                    className='songContainer'
                    id={id}
                    key={id}
                >
                    <span>{track_number}</span>
                    <span>{name}</span>
                    <span>{cal(duration_ms)}</span>
                </div>
            );
        });
    };

    useEffect(() => {
        async function createAlbumDetails() {
            const songs = await handleGetSongs(albumID);
            // Validation check for handleGet Songs. If there is an error with the 
            if ('error' in songs) {
                setAlbumDetails(songs.error);
                return;
            };
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