import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Main cursor follows exactly
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            // Periodic ripples (sound waves)
            if (Math.random() > 0.96) {
                const id = Date.now() + Math.random();
                setRipples(prev => [...prev.slice(-8), { id, x: mouseX, y: mouseY }]);
                setTimeout(() => {
                    setRipples(prev => prev.filter(r => r.id !== id));
                }, 1000);
            }
        };

        const animateFollower = () => {
            // Smooth "liquid" easing for the follower
            const ease = 0.12;
            followerX += (mouseX - followerX) * ease;
            followerY += (mouseY - followerY) * ease;

            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(animateFollower);
        };

        const animationId = requestAnimationFrame(animateFollower);
        document.addEventListener('mousemove', onMouseMove);

        const handleEnter = () => {
            follower.classList.add('hovering');
            cursor.classList.add('hovering');
        };
        const handleLeave = () => {
            follower.classList.remove('hovering');
            cursor.classList.remove('hovering');
        };

        const addListeners = () => {
            document.querySelectorAll('a, button, .music-card, .gallery-item, .nav-link').forEach(el => {
                el.addEventListener('mouseenter', handleEnter);
                el.addEventListener('mouseleave', handleLeave);
            });
        };

        addListeners();
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationId);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="custom-cursor" ref={cursorRef}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C11.5 2 11 2.5 11 3V10.3C10.4 9.8 9.7 9.5 9 9.5C7.3 9.5 6 10.8 6 12.5C6 14.2 7.3 15.5 9 15.5C10.7 15.5 12 14.2 12 12.5V5H18V3C18 2.5 17.5 2 17 2H12Z" fill="currentColor" />
                    <path d="M7 18C7 17.4 7.4 17 8 17H16C16.6 17 17 17.4 17 18C17 18.6 16.6 19 16 19H8C7.4 19 7 18.6 7 18Z" fill="currentColor" opacity="0.5" />
                </svg>
            </div>
            <div className="cursor-follower" ref={followerRef}></div>
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className="cursor-ripple"
                    style={{ left: ripple.x, top: ripple.y }}
                ></div>
            ))}
        </>
    );
}
