import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { DEFAULT_ROADMAP } from '../data/defaultRoadmap';
import MentorChat from '../components/MentorChat';
import Topnav from '../components/Topnav';

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f25a38" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function Roadmap() {
  const navigate = useNavigate();
  const { roadmap: ctxRoadmap, setRoadmap, userData } = useApp();
  const [blocks, setBlocks] = useState(ctxRoadmap || DEFAULT_ROADMAP);
  const [filter, setFilter] = useState('all'); // all | active | completed

  const toggle = (bId, tId) => {
    const next = blocks.map(b =>
      b.id === bId ? { ...b, tasks: b.tasks.map(t => t.id === tId ? { ...t, done: !t.done } : t) } : b
    );
    setBlocks(next);
    if (setRoadmap) setRoadmap(next);
  };

  const total = blocks.reduce((s, b) => s + b.tasks.length, 0);
  const done = blocks.reduce((s, b) => s + b.tasks.filter(t => t.done).length, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  const filteredBlocks = blocks.filter(b => {
    const isCompleted = b.tasks.every(t => t.done);
    if (filter === 'active') return b.active;
    if (filter === 'completed') return isCompleted;
    return true;
  });

  return (
    <div className="ref-outer-viewport">
      <div className="ref-app-frame">
        <Topnav />

        {/* Header Area */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: '#ffede8', color: '#f25a38', borderRadius: 999, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
              90-DAY TRAJECTORY · 6 SPRINTS · 12 WEEKS
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e2430', letterSpacing: '-0.5px' }}>
              Your Personalized 90-Day Roadmap
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
              Target: {userData?.goal ? userData.goal.replace('_', ' ').toUpperCase() : 'ENTRY-LEVEL SOFTWARE ENGINEER'} · {userData?.hours || '20'} hrs/week target
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => navigate('/intake')}
              style={{ padding: '8px 16px', background: '#ffffff', color: '#1e2430', border: '1px solid #e2e8f0', borderRadius: 999, fontSize: 12, fontWeight: 600 }}
            >
              Re-scan Resume
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '8px 16px', background: '#1e2430', color: '#ffffff', borderRadius: 999, fontSize: 12, fontWeight: 600 }}
            >
              Sprint Dashboard →
            </button>
          </div>
        </div>

        {/* Progress Strip Card */}
        <div className="ref-card" style={{ padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600, color: '#1e2430', marginBottom: 8 }}>
              <span>Overall 90-Day Trajectory Progress</span>
              <span>{done} of {total} milestones complete ({pct}%)</span>
            </div>
            <div style={{ height: 8, background: '#f1f4f9', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#f25a38', borderRadius: 999, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, background: '#f8fafc', padding: 4, borderRadius: 999, border: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setFilter('all')}
              style={{ padding: '6px 14px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: filter === 'all' ? '#1e2430' : 'transparent', color: filter === 'all' ? '#ffffff' : '#64748b' }}
            >
              All 6 Sprints
            </button>
            <button
              onClick={() => setFilter('active')}
              style={{ padding: '6px 14px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: filter === 'active' ? '#1e2430' : 'transparent', color: filter === 'active' ? '#ffffff' : '#64748b' }}
            >
              Active Phase
            </button>
            <button
              onClick={() => setFilter('completed')}
              style={{ padding: '6px 14px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: filter === 'completed' ? '#1e2430' : 'transparent', color: filter === 'completed' ? '#ffffff' : '#64748b' }}
            >
              Done ({blocks.filter(b => b.tasks.every(t => t.done)).length})
            </button>
          </div>
        </div>

        {/* 6 Sprints Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>
          {filteredBlocks.map((block) => {
            const allDone = block.tasks.every(t => t.done);
            const doneCount = block.tasks.filter(t => t.done).length;

            return (
              <div
                key={block.id}
                className="ref-card"
                style={{
                  padding: '24px',
                  border: block.active ? '1.5px solid #f25a38' : '1px solid #eef2f8',
                  background: block.active ? '#ffffff' : '#ffffff',
                  boxShadow: block.active ? '0 8px 30px rgba(242, 90, 56, 0.08)' : '0 2px 10px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#f25a38' }}>{block.label}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: allDone ? '#ecfdf5' : block.active ? '#ffede8' : '#f1f4f9',
                        color: allDone ? '#059669' : block.active ? '#f25a38' : '#64748b',
                      }}
                    >
                      {allDone ? '✓ Completed' : block.active ? '● Current Sprint' : 'Upcoming'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e2430', marginBottom: 8 }}>
                    {block.title}
                  </h3>

                  {/* Milestone Goal Box */}
                  <div style={{ display: 'flex', gap: 10, background: '#fbfcfe', border: '1px solid #eef2f8', padding: '10px 12px', borderRadius: 12, marginBottom: 16 }}>
                    <div style={{ marginTop: 2 }}><TrophyIcon /></div>
                    <div>
                      <span style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#f25a38', letterSpacing: '0.6px' }}>
                        Deliverable Milestone
                      </span>
                      <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.45, marginTop: 2 }}>
                        {block.milestone}
                      </p>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {block.tasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => toggle(block.id, task.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '7px 10px',
                          borderRadius: 8,
                          background: task.done ? '#f9fafb' : '#ffffff',
                          border: '1px solid #f1f4f9',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: task.done ? '1.5px solid #10b981' : '1.5px solid #cbd5e1',
                            background: task.done ? '#10b981' : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {task.done ? '✓' : ''}
                        </div>
                        <span style={{ fontSize: 12.5, color: task.done ? '#9ca3af' : '#1e2430', textDecoration: task.done ? 'line-through' : 'none' }}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Link & Counter */}
                <div style={{ paddingTop: 14, borderTop: '1px solid #f1f4f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5 }}>
                  <a
                    href={block.resource.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#f25a38', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    📚 {block.resource.name} <LinkIcon />
                  </a>
                  <span style={{ color: '#94a3b8' }}>
                    {doneCount} / {block.tasks.length} done
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mentor Chat Drawer */}
        <MentorChat blocks={blocks} />
      </div>
    </div>
  );
}
