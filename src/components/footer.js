import './Styles/Footer.css';

function Footer() {
    return (
        <footer className="footer-distributed">
        
            <div className="footer-section">
                <h3>Kyle<span>Davis</span></h3>
                <p className="footer-name">Kyle Davis © 2022</p>
            </div>

            <div className="footer-section">

                <div>
                    <i className="location"></i>
                    <p><span>123 Something St.</span> Memphis, TN</p>
                </div>

                <div>
                    <i className="phone"></i>
                    <p>(901) 111-1111</p>
                </div>

                <div>
                    <i className="email"></i>
                    <p>kyledavis109@gmail.com</p>
                </div>

            </div>

            <div className="footer-section">
                <p className="footer-company-about">
                    <span>About Me: </span>
                    I am a junior dev with a passion for coding and music. This website was created from scratch.
                </p>
            </div>

        </footer>
    );
};

export default Footer;