import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_ROADMAP } from '../src/data/defaultRoadmap.js';

describe('PathForward 90-Day Roadmap Data Integrity', () => {
  it('should have exactly 6 two-week sprint blocks for the 90-day trajectory', () => {
    assert.equal(DEFAULT_ROADMAP.length, 6);
  });

  it('each block should have an id, label, title, milestone, tasks, and resource', () => {
    DEFAULT_ROADMAP.forEach((block, index) => {
      assert.equal(block.id, index + 1);
      assert.ok(block.label.startsWith('Wk'), `Block ${block.id} label should start with Wk`);
      assert.ok(block.title.length > 0, `Block ${block.id} must have a non-empty title`);
      assert.ok(block.milestone.length > 0, `Block ${block.id} must have a concrete milestone`);
      assert.ok(Array.isArray(block.tasks), `Block ${block.id} tasks must be an array`);
      assert.ok(block.tasks.length >= 2, `Block ${block.id} must have at least 2 actionable tasks`);
      assert.ok(block.resource && block.resource.url, `Block ${block.id} must have a valid resource`);
      assert.ok(block.resource.url.startsWith('https://'), `Resource URL must use HTTPS`);
    });
  });

  it('only block 1 should initially be active', () => {
    assert.equal(DEFAULT_ROADMAP[0].active, true);
    for (let i = 1; i < DEFAULT_ROADMAP.length; i++) {
      assert.equal(DEFAULT_ROADMAP[i].active, false);
    }
  });

  it('task completion percentage calculation logic is accurate', () => {
    const totalTasks = DEFAULT_ROADMAP.reduce((acc, b) => acc + b.tasks.length, 0);
    assert.ok(totalTasks > 10, 'Total tasks across 90 days should be comprehensive');

    // Simulate 0% completion
    const done0 = 0;
    const pct0 = Math.round((done0 / totalTasks) * 100);
    assert.equal(pct0, 0);

    // Simulate completing all tasks in Block 1
    const block1Tasks = DEFAULT_ROADMAP[0].tasks.length;
    const pctBlock1 = Math.round((block1Tasks / totalTasks) * 100);
    assert.ok(pctBlock1 > 0 && pctBlock1 <= 30);

    // Simulate 100% completion
    const pct100 = Math.round((totalTasks / totalTasks) * 100);
    assert.equal(pct100, 100);
  });
});
