import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { TabHeaderElement } from './TabHeaderElement';

export const TabContainer = styled(TouchableOpacity)`
  width: 140px;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  margin-bottom: 15px;
  flex-direction: row;
`;

interface TabHeaderProps {
  options: string[];
  onSelect: (selected: number) => void;
  selected: number;
}

export const TabHeader: FunctionComponent<TabHeaderProps> = props => {
  return (
    <TabContainer>
      {props.options.map((option, index) => (
        <TabHeaderElement
          title={option}
          key={index}
          onPress={() => {
            props.onSelect(index);
          }}
          selected={index === props.selected}
        />
      ))}
    </TabContainer>
  );
};
