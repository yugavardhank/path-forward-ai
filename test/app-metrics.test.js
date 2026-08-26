import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function calculateVelocity(doneTasks, totalTasks) {
  if (!totalTasks || totalTasks <= 0) return 0;
  return Math.round((doneTasks / totalTasks) * 100);
}

function calculateStudyMetrics(doneTasks) {
  const hoursLogged = 12 + (doneTasks * 6);
  const skillsMastered = Math.max(2, Math.floor(doneTasks * 1.5) + 2);
  return { hoursLogged, skillsMastered };
}

describe('PathForward Metric Calculations & Velocity Engine', () => {
  it('correctly calculates sprint velocity ratio', () => {
    assert.equal(calculateVelocity(0, 14), 0);
    assert.equal(calculateVelocity(7, 14), 50);
    assert.equal(calculateVelocity(14, 14), 100);
    assert.equal(calculateVelocity(5, 0), 0);
  });

  it('study hours and skills mastered scale predictably with task completion', () => {
    const baseline = calculateStudyMetrics(0);
    assert.equal(baseline.hoursLogged, 12);
    assert.equal(baseline.skillsMastered, 2);

    const step3 = calculateStudyMetrics(3);
    assert.equal(step3.hoursLogged, 30);
    assert.ok(step3.skillsMastered >= 6);
  });
});
