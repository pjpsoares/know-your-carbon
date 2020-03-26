/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Header } from './Header';
import { TransportComparator } from './transport-comparator/TransportComparator';
import styled from 'styled-components';
import { Colors } from './shared';

const Container = styled(SafeAreaView)`
  height: 100%;
`;

const Main = styled(View)`
  background-color: ${Colors.mainBackground};
  padding: 16px;
  flex-grow: 1;
`;

const App = () => {
  return (
    <Container>
      <Header />
      <Main>
        <TransportComparator />
      </Main>
    </Container>
  );
};

export default App;
