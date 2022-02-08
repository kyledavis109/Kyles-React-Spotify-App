import './Styles/Header.css';

function Header() {

    return (
            <div className="header-bar">
                <h1 className="rainbow logo">Kyle's Music Website!!!</h1>
                <div className="slider-menu">
                    <a href='/' >Home</a>
                    <a href='https://github.com/kyledavis109' target='_blank' rel='noreferrer'>GitHub</a>
                    <a href='https://www.spotify.com/us/' target='_blank' rel='noreferrer'>Spotify</a>
                </div>
            </div>
    );
};

export default Header;