import React, { useEffect, useState, useRef, useCallback } from 'react';
import { WINGS } from '../data/wingsData';
import { ARTIFACTS_DATA } from '../data/artifactsData';
import type { InventorEntry } from '../data/artifactsData';

interface WingTimelineProps {
    wingId: string;
    onClose: () => void;
}

/** Check if a URL points to a PNG or SVG (needs white/light background) */
const needsWhiteBg = (url: string) => {
    const lower = url.toLowerCase();
    return lower.endsWith('.png') || lower.endsWith('.svg');
};

/** Some non-PNG images also need a white bg (e.g. Steve Jobs webp) */
const FORCE_WHITE_BG = new Set([
    '/images/portraits/computation/Steve Jobs.webp',
]);

export const WingTimeline: React.FC<WingTimelineProps> = ({ wingId, onClose }) => {
    const [fadeIn, setFadeIn] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const wing = WINGS.find((w) => w.id === wingId);
    const artifacts = ARTIFACTS_DATA.filter((a) => a.wingId === wingId);

    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setFadeIn(true));
        });
    }, []);

    /** Scroll to a specific artifact by index */
    const scrollToArtifact = useCallback((index: number) => {
        if (!scrollRef.current) return;
        const sections = scrollRef.current.querySelectorAll<HTMLElement>('[data-artifact-idx]');
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    if (!wing) return null;

    // Silhouette SVG for inventors without portraits
    const silhouetteSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#0a0a0a" width="100" height="100"/><circle cx="50" cy="36" r="16" fill="#1a1a1a"/><ellipse cx="50" cy="85" rx="28" ry="22" fill="#1a1a1a"/></svg>')}`;

    /** Should this portrait get a white background? */
    const shouldWhiteBg = (url: string) => needsWhiteBg(url) || FORCE_WHITE_BG.has(url);

    /** Render a single inventor portrait card */
    const renderInventorCard = (inv: InventorEntry, count: number, idx: number) => {
        // BIGGER for single inventor/company
        const portraitW = count === 1 ? 200 : count === 2 ? 140 : 110;
        const isWhiteBg = shouldWhiteBg(inv.portrait);

        // For companies: wider, shorter frame. For people: taller frame.
        const portraitH = inv.isCompany
            ? Math.round(portraitW * 0.7)
            : Math.round(portraitW * 1.25);

        return (
            <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
            }}>
                {/* Portrait Frame — adapts to content */}
                <div style={{
                    width: portraitW,
                    height: portraitH,
                    border: inv.isCompany
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(255,255,255,0.15)',
                    padding: inv.isCompany ? '10px' : '3px',
                    // White background for PNG/SVG images or force-listed, dark for others
                    background: isWhiteBg
                        ? 'rgba(255,255,255,0.92)'
                        : 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <img
                        src={inv.portrait || silhouetteSvg}
                        alt={inv.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* Name */}
                <div style={{
                    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                    fontSize: count === 1 ? '18px' : count === 2 ? '16px' : '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.3,
                    letterSpacing: '0.01em',
                    textAlign: 'center',
                    maxWidth: portraitW + 40,
                }}>
                    {inv.name}
                </div>

                {/* Lifespan — only for non-company inventors */}
                {!inv.isCompany && inv.dates && (
                    <div style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: count === 1 ? '11px' : '10px',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.03em',
                        textAlign: 'center',
                        marginTop: '-4px',
                    }}>
                        {inv.dates}
                    </div>
                )}
            </div>
        );
    };

    /** Stylized nav arrow — positioned at section edges */
    const NavArrow = ({ direction, onClick }: { direction: 'up' | 'down'; onClick: () => void }) => (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            style={{
                position: 'absolute',
                ...(direction === 'up'
                    ? { top: 20, right: 28 }
                    : { bottom: 20, right: 28 }),
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 20,
                padding: '8px 0',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
            }}
        >
            {direction === 'up' && (
                <>
                    <span style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1 }}>↑</span>
                    <span style={{
                        width: 24, height: 1,
                        background: 'currentColor',
                        display: 'inline-block',
                    }} />
                    prev
                </>
            )}
            {direction === 'down' && (
                <>
                    next
                    <span style={{
                        width: 24, height: 1,
                        background: 'currentColor',
                        display: 'inline-block',
                    }} />
                    <span style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1 }}>↓</span>
                </>
            )}
        </button>
    );

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.35)',
            zIndex: 1000,
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 0.8s ease',
            color: '#E0E0E0',
        }}>
            {/* THE SCROLL CONTAINER */}
            <div
                ref={scrollRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollSnapType: 'y mandatory',
                    WebkitOverflowScrolling: 'touch',
                    paddingBottom: '100px',
                    '--wing-color': wing.color,
                } as React.CSSProperties}
            >
                {/* Close / Return Button */}
                <button
                    onClick={() => {
                        setFadeIn(false);
                        setTimeout(onClose, 800);
                    }}
                    style={{
                        position: 'fixed',
                        top: 24,
                        left: 32,
                        zIndex: 2000,
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.6)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                    ← BACK TO SECTOR
                </button>

                {/* STICKY HEADER — transparent, no darkening */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    textAlign: 'center',
                    background: 'transparent',
                    padding: '14px 0 10px 0',
                    pointerEvents: 'none'
                }}>
                    <p style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '8px',
                        fontWeight: 500,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: wing.color,
                        margin: '0 0 4px 0',
                        opacity: 0.7,
                    }}>
                        {wing.label} // CHRONOLOGY
                    </p>
                    <h1 style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        lineHeight: 1.1,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        margin: 0,
                        color: 'rgba(255,255,255,0.45)',
                    }}>
                        {wing.title}
                    </h1>
                </div>

                {/* ARTIFACTS */}
                {artifacts.map((item, idx) => {
                    const inventors = item.inventors || [];
                    const inventorCount = inventors.length;

                    return (
                        <div
                            key={item.id}
                            id={item.id}
                            data-artifact-idx={idx}
                            style={{
                                width: '100%',
                                minHeight: '100vh',
                                height: '100vh',
                                boxSizing: 'border-box',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                paddingTop: '110px',
                                paddingBottom: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            {/* Nav arrows at section edges */}
                            {idx > 0 && (
                                <NavArrow direction="up" onClick={() => scrollToArtifact(idx - 1)} />
                            )}
                            {idx < artifacts.length - 1 && (
                                <NavArrow direction="down" onClick={() => scrollToArtifact(idx + 1)} />
                            )}
                            {/* Artifact Title — Top Center */}
                            <h2 style={{
                                fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                                fontSize: '2.2rem',
                                fontWeight: 500,
                                fontStyle: 'italic',
                                color: '#FFFFFF',
                                textAlign: 'center',
                                margin: '0 0 28px 0',
                                letterSpacing: '0.02em',
                                lineHeight: 1.2,
                                maxWidth: '800px',
                                padding: '0 20px',
                                opacity: fadeIn ? 1 : 0,
                                transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.8s ease 0.2s',
                            }}>
                                {item.name}
                            </h2>

                            {/* 3-Panel Layout */}
                            <div style={{
                                width: '100%',
                                maxWidth: '1400px',
                                margin: '0 auto',
                                padding: '0 40px',
                                display: 'grid',
                                gridTemplateColumns: '280px 1fr 340px',
                                gap: '44px',
                                alignItems: 'center',
                                opacity: fadeIn ? 1 : 0,
                                transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                            }}>
                                {/* LEFT PANEL — Inventor(s) */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '20px',
                                }}>
                                    {/* Multiple portraits layout — grid: 2-col for 2+, 1-col for 1 */}
                                    {inventorCount > 0 ? (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: inventorCount === 1 ? '1fr' : 'repeat(2, auto)',
                                            justifyContent: 'center',
                                            justifyItems: 'center',
                                            gap: '20px 24px',
                                        }}>
                                            {inventors.map((inv, i) =>
                                                renderInventorCard(inv, inventorCount, i)
                                            )}
                                        </div>
                                    ) : (
                                        /* Fallback to legacy single portrait */
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}>
                                            <div style={{
                                                width: 200,
                                                height: 250,
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                padding: '3px',
                                                background: (item.inventorPortrait && shouldWhiteBg(item.inventorPortrait))
                                                    ? 'rgba(255,255,255,0.92)'
                                                    : 'rgba(255,255,255,0.02)',
                                            }}>
                                                <img
                                                    src={item.inventorPortrait || silhouetteSvg}
                                                    alt={item.inventor}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            </div>
                                            <div style={{
                                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                                fontSize: '18px',
                                                fontWeight: 600,
                                                color: 'rgba(255,255,255,0.88)',
                                                textAlign: 'center',
                                            }}>
                                                {item.inventor}
                                            </div>
                                            {item.inventorDates && (
                                                <div style={{
                                                    fontFamily: '"JetBrains Mono", monospace',
                                                    fontSize: '11px',
                                                    color: 'rgba(255,255,255,0.35)',
                                                }}>
                                                    {item.inventorDates}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div style={{
                                        width: '40px',
                                        height: '1px',
                                        background: 'rgba(255,255,255,0.08)',
                                    }} />

                                    {/* Date */}
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontFamily: '"JetBrains Mono", monospace',
                                            fontSize: '8px',
                                            letterSpacing: '0.18em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(255,255,255,0.3)',
                                            marginBottom: '5px',
                                        }}>
                                            Date
                                        </div>
                                        <div style={{
                                            fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            color: 'rgba(255,255,255,0.9)',
                                            lineHeight: 1,
                                            letterSpacing: '0.02em',
                                        }}>
                                            {item.date.replace(/^c\.\s*/, '').replace(/\s*\(.*\)/, '')}
                                        </div>
                                    </div>
                                </div>

                                {/* CENTER — Artifact Image (no arrows here) */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    maxHeight: 'calc(100vh - 260px)',
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
                                        }}
                                    />
                                </div>

                                {/* RIGHT PANEL — Info (Editorial) */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    alignSelf: 'center',
                                }}>
                                    {/* Origin */}
                                    <div>
                                        <div style={{
                                            fontFamily: '"JetBrains Mono", monospace',
                                            fontSize: '9px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(255,255,255,0.35)',
                                            marginBottom: '6px',
                                        }}>
                                            Origin
                                        </div>
                                        <div style={{
                                            fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: 'rgba(255,255,255,0.88)',
                                            letterSpacing: '0.01em',
                                        }}>
                                            {item.origin || item.country}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {item.description && (
                                        <div style={{
                                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                                            fontSize: '17px',
                                            lineHeight: 1.7,
                                            color: 'rgba(255,255,255,0.6)',
                                            letterSpacing: '0.015em',
                                            fontWeight: 400,
                                        }}>
                                            {item.description}
                                        </div>
                                    )}

                                    {/* Impact — editorial pull-quote */}
                                    <div style={{
                                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                                        fontSize: '16px',
                                        lineHeight: 1.65,
                                        color: 'rgba(255,255,255,0.5)',
                                        fontStyle: 'italic',
                                        borderLeft: `2px solid ${wing.color}`,
                                        paddingLeft: '16px',
                                        fontWeight: 400,
                                    }}>
                                        {item.impact}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
                @keyframes pulse {
                    0%, 100% { opacity: 0.15; transform: translateY(0); }
                    50% { opacity: 0.35; transform: translateY(4px); }
                }
            `}</style>
        </div>
    );
};
