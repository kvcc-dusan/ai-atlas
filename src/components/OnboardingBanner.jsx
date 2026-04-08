import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkills } from '../hooks/useData';

const DISMISSED_KEY = 'ai-playbook-onboarding-dismissed';
const ESSENTIAL_IDS = [4, 2, 10];

export default function OnboardingBanner() {
    const [dismissed, setDismissed] = useState(() => {
        return localStorage.getItem(DISMISSED_KEY) === 'true';
    });
    const { data: allSkills } = useSkills();
    const navigate = useNavigate();

    if (dismissed) return null;

    const essentials = ESSENTIAL_IDS
        .map((id) => allSkills?.find((s) => s.id === id))
        .filter(Boolean);

    if (!essentials.length) return null;

    const handleDismiss = () => {
        localStorage.setItem(DISMISSED_KEY, 'true');
        setDismissed(true);
    };

    const handleSkillClick = (id) => {
        navigate(`/skills/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="onboarding-banner">
            <div className="container">
                <div className="onboarding-inner">
                    <div className="onboarding-header">
                        <div className="onboarding-badge">
                            <span className="onboarding-badge-dot" />
                            <span>Getting Started</span>
                        </div>
                        <button className="onboarding-dismiss" onClick={handleDismiss} aria-label="Dismiss">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <div className="onboarding-text">
                        <h2 className="onboarding-label">New here? Start with the essentials.</h2>
                        <p className="onboarding-desc">These 3 skills build the foundation for everything else in the playbook.</p>
                    </div>
                    <div className="onboarding-cards">
                        {essentials.map((s, i) => (
                            <button
                                key={s.id}
                                className="onboarding-card"
                                onClick={() => handleSkillClick(s.id)}
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <span className="onboarding-card-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="onboarding-title">{s.title}</span>
                                <span className="onboarding-card-desc">{s.brief}</span>
                                <span className="onboarding-card-cta">
                                    Read skill
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                    </svg>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
