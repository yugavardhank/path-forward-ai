import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test JSON payload sanitization and parsing logic used in gemini.js
function sanitizeAndParseRoadmap(rawResponse) {
  if (!rawResponse || typeof rawResponse !== 'string') return null;
  const clean = rawResponse.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
  try {
    const parsed = JSON.parse(clean);
    if (!Array.isArray(parsed) || parsed.length !== 6) return null;
    return parsed;
  } catch {
    return null;
  }
}

describe('Gemini Roadmap Service & Fallback Validation', () => {
  it('correctly cleans markdown code blocks from Gemini response', () => {
    const raw = "```json\n[\n{\"id\": 1, \"title\": \"Sprint 1\"},\n{\"id\": 2},\n{\"id\": 3},\n{\"id\": 4},\n{\"id\": 5},\n{\"id\": 6}\n]\n```";
    const parsed = sanitizeAndParseRoadmap(raw);
    assert.ok(Array.isArray(parsed));
    assert.equal(parsed.length, 6);
    assert.equal(parsed[0].id, 1);
  });

  it('rejects invalid JSON or malformed structures safely without throwing', () => {
    assert.equal(sanitizeAndParseRoadmap("Not JSON at all"), null);
    assert.equal(sanitizeAndParseRoadmap(""), null);
    assert.equal(sanitizeAndParseRoadmap(null), null);
    assert.equal(sanitizeAndParseRoadmap("[1, 2, 3]"), null); // requires exactly 6 blocks
  });
});
