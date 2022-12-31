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


const navigationTheme = {
  colors: {
    backgroundColor: '#005000',
  }
}

export default function AppTab() {

  // const realm = useRealm();

  // realm.write(()=>{
    
  // })




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
          tabBarStyle: {
            // position: 'absolute',
            minHeight: 60,
            marginTop: 0,
            // backgroundColor: 'grey',
          },
          // tabBarActiveTintColor: '#ffffff',
          tabBarIconStyle: {
            // color: '#005000',
          },
          tabBarActiveBackgroundColor: '#EBEBE4',
          tabBarInactiveBackgroundColor: '#EBEBE4',
          tabBarAllowFontScaling: true,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: 'true',
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'JosefinSans-Bold',
          }
          
        })}
        >
          <Tab.Screen
            options={{
              tabBarIcon: (tabInfo)=><Icon 
                        name="home" 
                        color={tabInfo.focused ? "#005000": 'grey'}
                        size={50} />,
              tabBarLabel: 'Painel',
              // tabBarInactiveBackgroundColor
            }}
            name="HomeStack"
            component={HomeStackScreen}
            />
          <Tab.Screen
            options={{
              tabBarIcon: (tabInfo)=><Icon 
                        name="people" 
                        color={tabInfo.focused ? "#005000": 'grey'} 
                        size={50} />,
              tabBarLabel: 'Produtores',
            }}
            name="FarmersStack"
            component={FarmersStackScreen}
           />
          <Tab.Screen
            options={{
              tabBarIcon: (tabInfo)=><Icon 
                        name="search" 
                        color={tabInfo.focused ? "#005000": 'grey'} 
                        size={50} />,
              tabBarLabel: 'Pesquisa',
            }}
            name="UsersStack"
            component={FarmersStackScreen}
           />
      </Tab.Navigator>
    </NavigationContainer>
    </RealmProvider>
    </>
  );
}
