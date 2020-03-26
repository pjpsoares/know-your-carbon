import React, { FunctionComponent } from 'react';
import { Switch, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../colors';

interface CheckboxProps {
  label: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
}

const CheckboxContainer = styled(View)`
  flex-direction: row;
  margin: 5px;
  padding: 4px 8px;
  align-items: center;
  background-color: ${Colors.subtleBackground};
  border-radius: 15px;
`;

const CheckboxLabel = styled(Text)`
  margin-right: 5px;
`;

const CheckboxSwitch = styled(Switch)``;

// eslint-disable-next-line prettier/prettier
export const Checkbox: FunctionComponent<CheckboxProps> = props => {
  return (
    <CheckboxContainer>
      <CheckboxLabel>{props.label}</CheckboxLabel>
      <CheckboxSwitch
        onValueChange={(_: boolean) => props.onChange(!props.selected)}
        value={props.selected}
      />
    </CheckboxContainer>
  );
};
