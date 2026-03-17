import React from 'react';
import { navItems } from '../data';
import DarkIcon from '../assets/icons/dark.svg';
import LightIcon from '../assets/icons/light.svg';
import InovaLogo from '../assets/inova.svg';

export default function Header({ activeNav, onNavClick, isDark, onThemeToggle, onOpenPalette }) {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="header-logo">
                    <img src={InovaLogo} alt="INOVA" className="header-logo-img" />
                </div>
                <nav className="header-nav">
                    <button className="cmd-trigger" onClick={onOpenPalette} aria-label="Open search">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="cmd-trigger-label">Search</span>
                        <kbd className="cmd-trigger-kbd">⌘K</kbd>
                    </button>

                    {navItems.map((item) => (
                        <button
                            key={item}
                            className="header-nav-item"
                            onClick={() => onNavClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        className="theme-toggle"
                        onClick={onThemeToggle}
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-label="Toggle theme"
                    >
                        <img src={isDark ? DarkIcon : LightIcon} alt="Theme Toggle" className="nav-icon theme-icon theme-svg" />
                    </button>
                </nav>
            </div>
        </header>
    );
}
