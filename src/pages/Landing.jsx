import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from '../components/Topnav';
import MentorChat from '../components/MentorChat';
import { DEFAULT_ROADMAP } from '../data/defaultRoadmap';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="ref-outer-viewport">
      <div className="ref-app-frame">
        <Topnav />

        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '32px 16px 20px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: '#ffffff', borderRadius: 999, border: '1px solid #e2e8f0', fontSize: 11.5, fontWeight: 700, color: '#f25a38', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            TURNING "I HAVE NO IDEA WHAT TO DO NEXT" INTO A 90-DAY PLAN
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, color: '#1e2430', lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: 18 }}>
            Left formal education? <br />
            <span style={{ color: '#f25a38' }}>Here is your exact week-by-week path.</span>
          </h1>

          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, maxWidth: 660, margin: '0 auto 28px' }}>
            Dropouts, fresh graduates with no job lined up, and people taking a gap year all hit the same wall: <strong>no one tells you what to actually do</strong>. Career counseling is either a generic listicle or a one-off meeting with no follow-up. What's missing isn't information — it's <strong>structure and continuity</strong>.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => navigate('/intake')}
              style={{ padding: '12px 28px', background: '#f25a38', color: '#ffffff', borderRadius: 999, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(242, 90, 56, 0.28)' }}
            >
              Build My 90-Day Plan →
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              style={{ padding: '12px 24px', background: '#ffffff', color: '#1e2430', borderRadius: 999, fontSize: 14, fontWeight: 600, border: '1px solid #cbd5e1' }}
            >
              Explore 90-Day Roadmap
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '12px 24px', background: '#ffffff', color: '#64748b', borderRadius: 999, fontSize: 14, fontWeight: 600, border: '1px solid #e2e8f0' }}
            >
              Sprint Dashboard
            </button>
          </div>
        </div>

        {/* ════ THE CORE PROBLEM & THE PATHFORWARD SOLUTION ════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>

          {/* The Wall Everyone Hits */}
          <div className="ref-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                ✕
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e2430' }}>The Problem: The Post-School Void</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>•</span>
                <span><strong>No one tells you what to actually do</strong>: Leaving school drops you into an overwhelming ocean of tutorials, advice, and anxiety.</span>
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>•</span>
                <span><strong>Generic advice fails</strong>: Reading "10 Skills to Learn in 2026" doesn't tell you what to open on Monday morning at 9am.</span>
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>•</span>
                <span><strong>Zero follow-up</strong>: Counselors meet once and vanish. When you get stuck on an error in Week 2, there is nobody to ask.</span>
              </li>
            </ul>
          </div>

          {/* The PathForward Solution */}
          <div className="ref-card" style={{ padding: '28px', border: '1.5px solid #fed7aa', background: '#fffaf5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ffede8', color: '#f25a38', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                ✓
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e2430' }}>The Solution: Structure & Continuity</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#f25a38', fontWeight: 700 }}>•</span>
                <span><strong>Personalized 90-Day Trajectory</strong>: Broken down into 6 bite-sized two-week blocks with concrete deliverables.</span>
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#f25a38', fontWeight: 700 }}>•</span>
                <span><strong>Curated Vetted Resources</strong>: No $5,000 bootcamps. Free, proven resources (MDN, FreeCodeCamp, React Docs, NeetCode).</span>
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: '#f25a38', fontWeight: 700 }}>•</span>
                <span><strong>Always-on AI Mentor</strong>: Remembers exactly which sprint and task you are on, and unblocks you whenever you get stuck.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ════ HOW IT WORKS (3 STEPS) ════ */}
        <div className="ref-card" style={{ padding: '32px', marginBottom: 28 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#f25a38', marginBottom: 6 }}>HOW PATHFORWARD WORKS</p>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e2430' }}>From Lost to Working in 3 Steps</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {/* Step 1 */}
            <div style={{ background: '#f8fafc', padding: '22px', borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#f25a38', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>
                1
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1e2430', marginBottom: 8 }}>Short Intake & Resume Scan</h4>
              <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.5 }}>
                Tell us where you are (fresh grad, dropout, career changer), upload your resume or skip, and define your available weekly study hours.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ background: '#f8fafc', padding: '22px', borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#1e2430', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>
                2
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1e2430', marginBottom: 8 }}>Concrete 90-Day Plan</h4>
              <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.5 }}>
                Get an actionable plan broken into 6 two-week sprints. Each block has one clear milestone, verifiable tasks, and trusted free resources.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ background: '#f8fafc', padding: '22px', borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>
                3
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1e2430', marginBottom: 8 }}>Continuous AI Mentorship</h4>
              <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.5 }}>
                Stuck on Flexbox in Week 1? Nervous about interviews in Week 11? Your mentor has your complete context and guides you step by step.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button
              onClick={() => navigate('/intake')}
              style={{ padding: '12px 32px', background: '#1e2430', color: '#ffffff', borderRadius: 999, fontSize: 13.5, fontWeight: 700 }}
            >
              Start Intake and Get Roadmap →
            </button>
          </div>
        </div>

        {/* ════ SNEAK PEEK OF THE 6-BLOCK ROADMAP ════ */}
        <div className="ref-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#f25a38', marginBottom: 4 }}>SAMPLE TRAJECTORY</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e2430' }}>The 90-Day Entry-Level Software Plan</h3>
            </div>
            <button
              onClick={() => navigate('/roadmap')}
              style={{ fontSize: 12.5, fontWeight: 600, color: '#f25a38', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              Open Full Interactive Timeline →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {DEFAULT_ROADMAP.slice(0, 3).map((block) => (
              <div key={block.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f25a38' }}>{block.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, background: block.active ? '#ffede8' : '#f1f4f9', color: block.active ? '#f25a38' : '#64748b', padding: '2px 8px', borderRadius: 999 }}>
                    {block.active ? '● Current' : 'Upcoming'}
                  </span>
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1e2430', marginBottom: 6 }}>{block.title}</h4>
                <p style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.45, marginBottom: 12 }}>{block.milestone}</p>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>
                  ✓ {block.tasks.length} actionable tasks · Free resource attached
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Mentor Chat Drawer */}
        <MentorChat blocks={DEFAULT_ROADMAP} />
      </div>
    </div>
  );
}
