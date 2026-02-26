import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HeroPage } from './scenes/HeroPage';
import { WingsEngine } from './scenes/WingsEngine';
import { CursorTrail } from './components/CursorTrail';
import { WingTimeline } from './scenes/WingTimeline';
import { LoadingSplash } from './components/LoadingSplash';
import { WINGS } from './data/wingsData';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); // 0 is Hero, 1-6 are Wings
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Programmatic wheel-based section navigation ---
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const totalSections = WINGS.length + 1; // Hero + all wings

  // Keep the ref in sync with state — but NOT during programmatic scrolls,
  // otherwise inertial wheel events chain off intermediate positions
  useEffect(() => {
    if (!isScrollingRef.current) {
      currentSectionRef.current = activeSectionIndex;
    }
  }, [activeSectionIndex]);

  const scrollLockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scrollToSection = useCallback((index: number) => {
    if (isScrollingRef.current) return;
    const clamped = Math.max(0, Math.min(index, totalSections - 1));
    if (clamped === currentSectionRef.current) return;

    isScrollingRef.current = true;
    currentSectionRef.current = clamped;
    setActiveSectionIndex(clamped);

    window.scrollTo({
      top: clamped * window.innerHeight,
      behavior: 'smooth',
    });

    // Unlock via scrollend (precise) with a generous fallback timer
    const unlock = () => {
      // Small extra delay after scroll finishes to absorb trailing inertia
      setTimeout(() => { isScrollingRef.current = false; }, 300);
      window.removeEventListener('scrollend', unlock);
      clearTimeout(scrollLockTimer.current);
    };
    window.addEventListener('scrollend', unlock, { once: true });

    // Fallback: if scrollend never fires (older browsers), unlock after 1200ms
    clearTimeout(scrollLockTimer.current);
    scrollLockTimer.current = setTimeout(() => {
      isScrollingRef.current = false;
      window.removeEventListener('scrollend', unlock);
    }, 1200);
  }, [totalSections]);

  useEffect(() => {
    // Cooldown absorbs trackpad inertia: resets on every wheel event,
    // so rapid-fire events from a single gesture never trigger a second jump
    let wheelCooldown: ReturnType<typeof setTimeout>;
    let coolingDown = false;

    const handleWheel = (e: WheelEvent) => {
      // Let the WingTimeline handle its own scrolling
      if (activeTimeline) return;
      e.preventDefault();

      // If already animating OR in post-gesture cooldown, swallow the event
      if (isScrollingRef.current || coolingDown) {
        // Reset the cooldown window on every inertia tick
        clearTimeout(wheelCooldown);
        wheelCooldown = setTimeout(() => { coolingDown = false; }, 200);
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToSection(currentSectionRef.current + direction);

      // Start cooldown to absorb the remaining inertia events from this gesture
      coolingDown = true;
      wheelCooldown = setTimeout(() => { coolingDown = false; }, 200);
    };

    // Also handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTimeline) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSectionRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSectionRef.current - 1);
      }
    };

    // Touch support for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (activeTimeline) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) { // Minimum swipe threshold
        scrollToSection(currentSectionRef.current + (deltaY > 0 ? 1 : -1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollToSection, activeTimeline]);

  // --- Throttled scroll position tracker (for visual state like progress dots) ---
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const rawIndex = Math.round(window.scrollY / vh);
        const clampedIndex = Math.min(Math.max(rawIndex, 0), WINGS.length);
        setActiveSectionIndex(clampedIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [activeTimeline]); // Re-bind observer if timeline closes and DOM updates

  useEffect(() => {
    document.body.style.overflow = activeTimeline ? 'hidden' : 'auto';
    document.documentElement.style.overflow = activeTimeline ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [activeTimeline]);

  if (loading) {
    return <LoadingSplash onComplete={() => setLoading(false)} />;
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#000000',
        position: 'relative',
        display: 'block'
      }}>
      {/* Global Cursor Ripple Shader */}
      <CursorTrail />

      {/* Progress Indicator (Global) */}
      <div style={{
        position: 'fixed',
        left: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: activeSectionIndex > 0 ? 'flex' : 'none', // Hide completely on Hero
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
        opacity: activeTimeline ? 0 : 1, // Hide during deep dives
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none'
      }}>
        {/* We have 6 Wings, so 6 total dots */}
        {WINGS.map((wing, i) => {
          const isActive = activeSectionIndex === i + 1;
          const color = wing.color;
          return (
            <div
              key={`progress-${i}`}
              style={{
                width: 2,
                height: isActive ? 32 : 12,
                background: isActive ? color : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 1,
                boxShadow: isActive ? `0 0 10px ${color}` : 'none',
              }}
            />
          );
        })}

        {/* Numeric Tracker */}
        <div style={{
          marginTop: 16,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}>
          {String(Math.min(activeSectionIndex, 6)).padStart(2, '0')} / 06
        </div>
      </div>

      <div className="global-scroll-section" data-section-index="0">
        <HeroPage />
      </div>

      {/* 2. The Wings Engine (Sequentially renders Wing sections natively into the scroll flow) */}
      <WingsEngine onWingEnter={setActiveTimeline} activeIndex={activeSectionIndex} activeTimeline={activeTimeline} />

      {/* 4. Active Timeline Overlay (Slides in over everything when a Wing is clicked) */}
      {activeTimeline && (
        <WingTimeline
          wingId={activeTimeline}
          onClose={() => setActiveTimeline(null)}
        />
      )}
    </div>
  );
};

export default App;
