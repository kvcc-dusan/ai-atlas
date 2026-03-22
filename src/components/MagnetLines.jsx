import { useRef, useEffect, useState } from 'react';

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    );

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [breakpoint]);

    return isMobile;
}

export default function MagnetLines({ rows = 12, columns = 24, lineWidth = 1, lineHeight = 24, isDark = false }) {
    const containerRef = useRef(null);
    const prevAngles = useRef([]);
    const cumAngles = useRef([]);
    const isMobile = useIsMobile();

    const actualRows = isMobile ? 6 : rows;
    const actualCols = isMobile ? 10 : columns;
    const actualLineHeight = isMobile ? 20 : lineHeight;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spans = Array.from(container.querySelectorAll('span'));

        prevAngles.current = new Array(spans.length).fill(0);
        cumAngles.current = new Array(spans.length).fill(0);

        const updateLines = (clientX, clientY) => {
            spans.forEach((span, i) => {
                const rect = span.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = clientX - cx;
                const dy = clientY - cy;
                const raw = Math.atan2(dy, dx) * (180 / Math.PI);

                let delta = raw - prevAngles.current[i];
                if (delta > 180) delta -= 360;
                if (delta < -180) delta += 360;

                cumAngles.current[i] += delta;
                prevAngles.current[i] = raw;

                span.style.setProperty('--rotate', `${cumAngles.current[i]}deg`);
            });
        };

        let rafId = null;
        const onPointerMove = (e) => {
            if (rafId) return;
            const x = e.clientX, y = e.clientY;
            rafId = requestAnimationFrame(() => {
                updateLines(x, y);
                rafId = null;
            });
        };

        const onTouchMove = (e) => {
            const touch = e.touches[0];
            if (!touch || rafId) return;
            const x = touch.clientX, y = touch.clientY;
            rafId = requestAnimationFrame(() => {
                updateLines(x, y);
                rafId = null;
            });
        };

        const resetLines = () => {
            spans.forEach((span, i) => {
                let target = cumAngles.current[i] % 360;
                if (target > 180) target -= 360;
                if (target < -180) target += 360;
                cumAngles.current[i] = target;
                prevAngles.current[i] = target;
                span.style.setProperty('--rotate', '0deg');
            });
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerleave', resetLines);
        container.addEventListener('touchmove', onTouchMove, { passive: true });
        container.addEventListener('touchend', resetLines);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', resetLines);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', resetLines);
        };
    }, [actualRows, actualCols]);

    const color = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)';
    const totalLines = actualRows * actualCols;

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${actualCols}, 1fr)`,
                gridTemplateRows: `repeat(${actualRows}, 1fr)`,
                width: '100%',
                height: '100%',
                touchAction: 'pan-y',
            }}
        >
            {Array.from({ length: totalLines }).map((_, i) => (
                <span
                    key={i}
                    style={{
                        display: 'block',
                        width: `${lineWidth}px`,
                        height: `${actualLineHeight}px`,
                        backgroundColor: color,
                        borderRadius: `${lineWidth}px`,
                        margin: 'auto',
                        transform: 'rotate(var(--rotate, 0deg))',
                        transformOrigin: 'center',
                        willChange: 'transform',
                        transition: 'transform 0.12s ease-out',
                    }}
                />
            ))}
        </div>
    );
}
