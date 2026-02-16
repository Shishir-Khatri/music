import DB from '../utils/db';

export default function Footer() {
    const contact = DB.get('contact');
    const settings = DB.get('settings');

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3 className="footer-logo">BIKKI <span className="gradient-text">GURUNG</span></h3>
                        <p id="footerDesc">{settings.footerDesc}</p>
                        <div className="footer-social">
                            <a href={contact.socialYoutube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                            <a href={contact.socialInstagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href={contact.socialFacebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href={contact.socialTiktok} target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                            <a href={contact.socialSpotify} target="_blank" rel="noopener noreferrer"><i className="fab fa-spotify"></i></a>
                        </div>
                    </div>
                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#music">Music</a></li>
                            <li><a href="#events">Events</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4>More</h4>
                        <ul>
                            <li><a href="#gallery">Gallery</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4>Contact</h4>
                        <ul>
                            <li><i className="fas fa-envelope"></i> <span id="footerEmail">{contact.email}</span></li>
                            <li><i className="fas fa-phone"></i> <span id="footerPhone">{contact.phone}</span></li>
                            <li><i className="fas fa-map-marker-alt"></i> <span id="footerLocation">{contact.location}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Bikki Gurung. All Rights Reserved.</p>
                    <p>Made with <i className="fas fa-heart" style={{ color: 'var(--primary)' }}></i></p>
                </div>
            </div>
        </footer>
    );
}
