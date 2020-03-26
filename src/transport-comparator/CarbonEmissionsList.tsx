import React, { FunctionComponent } from 'react';
import { CarbonEmissions } from './CarbonEmissions';
import { View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../shared';
import { OptionCarbonEmission } from './carbon-emission';

interface CarbonEmissionsListProps {
  carbonEmissions: OptionCarbonEmission[];
}

const Container = styled(View)`
  background-color: ${Colors.resultBackground};
  padding: 5px;
`;

// eslint-disable-next-line prettier/prettier
export const CarbonEmissionsList: FunctionComponent<CarbonEmissionsListProps> = props => {
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
          <CarbonEmissions
            key={index}
            option={carbonEmissionsItem.option}
            carbonEmissions={carbonEmissionsItem.carbonEmissions}
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
