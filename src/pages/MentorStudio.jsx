import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { DEFAULT_ROADMAP } from '../data/defaultRoadmap';
import { sendMentorMessage, isAIEnabled } from '../lib/gemini';
import Topnav from '../components/Topnav';

export default function MentorStudio() {
  const navigate = useNavigate();
  const { roadmap: ctxRoadmap, userData } = useApp();
  const blocks = ctxRoadmap || DEFAULT_ROADMAP;
  const activeBlock = blocks.find(b => b.active) || blocks[0];

  const [activeMentor, setActiveMentor] = useState('alex'); // alex | elena
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: `Hello! I'm your PathForward AI Mentor. I'm actively tracking your progress on ${activeBlock.label}: "${activeBlock.title}". You currently have milestone "${activeBlock.milestone}" in progress. How can I assist you with your code, plan, or career trajectory today?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const quickPrompts = [
    "I'm feeling stuck on my current sprint task",
    "How should I structure my GitHub repo for recruiters?",
    "Can you explain Flexbox and Grid simply?",
    "Give me 3 technical interview questions for this sprint",
    "Help me stay accountable with my 20 hrs/week schedule",
  ];

  const nextId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { id: nextId.current++, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    let reply = null;
    if (isAIEnabled()) {
      reply = await sendMentorMessage(text, blocks, messages);
    }

    if (!reply) {
      // Intelligent fallback tailored to persona
      await new Promise(r => setTimeout(r, 700));
      const lower = text.toLowerCase();
      if (lower.includes('stuck') || lower.includes('flexbox') || lower.includes('grid')) {
        reply = "For CSS layout in Week 1, focus on the parent-child relationship: set `display: flex` on the container, then use `justify-content` along the main axis and `align-items` along the cross axis. Don't worry about memorizing every property yet — build your portfolio structure section by section (Navbar, Hero, Projects grid). Would you like a snippet?";
      } else if (lower.includes('github') || lower.includes('repo')) {
        reply = "Recruiters look for 3 things in entry-level repos: 1) A clear README with a live preview link (Vercel/GitHub Pages), 2) Small, descriptive commit messages showing your thought process, and 3) Clean, commented code. Start pushing daily from Day 1!";
      } else if (lower.includes('interview')) {
        reply = "Here are 3 core questions for your current phase:\n1. What is the difference between inline and block elements in HTML?\n2. How does the CSS box model calculate total element width?\n3. Why is semantic HTML important for accessibility (a11y) and SEO?\nTry answering the first one!";
      } else {
        reply = `You're currently working through ${activeBlock.label} (${activeBlock.title}). Remember that small, consistent 2-hour daily sessions compound dramatically over 90 days. Keep focused on completing the verifiable milestone tasks! What specific blocker can we tackle right now?`;
      }
    }

    setMessages(prev => [...prev, { id: nextId.current++, role: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="ref-outer-viewport">
      <div className="ref-app-frame">
        <Topnav />

        {/* Studio Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, minHeight: 560 }}>

          {/* Left Context & Persona Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Active Sprint Context */}
            <div className="ref-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#f25a38', letterSpacing: '0.8px' }}>
                LIVE MENTOR CONTEXT
              </span>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e2430', margin: '4px 0 8px' }}>
                {activeBlock.label}: {activeBlock.title}
              </h3>
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.45, marginBottom: 12 }}>
                🎯 Milestone: {activeBlock.milestone}
              </p>
              <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: 8, fontSize: 11, color: '#64748b' }}>
                Target: {userData?.hours || '20'} hrs/week · Mode: 1-on-1 Guidance
              </div>
            </div>

            {/* Choose Advisor Persona */}
            <div className="ref-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#8c96a5', letterSpacing: '0.8px' }}>
                SELECT MENTOR PERSONA
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {/* Alex Chen */}
                <div
                  onClick={() => setActiveMentor('alex')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: activeMentor === 'alex' ? '1.5px solid #f25a38' : '1px solid #eef2f8',
                    background: activeMentor === 'alex' ? '#fffaf5' : '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Alex Chen"
                    style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1e2430' }}>Alex Chen</div>
                    <span style={{ fontSize: 10.5, color: '#8c96a5' }}>Technical Architect</span>
                  </div>
                </div>

                {/* Elena Rostova */}
                <div
                  onClick={() => setActiveMentor('elena')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: activeMentor === 'elena' ? '1.5px solid #f25a38' : '1px solid #eef2f8',
                    background: activeMentor === 'elena' ? '#fffaf5' : '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Elena Rostova"
                    style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1e2430' }}>Elena Rostova</div>
                    <span style={{ fontSize: 10.5, color: '#8c96a5' }}>Career Strategist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Starters */}
            <div className="ref-card" style={{ padding: '20px', flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#8c96a5', letterSpacing: '0.8px' }}>
                SUGGESTED PROMPTS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                {quickPrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    style={{ textAlign: 'left', fontSize: 11, padding: '7px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', transition: 'all 0.15s ease' }}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Chat Workspace */}
          <div className="ref-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid #f1f4f9', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e2430' }}>
                    {activeMentor === 'alex' ? 'Alex Chen · Technical Architect' : 'Elena Rostova · Career Strategist'}
                  </h3>
                  <p style={{ fontSize: 11, color: '#8c96a5' }}>
                    {isAIEnabled() ? 'Gemini 1.5 Flash Connected · Real-Time Roadmap Awareness' : 'Context-Aware Mentorship Engine'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/roadmap')}
                style={{ fontSize: 12, fontWeight: 600, color: '#f25a38' }}
              >
                View Full Roadmap →
              </button>
            </div>

            {/* Messages Thread */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 6, marginBottom: 16, maxHeight: 420 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: msg.role === 'user' ? '#1e2430' : '#ffede8',
                      color: msg.role === 'user' ? '#ffffff' : '#f25a38',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {msg.role === 'user' ? 'U' : 'AI'}
                  </div>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: 14,
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      background: msg.role === 'user' ? '#f25a38' : '#f8fafc',
                      color: msg.role === 'user' ? '#ffffff' : '#1e2430',
                      border: msg.role === 'user' ? 'none' : '1px solid #eef2f8',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#ffede8', color: '#f25a38', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                    AI
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 14, fontSize: 12, color: '#8c96a5', border: '1px solid #eef2f8' }}>
                    Thinking about your roadmap & milestone…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Chips */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10 }}>
              {quickPrompts.slice(2).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  style={{ fontSize: 11, color: '#64748b', background: '#f1f4f9', padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 999, padding: '5px 6px 5px 16px' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Alex or Elena anything about your roadmap, code, or career steps..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 12.5, color: '#1e2430' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: (!input.trim() || loading) ? '#cbd5e1' : '#f25a38',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
                }}
              >
                ↑
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
