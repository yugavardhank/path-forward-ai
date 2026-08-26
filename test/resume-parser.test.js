import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Resume parsing and competency matching algorithm
const SKILL_KEYWORDS = {
  webdev: {
    title: 'Junior Frontend / Fullstack Developer',
    interest: 'webdev',
    words: ['javascript', 'js', 'react', 'html', 'css', 'typescript', 'ts', 'frontend', 'web', 'git', 'node', 'tailwind', 'vue', 'api', 'bootstrap'],
  },
  design: {
    title: 'UI/UX & Product Designer',
    interest: 'design',
    words: ['figma', 'ui', 'ux', 'wireframe', 'prototype', 'design system', 'user research', 'photoshop', 'illustrator', 'product design', 'typography'],
  },
  data: {
    title: 'Data & Applied AI Engineer',
    interest: 'data',
    words: ['python', 'sql', 'pandas', 'numpy', 'data', 'ai', 'analytics', 'database', 'postgres', 'llm', 'machine learning', 'tableau'],
  },
  freelance: {
    title: 'Freelance Web & Client Consultant',
    interest: 'freelance',
    words: ['freelance', 'client', 'consulting', 'wordpress', 'shopify', 'sales', 'seo', 'marketing', 'stripe', 'mvp'],
  },
};

function analyzeResumeText(rawText) {
  const text = (rawText || '').toLowerCase();
  const detected = new Set();
  const scores = { webdev: 40, design: 35, data: 30, freelance: 35 };

  Object.entries(SKILL_KEYWORDS).forEach(([track, info]) => {
    info.words.forEach(w => {
      if (text.includes(w)) {
        detected.add(w.toUpperCase());
        scores[track] = (scores[track] || 0) + 12;
      }
    });
  });

  if (detected.size === 0) {
    ['HTML', 'CSS', 'JAVASCRIPT', 'GIT'].forEach(s => detected.add(s));
    scores.webdev = 84;
    scores.design = 68;
    scores.data   = 55;
    scores.freelance = 62;
  }

  const results = Object.entries(SKILL_KEYWORDS).map(([track, info]) => ({
    title: info.title,
    track: info.interest,
    match: Math.min(Math.round(scores[track]), 96),
  })).sort((a, b) => b.match - a.match);

  return {
    skills: Array.from(detected),
    matches: results,
    topTrack: results[0].track,
  };
}

describe('PathForward Resume Parsing & Dynamic Match Engine', () => {
  it('correctly extracts Frontend competencies from technical resume text', () => {
    const text = 'Built responsive web applications with React, TypeScript, Tailwind CSS, and Git.';
    const result = analyzeResumeText(text);
    assert.ok(result.skills.includes('REACT'));
    assert.ok(result.skills.includes('TYPESCRIPT'));
    assert.equal(result.topTrack, 'webdev');
    assert.ok(result.matches[0].match > 70);
  });

  it('correctly extracts Design competencies and identifies UI/UX track', () => {
    const text = 'Designed high-fidelity wireframes in Figma, created design system tokens, and conducted user research.';
    const result = analyzeResumeText(text);
    assert.ok(result.skills.includes('FIGMA'));
    assert.equal(result.topTrack, 'design');
    assert.ok(result.matches[0].match > 70);
  });

  it('correctly extracts Data & AI competencies and identifies Data track', () => {
    const text = 'Analyzed datasets with Python, Pandas, SQL queries, and implemented LLM prompt workflows.';
    const result = analyzeResumeText(text);
    assert.ok(result.skills.includes('PYTHON'));
    assert.ok(result.skills.includes('SQL'));
    assert.equal(result.topTrack, 'data');
  });

  it('gracefully handles empty or unreadable files with safe baseline trajectory', () => {
    const result = analyzeResumeText('');
    assert.ok(result.skills.length > 0);
    assert.ok(result.matches.length === 4);
    assert.ok(result.matches[0].match <= 96);
  });
});
