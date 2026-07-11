import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    // Page load: hide after content loads
    useEffect(() => {
        setIsOffline(!navigator.onLine);
        if (navigator.onLine) {
            const handleLoad = () => {
                setTimeout(() => {
                    setHiding(true);
                    setTimeout(() => setVisible(false), 600);
                }, 500);
            };

            if (document.readyState === 'complete') {
                handleLoad();
            } else {
                window.addEventListener('load', handleLoad);
                return () => window.removeEventListener('load', handleLoad);
            }
        }
    }, []);

    // Online/offline detection
    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
            setHiding(false);
            setVisible(true);
        };

        const handleOnline = () => {
            setIsOffline(false);
            setHiding(true);
            setTimeout(() => setVisible(false), 600);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`loader-overlay ${hiding ? 'loader-hide' : 'loader-show'}`}>
            <div className="loading">
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
            {isOffline && (
                <p className="loader-offline-text">No Internet Connection</p>
            )}
        </div>
    );
};

export default Loader;
