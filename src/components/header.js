import './Styles/Header.css';

function Header() {

    return (
            <div class="header-bar">
                <h1 class="rainbow logo">Kyle's Music Website!!!</h1>
                <div class="slider-menu">
                    <a href='/' >Home</a>
                    <a href='https://github.com/kyledavis109' target='_blank' rel='noreferrer'>GitHub</a>
                    <a href='https://www.spotify.com/us/' target='_blank' rel='noreferrer'>Spotify</a>
                </div>
            </div>
    );
};

export default Header;