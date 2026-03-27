import React from 'react';
import { useTools } from '../hooks/useData';

export function ToolTag({ tool, onClick }) {
    return (
        <span
            className={`card-tool-tag ${onClick ? 'clickable' : ''}`}
            onClick={(e) => onClick && onClick(e, tool)}
            onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(e, tool); } }}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {tool}
        </span>
    );
}

export default function ToolsSection({ highlightTool, onToolClick }) {
    const { data: toolsData, loading } = useTools();

    return (
        <section className="section tools-section-wrap" id="tools-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Tools</h2>
                    <span className="section-count">{loading ? '…' : `${toolsData?.length ?? 0} evaluated`}</span>
                </div>

                <div className="tools-list">
                    {loading ? (
                        <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>Loading tools…</p>
                    ) : toolsData?.map((tool, i) => {
                        const isHighlighted = highlightTool && tool.name.toLowerCase().includes(highlightTool.toLowerCase());

                        return (
                            <div
                                key={tool.id}
                                className={`tools-item ${isHighlighted ? 'highlighted' : ''}`}
                                id={`tool-${tool.id}`}
                                onClick={() => onToolClick?.(tool.name)}
                                style={{ animationDelay: `${i * 35}ms` }}
                            >
                                <div className="tools-item-left">
                                    <span className="tools-item-index">{String(i + 1).padStart(2, '0')}</span>
                                    <div className="tools-item-logo">
                                        {tool.logoUrl
                                            ? <img src={tool.logoUrl} alt={tool.name} />
                                            : <span className="tools-item-logo-fallback">{tool.name.charAt(0)}</span>
                                        }
                                    </div>
                                    <div className="tools-item-identity">
                                        <span className="tools-item-name">{tool.name}</span>
                                        <span className="tools-item-provider">{tool.provider}</span>
                                    </div>
                                    <span className="tools-item-category">{tool.category}</span>
                                </div>
                                <p className="tools-item-desc">{tool.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
