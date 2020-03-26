import React, { FunctionComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../shared';

const CARBON_FOOTPRINT_PRECISION = 2;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  height: 30px;
`;

const OptionText = styled(Text)`
  width: 120px;
  color: ${Colors.secondary};
`;

const CarbonText = styled(Text)`
  margin-left: 10px;
  width: 50px;
  color: ${Colors.secondary};
`;

const BarContainer = styled(View)`
  flex-grow: 1;
`;

const Bar = styled(TouchableOpacity)`
  background-color: ${Colors.focusBackground};
  height: 20px;
`;

interface CarbonEmissionsProps {
  option: string;
  carbonEmissions: number;
  percentage: number;
}

// eslint-disable-next-line prettier/prettier
export const CarbonEmissions: FunctionComponent<CarbonEmissionsProps> = props => {
  const formatCarbonEmissions = (value: number): string => {
    return value.toFixed(CARBON_FOOTPRINT_PRECISION);
  };

  return (
    <Container>
      <OptionText>{props.option}</OptionText>
      <BarContainer>
        <Bar style={{ width: `${props.percentage}%` }} />
      </BarContainer>
      <CarbonText>{formatCarbonEmissions(props.carbonEmissions)}</CarbonText>
    </Container>
  );
};
