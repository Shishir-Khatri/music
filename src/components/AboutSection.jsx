import DB from '../utils/db';

export default function AboutSection() {
    const about = DB.get('about');

    return (
        <section id="about" className="section about-section">
            <div className="section-container">
                <div className="section-header" data-animate="fade-up">
                    <span className="section-tag"><i className="fas fa-user"></i> About</span>
                    <h2 className="section-title">The Story Behind <span className="gradient-text">The Voice</span></h2>
                </div>
                <div className="about-grid">
                    <div className="about-image" data-animate="fade-right">
                        <div className="about-img-wrapper glass-card">
                            <img
                                id="aboutImage"
                                src={about.image}
                                alt="Bikki Gurung"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&h=600&fit=crop'; }}
                            />
                        </div>
                        <div className="experience-badge glass-card">
                            <span className="exp-number" id="expYears">{about.expYears}</span>
                            <span className="exp-text">Years of Musical Journey</span>
                        </div>
                    </div>
                    <div className="about-content" data-animate="fade-left">
                        <h3 className="about-subtitle" id="aboutSubtitle">{about.subtitle}</h3>
                        <p className="about-text" id="aboutText1">{about.text1}</p>
                        <p className="about-text" id="aboutText2">{about.text2}</p>
                        <div className="about-features">
                            <div className="feature-item glass-card-subtle">
                                <i className="fas fa-microphone-alt"></i>
                                <span id="feat1">{about.feat1}</span>
                            </div>
                            <div className="feature-item glass-card-subtle">
                                <i className="fas fa-guitar"></i>
                                <span id="feat2">{about.feat2}</span>
                            </div>
                            <div className="feature-item glass-card-subtle">
                                <i className="fas fa-pen-fancy"></i>
                                <span id="feat3">{about.feat3}</span>
                            </div>
                            <div className="feature-item glass-card-subtle">
                                <i className="fas fa-compact-disc"></i>
                                <span id="feat4">{about.feat4}</span>
                            </div>
                        </div>
                        <a href="#contact" className="btn btn-primary">
                            <span>Get In Touch</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
