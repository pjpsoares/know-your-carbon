import React, { FunctionComponent, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../shared';
import { Directions, Step } from 'src/shared/map.service';

const CARBON_FOOTPRINT_PRECISION = 2;

const formatCarbonEmissions = (value: number): string => {
  return value.toFixed(CARBON_FOOTPRINT_PRECISION);
};

const formatDistance = (valueMeters: number): string => {
  return (valueMeters / 1000).toFixed(1) + ' kms';
};

const formatTime = (valueSeconds: number): string => {
  return (valueSeconds / 60).toFixed(0) + ' mins';
};

const MainContainer = styled(View)`
  border-bottom-width: 0.5px;
`;

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const DetailsItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 60px;
  background-color: ${Colors.subtleBackground};
`;

const DetailsContainer = styled(View)`
  flex-direction: column;
  width: 100%;
`;

const DescriptionContainer = styled(View)`
  flex-direction: column;
  width: 120px;
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

const Bar = styled(View)`
  background-color: ${Colors.focusBackground};
  height: 20px;
`;

interface CarbonEmissionsProps {
  directions: Directions;
  percentage: number;
  onSelectSteps: (steps: Step[]) => void;
}

// eslint-disable-next-line prettier/prettier
export const CarbonEmissionsDirections: FunctionComponent<CarbonEmissionsProps> = props => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const toggleDetails = () => {
    props.onSelectSteps(props.directions.steps);
    if (props.directions.steps.length > 1) {
      setDetailsExpanded(!detailsExpanded);
    }
  };

  return (
    <MainContainer>
      <Container onPress={toggleDetails}>
        <DescriptionContainer>
          <OptionText>{props.directions.transportMode}</OptionText>
          <OptionText>
            {formatDistance(props.directions.distanceMeters)}
          </OptionText>
          <OptionText>
            {formatTime(props.directions.durationSeconds)}
          </OptionText>
        </DescriptionContainer>

        <BarContainer>
          <Bar style={{ width: `${props.percentage}%` }} />
        </BarContainer>
        <CarbonText>
          {formatCarbonEmissions(props.directions.carbonEmissions)}
        </CarbonText>
      </Container>
      {detailsExpanded && (
        <DetailsContainer>
          {props.directions.steps.map((step, index) => {
            return (
              <DetailsItem
                key={index}
                step={step}
                max={props.directions.carbonEmissions}
                maxPercentage={props.percentage}
              />
            );
          })}
        </DetailsContainer>
      )}
    </MainContainer>
  );
};

export const DetailsItem: FunctionComponent<{
  step: Step;
  max: number;
  maxPercentage: number;
}> = props => {
  const calculatePercentage = (value: number): number => {
    return (value / props.max) * (props.maxPercentage / 100) * 100;
  };

  return (
    <DetailsItemContainer>
      <DescriptionContainer>
        <OptionText>{props.step.transportMode}</OptionText>
        <OptionText>{formatDistance(props.step.distanceMeters)}</OptionText>
        <OptionText>{formatTime(props.step.durationSeconds)}</OptionText>
      </DescriptionContainer>
      <BarContainer>
        <Bar
          style={{
            width: `${calculatePercentage(props.step.carbonEmissions)}%`,
          }}
        />
      </BarContainer>
      <CarbonText>
        {formatCarbonEmissions(props.step.carbonEmissions)}
      </CarbonText>
    </DetailsItemContainer>
  );
};
