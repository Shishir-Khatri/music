import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const onMouseMove = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            setTimeout(() => {
                follower.style.left = e.clientX - 13 + 'px';
                follower.style.top = e.clientY - 13 + 'px';
            }, 80);
        };

        document.addEventListener('mousemove', onMouseMove);

        const handleEnter = () => {
            follower.style.width = '50px';
            follower.style.height = '50px';
        };
        const handleLeave = () => {
            follower.style.width = '35px';
            follower.style.height = '35px';
        };

        const addListeners = () => {
            document.querySelectorAll('a, button, .music-card, .gallery-item').forEach(el => {
                el.addEventListener('mouseenter', handleEnter);
                el.addEventListener('mouseleave', handleLeave);
            });
        };

        // Run after a delay to let DOM render
        const timeout = setTimeout(addListeners, 500);

        // Use MutationObserver to add listeners to dynamically added elements
        const observer = new MutationObserver(() => {
            addListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="custom-cursor" ref={cursorRef}></div>
            <div className="cursor-follower" ref={followerRef}></div>
        </>
    );
}
