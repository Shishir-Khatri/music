import { useState, useEffect } from 'react';

export default function Preloader() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHidden(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="preloader" className={hidden ? 'hidden' : ''}>
            <div className="preloader-inner">
                <div className="preloader-ring"></div>
                <div className="preloader-ring"></div>
                <div className="preloader-ring"></div>
                <span className="preloader-text">BIKKI GURUNG</span>
            </div>
        </div>
    );
}
