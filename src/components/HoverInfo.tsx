import React, { useEffect, useState, useRef } from 'react';

export interface InventorData {
    id: string;
    name: string;
    domain: string;
    era: string;
    description: string;
    image: string;
    color: string;
}

interface HoverInfoProps {
    inventor: InventorData | null;
    mouseX: number;
    mouseY: number;
}

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

export const HoverInfo: React.FC<HoverInfoProps> = ({ inventor, mouseX, mouseY: _mouseY }) => {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const prevIdRef = useRef<string | null>(null);
    const alreadySeen = inventor ? viewedCache.has(inventor.id) : false;

    useEffect(() => {
        if (inventor && inventor.id !== prevIdRef.current) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // Place dialog just to the RIGHT of left-side members, just to the LEFT of right-side members
            let x: number;
            if (mouseX < vw * 0.5) {
                x = mouseX + 150;
            } else {
                x = mouseX - 430;
            }
            x = Math.min(Math.max(x, 10), vw - 300);
            const y = Math.min(Math.max(40, vh * 0.12), vh - 300);

            setPos({ x, y });
            prevIdRef.current = inventor.id;

            setTimeout(() => viewedCache.add(inventor.id), 1200);

            setVisible(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else if (!inventor) {
            setVisible(false);
            prevIdRef.current = null;
        }
    }, [inventor, mouseX]);

    const isActive = inventor !== null && visible;

    const nameText = useTypewriter(inventor?.name || '', 18, isActive, alreadySeen);
    const domainText = useTypewriter(inventor?.domain || '', 14, isActive, alreadySeen);
    const eraText = useTypewriter(inventor?.era || '', 16, isActive, alreadySeen);
    const descText = useTypewriter(inventor?.description || '', 8, isActive, alreadySeen);

    if (!inventor) return null;

    const accent = inventor.color;
    const isTyping = isActive && !alreadySeen;

    return (
        <div
            style={{
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                zIndex: 25,
                pointerEvents: 'none',
                width: 280,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.96)',
                transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    background: 'rgba(8, 4, 4, 0.92)',
                    backdropFilter: 'blur(14px)',
                    border: `1px solid ${accent}30`,
                    borderRadius: 2,
                    padding: '16px 18px 14px',
                    boxShadow: `0 0 30px rgba(0,0,0,0.6), 0 0 6px ${accent}15`,
                }}
            >
                {/* Corner brackets */}
                {[
                    { top: -1, left: -1, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
                    { top: -1, right: -1, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
                    { bottom: -1, left: -1, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
                    { bottom: -1, right: -1, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
                ].map((s, i) => (
                    <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s } as React.CSSProperties} />
                ))}

                <div style={{
                    position: 'absolute', top: 7, right: 9,
                    width: 5, height: 5, borderRadius: '50%',
                    background: accent, boxShadow: `0 0 6px ${accent}`,
                    animation: 'hoverPulse 2s ease-in-out infinite',
                }} />

                <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.05em',
                    color: '#fff', margin: '0 0 6px 0', lineHeight: 1.2, minHeight: '1.3em',
                }}>
                    {nameText}
                    {isTyping && nameText.length < inventor.name.length && (
                        <span style={{
                            display: 'inline-block', width: 2, height: '0.9em',
                            background: accent, marginLeft: 2, verticalAlign: 'text-bottom',
                            animation: 'hoverBlink 0.5s step-end infinite',
                        }} />
                    )}
                </h3>

                <div style={{
                    width: visible ? '100%' : '0%', height: 1,
                    background: `linear-gradient(90deg, ${accent}60, transparent)`,
                    transition: 'width 0.4s ease 0.08s', marginBottom: 8,
                }} />

                <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: accent,
                    margin: '0 0 4px 0', minHeight: '1.1em',
                }}>
                    {domainText}
                </p>

                <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.65)',
                    margin: '0 0 10px 0', minHeight: '1.1em',
                }}>
                    {eraText}
                </p>

                <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '0.82rem', fontWeight: 400, lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.8)', margin: 0, minHeight: '2.5em',
                }}>
                    {descText}
                    {isTyping && descText.length < inventor.description.length && (
                        <span style={{
                            display: 'inline-block', width: 2, height: '0.75em',
                            background: 'rgba(255,255,255,0.6)', marginLeft: 1, verticalAlign: 'text-bottom',
                            animation: 'hoverBlink 0.5s step-end infinite',
                        }} />
                    )}
                </p>
            </div>

            <style>{`
                @keyframes hoverBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes hoverPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
            `}</style>
        </div>
    );
};
