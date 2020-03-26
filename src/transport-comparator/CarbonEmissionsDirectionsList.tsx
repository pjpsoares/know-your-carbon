import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../shared';
import { Directions, Step } from '../shared/map.service';
import { CarbonEmissionsDirections } from './CarbonEmissionsDirections';

interface CarbonEmissionsListProps {
  carbonEmissions: Directions[];
  onSelectSteps: (steps: Step[]) => void;
}

const Container = styled(View)`
  background-color: ${Colors.resultBackground};
  padding: 5px;
`;

// eslint-disable-next-line prettier/prettier
export const CarbonEmissionsDirectionsList: FunctionComponent<CarbonEmissionsListProps> = props => {
  const maxEmissions = props.carbonEmissions.reduce(
    (max, carbonEmissionsItem) =>
      Math.max(max, carbonEmissionsItem.carbonEmissions),
    0,
  );

  const getPercentage = (value: number, max: number): number => {
    return (value / max) * 100;
  };

  return (
    <Container>
      {props.carbonEmissions.map((carbonEmissionsItem, index) => {
        return (
          <CarbonEmissionsDirections
            onSelectSteps={props.onSelectSteps}
            key={index}
            directions={carbonEmissionsItem}
            percentage={getPercentage(
              carbonEmissionsItem.carbonEmissions,
              maxEmissions,
            )}
          />
        );
      })}
    </Container>
  );
};
