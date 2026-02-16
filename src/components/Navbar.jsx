import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = document.querySelectorAll('.section, .hero-section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = !menuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'music', label: 'Music' },
        { id: 'events', label: 'Events' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <>
            <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
                <div className="nav-container">
                    <a href="#" className="nav-logo">
                        <span className="logo-text">B</span>
                        <span className="logo-full">BIKKI</span>
                    </a>
                    <ul className="nav-links">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                                    data-section={item.id}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-actions">
                        <button className={`hamburger${menuOpen ? ' active' : ''}`} id="hamburger" onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu${menuOpen ? ' active' : ''}`} id="mobileMenu">
                <div className="mobile-menu-content">
                    <ul className="mobile-nav-links">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="mobile-link" onClick={closeMenu}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mobile-social">
                        <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
}
