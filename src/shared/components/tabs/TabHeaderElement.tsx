import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../colors';

export const TabElementContainer = styled(TouchableOpacity)<{
  selected: boolean;
}>`
  width: 140px;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  background-color: ${props =>
    props.selected ? Colors.resultBackground : 'transparent'};
`;

export const TabElementText = styled(Text)<{
  selected: boolean;
}>`
  font-size: 16px;
  letter-spacing: 1px;
  color: ${props => (props.selected ? Colors.secondary : Colors.primary)};
`;

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  selected: boolean;
}

export const TabHeaderElement: FunctionComponent<ActionButtonProps> = props => {
  return (
    <TabElementContainer onPress={props.onPress} selected={props.selected}>
      <TabElementText selected={props.selected}>{props.title}</TabElementText>
    </TabElementContainer>
  );
};
