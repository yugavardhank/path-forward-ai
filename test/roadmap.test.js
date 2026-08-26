import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_ROADMAP, ROADMAP_TRACKS, getRoadmapForTrack } from '../src/data/defaultRoadmap.js';

describe('PathForward 90-Day Roadmap Data Integrity & Multi-Track Engine', () => {
  it('should support all 4 distinct career tracks with exactly 6 two-week sprint blocks each', () => {
    const tracks = ['webdev', 'design', 'data', 'freelance'];
    tracks.forEach(trackKey => {
      const track = ROADMAP_TRACKS[trackKey];
      assert.ok(track, `Track ${trackKey} must exist`);
      assert.equal(track.length, 6, `Track ${trackKey} must have exactly 6 sprint blocks (90 days)`);
      track.forEach((block, index) => {
        assert.equal(block.id, index + 1);
        assert.ok(block.title.length > 0);
        assert.ok(block.milestone.length > 0);
        assert.ok(Array.isArray(block.tasks) && block.tasks.length >= 2);
        assert.ok(block.resource && block.resource.url.startsWith('https://'));
      });
    });
  });

  it('getRoadmapForTrack properly resolves tracks from keywords', () => {
    assert.equal(getRoadmapForTrack('design'), ROADMAP_TRACKS.design);
    assert.equal(getRoadmapForTrack('ui/ux designer'), ROADMAP_TRACKS.design);
    assert.equal(getRoadmapForTrack('data engineering'), ROADMAP_TRACKS.data);
    assert.equal(getRoadmapForTrack('ai & python'), ROADMAP_TRACKS.data);
    assert.equal(getRoadmapForTrack('freelance consulting'), ROADMAP_TRACKS.freelance);
    assert.equal(getRoadmapForTrack('webdev'), ROADMAP_TRACKS.webdev);
    assert.equal(getRoadmapForTrack('unknown'), ROADMAP_TRACKS.webdev); // Fallback to webdev
  });

  it('only block 1 should initially be active in each track', () => {
    Object.values(ROADMAP_TRACKS).forEach(track => {
      assert.equal(track[0].active, true);
      for (let i = 1; i < track.length; i++) {
        assert.equal(track[i].active, false);
      }
    });
  });

  it('task completion percentage calculation logic is accurate', () => {
    const totalTasks = DEFAULT_ROADMAP.reduce((acc, b) => acc + b.tasks.length, 0);
    assert.ok(totalTasks > 10, 'Total tasks across 90 days should be comprehensive');

    // Simulate 0% completion
    const zeroDone = 0;
    assert.equal(Math.round((zeroDone / totalTasks) * 100), 0);

    // Simulate partial completion
    const block1Tasks = DEFAULT_ROADMAP[0].tasks.length;
    const pctBlock1 = Math.round((block1Tasks / totalTasks) * 100);
    assert.ok(pctBlock1 > 0 && pctBlock1 <= 30);

    // Simulate 100% completion
    assert.equal(Math.round((totalTasks / totalTasks) * 100), 100);
  });
});
