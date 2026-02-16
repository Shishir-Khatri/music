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
                            <a href={contact.socialYoutube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
                            <a href={contact.socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                            <a href={contact.socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook" aria-hidden="true"></i></a>
                            <a href={contact.socialTiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" aria-hidden="true"></i></a>
                            <a href={contact.socialSpotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify"><i className="fab fa-spotify" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <nav aria-label="Quick links">
                        <div className="footer-links-group">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#music">Music</a></li>
                                <li><a href="#events">Events</a></li>
                            </ul>
                        </div>
                    </nav>
                    <nav aria-label="More links">
                        <div className="footer-links-group">
                            <h4>More</h4>
                            <ul>
                                <li><a href="#gallery">Gallery</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="footer-links-group">
                        <h4>Contact</h4>
                        <ul>
                            <li><i className="fas fa-envelope" aria-hidden="true"></i> <span id="footerEmail">{contact.email}</span></li>
                            <li><i className="fas fa-phone" aria-hidden="true"></i> <span id="footerPhone">{contact.phone}</span></li>
                            <li><i className="fas fa-map-marker-alt" aria-hidden="true"></i> <span id="footerLocation">{contact.location}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Bikki Gurung. All Rights Reserved.</p>
                    <p>Made with <i className="fas fa-heart" style={{ color: 'var(--primary)' }} aria-hidden="true"></i><span className="sr-only"> love</span></p>
                </div>
            </div>
        </footer>
    );
}
