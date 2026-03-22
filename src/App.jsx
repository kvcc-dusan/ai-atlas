import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSkills } from './hooks/useData';
import { useTheme } from './hooks/useTheme';
import { useAnalytics } from './hooks/useAnalytics';
import Header from './components/Header';
import Hero from './components/Hero';
import CardGrid from './components/CardGrid';
import ToolsSection from './components/ToolsSection';
import DetailView from './components/DetailView';
import UpdateDetailView from './components/UpdateDetailView';
import UpdatesFeed from './components/UpdatesFeed';
import OnboardingBanner from './components/OnboardingBanner';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import AdminLogin from './admin/AdminLogin';
import SkillsAdmin from './admin/SkillsAdmin';
import SkillForm from './admin/SkillForm';
import ToolsAdmin from './admin/ToolsAdmin';
import ToolForm from './admin/ToolForm';
import UpdatesAdmin from './admin/UpdatesAdmin';
import UpdateForm from './admin/UpdateForm';
import SitePreview from './admin/SitePreview';
import ProtectedRoute from './admin/ProtectedRoute';

function HomePage({ skills, onCardClick, onToolClick, onUpdateClick, highlightTool, isDark }) {
  return (
    <>
      <Hero isDark={isDark} />
      <OnboardingBanner />
      <CardGrid
        skills={skills ?? []}
        onCardClick={onCardClick}
        onToolClick={onToolClick}
      />
      <ToolsSection highlightTool={highlightTool} />
      <UpdatesFeed onUpdateClick={onUpdateClick} />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: skills } = useSkills();
  const [activeNav, setActiveNav] = useState('SKILLS');
  const [highlightTool, setHighlightTool] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDark, toggleTheme] = useTheme();
  const analytics = useAnalytics();

  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/skills/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateClick = (id) => {
    navigate(`/updates/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (location.pathname.startsWith('/updates/')) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('updates-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (item) => {
    setHighlightTool(null);

    if (!isHome) {
      navigate('/');
    }

    const sectionMap = {
      Skills: 'skills-section',
      Tools: 'tools-section',
      Articles: 'updates-section'
    };

    const sectionId = sectionMap[item];
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/skills/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolClick = (toolName) => {
    if (!isHome) {
      navigate('/');
    }

    setHighlightTool(toolName);
    setActiveNav('TOOLS');

    setTimeout(() => {
      const el = document.getElementById('tools-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightTool(null), 2000);
    }, 150);
  };

  return (
    <>
      {!isAdmin && (
        <Header
          activeNav={activeNav}
          onNavClick={handleNavClick}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              skills={skills}
              onCardClick={handleCardClick}
              onToolClick={handleToolClick}
              onUpdateClick={handleUpdateClick}
              highlightTool={highlightTool}
              isDark={isDark}
            />
          }
        />
        <Route
          path="/skills/:id"
          element={
            <DetailView
              onBack={handleBack}
              onNavigate={handleNavigate}
              onToolClick={handleToolClick}
            />
          }
        />
        <Route
          path="/updates/:id"
          element={
            <UpdateDetailView
              onBack={handleBack}
              onSkillClick={handleCardClick}
            />
          }
        />
        {/* Admin routes — no public header/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/skills" replace />} />
        <Route path="/admin/skills" element={<ProtectedRoute><SkillsAdmin /></ProtectedRoute>} />
        <Route path="/admin/skills/:id" element={<ProtectedRoute><SkillForm /></ProtectedRoute>} />
        <Route path="/admin/tools" element={<ProtectedRoute><ToolsAdmin /></ProtectedRoute>} />
        <Route path="/admin/tools/:id" element={<ProtectedRoute><ToolForm /></ProtectedRoute>} />
        <Route path="/admin/updates" element={<ProtectedRoute><UpdatesAdmin /></ProtectedRoute>} />
        <Route path="/admin/updates/:id" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
        <Route path="/admin/preview" element={<ProtectedRoute><SitePreview /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onSkillClick={handleCardClick}
          onUpdateClick={handleUpdateClick}
          onToolClick={handleToolClick}
        />
      )}
    </>
  );
}
