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
      reply = await sendMentorMessage(text, blocks, messages, activeMentor, userData);
    }

    if (!reply) {
      // Intelligent persona-specific fallback
      await new Promise(r => setTimeout(r, 600));
      const lower = text.toLowerCase();

      if (activeMentor === 'elena') {
        // Elena Rostova — Career Strategist
        if (lower.includes('stuck') || lower.includes('degree') || lower.includes('dropout') || lower.includes('gap')) {
          reply = `As a career strategist, remember that modern tech teams hire for proof-of-work, not university credentials. In your current sprint (${activeBlock.label}), your sole focus is achieving milestone: "${activeBlock.milestone}". Once you have that live URL in hand, you hold proof of competence that outshines a generic degree. Let's finish this milestone so we can leverage it in outbound messages.`;
        } else if (lower.includes('github') || lower.includes('resume') || lower.includes('recruiter') || lower.includes('job')) {
          reply = "For non-traditional candidates, avoid academic CV layouts. Lead with a 'Featured Production Shipments' section containing direct clickable URLs and 1-line impact summaries. When messaging founders on LinkedIn, reference a specific feature in their product and show how your project tackles a related architectural challenge.";
        } else if (lower.includes('interview')) {
          reply = "In behavioral interviews, reframe your non-traditional path as your greatest superpower: 'I chose an intensive, outcome-driven 90-day trajectory because I thrive by shipping software and solving real problems autonomously.' That immediately signals high agency to engineering leaders.";
        } else {
          reply = `Elena here. We are targeting your primary goal of "${userData?.goal || 'landing a high-leverage role'}". Every completed task in ${activeBlock.label} adds undeniable weight to your portfolio. What career or positioning hurdle can we solve today?`;
        }
      } else {
        // Alex Chen — Technical Architect
        if (lower.includes('stuck') || lower.includes('flexbox') || lower.includes('grid') || lower.includes('bug') || lower.includes('error')) {
          reply = `Technical blocker? Let's isolate it methodically. In ${activeBlock.title}, 90% of issues stem from container sizing or state mismatches. Open your DevTools, inspect the computed box model or console traces, and isolate whether the breakdown is data fetching or CSS layout. What exact behavior are you seeing?`;
        } else if (lower.includes('github') || lower.includes('repo') || lower.includes('commit') || lower.includes('code')) {
          reply = "Architecture rule #1: write atomic commits. Instead of 'updated files', use 'feat: implement responsive grid' or 'fix: handle promise rejection in api call'. Add automated test scripts in your package.json so recruiters see you value code reliability.";
        } else if (lower.includes('interview') || lower.includes('questions')) {
          reply = `Here are 3 architectural questions for ${activeBlock.title}:\n1. How do you prevent unnecessary re-renders in component hierarchies?\n2. What is the difference between synchronous execution and microtask queues in the event loop?\n3. How would you handle network failure gracefully for offline users?\nWhich one would you like to dissect?`;
        } else {
          reply = `Alex Chen here. Looking at your ${activeBlock.label} sprint (${activeBlock.title}): your core technical deliverable is "${activeBlock.milestone}". Keep your functions pure and write unit tests for your edge cases. What technical topic are we tackling?`;
        }
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
                aria-label="Ask your AI mentor a question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Alex or Elena anything about your roadmap, code, or career steps..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 12.5, color: '#1e2430' }}
                disabled={loading}
              />
              <button
                type="submit"
                aria-label="Send message to mentor"
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
