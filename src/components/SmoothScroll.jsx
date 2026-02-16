import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useLayoutEffect(() => {
        const lenis = new Lenis({
            duration: 2.0,
            lerp: 0.05, // Much slower/smoother transition
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 0.5, // Heavy/Weighted feel for precision
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Manual anchor click handling to ensure smooth scroll via Lenis
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                const id = target.getAttribute('href');
                if (id === '#') return;

                e.preventDefault();
                const element = document.querySelector(id);
                if (element) {
                    lenis.scrollTo(element, {
                        offset: -100, // Account for navbar height
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return <>{children}</>;
}
