import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: 'translateX(0)', opacity: 0 });
    const navLinksRef = useRef(null);

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

    const updateIndicator = () => {
        const activeLink = navLinksRef.current?.querySelector(`.nav-link[data-section="${activeSection}"]`);
        if (activeLink) {
            setIndicatorStyle({
                width: activeLink.offsetWidth,
                transform: `translateX(${activeLink.offsetLeft}px)`,
                opacity: 1
            });
        }
    };

    // Update indicator when active section changes or window resizes
    useEffect(() => {
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeSection]);

    const handleHover = (e) => {
        const target = e.currentTarget;
        setIndicatorStyle({
            width: target.offsetWidth,
            transform: `translateX(${target.offsetLeft}px)`,
            opacity: 1
        });
    };

    const handleMouseLeave = () => {
        updateIndicator();
    };

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
            <nav id="navbar" className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
                <div className="nav-container">
                    <a href="#" className="nav-logo">
                        <span className="logo-text">BIKKI</span>
                        <span className="logo-full">GURUNG</span>
                    </a>
                    <ul className="nav-links" ref={navLinksRef} onMouseLeave={handleMouseLeave}>
                        <div className="nav-indicator" style={indicatorStyle}></div>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                                    data-section={item.id}
                                    onMouseEnter={handleHover}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-actions">
                        <button
                            className={`hamburger${menuOpen ? ' active' : ''}`}
                            id="hamburger"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu${menuOpen ? ' active' : ''}`} id="mobileMenu" aria-label="Mobile navigation">
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
                        <a href="#" className="social-icon" aria-label="YouTube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
                        <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                        <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook" aria-hidden="true"></i></a>
                        <a href="#" className="social-icon" aria-label="TikTok"><i className="fab fa-tiktok" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
}
