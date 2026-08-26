import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Topnav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="ref-nav">
      {/* Left: Brand Logo */}
      <div className="ref-logo" role="button" tabIndex={0} aria-label="PathForward Home" onClick={() => navigate('/')} onKeyDown={(e) => e.key === 'Enter' && navigate('/')}>
        <div className="ref-logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#f25a38" strokeWidth="2.5" />
            <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C14.2 18 16.1 16.8 17.1 15" stroke="#f25a38" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.5" fill="#f25a38" />
          </svg>
        </div>
        <span className="ref-logo-text">PathForward</span>
      </div>

      {/* Center: Navigation Links with clean responsive labels */}
      <nav className="ref-nav-links" aria-label="Main Navigation">
        <button
          className={`ref-nav-link ${path === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          Overview
        </button>
        <button
          className={`ref-nav-link ${path === '/roadmap' ? 'active' : ''}`}
          onClick={() => navigate('/roadmap')}
        >
          Roadmap
        </button>
        <button
          className={`ref-nav-link ${path === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`ref-nav-link ${path === '/intake' ? 'active' : ''}`}
          onClick={() => navigate('/intake')}
        >
          Resume & Goals
        </button>
        <button
          className={`ref-nav-link ${path === '/mentor' ? 'active' : ''}`}
          onClick={() => navigate('/mentor')}
        >
          AI Mentor
        </button>
      </nav>

      {/* Right: Search & Action Area */}
      <div className="ref-nav-right-cluster">
        <div className="ref-search-wrap">
          <input
            type="text"
            className="ref-search-input"
            placeholder="Search milestones..."
            aria-label="Search roadmap milestones"
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/roadmap');
            }}
          />
          <button className="ref-search-btn" aria-label="Submit search query" onClick={() => navigate('/roadmap')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>

        {/* CTA only shown when not on intake */}
        {path !== '/intake' && (
          <button
            className="ref-nav-cta-btn"
            aria-label="Build customized 90-day plan"
            onClick={() => navigate('/intake')}
          >
            <span>Build Plan →</span>
          </button>
        )}

        {/* User Profile Avatar */}
        <div
          className="ref-user-avatar"
          role="button"
          tabIndex={0}
          aria-label="User Profile and Goals setup"
          onClick={() => navigate('/intake')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/intake')}
          title="Profile & Goals"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User profile avatar"
            width="34"
            height="34"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </header>
  );
}
