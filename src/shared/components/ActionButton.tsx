import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../colors';

export const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${props =>
    props.disabled ? Colors.subtleBackground : Colors.focusBackground};
  width: 140px;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: ${Colors.primary};
  font-size: 16px;
  letter-spacing: 1px;
`;

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

export const ActionButton: FunctionComponent<ActionButtonProps> = props => {
  return (
    <ButtonContainer onPress={props.onPress} disabled={props.disabled}>
      <ButtonText>{props.title}</ButtonText>
    </ButtonContainer>
  );
};
