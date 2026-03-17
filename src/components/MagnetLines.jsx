import { useRef, useEffect } from 'react';

export default function MagnetLines({ rows = 12, columns = 24, lineColor = 'currentColor', lineWidth = 1, lineHeight = 24, isDark = false }) {
    const containerRef = useRef(null);
    const prevAngles = useRef([]);
    const cumAngles = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spans = Array.from(container.querySelectorAll('span'));

        // Initialise per-line state
        prevAngles.current = new Array(spans.length).fill(0);
        cumAngles.current = new Array(spans.length).fill(0);

        const onPointerMove = (e) => {
            spans.forEach((span, i) => {
                const rect = span.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const raw = Math.atan2(dy, dx) * (180 / Math.PI);

                // Shortest-path delta to avoid 360° wrap spin
                let delta = raw - prevAngles.current[i];
                if (delta > 180) delta -= 360;
                if (delta < -180) delta += 360;

                cumAngles.current[i] += delta;
                prevAngles.current[i] = raw;

                span.style.setProperty('--rotate', `${cumAngles.current[i]}deg`);
            });
        };

        const onPointerLeave = () => {
            spans.forEach((span, i) => {
                // Snap cumulative back toward 0 via shortest path
                let target = cumAngles.current[i] % 360;
                if (target > 180) target -= 360;
                if (target < -180) target += 360;
                cumAngles.current[i] = target;
                prevAngles.current[i] = target;
                span.style.setProperty('--rotate', '0deg');
            });
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerleave', onPointerLeave);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', onPointerLeave);
        };
    }, [rows, columns]);

    const color = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)';

    const totalLines = rows * columns;

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            {Array.from({ length: totalLines }).map((_, i) => (
                <span
                    key={i}
                    style={{
                        display: 'block',
                        width: `${lineWidth}px`,
                        height: `${lineHeight}px`,
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
