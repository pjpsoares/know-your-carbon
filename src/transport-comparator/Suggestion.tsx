import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../shared';
import { Location } from '../shared/map.service';

export const SuggestionContainer = styled(TouchableOpacity)`
  border-radius: 5px;
  padding: 5px;
  align-items: center;
`;

export const SuggestionText = styled(Text)`
  color: ${Colors.secondary};
  font-size: 16px;
  letter-spacing: 1px;
`;

interface ActionButtonProps {
  suggestion: Location;
  onPress: (location: Location) => void;
}

export const Suggestion: FunctionComponent<ActionButtonProps> = props => {
  return (
    <SuggestionContainer onPress={() => props.onPress(props.suggestion)}>
      <SuggestionText>{props.suggestion.name}</SuggestionText>
    </SuggestionContainer>
  );
};
