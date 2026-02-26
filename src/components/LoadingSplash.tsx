import React, { useState, useEffect } from 'react';

interface LoadingSplashProps {
    onComplete: () => void;
}

export const LoadingSplash: React.FC<LoadingSplashProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let frame: number;
        let start: number | null = null;
        const duration = 2200; // ~2.2 seconds total

        const tick = (ts: number) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            // Ease-out curve: fast start, slow finish
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));

            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                // Hold at 100% briefly, then fade out
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(onComplete, 600);
                }, 300);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [onComplete]);

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
                Loading
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
                    background: 'rgba(255,255,255,0.5)',
                    transition: 'width 0.05s linear',
                }} />
            </div>
        </div>
    );
};
