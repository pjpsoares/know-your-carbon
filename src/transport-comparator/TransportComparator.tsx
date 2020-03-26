import React, { FunctionComponent, useState } from 'react';
import { TransportComparatorSimple } from './TransportComparatorSimple';
import { TabHeader } from '../shared/components/tabs/TabHeader';
import { TransportComparatorDirections } from './TransportComparatorDirections';

export const TransportComparator: FunctionComponent<{}> = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <TabHeader
        options={['Simple', 'Directions']}
        selected={tabIndex}
        onSelect={setTabIndex}
      />

      {tabIndex === 0 ? <TransportComparatorSimple /> : undefined}
      {tabIndex === 1 ? <TransportComparatorDirections /> : undefined}
    </>
  );
};
