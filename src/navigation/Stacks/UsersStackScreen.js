/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../../screens/UsersScreen/SignInScreen';
import SignUpScreen from '../../screens/UsersScreen/SignUpScreen';



const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
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
        <HomeStack.Screen  name="SignIn" component={SignInScreen} />
        <HomeStack.Screen options={{ headerShown: true, title: 'Novo Usuário' }} name="SignUp" component={SignUpScreen} />
      </HomeStack.Navigator>
  );
}
