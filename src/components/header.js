import './Styles/Header.css';

function Header() {

    return (
        <div>
            <br></br>
            <div class="container">
                <div class="header-bar">
                    <h1 class="logo">Kyle's Music Website!!!</h1>
                    <div class="slider-menu">
                        <a href='/' >Home</a>
                        <a href='https://github.com/kyledavis109' target='_blank' rel='noreferrer'>GitHub</a>
                        <a href='https://www.spotify.com/us/' target='_blank' rel='noreferrer'>Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;