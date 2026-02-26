import React from 'react';
import type { InventorData } from './HoverInfo';

interface PortraitConfig {
    left?: string;
    right?: string;
    bottom: string;
    height: string;
    zIndex: number;
}

const PORTRAIT_LAYOUT: PortraitConfig[] = [
    // === ROW 2 — ELEVATED, not touching borders ===
    { left: '10%', bottom: '20%', height: '75vh', zIndex: 3 },
    { left: '28%', bottom: '20%', height: '75vh', zIndex: 3 },
    { left: '50%', bottom: '20%', height: '75vh', zIndex: 3 },
    { left: '68%', bottom: '20%', height: '75vh', zIndex: 3 },

    // === ROW 1 — GROUNDED, touches borders ===
    { left: '0%', bottom: '0%', height: '80vh', zIndex: 5 },
    { left: '21%', bottom: '0%', height: '80vh', zIndex: 6 },
    { left: '51%', bottom: '0%', height: '80vh', zIndex: 6 },
    { right: '0%', bottom: '0%', height: '80vh', zIndex: 5 },
];

interface PortraitsProps {
    inventors: InventorData[];
    onHover: (inventor: InventorData | null, mouseX: number, mouseY: number) => void;
    activeId: string | null;
    scrollProgress?: number;
    globalMouse?: { x: number, y: number };
}

export const Portraits: React.FC<PortraitsProps> = ({ inventors, onHover, activeId, scrollProgress = 0, globalMouse = { x: 0, y: 0 } }) => {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 10,
                pointerEvents: 'none',
            }}
        >
            {inventors.map((inventor, i) => {
                const layout = PORTRAIT_LAYOUT[i];
                if (!layout) return null;

                const isActive = activeId === inventor.id;
                const isInactive = activeId !== null && !isActive;

                // Only track global mouse movement when NO portrait is hovered
                const baseShift = activeId === null ? 15 : 0; // Minimal parallax
                const parallaxX = (globalMouse.x * baseShift) + (isActive ? globalMouse.x * -10 : 0);
                const parallaxY = 0; // Glued to the bottom, restrict Global Parallax to X-axis only

                // 3D Tilt calculation
                const rotateX = isActive ? globalMouse.y * 8 : 0; // degrees
                const rotateY = isActive ? globalMouse.x * -8 : 0;

                return (
                    <div
                        key={inventor.id}
                        onPointerEnter={(e) => onHover(inventor, e.clientX, e.clientY)}
                        onPointerLeave={() => onHover(null, 0, 0)}
                        style={{
                            position: 'absolute',
                            ...(layout.left !== undefined ? { left: layout.left } : {}),
                            ...(layout.right !== undefined ? { right: layout.right } : {}),
                            bottom: layout.bottom,
                            height: layout.height,
                            // FIX: constrain width to actual image so hover area doesn't overlap other portraits
                            width: 'fit-content',
                            zIndex: isActive ? 20 : layout.zIndex,
                            pointerEvents: 'auto',
                            cursor: 'none',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease, opacity 0.5s ease',
                            transform: `
                                perspective(1200px)
                                translate(${parallaxX}px, ${parallaxY}px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                ${isActive ? 'scale(1.08) translateY(-10px)' : 'scale(1) translateY(0)'}
                                scale(${1 + scrollProgress * 1.5}) 
                                translateY(${scrollProgress * 40}vh)
                            `,
                            filter: isActive
                                ? `brightness(1.2) drop-shadow(0 0 30px ${inventor.color}40) blur(${scrollProgress * 15}px)`
                                : isInactive
                                    ? `brightness(0.7) saturate(0.8) blur(${scrollProgress * 15}px)`
                                    : `brightness(0.85) blur(${scrollProgress * 15}px)`,
                            opacity: (isInactive ? 0.85 : 1) * Math.max(0, 1 - scrollProgress * 2), // Fade out quick on scroll
                        }}
                    >
                        <img
                            src={inventor.image}
                            alt={inventor.name}
                            draggable={false}
                            style={{
                                height: '100%',
                                width: 'auto',
                                display: 'block',
                                userSelect: 'none',
                            }}
                        />

                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: isActive
                                    ? `radial-gradient(ellipse at 50% 60%, ${inventor.color}18 0%, transparent 70%)`
                                    : 'none',
                                transition: 'background 0.5s ease',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
