import React, { useState, useEffect } from 'react';
import { navItems } from '../data';
import DarkIcon from '../assets/icons/dark.svg';
import LightIcon from '../assets/icons/light.svg';
import InovaLogo from '../assets/inova.svg';

export default function Header({ activeNav, onNavClick, isDark, onThemeToggle, onOpenPalette }) {
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
                <div className="header-logo">
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
                        <img src={isDark ? DarkIcon : LightIcon} alt="Theme Toggle" className="nav-icon theme-icon theme-svg" />
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
                            className={`mobile-menu-item ${activeNav === item ? 'active' : ''}`}
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
                        <img src={isDark ? DarkIcon : LightIcon} alt="" className="nav-icon theme-icon theme-svg" />
                        <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
