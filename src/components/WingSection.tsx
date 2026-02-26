import React, { useEffect, useRef, useState } from 'react';
import type { WingData } from '../data/wingsData';

// Simple typewriter — types text char by char, 2 at a time for speed
function useTypewriter(text: string, speed: number, active: boolean, skipAnim: boolean) {
    const [displayed, setDisplayed] = useState('');
    const indexRef = useRef(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

    useEffect(() => {
        clearInterval(timerRef.current);
        if (!active || !text) {
            setDisplayed('');
            indexRef.current = 0;
            return;
        }

        if (skipAnim) {
            setDisplayed(text);
            indexRef.current = text.length;
            return;
        }

        setDisplayed('');
        indexRef.current = 0;

        timerRef.current = setInterval(() => {
            indexRef.current = Math.min(indexRef.current + 2, text.length);
            setDisplayed(text.slice(0, indexRef.current));
            if (indexRef.current >= text.length) {
                clearInterval(timerRef.current);
            }
        }, speed);

        return () => clearInterval(timerRef.current);
    }, [text, speed, active, skipAnim]);

    return displayed;
}

const viewedCache = new Set<string>();

interface WingSectionProps {
    wing: WingData;
    isActive: boolean;
    onEnter: (id: string) => void;
}

export const WingSection: React.FC<WingSectionProps> = ({ wing, isActive, onEnter }) => {
    const [animate, setAnimate] = useState(false);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
    const prevActiveRef = useRef(false);
    const alreadySeen = viewedCache.has(wing.id);

    useEffect(() => {
        if (isActive && !prevActiveRef.current) {
            setAnimate(false);
            setTimeout(() => viewedCache.add(wing.id), 1200);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimate(true));
            });
        } else if (!isActive) {
            setAnimate(false);
        }
        prevActiveRef.current = isActive;
    }, [isActive]);

    const staggerItem = (delay: number) => ({
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    });

    const descText = useTypewriter(wing.description, 12, isActive, alreadySeen);
    const isTyping = isActive && !alreadySeen;
    const isEven = wing.index % 2 === 0;

    return (
        <section
            className="global-scroll-section"
            data-section-index={wing.index.toString()}
            data-wing-id={wing.id}
            onClick={() => onEnter(wing.id)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseLeave={() => setCursorPos(null)}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                zIndex: 10,
                cursor: 'none',
            }}
        >
            <style>{`
                @keyframes hoverBlinkWing { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>

            {/* Top Area: Elegant Heading (Alternates Left/Right) */}
            <div style={{
                position: 'absolute',
                top: '12%',
                left: isEven ? '6%' : 'auto',
                right: isEven ? 'auto' : '6%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isEven ? 'flex-start' : 'flex-end',
                zIndex: 20,
                padding: '0 20px',
                pointerEvents: 'none', // Ensure it doesn't block clicks on the section
            }}>
                <p style={{
                    ...staggerItem(0),
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: `${wing.color}90`,
                    margin: '0 0 12px 0',
                }}>
                    {wing.label}
                </p>
                <h2 style={{
                    ...staggerItem(0.1),
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(2.5rem, 4vw, 5rem)', // Specifically scale down to smaller bounds
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.95)',
                    margin: 0,
                    lineHeight: 1.05,
                    whiteSpace: 'nowrap', // Keep forced single line
                    textShadow: `0 8px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)`, // Stronger shadow for readability over image
                    textAlign: isEven ? 'left' : 'right',
                }}>
                    {wing.title}
                </h2>
            </div>

            {/* Central Area: Large Artifact Image (Now Expansive) */}
            <div style={{
                position: 'absolute',
                top: '15%', // Push the image down slightly so there's plenty of room for the title above it
                bottom: '15%', // Lift it up so there is room for the subtext below it
                left: '5%',
                right: '5%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                perspective: '1200px',
                pointerEvents: 'none', // Let clicks pass through to section
            }}>
                <div style={{
                    position: 'relative',
                    width: '85%', // Slightly smaller 
                    height: '85%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateZ(${wing.depth}px)`,
                    // Antigravity drift
                    animation: `artifactDrift${wing.index} ${8 + wing.index * 1.7}s ease-in-out ${wing.index * 0.8}s infinite`,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease',
                    filter: animate ? 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                }}>
                    <style>{`
                        @keyframes artifactDrift${wing.index} {
                            0%, 100% { transform: translateY(0px) translateZ(${wing.depth}px); }
                            50% { transform: translateY(${10 + (wing.index % 3) * 5}px) translateZ(${wing.depth + 15}px); }
                        }
                        
                        /* Hover target on section triggers image glow but NO zoom */
                        [data-wing-id="${wing.id}"]:hover img.artifact-img-${wing.id} {
                            filter: brightness(1.15) drop-shadow(0 0 60px ${wing.color}50);
                        }
                    `}</style>
                    <img
                        className={`artifact-img-${wing.id}`}
                        src={wing.image}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            filter: 'brightness(1) drop-shadow(0 0 20px rgba(0,0,0,0.6))',
                        }}
                    />
                </div>
            </div>

            {/* Bottom Area: Subtext / Description (Alternates Right/Left opposite to Title) */}
            <div style={{
                position: 'absolute',
                bottom: '6%', // Anchor it to the bottom
                left: isEven ? 'auto' : '6%',
                right: isEven ? '6%' : 'auto',
                zIndex: 20,
                maxWidth: '600px', // Wider so it can fit in two lines
                display: 'flex',
                flexDirection: 'column',
                alignItems: isEven ? 'flex-end' : 'flex-start',
                textAlign: isEven ? 'right' : 'left',
                pointerEvents: 'none', // Ensure it doesn't block clicks on the section
            }}>
                <div style={{
                    ...staggerItem(0.2),
                    width: 48,
                    height: 2,
                    background: wing.color,
                    marginBottom: 24,
                    boxShadow: `0 0 10px ${wing.color}80`,
                }} />

                <p style={{
                    ...staggerItem(0.3),
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    lineHeight: 1.4,
                    letterSpacing: '0.02em',
                    color: 'rgba(255,255,255,0.9)',
                    margin: '0 0 24px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Restrict to strictly two lines
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textShadow: `0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.5)`, // Strong local shadow for text legibility since glass is gone
                }}>
                    {descText}
                    {isTyping && descText.length < wing.description.length && (
                        <span style={{
                            display: 'inline-block', width: 2, height: '0.75em',
                            background: wing.color, marginLeft: 2, verticalAlign: 'text-bottom',
                            animation: 'hoverBlinkWing 0.5s step-end infinite',
                        }} />
                    )}
                </p>
            </div>

            {/* Cursor-attached tooltip — direct child of section for correct positioning */}
            {cursorPos && (
                <div style={{
                    position: 'absolute',
                    left: cursorPos.x,
                    top: cursorPos.y,
                    pointerEvents: 'none',
                    zIndex: 100,
                }}>
                    {/* Pulsing ring at cursor center */}
                    <div style={{
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        border: `1.5px solid ${wing.color}`,
                        opacity: 0.7,
                        animation: 'cursorRingPulse 1.8s ease-in-out infinite',
                    }} />
                    {/* Connecting line */}
                    <div style={{
                        position: 'absolute',
                        top: 6,
                        left: 6,
                        width: 28,
                        height: 1,
                        background: `linear-gradient(to right, ${wing.color}80, ${wing.color}20)`,
                        transform: 'rotate(30deg)',
                        transformOrigin: '0 0',
                    }} />
                    {/* Label */}
                    <div style={{
                        position: 'absolute',
                        top: 18,
                        left: 30,
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '8px',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: wing.color,
                        whiteSpace: 'nowrap',
                        opacity: 0.85,
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    }}>
                        Explore artifacts
                    </div>
                </div>
            )}
            <style>{`
                @keyframes cursorRingPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.6); opacity: 0.2; }
                }
            `}</style>
        </section>
    );
};
