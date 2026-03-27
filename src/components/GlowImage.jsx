import { useState, useEffect } from 'react';

function useAverageColor(url) {
    const [color, setColor] = useState(null);
    useEffect(() => {
        if (!url) return;
        setColor(null);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 80;
                canvas.height = 80;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 80, 80);
                const { data } = ctx.getImageData(0, 0, 80, 80);
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] > 128) {
                        r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
                    }
                }
                if (count > 0) setColor({ r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) });
            } catch { /* CORS blocked — no glow */ }
        };
        img.src = url;
    }, [url]);
    return color;
}

export default function GlowImage({ url, className, style }) {
    const color = useAverageColor(url);
    const shadow = color
        ? `0 4px 40px 0 rgba(${color.r},${color.g},${color.b},0.25), 0 16px 80px 0 rgba(${color.r},${color.g},${color.b},0.12)`
        : undefined;
    return (
        <div className={className} style={{ ...style, boxShadow: shadow, transition: 'box-shadow 0.4s ease' }}>
            <img src={url} alt="" loading="lazy" crossOrigin="anonymous" />
        </div>
    );
}
