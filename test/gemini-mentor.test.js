import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test mentor fallback intelligence and keyword mapping
const FALLBACKS = {
  stuck:   "Let's break it into smaller steps. What is the exact task you're currently tackling?",
  next:    "Looking at your active sprint: your top priority is publishing your static portfolio page on GitHub.",
  done:    "Outstanding work! Ticking that task off advances your 90-day trajectory.",
  tip:     "Pro tip for modern web development: always write your CSS mobile-first using flexbox and grid.",
  default: "I'm tracking your 90-day PathForward roadmap.",
};

function pickResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('stuck') || m.includes('help') || m.includes('block') || m.includes('error')) return FALLBACKS.stuck;
  if (m.includes('next') || m.includes('focus') || m.includes('week 1') || m.includes('start')) return FALLBACKS.next;
  if (m.includes('done') || m.includes('finish') || m.includes('complet')) return FALLBACKS.done;
  if (m.includes('tip') || m.includes('advice') || m.includes('trick'))    return FALLBACKS.tip;
  return FALLBACKS.default;
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 500);
}

describe('PathForward AI Mentor & Prompt Engine', () => {
  it('should appropriately detect when a learner is stuck and offer tactical breakdown', () => {
    const res = pickResponse("I am completely stuck on CSS layout!");
    assert.equal(res, FALLBACKS.stuck);
  });

  it('should direct learner to sprint priorities when asked what to do next', () => {
    const res = pickResponse("What should I focus on next?");
    assert.equal(res, FALLBACKS.next);
  });

  it('should celebrate completed milestones and maintain momentum', () => {
    const res = pickResponse("I just finished my first portfolio page!");
    assert.equal(res, FALLBACKS.done);
  });

  it('should provide practical study tips on demand', () => {
    const res = pickResponse("Can you give me a coding tip?");
    assert.equal(res, FALLBACKS.tip);
  });

  it('should fallback to roadmap tracking when query is general', () => {
    const res = pickResponse("Good morning mentor");
    assert.equal(res, FALLBACKS.default);
  });

  it('input sanitizer prevents overly long inputs and trims whitespace', () => {
    const longInput = "a".repeat(1000);
    const sanitized = sanitizeInput(`   ${longInput}   `);
    assert.equal(sanitized.length, 500);
    assert.equal(sanitized.startsWith(' '), false);
    assert.equal(sanitized.endsWith(' '), false);
  });
});
