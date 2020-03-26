import React, { FunctionComponent, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Colors, ActionButton } from '../shared';
import styled from 'styled-components';
import {
  searchAhead,
  Location,
  directionsWithAllTransportModes,
  Directions,
  geocode,
  Step,
} from '../shared/map.service';
import { useDebouncedCallback } from 'use-debounce';
import { Suggestion } from './Suggestion';
import { CarbonEmissionsDirectionsList } from './CarbonEmissionsDirectionsList';
import MapView, { Marker, Polyline, LatLng } from 'react-native-maps';
import polyline from '@mapbox/polyline';

const DEBOUNCE_TIME = 500;

const InputContainer = styled(View)`
  flex-direction: column;
`;

const MapContainer = styled(View)`
  height: 200px;
  width: 100%;
  margin-top: 10px;
`;

const InputFieldsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ResultContainer = styled(ScrollView)`
  margin-top: 10px;
  background-color: ${Colors.resultBackground};
  border-radius: 4px;
  margin-bottom: 10px;
  flex-grow: 1;
`;

const SuggestionsContainer = styled(ScrollView)`
  margin-top: 10px;
  background-color: ${Colors.subtleBackground};
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

export const TransportComparatorDirections: FunctionComponent<{}> = () => {
  console.log(polyline.decode('o`prI}{elAQtC]IICI@K?i@DM@I@I?U??~A'));

  const [from, setFrom] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([] as Location[]);
  const [fromPlaceId, setFromPlaceId] = useState('');
  const [fromCoordinate, setFromCoordinate] = useState(undefined);

  const [to, setTo] = useState('');
  const [toSuggestions, setToSuggestions] = useState([] as Location[]);
  const [toPlaceId, setToPlaceId] = useState('');
  const [toCoordinate, setToCoordinate] = useState(undefined);

  const [directions, setDirections] = useState([] as Directions[]);

  const [selectedSteps, setSelectedSteps] = useState([] as Step[]);

  const [updateFromSuggestions] = useDebouncedCallback(async (text: string) => {
    const locations = await searchAhead(text);
    setFromSuggestions(locations);
  }, DEBOUNCE_TIME);

  const [updateToSuggestions] = useDebouncedCallback(async (text: string) => {
    const locations = await searchAhead(text);
    setToSuggestions(locations);
  }, DEBOUNCE_TIME);

  const updateFrom = (text: string): void => {
    setFrom(text);
    updateFromSuggestions(text);
  };

  const updateTo = (text: string): void => {
    setTo(text);
    updateToSuggestions(text);
  };

  const selectFromSuggestion = async (suggestion: Location): Promise<void> => {
    setFrom(suggestion.name);
    setFromSuggestions([]);
    setFromPlaceId(suggestion.placeId);

    setFromCoordinate((await geocode(suggestion.placeId)) as any);
  };

  const selectToSuggestion = async (suggestion: Location): Promise<void> => {
    setTo(suggestion.name);
    setToSuggestions([]);
    setToPlaceId(suggestion.placeId);

    setToCoordinate((await geocode(suggestion.placeId)) as any);
  };

  const compareWithDirections = async (): Promise<void> => {
    if (!fromPlaceId.length || !toPlaceId.length) {
      return;
    }

    const directionsResult = await directionsWithAllTransportModes(
      fromPlaceId,
      toPlaceId,
    );

    setDirections(directionsResult);
  };

  const getCoordinates = (step: Step): LatLng[] => {
    const points = polyline.decode(step.polyline);
    return points.map((pointArray: any) => ({
      latitude: pointArray[0],
      longitude: pointArray[1],
    }));
  };

  return (
    <>
      <InputContainer>
        <InputFieldsContainer>
          <Input
            label="From"
            value={from}
            onChange={(value: any) => updateFrom(value)}
          />
          <Input
            label="To"
            value={to}
            onChange={(value: any) => updateTo(value)}
          />
        </InputFieldsContainer>
        <ActionButton
          title={'Compare'}
          onPress={compareWithDirections}
          disabled={!fromPlaceId.length || !toPlaceId.length}
        />
        {fromSuggestions.length ? (
          <SuggestionsContainer>
            {fromSuggestions.map((location, index) => {
              return (
                <Suggestion
                  key={index}
                  suggestion={location}
                  onPress={selectFromSuggestion}
                />
              );
            })}
          </SuggestionsContainer>
        ) : (
          undefined
        )}
        {toSuggestions.length ? (
          <SuggestionsContainer>
            {toSuggestions.map((location, index) => {
              return (
                <Suggestion
                  key={index}
                  suggestion={location}
                  onPress={selectToSuggestion}
                />
              );
            })}
          </SuggestionsContainer>
        ) : (
          undefined
        )}
      </InputContainer>
      <MapContainer>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 55.623830838,
            longitude: 12.641497434,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {fromCoordinate && (
            <Marker
              coordinate={{
                latitude: (fromCoordinate as any).lat,
                longitude: (fromCoordinate as any).lng,
              }}
              title={'From'}
              description={from}
            />
          )}
          {toCoordinate && (
            <Marker
              coordinate={{
                latitude: (toCoordinate as any).lat,
                longitude: (toCoordinate as any).lng,
              }}
              title={'To'}
              description={to}
            />
          )}
          {selectedSteps.length
            ? selectedSteps.map((step, index) => {
                return (
                  <Polyline key={index} coordinates={getCoordinates(step)} />
                );
              })
            : undefined}
        </MapView>
      </MapContainer>
      <ResultContainer>
        <CarbonEmissionsDirectionsList
          carbonEmissions={directions}
          onSelectSteps={setSelectedSteps}
        />
      </ResultContainer>
    </>
  );
};
