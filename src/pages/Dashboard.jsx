import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { DEFAULT_ROADMAP } from '../data/defaultRoadmap';
import MentorChat from '../components/MentorChat';
import Topnav from '../components/Topnav';

export default function Dashboard() {
  const navigate = useNavigate();
  const { roadmap: ctxRoadmap, setRoadmap, userData } = useApp();
  const [blocks, setBlocks] = useState(ctxRoadmap || DEFAULT_ROADMAP);

  // Selected day in the Lollipop Chart
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Tuesday
  const [selectedSprintFilter, setSelectedSprintFilter] = useState('Sprint 1');
  const [activeNavTab, setActiveNavTab] = useState('overview');
  const [chatOpen, setChatOpen] = useState(false);

  // Study hours logged per day in current sprint
  const studyDays = [
    { label: 'S', hours: 2.0, value: '2.0 hrs', height: 44 },
    { label: 'M', hours: 3.5, value: '3.5 hrs', height: 62 },
    { label: 'T', hours: 4.5, value: '4.5 hrs', height: 86 },
    { label: 'W', hours: 3.0, value: '3.0 hrs', height: 55 },
    { label: 'T', hours: 5.0, value: '5.0 hrs', height: 92 },
    { label: 'F', hours: 2.5, value: '2.5 hrs', height: 48 },
    { label: 'S', hours: 1.5, value: '1.5 hrs', height: 35 },
  ];

  // Mentors tailored for PathForward
  const mentors = [
    {
      name: 'Alex Chen',
      role: 'Full Stack & System Architect',
      tag: 'Senior',
      badgeClass: 'ref-pill-senior',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      prompt: "Hi Alex, can you review my approach to building a responsive portfolio page in Week 1?",
    },
    {
      name: 'Elena Rostova',
      role: 'Career Strategist & Tech Recruiter',
      tag: 'Mentor',
      badgeClass: 'ref-pill-middle',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      prompt: "Hi Elena, what are hiring managers looking for in an entry-level frontend developer's GitHub in 2026?",
    },
  ];

  // Dynamic calculations from real roadmap state (memoized for efficiency)
  const totalTasks = useMemo(() => blocks.reduce((s, b) => s + b.tasks.length, 0), [blocks]);
  const doneTasks = useMemo(() => blocks.reduce((s, b) => s + b.tasks.filter(t => t.done).length, 0), [blocks]);
  const completionPct = useMemo(() => totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0, [totalTasks, doneTasks]);
  const activeBlock = useMemo(() => blocks.find(b => b.active) || blocks[0], [blocks]);
  const hoursLogged = useMemo(() => 12 + (doneTasks * 6), [doneTasks]);
  const skillsMastered = useMemo(() => Math.max(2, Math.floor(doneTasks * 1.5) + 2), [doneTasks]);

  // Toggle tasks inside roadmap
  const toggleTask = (blockId, taskId) => {
    const next = blocks.map(b =>
      b.id === blockId ? { ...b, tasks: b.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) } : b
    );
    setBlocks(next);
    if (setRoadmap) setRoadmap(next);
  };

  // Equalizer ticks: represents continuous coding/study streak activity
  const equalizerLines = [
    { height: 16, type: 'normal' },
    { height: 22, type: 'normal' },
    { height: 18, type: 'normal' },
    { height: 28, type: 'normal' },
    { height: 24, type: 'normal' },
    { height: 30, type: 'normal' },
    { height: 20, type: 'normal' },
    { height: 26, type: 'normal' },
    { height: 22, type: 'normal' },
    { height: 32, type: 'normal' },
    { height: 20, type: 'normal' },
    { height: 24, type: 'normal' },
    // Active high-focus sprint days (orange/coral cluster)
    { height: 34, type: 'accent' },
    { height: 40, type: 'accent' },
    { height: 32, type: 'accent' },
    { height: 38, type: 'accent' },
    { height: 30, type: 'accent' },
    { height: 36, type: 'accent' },
    { height: 28, type: 'accent' },
    { height: 34, type: 'accent' },
    // Following weeks
    { height: 24, type: 'normal' },
    { height: 28, type: 'normal' },
    { height: 22, type: 'normal' },
    { height: 30, type: 'normal' },
    { height: 26, type: 'normal' },
    { height: 32, type: 'normal' },
    { height: 25, type: 'normal' },
    { height: 29, type: 'normal' },
    { height: 21, type: 'normal' },
    { height: 27, type: 'normal' },
    { height: 19, type: 'normal' },
    { height: 25, type: 'normal' },
    { height: 22, type: 'normal' },
    { height: 28, type: 'normal' },
    { height: 20, type: 'normal' },
    { height: 25, type: 'normal' },
  ];

  return (
    <div className="ref-outer-viewport">
      <div className="ref-app-frame">
        {/* Top Navbar */}
        <Topnav activeTab={activeNavTab} onTabChange={setActiveNavTab} />

        {/* Main Dashboard Grid */}
        <div className="ref-dashboard-body">
          {/* ═════════ TOP ROW ═════════ */}
          <div className="ref-top-row">

            {/* ── CARD 1: Roadmap Tracker (was Income Tracker) ── */}
            <div className="ref-card ref-tracker-card">
              <div className="ref-card-header">
                <div className="ref-title-group">
                  <div className="ref-header-icon-squircle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f25a38" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <h2 className="ref-main-card-title">Sprint Velocity</h2>
                </div>

                <div
                  className="ref-pill-dropdown"
                  onClick={() => setSelectedSprintFilter(selectedSprintFilter === 'Sprint 1' ? 'Sprint 2' : 'Sprint 1')}
                  title="Switch sprint filter"
                >
                  <span>{selectedSprintFilter}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              <p className="ref-card-desc">
                Track daily focus hours and milestone velocity toward your 90-day career objective.
              </p>

              {/* Chart & Stat Area */}
              <div className="ref-tracker-content">
                <div className="ref-tracker-stat-box">
                  <div className="ref-large-percent">+{Math.max(18, completionPct)}%</div>
                  <p className="ref-stat-subtext">This week's milestone pace is 24% higher than average</p>
                </div>

                {/* Lollipop Pin Bar Chart */}
                <div className="ref-lollipop-chart">
                  {studyDays.map((d, idx) => {
                    const isSelected = idx === selectedDayIndex;
                    return (
                      <div
                        key={idx}
                        className={`ref-lollipop-col ${isSelected ? 'selected-col' : ''}`}
                        onClick={() => setSelectedDayIndex(idx)}
                        title={`${d.label}: ${d.value}`}
                      >
                        {/* Selected Capsule background & Tooltip */}
                        {isSelected && (
                          <div className="ref-selected-capsule-bg">
                            <div className="ref-floating-tooltip">
                              {d.value}
                            </div>
                          </div>
                        )}

                        {/* Vertical Stem with Head Dot */}
                        <div className="ref-lollipop-stem-wrap">
                          <div className="ref-lollipop-head-dot" />
                          <div
                            className="ref-lollipop-stem-line"
                            style={{ height: `${d.height}%` }}
                          />
                        </div>

                        {/* Bottom Day Bubble */}
                        <div className={`ref-day-circle ${isSelected ? 'active-day-circle' : ''}`}>
                          {d.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── CARD 2: Your 90-Day Sprints (was Your Recent Projects) ── */}
            <div className="ref-card ref-projects-card">
              <div className="ref-card-header">
                <h3 className="ref-section-title">Your 90-Day Sprints</h3>
                <button className="ref-text-link" onClick={() => navigate('/intake')}>
                  Customize Plan →
                </button>
              </div>

              <div className="ref-projects-list">
                {/* Sprint 1: Featured / Active Sprint */}
                <div className="ref-project-item ref-project-featured">
                  <div className="ref-project-icon-box ref-icon-orange">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>

                  <div className="ref-project-body">
                    <div className="ref-project-heading-line">
                      <span className="ref-project-name">{activeBlock?.title || 'Foundations & Modern Frontend'}</span>
                      <span className="ref-status-badge ref-badge-paid">Active Sprint</span>
                    </div>
                    <div className="ref-project-rate">{activeBlock?.label || 'Wk 1–2'} · {userData?.hours || '20'} hrs/week target</div>

                    <div className="ref-project-tags">
                      <span className="ref-tag-pill">HTML & CSS</span>
                      <span className="ref-tag-pill">Git & GitHub</span>
                      <span className="ref-tag-pill">Portfolio v1</span>
                    </div>

                    <p className="ref-project-description">
                      {activeBlock?.milestone || 'Master core semantics, modern CSS layout, and publish your first live portfolio project.'}
                    </p>

                    {/* Interactive task checklist directly in the card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
                      {activeBlock?.tasks.map(task => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(blocks[0].id, task.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            cursor: 'pointer',
                            fontSize: 11.5,
                            color: task.done ? '#9ca3af' : '#374151',
                            textDecoration: task.done ? 'line-through' : 'none',
                          }}
                        >
                          <div style={{
                            width: 15,
                            height: 15,
                            borderRadius: 4,
                            border: task.done ? '1.5px solid #10b981' : '1.5px solid #cbd5e1',
                            background: task.done ? '#10b981' : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 9,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}>
                            {task.done ? '✓' : ''}
                          </div>
                          <span>{task.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="ref-project-footer">
                      <a
                        href={blocks[0]?.resource.url || 'https://www.freecodecamp.org/'}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#f25a38', fontWeight: 600, textDecoration: 'none' }}
                      >
                        📚 {blocks[0]?.resource.name || 'FreeCodeCamp Resource'} ↗
                      </a>
                      <span>{blocks[0]?.tasks.filter(t => t.done).length} / {blocks[0]?.tasks.length} done</span>
                    </div>
                  </div>

                  <button className="ref-round-action-btn" aria-label="Edit Sprint 1 milestones" onClick={() => navigate('/intake')} title="Edit Sprint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>

                {/* Sprint 2: Upcoming */}
                <div className="ref-project-item ref-project-compact">
                  <div className="ref-project-icon-box ref-icon-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>

                  <div className="ref-project-body">
                    <div className="ref-project-heading-line">
                      <span className="ref-project-name">{blocks[1]?.title || 'JavaScript Fundamentals & DOM'}</span>
                      <span className="ref-status-badge ref-badge-notpaid">Wk 3–4</span>
                    </div>
                    <div className="ref-project-rate">Milestone: Interactive DOM apps & state logic</div>
                  </div>

                  <button className="ref-round-action-btn" aria-label="View JavaScript Fundamentals sprint" onClick={() => navigate('/intake')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>

                {/* Sprint 3: Planned */}
                <div className="ref-project-item ref-project-compact">
                  <div className="ref-project-icon-box ref-icon-blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12a4 4 0 1 0 8 0"/>
                    </svg>
                  </div>

                  <div className="ref-project-body">
                    <div className="ref-project-heading-line">
                      <span className="ref-project-name">{blocks[2]?.title || 'Async APIs & Fullstack React'}</span>
                      <span className="ref-status-badge ref-badge-notpaid">Wk 5–6</span>
                    </div>
                    <div className="ref-project-rate">Milestone: Real-world API integration & state containers</div>
                  </div>

                  <button className="ref-round-action-btn" aria-label="View Async APIs sprint" onClick={() => navigate('/intake')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ═════════ BOTTOM ROW ═════════ */}
          <div className="ref-bottom-row">

            {/* ── CARD 3: AI Career Advisors (was Let's Connect) ── */}
            <div className="ref-card ref-connect-card">
              <div className="ref-card-header">
                <h3 className="ref-section-title">Your Mentor Team</h3>
                <button className="ref-text-link" onClick={() => setChatOpen(true)}>
                  Chat Now
                </button>
              </div>

              <div className="ref-connect-list">
                {mentors.map((m) => (
                  <div key={m.name} className="ref-connect-row">
                    <div className="ref-connect-avatar-img">
                      <img src={m.avatar} alt={m.name} />
                    </div>
                    <div className="ref-connect-meta">
                      <div className="ref-connect-name-row">
                        <span className="ref-person-name">{m.name}</span>
                        <span className={m.badgeClass}>{m.tag}</span>
                      </div>
                      <span className="ref-person-sub">{m.role}</span>
                    </div>
                    <button
                      className="ref-round-action-btn"
                      title="Ask mentor a question"
                      onClick={() => setChatOpen(true)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CARD 4: AI Career Intelligence (was Unlock Premium Features) ── */}
            <div className="ref-card ref-premium-card">
              <div className="ref-radial-mesh-bg" />

              <div className="ref-premium-content">
                <h4 className="ref-premium-title">AI Career Intelligence</h4>
                <p className="ref-premium-desc">
                  Powered by Google Gemini: dynamic roadmap recalculation, continuous ATS benchmarking, and mock interviews.
                </p>

                <div className="ref-upgrade-pill-btn" onClick={() => navigate('/intake')}>
                  <span>Configure Gemini AI</span>
                  <div className="ref-pill-arrow-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b313d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 5: Milestone Progress (was Proposal Progress) ── */}
            <div className="ref-card ref-proposals-card">
              <div className="ref-card-header">
                <h3 className="ref-section-title">Milestone Velocity</h3>
                <div className="ref-date-dropdown">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Day 14 of 90</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              {/* Three Stat Columns: Reacting live to user tasks */}
              <div className="ref-proposal-stats-row">
                <div className="ref-prop-col">
                  <span className="ref-prop-sublabel">Tasks Done</span>
                  <div className="ref-prop-bignum">{doneTasks}<span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>/{totalTasks}</span></div>
                </div>
                <div className="ref-prop-col-divider" />

                <div className="ref-prop-col">
                  <span className="ref-prop-sublabel">Hours Logged</span>
                  <div className="ref-prop-bignum">{hoursLogged}h</div>
                </div>
                <div className="ref-prop-col-divider" />

                <div className="ref-prop-col">
                  <span className="ref-prop-sublabel">Skills Mastered</span>
                  <div className="ref-prop-bignum">{skillsMastered}</div>
                </div>
              </div>

              {/* Barcode / Equalizer Wave Chart representing study streak */}
              <div className="ref-equalizer-container" title="Continuous daily learning streak">
                {equalizerLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`ref-equalizer-bar ${line.type === 'accent' ? 'bar-accent' : 'bar-normal'}`}
                    style={{ height: `${line.height}px` }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Floating Mentor Chat Drawer */}
        <MentorChat blocks={blocks} initialOpen={chatOpen} />
      </div>
    </div>
  );
}
