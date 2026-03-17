import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skills } from '../data';

const DISMISSED_KEY = 'ai-playbook-onboarding-dismissed';
const ESSENTIAL_IDS = [4, 2, 10];

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
                    <div className="onboarding-text">
                        <span className="onboarding-label">New here?</span>
                        <span className="onboarding-desc">Start with these 3 essential skills</span>
                    </div>
                    <div className="onboarding-cards">
                        {essentials.map((s) => (
                            <button
                                key={s.id}
                                className="onboarding-card"
                                onClick={() => handleSkillClick(s.id)}
                            >
                                <span className="onboarding-chapter">{s.chapter}</span>
                                <span className="onboarding-title">{s.title}</span>
                                <span className="onboarding-card-desc">{s.brief}</span>
                            </button>
                        ))}
                    </div>
                    <button className="onboarding-dismiss" onClick={handleDismiss} aria-label="Dismiss">
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}
