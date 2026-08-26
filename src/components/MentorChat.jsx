import React, { useState, useRef, useEffect } from 'react';
import { sendMentorMessage, isAIEnabled } from '../lib/gemini';

const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);
const BotIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);
const UserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const QUICK = [
  'What is my focus for Week 1?',
  'How do I deploy to GitHub Pages?',
  'Give me a portfolio project tip',
  'I completed a milestone! 🎉'
];

const FALLBACKS = {
  stuck:   "Let's break it into smaller steps. What is the exact task you're currently tackling? Often starting with writing the HTML boilerplate or setting up the Git repo is enough to regain momentum.",
  next:    "Looking at your active sprint: your top priority is publishing your static portfolio page on GitHub. Focus on clean semantic tags and responsive layout first.",
  done:    "Outstanding work! Ticking that task off advances your 90-day trajectory. Keep this momentum rolling — what's your next target?",
  tip:     "Pro tip for modern web development: always write your CSS mobile-first using flexbox and grid, and commit to GitHub frequently with clear messages.",
  default: "I'm tracking your 90-day PathForward roadmap. Ask me any question about your milestones, technical hurdles, or career interview prep.",
};

function pick(msg) {
  const m = msg.toLowerCase();
  if (m.includes('stuck') || m.includes('help') || m.includes('block') || m.includes('error')) return FALLBACKS.stuck;
  if (m.includes('next') || m.includes('focus') || m.includes('week 1') || m.includes('start')) return FALLBACKS.next;
  if (m.includes('done') || m.includes('finish') || m.includes('complet')) return FALLBACKS.done;
  if (m.includes('tip') || m.includes('advice') || m.includes('trick'))    return FALLBACKS.tip;
  return FALLBACKS.default;
}

export default function MentorChat({ blocks = [], initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);
  const [msgs, setMsgs] = useState([
    {
      id: 1,
      role: 'ai',
      text: "Hello! I'm your PathForward AI Mentor. I have full context on your 90-day roadmap and active sprint milestones. How can I help you progress today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef();


  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, typing, open]);

  const send = async (text) => {
    if (!text.trim() || typing) return;
    setMsgs(m => [...m, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setTyping(true);

    let reply = isAIEnabled() ? await sendMentorMessage(text, blocks, msgs) : null;
    if (!reply) {
      await new Promise(r => setTimeout(r, 600));
      reply = pick(text);
    }

    setMsgs(m => [...m, { id: Date.now() + 1, role: 'ai', text: reply }]);
    setTyping(false);
  };

  // Compact floating pill when closed (never stretches or overflows)
  if (!open) {
    return (
      <button
        className="chat-floating-pill"
        onClick={() => setOpen(true)}
        title="Open PathForward AI Mentor"
      >
        <div className="chat-avi" style={{ width: 26, height: 26, borderRadius: 6 }}>
          <BotIcon />
          <span className="chat-status-dot" />
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1e2430' }}>Ask AI Mentor</span>
        <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>● Live</span>
      </button>
    );
  }

  // Expanded chat window
  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-head" onClick={() => setOpen(false)}>
        <div className="chat-head-left">
          <div className="chat-avi">
            <BotIcon />
            <span className="chat-status-dot" />
          </div>
          <div>
            <p className="chat-name">PathForward AI Mentor</p>
            <p className="chat-sub">
              {isAIEnabled() ? 'Gemini 1.5 Flash Connected' : 'Active Sprint Anchor'}
            </p>
          </div>
        </div>
        <button
          className="chat-chevron-btn"
          aria-label="Close chat"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div className="chat-messages">
        {msgs.map(msg => (
          <div key={msg.id} className={`msg-row ${msg.role}`}>
            {msg.role === 'ai' && (
              <div className="msg-avi"><BotIcon /></div>
            )}
            <div className={`msg-bubble ${msg.role}`}>{msg.text}</div>
            {msg.role === 'user' && (
              <div className="msg-avi"><UserIcon /></div>
            )}
          </div>
        ))}

        {typing && (
          <div className="msg-row ai">
            <div className="msg-avi"><BotIcon /></div>
            <div className="msg-bubble ai">
              <div className="typing-row">
                <div className="typing-dot" style={{ animationDelay: '0ms' }} />
                <div className="typing-dot" style={{ animationDelay: '160ms' }} />
                <div className="typing-dot" style={{ animationDelay: '320ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick replies */}
      <div className="quick-row">
        {QUICK.map(q => (
          <button key={q} className="quick-chip" onClick={() => send(q)}>{q}</button>
        ))}
      </div>

      {/* Input field */}
      <div className="chat-input-wrap">
        <form onSubmit={e => { e.preventDefault(); send(input); }} className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your milestones, code, or tasks..."
            disabled={typing}
          />
          <button type="submit" className="chat-send" disabled={!input.trim() || typing}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
