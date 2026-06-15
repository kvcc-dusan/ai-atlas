import React from 'react';

export default function WorkflowCard({ workflow, onClick, onToolClick }) {
    const handleToolClick = (e, tool) => {
        e.stopPropagation();
        onToolClick(tool);
    };

    const stepCount = workflow.steps?.length ?? 0;

    return (
        <div
            className={`skill-card workflow-card-mixed ${workflow.status === 'coming-soon' ? 'coming-soon' : ''}`}
            onClick={onClick}
        >
            <div className="card-top">
                <div className="card-top-left">
                    <span className="card-chapter">{workflow.number}</span>
                    <span className="card-workflow-tag">Workflow</span>
                    {workflow.difficulty && (
                        <span className={`card-difficulty card-difficulty--${workflow.difficulty.toLowerCase()}`}>
                            {workflow.difficulty}
                        </span>
                    )}
                </div>
                {workflow.isPublished === false && (
                    <div className="card-top-right">
                        <span className="card-draft-badge">Draft</span>
                    </div>
                )}
            </div>

            <h3 className="card-title">{workflow.title}</h3>
            <p className="card-brief">{workflow.description}</p>

            <div className="card-footer">
                <div className="card-tools">
                    {workflow.tools.map((tool) => (
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
                {(stepCount > 0 || workflow.estTime) && (
                    <span className="card-step-count">
                        {stepCount > 0 ? `${stepCount} steps` : ''}
                        {stepCount > 0 && workflow.estTime ? ' · ' : ''}
                        {workflow.estTime}
                    </span>
                )}
            </div>
        </div>
    );
}
