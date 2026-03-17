import React from 'react';

export default function SkillCard({ skill, onClick, onToolClick }) {
    const handleToolClick = (e, tool) => {
        e.stopPropagation();
        onToolClick(tool);
    };

    return (
        <div
            className={`skill-card ${skill.hasDetail ? '' : 'no-detail'} ${skill.status === 'coming-soon' ? 'coming-soon' : ''}`}
            onClick={skill.hasDetail ? onClick : undefined}
        >
            <div className="card-top">
                <div className="card-top-left">
                    <span className="card-chapter">{skill.chapter}</span>
                    <span className="card-category">{skill.category}</span>
                </div>
            </div>

            <h3 className="card-title">{skill.title}</h3>
            <p className="card-brief">{skill.brief}</p>

            <div className="card-footer">
                <div className="card-tools">
                    {skill.tools.map((tool) => (
                        <span
                            key={tool}
                            className="card-tool-tag clickable"
                            onClick={(e) => handleToolClick(e, tool)}
                            title={`View ${tool} in Tools`}
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
