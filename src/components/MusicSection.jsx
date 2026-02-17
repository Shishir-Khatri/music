import { useDB } from '../hooks/useDB';

export default function MusicSection() {
    const [musicData] = useDB('music');

    // Sort music: latest year first, then latest uploaded first
    const music = [...musicData].sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        if (yearB !== yearA) return yearB - yearA;

        // Fallback to created_at if years are the same
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <section id="music" className="section music-section">
            <div className="section-container">
                <div className="section-header" data-animate="fade-up">
                    <span className="section-tag"><i className="fas fa-headphones" aria-hidden="true"></i> Music</span>
                    <h2 className="section-title">Latest <span className="gradient-text">Releases</span></h2>
                    <p className="section-desc">Listen to the latest tracks and timeless classics</p>
                </div>
                <div className="music-grid" id="musicGrid">
                    {music.length === 0 ? (
                        <div className="empty-state"><i className="fas fa-music" aria-hidden="true"></i><p>No songs yet</p></div>
                    ) : (
                        music.map(song => (
                            <div
                                key={song.id}
                                className="music-card"
                                data-animate="fade-up"
                                role="button"
                                tabIndex={0}
                                aria-label={`Play ${song.title}`}
                                onClick={() => window.open(song.link || '#', '_blank', 'noopener,noreferrer')}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(song.link || '#', '_blank', 'noopener,noreferrer'); } }}
                            >
                                <div className="music-cover">
                                    <img
                                        src={song.cover || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'}
                                        alt={`${song.title} album cover`}
                                        width="400"
                                        height="400"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'; }}
                                    />
                                    <div className="music-play-overlay">
                                        <div className="play-btn-icon"><i className="fas fa-play" aria-hidden="true"></i></div>
                                    </div>
                                </div>
                                <div className="music-info">
                                    <h3 className="music-title">{song.title}</h3>
                                    <div className="music-meta">
                                        <span>{song.album || 'Single'} • {song.year || ''}</span>
                                        <span>{song.duration || ''}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
