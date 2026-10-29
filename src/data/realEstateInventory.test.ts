import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { discountDeadline, filterUnits, units } from './realEstateInventory';

describe('approved Riverside availability', () => {
  test('2-bedroom availability is limited to floors 5, 6 and 7', () => {
    assert.deepEqual(filterUnits('2 Bedroom', 'all').map(u => u.floor).sort(), [5, 6, 7]);
  });
  test('3-bedroom availability is limited to floors 8 and 10', () => {
    assert.deepEqual(filterUnits('3 Bedroom', 'all').map(u => u.floor).sort((a, b) => a - b), [8, 10]);
  });
  test('only the five approved units are listed as available', () => {
    assert.equal(units.length, 5);
    assert.equal(units.every(u => u.status === 'Available'), true);
    assert.deepEqual(filterUnits('all', '9'), []);
    assert.deepEqual(filterUnits('2 Bedroom', '10'), []);
    assert.equal(filterUnits('3 Bedroom', '8').length, 1);
  });
  test('discount deadline is November 5, 2026', () => {
    assert.equal(new Date(`${discountDeadline}T00:00:00Z`).toISOString(), '2026-11-05T00:00:00.000Z');
  });
});