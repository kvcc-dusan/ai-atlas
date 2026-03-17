import React from 'react';

export default function Icon({ src, className = '', style = {}, ...props }) {
    return (
        <span
            className={`dyn-icon ${className}`}
            style={{
                WebkitMaskImage: `url('${src}')`,
                maskImage: `url('${src}')`,
                ...style
            }}
            role="img"
            {...props}
        />
    );
}
