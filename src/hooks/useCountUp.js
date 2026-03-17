import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 1200, startOnMount = false) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (startOnMount) {
            setHasStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasStarted, startOnMount]);

    useEffect(() => {
        if (!hasStarted) return;

        const endVal = typeof end === 'string' ? parseInt(end, 10) : end;
        if (isNaN(endVal)) return;

        let startTime = null;
        let animationFrame;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            setCount(Math.round(easedProgress * endVal));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [hasStarted, end, duration]);

    return { count, ref };
}
