import { useDB } from '../hooks/useDB';

export default function HeroSection() {
    const [hero] = useDB('hero');

    return (
        <section id="home" className="hero-section">
            <div className="hero-particles"></div>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge glass-card-subtle" data-animate="fade-up">
                        <i className="fas fa-music" aria-hidden="true"></i>
                        <span id="heroBadgeText">{hero.badgeText}</span>
                    </div>
                    <h1 className="hero-title" data-animate="fade-up" data-delay="0.2">
                        <span className="title-line">
                            <span className="title-word" id="heroFirstName">{hero.firstName}</span>
                        </span>
                        <span className="title-line">
                            <span className="title-word gradient-text" id="heroLastName">{hero.lastName}</span>
                        </span>
                    </h1>
                    <p className="hero-description" data-animate="fade-up" data-delay="0.4" id="heroDescription">
                        {hero.description}
                    </p>
                    <div className="hero-buttons" data-animate="fade-up" data-delay="0.6">
                        <a href="#music" className="btn btn-primary">
                            <i className="fas fa-play" aria-hidden="true"></i>
                            <span>Listen Now</span>
                        </a>
                        <a href="#events" className="btn btn-outline">
                            <span>Upcoming Shows</span>
                            <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="hero-stats" data-animate="fade-up" data-delay="0.8">
                        <div className="stat-item">
                            <span className="stat-number" id="statSongs">{hero.statSongs}</span>
                            <span className="stat-label">Songs</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number" id="statShows">{hero.statShows}</span>
                            <span className="stat-label">Live Shows</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number" id="statFans">{hero.statFans}</span>
                            <span className="stat-label">Fans</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image" data-animate="fade-left" data-delay="0.3">
                    <div className="image-frame">
                        <div className="image-glow"></div>
                        <img
                            id="heroImage"
                            src={hero.image}
                            alt="Bikki Gurung - Nepali singer and musician"
                            width="420"
                            height="520"
                            fetchpriority="high"
                            decoding="async"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=800&fit=crop'; }}
                        />
                        <div className="image-overlay"></div>
                    </div>
                    <div className="floating-card glass-card fc-1">
                        <i className="fab fa-youtube" aria-hidden="true"></i>
                        <div>
                            <span className="fc-number" id="ytSubscribers">{hero.ytSubscribers}</span>
                            <span className="fc-label">Subscribers</span>
                        </div>
                    </div>
                    <div className="floating-card glass-card fc-2">
                        <i className="fab fa-spotify" aria-hidden="true"></i>
                        <div>
                            <span className="fc-number" id="spotifyListeners">{hero.spotifyListeners}</span>
                            <span className="fc-label">Monthly Listeners</span>
                        </div>
                    </div>
                    <div className="music-visualizer">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
