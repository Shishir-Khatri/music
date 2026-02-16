import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import MusicSection from '../components/MusicSection';
import EventsSection from '../components/EventsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';

// Lazy load Three.js scene — it's ~600KB and not needed for initial paint
const ThreeScene = lazy(() => import('../components/ThreeScene'));

export default function PublicPage() {
    useEffect(() => {
        // Scroll animations for [data-animate] elements
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animType = el.getAttribute('data-animate');
                    const delay = parseFloat(el.getAttribute('data-delay') || '0');

                    gsap.fromTo(el,
                        {
                            opacity: 0,
                            y: animType === 'fade-up' ? 40 : 0,
                            x: animType === 'fade-left' ? 40 : animType === 'fade-right' ? -40 : 0,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            duration: 0.8,
                            delay,
                            ease: 'power2.out',
                        }
                    );
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <CustomCursor />
            <Suspense fallback={null}>
                <ThreeScene />
            </Suspense>
            <Navbar />
            <main id="main-content">
                <HeroSection />
                <AboutSection />
                <MusicSection />
                <EventsSection />
                <GallerySection />
                <ContactSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    );
}
