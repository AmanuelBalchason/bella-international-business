import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { filterUnits, prices, units } from './realEstateInventory';

describe('approved Riverside availability', () => {
  test('fully-finished 2-bedroom units are on floors 3, 4 and 10', () => {
    assert.deepEqual(filterUnits('2 Bedroom', 'all', 'full').map(u => u.floor), [3, 4, 10]);
  });
  test('semi-finished 2-bedroom units are on floors 6, 7 and 9', () => {
    assert.deepEqual(filterUnits('2 Bedroom', 'all', 'semi').map(u => u.floor), [6, 7, 9]);
  });
  test('fully-finished 3-bedroom units are on floors 3 and 4', () => {
    assert.deepEqual(filterUnits('3 Bedroom', 'all', 'full').map(u => u.floor), [3, 4]);
  });
  test('semi-finished 3-bedroom units are on floors 7, 8 and 12', () => {
    assert.deepEqual(filterUnits('3 Bedroom', 'all', 'semi').map(u => u.floor), [7, 8, 12]);
  });
  test('only the eleven approved units are listed, all available', () => {
    assert.equal(units.length, 11);
    assert.equal(units.every(u => u.status === 'Available'), true);
    assert.deepEqual(filterUnits('all', '5'), []);
    assert.deepEqual(filterUnits('2 Bedroom', '8'), []);
    assert.deepEqual(filterUnits('3 Bedroom', '10'), []);
  });
});

describe('approved Riverside pricing', () => {
  test('3-bedroom rates are 150,000 semi / 180,000 full per m²', () => {
    assert.equal(prices['3 Bedroom'].semiPerM2, '150,000');
    assert.equal(prices['3 Bedroom'].fullPerM2, '180,000');
  });
  test('2-bedroom rates are 160,000 semi / 190,000 full per m²', () => {
    assert.equal(prices['2 Bedroom'].semiPerM2, '160,000');
    assert.equal(prices['2 Bedroom'].fullPerM2, '190,000');
  });
  test('totals match area × rate', () => {
    assert.equal(prices['3 Bedroom'].semi, '27.6'); // 184 × 150,000 = 27,600,000
    assert.equal(prices['3 Bedroom'].full, '33.1'); // 184 × 180,000 = 33,120,000
    assert.equal(prices['2 Bedroom'].semi, '20.5'); // 128 × 160,000 = 20,480,000
    assert.equal(prices['2 Bedroom'].full, '24.3'); // 128 × 190,000 = 24,320,000
  });
});
