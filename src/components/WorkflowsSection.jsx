import React from 'react';
import { workflowsData } from '../data';

export default function WorkflowsSection({ onSkillClick }) {
    return (
        <section className="section" id="workflows-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Workflows</h2>
                    <span className="section-count">{workflowsData.length} templates</span>
                </div>

                <div className="workflows-grid">
                    {workflowsData.map((wf) => {
                        const isComingSoon = wf.status === 'coming-soon';

                        return (
                            <div
                                key={wf.id}
                                className={`workflow-card ${isComingSoon ? 'coming-soon' : ''}`}
                            >
                                <div className="workflow-card-top">
                                    <span className="card-chapter">{wf.number}</span>
                                    <span className="card-category">{wf.category}</span>
                                </div>

                                <h3 className="workflow-card-title">{wf.title}</h3>
                                <p className="card-brief">{wf.description}</p>

                                <div className="workflow-steps">
                                    {wf.steps.map((step, i) => (
                                        <div key={i} className="workflow-step">
                                            <span className="workflow-step-num">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="workflow-step-text">{step}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="card-footer">
                                    <div className="card-tools">
                                        {wf.tools.map((tool) => (
                                            <span key={tool} className="card-tool-tag">{tool}</span>
                                        ))}
                                    </div>
                                    <span className={`card-status ${isComingSoon ? 'coming-soon' : 'active'}`}>
                                        <span className={`status-dot ${isComingSoon ? 'coming-soon' : 'active'}`} />
                                        {isComingSoon ? 'Coming soon' : 'Active'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
