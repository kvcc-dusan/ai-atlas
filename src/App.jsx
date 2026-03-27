import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSkills, useTools, useUpdates } from './hooks/useData';
import { useTheme } from './hooks/useTheme';
import { useAnalytics } from './hooks/useAnalytics';
import { useReadSkills } from './hooks/useReadSkills';
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
import ToolDrawer from './components/ToolDrawer';
import PromptsPage from './components/PromptsPage';
import ErrorBoundary from './components/ErrorBoundary';

// Admin — lazy loaded, excluded from initial bundle
const AdminLogin    = lazy(() => import('./admin/AdminLogin'));
const SkillsAdmin   = lazy(() => import('./admin/SkillsAdmin'));
const SkillForm     = lazy(() => import('./admin/SkillForm'));
const ToolsAdmin    = lazy(() => import('./admin/ToolsAdmin'));
const ToolForm      = lazy(() => import('./admin/ToolForm'));
const UpdatesAdmin  = lazy(() => import('./admin/UpdatesAdmin'));
const UpdateForm    = lazy(() => import('./admin/UpdateForm'));
const SitePreview   = lazy(() => import('./admin/SitePreview'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute'));

function HomePage({ skills, onCardClick, onToolClick, onUpdateClick, highlightTool, isDark, readIds, showAllSkills, onShowAllSkills }) {
  return (
    <>
      <Hero isDark={isDark} readCount={readIds.size} totalSkills={skills?.length ?? 0} />
      <OnboardingBanner />
      <CardGrid
        skills={skills ?? []}
        onCardClick={onCardClick}
        onToolClick={onToolClick}
        readIds={readIds}
        showAll={showAllSkills}
        onShowAll={onShowAllSkills}
      />
      <ToolsSection highlightTool={highlightTool} onToolClick={onToolClick} />
      <UpdatesFeed onUpdateClick={onUpdateClick} />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: skills } = useSkills();
  const { data: allTools } = useTools();
  const { data: allUpdates } = useUpdates();
  const [highlightTool, setHighlightTool] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [drawerTool, setDrawerTool] = useState(null);
  const [isDark, toggleTheme] = useTheme();
  const analytics = useAnalytics();
  const { readIds, markRead } = useReadSkills();

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

    if (item === 'Prompts') {
      navigate('/prompts');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
    const tool = allTools?.find(t => t.name.toLowerCase() === toolName.toLowerCase());
    if (tool) {
      setDrawerTool(tool);
    }
  };


  return (
    <>
      {!isAdmin && (
        <Header
          onNavClick={handleNavClick}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />
      )}

      <ErrorBoundary>
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
              readIds={readIds}
              showAllSkills={showAllSkills}
              onShowAllSkills={() => setShowAllSkills(true)}
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
              markRead={markRead}
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
        <Route
          path="/prompts"
          element={<PromptsPage onBack={() => navigate('/')} />}
        />
        {/* Admin routes — lazy loaded, not in initial bundle */}
        <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
        <Route path="/admin" element={<Navigate to="/admin/skills" replace />} />
        <Route path="/admin/skills" element={<Suspense fallback={null}><ProtectedRoute><SkillsAdmin /></ProtectedRoute></Suspense>} />
        <Route path="/admin/skills/:id" element={<Suspense fallback={null}><ProtectedRoute><SkillForm /></ProtectedRoute></Suspense>} />
        <Route path="/admin/tools" element={<Suspense fallback={null}><ProtectedRoute><ToolsAdmin /></ProtectedRoute></Suspense>} />
        <Route path="/admin/tools/:id" element={<Suspense fallback={null}><ProtectedRoute><ToolForm /></ProtectedRoute></Suspense>} />
        <Route path="/admin/updates" element={<Suspense fallback={null}><ProtectedRoute><UpdatesAdmin /></ProtectedRoute></Suspense>} />
        <Route path="/admin/updates/:id" element={<Suspense fallback={null}><ProtectedRoute><UpdateForm /></ProtectedRoute></Suspense>} />
        <Route path="/admin/preview" element={<Suspense fallback={null}><ProtectedRoute><SitePreview /></ProtectedRoute></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </ErrorBoundary>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onSkillClick={handleCardClick}
          onUpdateClick={handleUpdateClick}
          onToolClick={handleToolClick}
          liveSkills={skills}
          liveTools={allTools}
          liveUpdates={allUpdates}
        />
      )}

      <ToolDrawer
        tool={drawerTool}
        onClose={() => setDrawerTool(null)}
        skills={skills}
        onSkillClick={handleCardClick}
      />
    </>
  );
}
