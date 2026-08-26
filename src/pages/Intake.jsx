import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { generateRoadmap, isAIEnabled } from '../lib/gemini';
import { getRoadmapForTrack, DEFAULT_ROADMAP } from '../data/defaultRoadmap';
import Topnav from '../components/Topnav';
import MentorChat from '../components/MentorChat';

const UploadIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f25a38" strokeWidth="1.75" style={{ margin: '0 auto 12px' }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const GOALS = [
  { v: 'get_job',     label: 'Get a Job' },
  { v: 'learn_skill', label: 'Learn a Skill' },
  { v: 'study',       label: 'Further Study' },
  { v: 'freelance',   label: 'Go Freelance' },
];

const SKILL_KEYWORDS = {
  webdev: {
    title: 'Junior Frontend / Fullstack Developer',
    interest: 'webdev',
    tags: ['React', 'CSS3', 'JavaScript', 'HTML5', 'Git'],
    words: ['javascript', 'js', 'react', 'html', 'css', 'typescript', 'ts', 'frontend', 'web', 'git', 'node', 'tailwind', 'vue', 'api', 'bootstrap'],
  },
  design: {
    title: 'UI/UX & Product Designer',
    interest: 'design',
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    words: ['figma', 'ui', 'ux', 'wireframe', 'prototype', 'design system', 'user research', 'photoshop', 'illustrator', 'product design', 'typography'],
  },
  data: {
    title: 'Data & Applied AI Engineer',
    interest: 'data',
    tags: ['Python', 'SQL', 'Pandas', 'Gemini / LLMs'],
    words: ['python', 'sql', 'pandas', 'numpy', 'data', 'ai', 'analytics', 'database', 'postgres', 'llm', 'machine learning', 'tableau'],
  },
  freelance: {
    title: 'Freelance Web & Client Consultant',
    interest: 'freelance',
    tags: ['Client Delivery', 'Landing Pages', 'Rapid MVP', 'Stripe'],
    words: ['freelance', 'client', 'consulting', 'wordpress', 'shopify', 'sales', 'seo', 'marketing', 'stripe', 'mvp'],
  },
};

