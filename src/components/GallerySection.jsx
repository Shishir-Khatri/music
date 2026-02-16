import { useState, useEffect, useCallback } from 'react';
import DB from '../utils/db';

export default function GallerySection() {
    const gallery = DB.getAll('gallery');
    const [lightboxActive, setLightboxActive] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = useCallback((index) => {
        setLightboxIndex(index);
        setLightboxActive(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxActive(false);
    }, []);

    const navigateLightbox = useCallback((direction) => {
        setLightboxIndex(prev => (prev + direction + gallery.length) % gallery.length);
    }, [gallery.length]);

    useEffect(() => {
        const handleKey = (e) => {
            if (!lightboxActive) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [lightboxActive, closeLightbox, navigateLightbox]);

    return (
        <>
            <section id="gallery" className="section gallery-section">
                <div className="section-container">
                    <div className="section-header" data-animate="fade-up">
                        <span className="section-tag"><i className="fas fa-images"></i> Gallery</span>
                        <h2 className="section-title">Moments <span className="gradient-text">Captured</span></h2>
                    </div>
                    <div className="gallery-grid" id="galleryGrid">
                        {gallery.length === 0 ? (
                            <div className="empty-state"><i className="fas fa-images"></i><p>No photos yet</p></div>
                        ) : (
                            gallery.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="gallery-item"
                                    data-index={index}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={photo.image}
                                        alt={photo.caption || ''}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop'; }}
                                    />
                                    <div className="gallery-overlay">
                                        <div>
                                            <p className="gallery-caption">{photo.caption || ''}</p>
                                            <span className="gallery-category">{photo.category || ''}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <div className={`lightbox${lightboxActive ? ' active' : ''}`} id="lightbox" onClick={(e) => { if (e.target.id === 'lightbox') closeLightbox(); }}>
                <button className="lightbox-close" onClick={closeLightbox}><i className="fas fa-times"></i></button>
                <button className="lightbox-prev" onClick={() => navigateLightbox(-1)}><i className="fas fa-chevron-left"></i></button>
                <button className="lightbox-next" onClick={() => navigateLightbox(1)}><i className="fas fa-chevron-right"></i></button>
                {gallery.length > 0 && (
                    <img src={gallery[lightboxIndex]?.image} alt="" className="lightbox-img" id="lightboxImg" />
                )}
            </div>
        </>
    );
}
