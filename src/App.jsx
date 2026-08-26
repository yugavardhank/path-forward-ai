import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Lazy-loaded route chunks for optimal initial page-load efficiency
const Landing      = lazy(() => import('./pages/Landing'));
const Roadmap      = lazy(() => import('./pages/Roadmap'));
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const Intake       = lazy(() => import('./pages/Intake'));
const MentorStudio = lazy(() => import('./pages/MentorStudio'));

const RouteLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#eef2f7' }}>
    <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: '#f25a38', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Overview / Problem & Solution Pitch */}
            <Route path="/" element={<Landing />} />

            {/* Complete 90-Day Trajectory (6 Sprints · 12 Weeks) */}
            <Route path="/roadmap" element={<Roadmap />} />

            {/* Sprint Velocity & Analytics Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Resume Parsing & Goal Setup */}
            <Route path="/intake" element={<Intake />} />

            {/* Full-Screen AI Mentor Studio */}
            <Route path="/mentor" element={<MentorStudio />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}