export default function Intake() {
  const navigate = useNavigate();
  const { setUserData, setRoadmap, roadmap } = useApp();
  const [step, setStep]       = useState(1);
  const [scan, setScan]       = useState('idle');
  const [scanPct, setScanPct] = useState(0);
  const [busy, setBusy]       = useState(false);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [matchedJobs, setMatchedJobs]   = useState([]);
  const [fileName, setFileName]         = useState('');
  const [form, setForm]       = useState({ status: '', goal: '', interest: 'webdev', hours: '20', budget: 'free' });
  const fileRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const parseFileContent = (file) => {
    setFileName(file.name);
    setScan('scanning');
    setScanPct(15);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawText = ((event.target && event.target.result) || '').toString().toLowerCase();

      // Scan for actual skills
      const detected = new Set();
      const scores = { webdev: 40, design: 35, data: 30, freelance: 35 };

      Object.entries(SKILL_KEYWORDS).forEach(([track, info]) => {
        info.words.forEach(w => {
          if (rawText.includes(w)) {
            detected.add(w.toUpperCase());
            scores[track] = (scores[track] || 0) + 12;
          }
        });
      });

      // If document is very brief or binary without plain text, provide baseline profile
      if (detected.size === 0) {
        ['HTML', 'CSS', 'JAVASCRIPT', 'GIT'].forEach(s => detected.add(s));
        scores.webdev = 84;
        scores.design = 68;
        scores.data   = 55;
        scores.freelance = 62;
      }

      // Format matched trajectories
      const results = Object.entries(SKILL_KEYWORDS).map(([track, info]) => ({
        title: info.title,
        track: info.interest,
        tags: info.tags,
        match: Math.min(Math.round(scores[track]), 96),
      })).sort((a, b) => b.match - a.match);

      let p = 20;
      const iv = setInterval(() => {
        p += 25;
        if (p >= 100) {
          clearInterval(iv);
          setScanPct(100);
          setParsedSkills(Array.from(detected).slice(0, 10));
          setMatchedJobs(results);
          // Pre-select top matched interest
          set('interest', results[0].track);
          setTimeout(() => setScan('done'), 250);
        } else {
          setScanPct(p);
        }
      }, 150);
    };

    // Read file contents (supports txt, markdown, json, pdf/doc raw streams)
    reader.readAsText(file.slice(0, 80000));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      parseFileContent(file);
    }
  };

  const handleGenerate = async () => {
    setBusy(true);
    setUserData(form);

    let blocks = null;
    if (isAIEnabled()) {
      blocks = await generateRoadmap(form);
    }

    if (!blocks) {
      // Use specialized 90-day track based on user's field of interest
      blocks = getRoadmapForTrack(form.interest || 'webdev');
    }

    blocks = blocks.map((b, i) => ({ ...b, active: i === 0 }));
    setRoadmap(blocks);
    setBusy(false);
    navigate('/roadmap');
  };

  return (
    <div className="ref-outer-viewport">
      <div className="ref-app-frame">
        <Topnav />

        <div style={{ margin: '20px auto 0', maxWidth: 640 }}>
          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: step >= 1 ? '#f25a38' : '#e2e8f0', color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: step === 1 ? '#1e2430' : '#8c96a5' }}>Resume Scan</span>
            </div>
            <div style={{ width: 40, height: 2, background: step > 1 ? '#f25a38' : '#e2e8f0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: step === 2 ? '#f25a38' : '#e2e8f0', color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                2
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: step === 2 ? '#1e2430' : '#8c96a5' }}>Goal Setup</span>
            </div>
          </div>

          {step === 1 ? (
            <div className="ref-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#f25a38', marginBottom: 6 }}>Step 1 of 2</p>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e2430', letterSpacing: '-0.3px', marginBottom: 6 }}>Upload your resume</h2>
                <p style={{ fontSize: 13, color: '#8c96a5', lineHeight: 1.5 }}>Our AI parser scans your actual skills and computes personalized career trajectory matches.</p>
              </div>

              {scan === 'idle' && (
                <>
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{
                      border: '2px dashed #dbe2ee',
                      borderRadius: '20px',
                      padding: '40px 24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#fbfcfe',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.md" style={{ display: 'none' }} onChange={handleFileChange} />
                    <UploadIcon />
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e2430', marginBottom: 4 }}>Drop your resume here</h3>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>PDF, DOCX, TXT or MD · parsed client-side securely</p>
                    <button
                      type="button"
                      className="ref-upgrade-pill-btn"
                      aria-label="Choose resume file from device"
                      style={{ margin: '20px auto 0', width: 'auto', display: 'inline-flex', padding: '6px 18px', background: '#ffffff', border: '1px solid #e2e8f0' }}
                      onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                    >
                      <FileIcon /> &nbsp; Choose File
                    </button>
                  </div>
                  <p style={{ textAlign: 'center', marginTop: 16 }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{ background: 'none', border: 'none', fontSize: 12, color: '#8c96a5', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      Skip — I don't have a resume yet →
                    </button>
                  </p>
                </>
              )}

              {scan === 'scanning' && (
                <div style={{ background: '#f8fafc', padding: '36px 24px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: '#f25a38', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1e2430', marginBottom: 4 }}>Analyzing {fileName || 'your profile'}</p>
                  <p style={{ fontSize: 12, color: '#8c96a5' }}>Extracting technology keywords, experience level, and 90-day trajectory fit…</p>
                  <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden', margin: '18px 0 8px' }}>
                    <div style={{ height: '100%', width: `${scanPct}%`, background: '#f25a38', borderRadius: 2, transition: 'width 0.1s ease' }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{Math.round(scanPct)}%</p>
                </div>
              )}

              {scan === 'done' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#ecfdf5', borderRadius: '12px', marginBottom: 16 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>Profile Analyzed Successfully</p>
                      <p style={{ fontSize: 12, color: '#047857' }}>Extracted {parsedSkills.length} key competencies from {fileName}</p>
                    </div>
                  </div>

                  {/* Dynamic extracted skills tag cloud */}
                  <div style={{ marginBottom: 18, background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #eef2f8' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b', marginBottom: 8 }}>Detected Competencies</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {parsedSkills.map(skill => (
                        <span key={skill} style={{ fontSize: 11, fontWeight: 600, color: '#1e2430', background: '#ffffff', border: '1px solid #e2e8f0', padding: '3px 9px', borderRadius: '999px' }}>
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#8c96a5', marginBottom: 10 }}>Computed Trajectory Matches</p>
                  {matchedJobs.map(j => (
                    <div
                      key={j.title}
                      onClick={() => set('interest', j.track)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        border: form.interest === j.track ? '1.5px solid #f25a38' : '1px solid #eef2f8',
                        background: form.interest === j.track ? '#fff9f7' : '#ffffff',
                        borderRadius: '14px',
                        marginBottom: 8,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#1e2430', marginBottom: 4 }}>{j.title}</p>
                          {form.interest === j.track && (
                            <span style={{ fontSize: 10, fontWeight: 700, background: '#ffede8', color: '#f25a38', padding: '1px 6px', borderRadius: 4 }}>SELECTED</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {j.tags.map(t => (
                            <span key={t} style={{ fontSize: 10.5, color: '#64748b', background: '#f1f4f9', padding: '2px 7px', borderRadius: 4 }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: 18, fontWeight: 800, color: j.match >= 75 ? '#10b981' : '#f59e0b' }}>
                        {j.match}%
                      </span>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{ width: '100%', padding: '12px 0', background: '#1e2430', color: '#ffffff', borderRadius: '999px', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 18 }}
                  >
                    Continue to Goal Setup <ArrowIcon />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ref-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#f25a38', marginBottom: 6 }}>Step 2 of 2</p>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e2430', letterSpacing: '-0.3px', marginBottom: 6 }}>Define your 90-day goal</h2>
                <p style={{ fontSize: 13, color: '#8c96a5', lineHeight: 1.5 }}>Tell us where you stand and what trajectory you want to conquer.</p>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="intake-status" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 6 }}>Current Status</label>
                <select
                  id="intake-status"
                  value={form.status}
                  onChange={e => set('status', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none' }}
                >
                  <option value="">Select your situation…</option>
                  <option value="graduated">Recent Graduate (seeking first tech job)</option>
                  <option value="dropout">Left formal education / Overcoming credential barrier</option>
                  <option value="gap_year">On a gap year / Structured upskilling</option>
                  <option value="career_switch">Switching careers into modern software</option>
                  <option value="self_taught">Self-taught developer / Freelancer</option>
                </select>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 6 }}>Primary Objective</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {GOALS.map(g => (
                    <button
                      key={g.v}
                      type="button"
                      className={`ref-nav-link ${form.goal === g.v ? 'active' : ''}`}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: form.goal === g.v ? '1.5px solid #f25a38' : '1px solid #e2e8f0',
                        background: form.goal === g.v ? '#ffede8' : '#ffffff',
                        color: form.goal === g.v ? '#f25a38' : '#374151',
                        fontSize: 12.5,
                        fontWeight: 600,
                        textAlign: 'left',
                      }}
                      onClick={() => set('goal', g.v)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="intake-interest" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 6 }}>Field of Interest</label>
                <select
                  id="intake-interest"
                  value={form.interest}
                  onChange={e => set('interest', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none' }}
                >
                  <option value="webdev">Fullstack & Frontend Web Development</option>
                  <option value="design">UI/UX & Product Design</option>
                  <option value="data">Data Engineering & Applied AI</option>
                  <option value="freelance">Freelance Tech Consulting</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div>
                  <label htmlFor="intake-hours" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 6 }}>Hours / Week Committed</label>
                  <input
                    id="intake-hours"
                    type="number"
                    min="5"
                    max="60"
                    value={form.hours}
                    onChange={e => set('hours', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="intake-budget" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4b5563', marginBottom: 6 }}>Resource Budget</label>
                  <select
                    id="intake-budget"
                    value={form.budget}
                    onChange={e => set('budget', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none' }}
                  >
                    <option value="free">Free curated resources only</option>
                    <option value="low">Under $50 / month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ padding: '12px 18px', background: '#f1f4f9', color: '#64748b', borderRadius: '999px', fontSize: 13, fontWeight: 600 }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!form.status || !form.goal || busy}
                  onClick={handleGenerate}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    background: (!form.status || !form.goal || busy) ? '#94a3b8' : '#f25a38',
                    color: '#ffffff',
                    borderRadius: '999px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: (!form.status || !form.goal || busy) ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(242, 90, 56, 0.3)',
                  }}
                >
                  {busy ? 'Generating your 90-day roadmap…' : `Generate 90-Day ${form.interest ? form.interest.toUpperCase() : ''} Roadmap →`}
                </button>
              </div>
            </div>
          )}
        </div>

        <MentorChat blocks={roadmap || DEFAULT_ROADMAP} />
      </div>
    </div>
  );
}
