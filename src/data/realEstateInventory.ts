export type UnitType = '3 Bedroom' | '2 Bedroom';
export type Finishing = 'semi' | 'full';
export type ResidenceUnit = {
  floor: number;
  type: UnitType;
  view: 'City Side' | 'River Side';
  finishing: Finishing;
  status: 'Available';
};

export const units: ResidenceUnit[] = [
  { floor: 3, type: '2 Bedroom', view: 'River Side', finishing: 'full', status: 'Available' },
  { floor: 4, type: '2 Bedroom', view: 'River Side', finishing: 'full', status: 'Available' },
  { floor: 10, type: '2 Bedroom', view: 'River Side', finishing: 'full', status: 'Available' },
  { floor: 6, type: '2 Bedroom', view: 'River Side', finishing: 'semi', status: 'Available' },
  { floor: 7, type: '2 Bedroom', view: 'River Side', finishing: 'semi', status: 'Available' },
  { floor: 9, type: '2 Bedroom', view: 'River Side', finishing: 'semi', status: 'Available' },
  { floor: 3, type: '3 Bedroom', view: 'City Side', finishing: 'full', status: 'Available' },
  { floor: 4, type: '3 Bedroom', view: 'City Side', finishing: 'full', status: 'Available' },
  { floor: 7, type: '3 Bedroom', view: 'City Side', finishing: 'semi', status: 'Available' },
  { floor: 8, type: '3 Bedroom', view: 'City Side', finishing: 'semi', status: 'Available' },
  { floor: 12, type: '3 Bedroom', view: 'City Side', finishing: 'semi', status: 'Available' },
];
export const floors = [...new Set(units.map((unit) => unit.floor))].sort((a, b) => a - b);

export function filterUnits(type: string, floor: string, finishing: string = 'all') {
  return units.filter(
    (unit) =>
      (type === 'all' || unit.type === type) &&
      (floor === 'all' || String(unit.floor) === floor) &&
      (finishing === 'all' || unit.finishing === finishing)
  );
}

export const paymentTerms = '50% down at signature · balance negotiable over 6 months';

export const prices = {
  '3 Bedroom': { semi: '27.6', full: '33.1', semiPerM2: '150,000', fullPerM2: '180,000', area: '184' },
  '2 Bedroom': { semi: '20.5', full: '24.3', semiPerM2: '160,000', fullPerM2: '190,000', area: '128' },
};
