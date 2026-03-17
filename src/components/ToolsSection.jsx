import React from 'react';
import { useTools } from '../hooks/useData';

export function ToolTag({ tool, onClick }) {
    return (
        <span
            className={`card-tool-tag ${onClick ? 'clickable' : ''}`}
            onClick={(e) => onClick && onClick(e, tool)}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {tool}
        </span>
    );
}

export default function ToolsSection({ highlightTool }) {
    const { data: toolsData, loading } = useTools();

    return (
        <section className="section tools-section-wrap" id="tools-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Tools</h2>
                    <span className="section-count">{loading ? '…' : `${toolsData?.length ?? 0} evaluated`}</span>
                </div>

                <div className="tools-compact-table">
                    {loading ? (
                        <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>Loading tools…</p>
                    ) : toolsData?.map((tool) => {
                        const isHighlighted = highlightTool && tool.name.toLowerCase().includes(highlightTool.toLowerCase());

                        return (
                            <div
                                key={tool.id}
                                className={`tools-row ${isHighlighted ? 'highlighted' : ''}`}
                                id={`tool-${tool.id}`}
                            >
                                <div className="tools-col-name">
                                    <span className="status-dot active"></span>
                                    <div className="tools-col-name-text">
                                        <span className="tools-row-name">{tool.name}</span>
                                        <span className="tools-row-provider">{tool.provider}</span>
                                    </div>
                                </div>
                                <span className="tools-col-category">
                                    <span className="card-category">{tool.category}</span>
                                </span>
                                <span className="tools-col-desc">{tool.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
