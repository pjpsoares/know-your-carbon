import { TransportMode, OptionCarbonEmission } from './carbon-emission';

export function sortOptionsCarbonEmission(
  optionsCarbonEmissions: OptionCarbonEmission[],
): OptionCarbonEmission[] {
  // We make a shallow clone as sort mutates the object
  const result = [...optionsCarbonEmissions];

  result.sort(
    (option1, option2) => option1.carbonEmissions - option2.carbonEmissions,
  );

  return result;
}

function getCarbonIntensity(transportMode: TransportMode): number {
  switch (transportMode) {
    case 'bus':
      return 103 / 1000.0;
    // https://static.ducky.eco/calculator_documentation.pdf, Ecoinvent 3 Regular bus, includes production = 9g
    case 'car':
      return 0.1771;
    // https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019, average of diesel and petrol
    case 'motorbike':
      // https://static.ducky.eco/calculator_documentation.pdf, Ecoinvent Scooter, production = 14g
      return 108 / 1000.0;
    case 'train':
      return 42 / 1000.0;
    // https://static.ducky.eco/calculator_documentation.pdf, Andersen 2007
    case 'public transport':
      // Average of train and bus
      return (
        0.5 * getCarbonIntensity('train') + 0.5 * getCarbonIntensity('bus')
      );
    case 'ferry':
      // See https://en.wikipedia.org/wiki/Carbon_footprint
      return 120 / 1000.0;
    case 'bike':
      // https://ecf.com/files/wp-content/uploads/ECF_BROCHURE_EN_planche.pdf
      return 5 / 1000.0;
    case 'ebike':
      // https://ecf.com/files/wp-content/uploads/ECF_BROCHURE_EN_planche.pdf
      return 17 / 1000.0;
    case 'escooter':
      // https://iopscience.iop.org/article/10.1088/1748-9326/ab2da8
      return 125.517 / 1000.0;
    case 'foot':
      // https://www.ademe.fr/sites/default/files/assets/documents/poids_carbone-biens-equipement-201809-rapport.pdf
      // Using the average footprint of shoes (18kg CO2eq/pair) and using a life expectancy of a shoe of 500km
      return 36 / 1000.0;
    default:
      throw Error(`Unknown transportation mode: ${transportMode}`);
  }
}

/*
Carbon emissions of an activity (in kgCO2eq)
*/
export function calculateTransportCarbonEmissions(
  transportMode: TransportMode,
  distanceKms: number,
): number {
  // Take into account the passenger count if this is a car or motorbike
  // if (
  //   activity.transportationMode === TRANSPORTATION_MODE_CAR ||
  //   activity.transportationMode === TRANSPORTATION_MODE_MOTORBIKE
  // ) {
  //   return (
  //     (carbonIntensity(activity.transportationMode) * distanceKilometers) /
  //     (activity.participants || 1)
  //   );
  // }

  return getCarbonIntensity(transportMode) * distanceKms;
}

export function calculateTransportsCarbonEmissions(
  transportModes: TransportMode[],
  distanceKms: number,
): OptionCarbonEmission[] {
  return transportModes.map(transportMode => ({
    option: transportMode,
    carbonEmissions: calculateTransportCarbonEmissions(
      transportMode,
      distanceKms,
    ),
  }));
}
