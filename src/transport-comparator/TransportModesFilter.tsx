import React, { FunctionComponent, useState } from 'react';
import { Checkbox } from '../shared/components/Checkbox';
import styled from 'styled-components';
import { View } from 'react-native';
import { ActionButton, Colors } from '../shared';
import { TransportMode, ALL_TRANSPORT_MODES } from './carbon-emission';

interface TransportModesFilterProps {
  selected: TransportMode[];
  onChange: (newSelected: TransportMode[]) => void;
}

const CheckboxesContainer = styled(View)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  background-color: ${Colors.subtleBackground};
  top: 40px;
`;

// eslint-disable-next-line prettier/prettier
export const TransportModesFilter: FunctionComponent<TransportModesFilterProps> = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelected = (transportMode: TransportMode): boolean => {
    return props.selected.indexOf(transportMode) > -1;
  };

  const toggle = (transportMode: TransportMode): void => {
    const indexOfTransportMode = props.selected.indexOf(transportMode);

    if (indexOfTransportMode === -1) {
      // Not found, let's add it
      props.onChange([...props.selected, transportMode]);
    } else {
      // Found, let's remove it
      props.onChange([
        ...props.selected.slice(0, indexOfTransportMode),
        ...props.selected.slice(indexOfTransportMode + 1),
      ]);
    }
  };

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ActionButton title={'Filter'} onPress={toggleExpand} />
      {isExpanded && (
        <CheckboxesContainer>
          {ALL_TRANSPORT_MODES.map((transportMode, index) => {
            return (
              <Checkbox
                key={index}
                label={transportMode}
                onChange={(_: boolean) => toggle(transportMode)}
                selected={isSelected(transportMode)}
              />
            );
          })}
        </CheckboxesContainer>
      )}
    </>
  );
};
