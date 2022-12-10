/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import React from 'react';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

import FarmlandsScreen from '../../screens/FarmlandsScreen/FarmlandsScreen';

const FarmlandsStack = createNativeStackNavigator();

export default function FarmersStackScreen() {
  return (
      <FarmlandsStack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#005000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
              fontSize: 16,
              fontWeight: 'bold',
          },
        }}
      >
        <FarmlandsStack.Screen name="Farmlands" component={FarmlandsScreen} />
      </FarmlandsStack.Navigator>
  );
}
