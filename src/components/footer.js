import './Styles/Footer.css';

function Footer() {
    return (
    <div>
        <footer className="footer-distributed">
        
            <div className="footer-left">
                <h3>Kyle<span>Davis</span></h3>
                <br></br>
                <p className="footer-company-name">Kyle Davis © 2022</p>
            </div>

            <div className="footer-center">

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>514 Quail Crest Dr.</span> Collierville, TN</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>(901) 414-6095</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@company.com">kyledavis109@gmail.com</a></p>
                </div>

            </div>

            <div className="footer-right">
                <p className="footer-company-about">
                    <span>About Me:</span>
                    I am a junior dev with a passion for coding and music. This website was created from scratch.
                </p>
            </div>

        </footer>
    </div>
    );
};

export default Footer;