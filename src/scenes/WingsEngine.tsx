import React, { useCallback } from 'react';
import { WingsBackground } from '../components/WingsBackground';
import { WingSection } from '../components/WingSection';
import { WINGS } from '../data/wingsData';

interface WingsEngineProps {
    onWingEnter: (wingId: string) => void;
    activeIndex: number; // Inherit from App to ensure perfect sync
    activeTimeline: string | null;
}

export const WingsEngine: React.FC<WingsEngineProps> = ({ onWingEnter, activeIndex, activeTimeline }) => {
    // Determine the wing index (App's activeSectionIndex - 1 because Hero is index 0)
    const wingIndex = Math.max(0, activeIndex - 1);
    const accentColor = WINGS[wingIndex]?.color || '#FF8C00';

    // Handle Navigation to Timeline
    const handleWingSelect = useCallback((wingId: string) => {
        onWingEnter(wingId);
    }, [onWingEnter]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 'auto', // Allow native scrolling of children
                zIndex: 5,
            }}
        >
            {/* Contextual WebGL Background for Wings */}
            <WingsBackground accentColor={accentColor} activeIndex={activeIndex} />

            {/* Render Wing Sections in the continuous document flow so IntersectionObserver catches them */}
            <div style={{
                position: 'relative',
                width: '100%',
                zIndex: 10,
                opacity: activeTimeline ? 0 : 1,
                visibility: activeTimeline ? 'hidden' : 'visible',
                transition: 'opacity 0.8s ease, visibility 0.8s ease',
                pointerEvents: activeTimeline ? 'none' : 'auto'
            }}>
                {WINGS.map((wing) => (
                    <WingSection
                        key={wing.id}
                        wing={wing}
                        isActive={activeIndex === wing.index}
                        onEnter={() => handleWingSelect(wing.id)}
                    />
                ))}
            </div>

            <style>{`
                @keyframes expandFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes expandScale {
                    from { transform: scale(0.85); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};
