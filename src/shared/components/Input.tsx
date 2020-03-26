import React, { FunctionComponent } from 'react';
import { TextInput, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../colors';

const InputContainer = styled(View)`
  flex-direction: column;
  align-items: center;
  color: ${Colors.secondary};
`;
const InputLabel = styled(Text)``;
const InputInput = styled(TextInput)`
  border-bottom-width: 1px;
  width: 140px;
  margin-top: 2px;
  text-align: center;
  color: ${Colors.secondary};
`;

interface InputProps {
  label: string;
  value: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const Input: FunctionComponent<InputProps> = (props: InputProps) => {
  return (
    <InputContainer>
      <InputLabel>{props.label}</InputLabel>
      <InputInput
        value={props.value.toString()}
        onBlur={() => props.onBlur && props.onBlur()}
        onChange={event =>
          props.onChange && props.onChange(event.nativeEvent.text)
        }
      />
    </InputContainer>
  );
};
