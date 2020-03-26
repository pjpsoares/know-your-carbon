import { TransportMode } from '../transport-comparator/carbon-emission';
import { calculateTransportCarbonEmissions } from '../transport-comparator/carbon-emissions.service';

const GOOGLE_API_KEY = 'INSERT_KEY';
const GOOGLE_BASE_ENDPOINT = 'https://maps.googleapis.com';

const TRANSPORT_MODE_MAP: { [key: string]: TransportMode } = {
  DRIVING: 'car',
  WALKING: 'foot',
  BICYCLING: 'bike',
  TRANSIT: 'public transport',
};

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  placeId: string;
}

export interface Step {
  durationSeconds: number;
  distanceMeters: number;
  transportMode: TransportMode;
  carbonEmissions: number;
  polyline: string;
}

export interface Directions {
  transportMode: TransportMode;
  durationSeconds: number;
  distanceMeters: number;
  steps: Step[];
  carbonEmissions: number;
}

export async function searchAhead(query: string): Promise<Location[]> {
  const fetchResult = await fetch(
    `${GOOGLE_BASE_ENDPOINT}/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${query}`,
  );

  const jsonResult: any = await fetchResult.json();

  return (jsonResult.predictions || []).map((prediction: any) => ({
    name: prediction.description,
    placeId: prediction.place_id,
  }));
}

export async function geocode(placeId: string): Promise<Coordinate> {
  const fetchResult = await fetch(
    `${GOOGLE_BASE_ENDPOINT}/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}&fields=geometry`,
  );

  const jsonResult: any = await fetchResult.json();

  return {
    lat: jsonResult.result.geometry.location.lat,
    lng: jsonResult.result.geometry.location.lng,
  };
}

export async function directionsWithAllTransportModes(
  fromPlaceId: string,
  toPlaceId: string,
): Promise<Directions[]> {
  const [
    walkingDirections,
    bikingDirections,
    publicTransportDirections,
    carDirections,
  ] = await Promise.all([
    directions(fromPlaceId, toPlaceId, 'walking'),
    directions(fromPlaceId, toPlaceId, 'bicycling'),
    directions(fromPlaceId, toPlaceId, 'transit'),
    directions(fromPlaceId, toPlaceId, 'driving'),
  ]);

  return [
    ...walkingDirections,
    ...bikingDirections,
    ...publicTransportDirections,
    ...carDirections,
  ];
}

export async function directions(
  fromPlaceId: string,
  toPlaceId: string,
  transportMode: 'driving' | 'walking' | 'bicycling' | 'transit',
): Promise<Directions[]> {
  const fetchResult = await fetch(
    `${GOOGLE_BASE_ENDPOINT}/maps/api/directions/json?key=${GOOGLE_API_KEY}&origin=place_id:${fromPlaceId}&destination=place_id:${toPlaceId}&mode=${transportMode}`,
  );

  const jsonResult: any = await fetchResult.json();

  const directionsOptions = jsonResult.routes.map((route: any) =>
    mapLeg(route.legs[0], transportMode),
  );

  return directionsOptions;
}

function mapLeg(
  leg: any,
  transportMode: 'driving' | 'walking' | 'bicycling' | 'transit',
): Directions {
  const steps = leg.steps.map(mapStep);
  const groupedSteps = groupSteps(steps);
  const carbonEmissions = groupedSteps.reduce(
    (acc: number, step: Step) => acc + step.carbonEmissions,
    0,
  );

  return {
    transportMode: TRANSPORT_MODE_MAP[transportMode.toUpperCase()],
    distanceMeters: leg.distance.value,
    durationSeconds: leg.duration.value,
    steps: groupedSteps,
    carbonEmissions,
  };
}

function groupSteps(steps: Step[]): Step[] {
  const result: Step[] = [];
  steps.forEach(step => {
    const previousStep = result[result.length - 1];
    if (previousStep && previousStep.transportMode === step.transportMode) {
      previousStep.durationSeconds += step.durationSeconds;
      previousStep.distanceMeters += step.distanceMeters;
      previousStep.carbonEmissions += step.carbonEmissions;
    } else {
      result.push({ ...step });
    }
  });

  return result;
}

function mapStep(step: any): Step {
  const transportMode = TRANSPORT_MODE_MAP[step.travel_mode];
  return {
    distanceMeters: step.distance.value,
    durationSeconds: step.duration.value,
    polyline: step.polyline.points,
    transportMode,
    carbonEmissions: calculateTransportCarbonEmissions(
      transportMode,
      step.distance.value / 1000,
    ),
  };
}
