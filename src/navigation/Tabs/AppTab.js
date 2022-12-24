/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import HomeStackScreen from '../Stacks/HomeStackScreen';
import FarmersStackScreen from '../Stacks/FarmersStackScreen';
import {Icon } from '@rneui/themed';
import Login from '../../screens/Fallback/Login';

import { realmContext } from '../../models/realm';
const { RealmProvider} = realmContext;


const Tab = createBottomTabNavigator();


export default function AppTab() {




  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#005000" />
    <RealmProvider>
    <NavigationContainer>
        <Tab.Navigator
        initialRouteName="HomeStack"
        shifting={true}
        labeled={false}
        screenOptions={({ route })=>({
          headerShown: false,
        })}>
          <Tab.Screen
            options={{
              tabBarIcon: ()=><Icon name="home" color="grey" size={40} />,
              tabBarLabel: 'Painel',
            }}
            name="HomeStack"
            component={HomeStackScreen}
            />
          <Tab.Screen
            options={{
              tabBarIcon: ()=><Icon name="people" color="grey" size={40} />,
              tabBarLabel: 'Produtores',
            }}
            name="FarmersStack"
            component={FarmersStackScreen}
           />
      </Tab.Navigator>
    </NavigationContainer>
    </RealmProvider>
    </>
  );
}
