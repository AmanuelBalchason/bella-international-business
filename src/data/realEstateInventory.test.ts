import { describe, expect, test } from 'bun:test';
import { discountDeadline, filterUnits, units } from './realEstateInventory';

describe('approved Riverside availability', () => {
  test('2-bedroom availability is limited to floors 5, 6 and 7', () => {
    expect(filterUnits('2 Bedroom', 'all').map(u => u.floor).sort()).toEqual([5, 6, 7]);
  });
  test('3-bedroom availability is limited to floors 8 and 10', () => {
    expect(filterUnits('3 Bedroom', 'all').map(u => u.floor).sort((a, b) => a - b)).toEqual([8, 10]);
  });
  test('only the five approved units are listed as available', () => {
    expect(units).toHaveLength(5);
    expect(units.every(u => u.status === 'Available')).toBe(true);
    expect(filterUnits('all', '9')).toEqual([]);
    expect(filterUnits('2 Bedroom', '10')).toEqual([]);
    expect(filterUnits('3 Bedroom', '8')).toHaveLength(1);
  });
  test('discount deadline is November 5, 2026', () => {
    expect(new Date(`${discountDeadline}T00:00:00Z`).toISOString()).toBe('2026-11-05T00:00:00.000Z');
  });
});