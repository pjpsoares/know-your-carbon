import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { Colors } from './shared';

const HeaderContainer = styled(View)`
  background-color: ${Colors.headerBackground};
  padding: 16px;
`;

const HeaderTitle = styled(Text)`
  color: ${Colors.primary};
  font-size: 22px;
  font-weight: bold;
`;

export const Header: FunctionComponent<{}> = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Know Your Carbon</HeaderTitle>
    </HeaderContainer>
  );
};
