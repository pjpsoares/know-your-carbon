export interface OptionCarbonEmission {
  option: TransportMode;
  carbonEmissions: number;
}

export type TransportMode =
  | 'bike'
  | 'ebike'
  | 'car'
  | 'bus'
  | 'public transport'
  | 'train'
  | 'ferry'
  | 'escooter'
  | 'motorbike'
  | 'foot';

export const ALL_TRANSPORT_MODES: TransportMode[] = [
  'bike',
  'ebike',
  'car',
  'bus',
  'public transport',
  'train',
  'ferry',
  'escooter',
  'motorbike',
  'foot',
];
