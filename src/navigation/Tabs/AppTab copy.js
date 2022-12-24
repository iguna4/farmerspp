/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import HomeStackScreen from '../Stacks/HomeStackScreen';
import FarmersStackScreen from '../Stacks/FarmersStackScreen';
import UsersStackScreen from '../Stacks/UsersStackScreen';
import {Icon } from '@rneui/themed';


// import { AppContext } from '../../models/realm';
import { User } from '../../models/User';
// const { useRealm } = AppContext;

const Tab = createBottomTabNavigator();


export default function AppTab() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const appRealm = useRealm();



  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#005000" />
    <NavigationContainer>
      {/* {
        !isSignedIn ?
        (
          <>
            <UsersStackScreen />
          </>
        )
        :
        ( */}
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
      {/* )
    } */}
    </NavigationContainer>
    </>
  );
}
