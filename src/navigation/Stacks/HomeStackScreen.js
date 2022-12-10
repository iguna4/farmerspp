/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';


const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
      <HomeStack.Navigator
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
        <HomeStack.Screen
          options={{ title: 'Painel do Extensionista'}}
          name="Home"
          component={HomeScreen}
        />
      </HomeStack.Navigator>
  );
}
