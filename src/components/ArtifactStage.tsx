import React, { useRef, useState, useCallback } from 'react';

/*
  ArtifactStage — Full-resolution 4K image display.
  No WebGL, no distortion. Pure crisp images floating in the void
  with antigravity drift, edge feathering, and depth parallax.
*/

interface ArtifactStageProps {
    imageSrc: string;
    accentColor: string;
    isActive: boolean;
    index: number;
    depth: number;
    onExpand: () => void;
}

export const ArtifactStage: React.FC<ArtifactStageProps> = ({
    imageSrc,
    accentColor,
    isActive: _isActive,
    index,
    depth,
    onExpand,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Antigravity drift parameters — unique per index
    const driftPeriodY = 8 + index * 1.7;
    const driftAmplitudeY = 6 + (index % 3) * 3;
    const driftAmplitudeZ = 4 + (index % 2) * 3;
    const driftDelay = index * 0.8;

    const handleClick = useCallback(() => {
        onExpand();
    }, [onExpand]);

    // Antigravity drift keyframes
    const driftKeyframes = `
        @keyframes artifactDrift${index} {
            0%, 100% {
                transform: translateY(0px) translateZ(${depth}px);
            }
            25% {
                transform: translateY(${driftAmplitudeY}px) translateZ(${depth + driftAmplitudeZ}px);
            }
            50% {
                transform: translateY(-${driftAmplitudeY * 0.6}px) translateZ(${depth - driftAmplitudeZ * 0.5}px);
            }
            75% {
                transform: translateY(${driftAmplitudeY * 0.3}px) translateZ(${depth + driftAmplitudeZ * 0.7}px);
            }
        }
    `;

    return (
        <>
            <style>{driftKeyframes}</style>
            <div
                ref={containerRef}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'relative',
                    width: '85%',
                    maxHeight: '70vh',
                    overflow: 'hidden',
                    borderRadius: 8,
                    cursor: 'none',
                    // Glassmorphism background
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    // Antigravity drift
                    animation: `artifactDrift${index} ${driftPeriodY}s ease-in-out ${driftDelay}s infinite`,
                    // Hover effects
                    transition: 'filter 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease, border-color 0.6s ease, background 0.6s ease',
                    filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    // Dynamic glowing glass boundary
                    border: `1px solid ${isHovered ? `${accentColor}A0` : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: isHovered
                        ? `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 30px ${accentColor}40, inset 0 0 30px ${accentColor}20`
                        : `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px ${accentColor}10, inset 0 0 15px ${accentColor}05`,
                }}
            >
                {/* Full-resolution 4K transparent PNG */}
                <img
                    src={imageSrc}
                    alt=""
                    draggable={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // ensure the whole object is visible in the glass box
                        display: 'block',
                        userSelect: 'none',
                        // Removed mixBlendMode and contrast filter since image is transparent
                    }}
                />
            </div>
        </>
    );
};
