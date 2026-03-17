import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skills } from '../data';

const DISMISSED_KEY = 'ai-playbook-onboarding-dismissed';
const ESSENTIAL_IDS = [4, 2, 10];

const CARD_ICONS = {
    4: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
    ),
    2: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
    ),
    10: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    ),
};

export default function OnboardingBanner() {
    const [dismissed, setDismissed] = useState(() => {
        return localStorage.getItem(DISMISSED_KEY) === 'true';
    });
    const navigate = useNavigate();

    if (dismissed) return null;

    const essentials = ESSENTIAL_IDS
        .map((id) => skills.find((s) => s.id === id))
        .filter(Boolean);

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
                                <div className="onboarding-card-icon">
                                    {CARD_ICONS[s.id]}
                                </div>
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
