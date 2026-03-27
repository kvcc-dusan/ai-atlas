import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from '../data';
import InovaLogo from '../assets/inova.svg';

function IconSun() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    );
}

function IconMoon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    );
}

export default function Header({ onNavClick, isDark, onThemeToggle, onOpenPalette }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close menu on route change / nav click
    const handleNavClick = (item) => {
        setMenuOpen(false);
        onNavClick(item);
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className="header">
            <div className="header-inner">
                <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src={InovaLogo} alt="INOVA" className="header-logo-img" />
                </div>

                {/* Desktop nav */}
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
                        {isDark ? <IconSun /> : <IconMoon />}
                    </button>
                </nav>

                {/* Mobile controls */}
                <div className="header-mobile-controls">
                    <button
                        className="mobile-search-btn"
                        onClick={onOpenPalette}
                        aria-label="Search"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <nav className="mobile-menu-nav">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            className="mobile-menu-item"
                            onClick={() => handleNavClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
                <div className="mobile-menu-footer">
                    <button
                        className="mobile-theme-toggle"
                        onClick={onThemeToggle}
                    >
                        {isDark ? <IconSun /> : <IconMoon />}
                        <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
