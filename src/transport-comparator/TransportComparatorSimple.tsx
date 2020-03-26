import React, { FunctionComponent, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Colors } from '../shared';
import {
  ALL_TRANSPORT_MODES,
  OptionCarbonEmission,
  TransportMode,
} from './carbon-emission';
import { CarbonEmissionsList } from './CarbonEmissionsList';
import {
  calculateTransportsCarbonEmissions,
  sortOptionsCarbonEmission,
} from './carbon-emissions.service';
import { TransportModesFilter } from './TransportModesFilter';
import styled from 'styled-components';

const DEFAULT_CARBON_EMISSIONS: OptionCarbonEmission[] = sortOptionsCarbonEmission(
  calculateTransportsCarbonEmissions(ALL_TRANSPORT_MODES, 0),
);

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom-width: 0.5px;
  z-index: 2;
`;

const ResultContainer = styled(ScrollView)`
  margin-top: 10px;
  background-color: ${Colors.resultBackground};
  border-radius: 4px;
  margin-bottom: 10px;
  flex-grow: 1;
  z-index: 1;
`;

export const TransportComparatorSimple: FunctionComponent<{}> = () => {
  const [distanceKms, setDistanceKms] = useState(0);
  const [carbonEmissions, setCarbonEmissions] = useState(
    DEFAULT_CARBON_EMISSIONS,
  );
  const [transportModes, setTransportModes] = useState(ALL_TRANSPORT_MODES);

  const updateCarbonEmissions = (
    newTransportModes: TransportMode[],
    newDistanceKms: number = 0,
  ) => {
    const optionsCarbonEmissions = calculateTransportsCarbonEmissions(
      newTransportModes,
      newDistanceKms,
    );
    setCarbonEmissions(sortOptionsCarbonEmission(optionsCarbonEmissions));
  };

  const updateTransportModes = (newTransportModes: TransportMode[]) => {
    setTransportModes(newTransportModes);
    // refresh calculations
    updateCarbonEmissions(newTransportModes, distanceKms);
  };

  const updateDistanceKms = (newDistanceKms: number) => {
    setDistanceKms(newDistanceKms);
    // refresh calculations
    updateCarbonEmissions(transportModes, newDistanceKms);
  };

  return (
    <>
      <InputContainer>
        <Input
          label="Num. Kms"
          value={distanceKms}
          onChange={value => updateDistanceKms(Number(value))}
        />
        <TransportModesFilter
          selected={transportModes}
          onChange={updateTransportModes}
        />
      </InputContainer>
      <ResultContainer>
        <CarbonEmissionsList carbonEmissions={carbonEmissions} />
      </ResultContainer>
    </>
  );
};
