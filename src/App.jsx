import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Roadmap from './pages/Roadmap';
import Dashboard from './pages/Dashboard';
import Intake from './pages/Intake';
import MentorStudio from './pages/MentorStudio';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}
