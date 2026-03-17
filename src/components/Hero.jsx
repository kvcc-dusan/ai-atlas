import React from 'react';
import { useStats } from '../hooks/useData';
import { useCountUp } from '../hooks/useCountUp';
import MagnetLines from './MagnetLines';
// FlickeringGrid hidden but kept for reference
// import { FlickeringGrid } from './FlickeringGrid';

// Light mode palette (kept for FlickeringGrid)
// const LIGHT_COLORS = ['#EDEDF0','#E4E4E7','#D4D4D8','#E1FCAD'];
// Dark mode palette (kept for FlickeringGrid)
// const DARK_COLORS = ['#141415','#1A1A1D','#27272A','#4E573F'];

function StatBlock({ stat }) {
    const { count, ref } = useCountUp(stat.value, 1400);

    return (
        <div className="hero-stat" ref={ref}>
            <span className="hero-stat-value">{count}</span>
            <span className="hero-stat-label">{stat.label}</span>
        </div>
    );
}

export default function Hero({ isDark }) {
    const { data: stats } = useStats();

    return (
        <section className="hero">
            <div className="hero-banner">
                <MagnetLines
                    rows={12}
                    columns={24}
                    lineWidth={3}
                    lineHeight={28}
                    isDark={isDark}
                />
            </div>
            <div className="container">
                <div className="hero-layout">
                    <div className="hero-left">
                        <h1 className="hero-heading">
                            <span className="hero-heading-line">Ai Atlas</span>
                        </h1>
                    </div>
                    <div className="hero-right">
                        <div className="hero-stats">
                            {stats?.map((stat) => (
                                <StatBlock key={stat.label} stat={stat} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
