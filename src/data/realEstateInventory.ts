export type UnitType = '3 Bedroom' | '2 Bedroom';
export type ResidenceUnit = { floor: number; type: UnitType; view: 'City Side' | 'River Side'; status: 'Available' };

export const discountDeadline = '2026-11-05';
export const units: ResidenceUnit[] = [
  { floor: 10, type: '3 Bedroom', view: 'City Side', status: 'Available' },
  { floor: 8, type: '3 Bedroom', view: 'City Side', status: 'Available' },
  { floor: 7, type: '2 Bedroom', view: 'River Side', status: 'Available' },
  { floor: 6, type: '2 Bedroom', view: 'River Side', status: 'Available' },
  { floor: 5, type: '2 Bedroom', view: 'River Side', status: 'Available' },
];
export const floors = [...new Set(units.map((unit) => unit.floor))];

export function filterUnits(type: string, floor: string) {
  return units.filter((unit) => (type === 'all' || unit.type === type) && (floor === 'all' || String(unit.floor) === floor));
}

export const prices = { '3 Bedroom': { semi: '23.9', full: '31.2', area: '184' }, '2 Bedroom': { semi: '17.9', full: '23.0', area: '128' } };