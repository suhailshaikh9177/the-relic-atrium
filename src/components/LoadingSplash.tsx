import React, { useState, useEffect } from 'react';

interface LoadingSplashProps {
    progress: number; // Real percentage 0-100
    isLoaded: boolean; // Flag to trigger fade out
    onComplete: () => void;
}

export const LoadingSplash: React.FC<LoadingSplashProps> = ({ progress, isLoaded, onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            // Give UI a split second to render 100 before disappearing
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(onComplete, 600); // Wait for opacity transition
            }, 300);
        }
    }, [isLoaded, onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.6s ease',
        }}>
            {/* Loading text */}
            <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
            }}>
                Loading Assets
            </div>

            {/* Percentage */}
            <div style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                fontSize: '4rem',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
                width: '120px',
                textAlign: 'center'
            }}>
                {progress}
            </div>

            {/* Thin progress bar */}
            <div style={{
                width: 120,
                height: 1,
                background: 'rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progress}%`,
                    background: 'rgba(255,255,255,0.8)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
            </div>

            <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                color: 'rgba(255,255,255,0.2)',
                marginTop: '12px',
                letterSpacing: '0.1em'
            }}>
                Fetching High-Resolution Media
            </div>
        </div>
    );
};
