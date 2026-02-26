import React, { useState, useCallback, useEffect } from 'react';
import { Portraits } from '../components/Portraits';
import { HoverInfo } from '../components/HoverInfo';
import { SilkBackground } from '../components/SilkBackground';
import { INVENTORS } from '../data/inventors';
import type { InventorData } from '../components/HoverInfo';

export const HeroPage: React.FC = () => {
    const [activeInventor, setActiveInventor] = useState<InventorData | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });

    const handleHover = useCallback((inventor: InventorData | null, mx: number, my: number) => {
        // Disable hover interactions if we are scrolling past 10%
        if (scrollProgress > 0.1) {
            setActiveInventor(null);
            return;
        }
        setActiveInventor(inventor);
        if (inventor) setMousePos({ x: mx, y: my });
    }, [scrollProgress]);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate 0 to 1 progress of the first 100vh scroll
            const progress = Math.min(window.scrollY / window.innerHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial setup

        const handleMouseMove = (e: MouseEvent) => {
            setGlobalMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2, // -1 to 1
                y: (e.clientY / window.innerHeight - 0.5) * 2, // -1 to 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 1, // Stay above WingsBackground's zIndex: 0
        }}>
            {/* Mathematical AMOLED Silk Shader Background */}
            <SilkBackground globalMouse={globalMouse} scrollProgress={scrollProgress} />

            {/* Title */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '6%',
                    transform: 'translateX(-50%)',
                    zIndex: 12,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    width: '90%',
                }}
            >
                <h1
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(3.5rem, 7vw, 7.5rem)',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.95)',
                        margin: 0,
                        textShadow: '0 2px 4px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.95), 0 8px 60px rgba(0,0,0,0.8), 0 0 120px rgba(0,0,0,0.5)',
                        opacity: 1 - scrollProgress * 1.5, // Fade out faster than background
                        filter: `blur(${scrollProgress * 10}px)`,
                        transform: `translateY(${scrollProgress * -50}px)`,
                    }}
                >
                    The Relic Atrium
                </h1>
                {/* Scroll Down Indicator */}
                <div
                    style={{
                        marginTop: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        opacity: 1 - scrollProgress * 3, // Dissolve quickly on scroll
                        filter: `blur(${scrollProgress * 10}px)`,
                        transform: `translateY(${scrollProgress * -20}px)`,
                        animation: 'scrollPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                >
                    <span style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.4em',
                        color: 'rgba(255,255,255,0.9)',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                        Scroll to Explore Artifacts
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{
                            width: '1px',
                            height: '40px',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)'
                        }} />
                        <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ opacity: 0.8 }}
                        >
                            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.6; transform: translateY(0); }
                    50% { opacity: 1; transform: translateY(8px); }
                }
            `}</style>

            {/* Portraits */}
            <Portraits
                inventors={INVENTORS}
                onHover={handleHover}
                activeId={activeInventor?.id || null}
                scrollProgress={scrollProgress}
                globalMouse={globalMouse}
            />

            {/* Hover Info */}
            <HoverInfo
                inventor={activeInventor}
                mouseX={mousePos.x}
                mouseY={mousePos.y}
            />
        </div>
    );
};
