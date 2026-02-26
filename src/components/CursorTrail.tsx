import { useRef, useEffect, useCallback } from 'react';
import useFluidCursor from '../hooks/useFluidCursor';

/*
  Fluid cursor trail — WebGL Navier-Stokes fluid simulation.
  Canvas renders transparent fluid overlay; custom cursor image follows mouse.
*/

export const CursorTrail: React.FC = () => {
    const cursorRef = useRef<HTMLImageElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        if (cursorRef.current) {
            cursorRef.current.style.transform =
                `translate(${e.clientX - 16}px, ${e.clientY - 2}px)`;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Initialize fluid simulation after canvas is mounted
    useEffect(() => {
        useFluidCursor();
    }, []);

    return (
        <>
            {/* Fluid simulation canvas */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9998,
                pointerEvents: 'none',
            }}>
                <canvas
                    id="fluid"
                    style={{
                        width: '100vw',
                        height: '100vh',
                    }}
                />
            </div>

            {/* Custom cursor image */}
            <img
                ref={cursorRef}
                src="/images/cursor_stylized.png"
                alt=""
                draggable={false}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 24,
                    height: 'auto',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    userSelect: 'none',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                }}
            />
        </>
    );
};
