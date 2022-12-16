/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import {NativeBaseProvider } from 'native-base';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import AppTab from './navigation/Tabs/AppTab';
import elementTheme from './elementTheme';
import nbTheme from './nbTheme';

import SignInScreen from './screens/UsersScreen/SignInScreen';
import {AppProvider, UserProvider, useUser } from '@realm/react';
import secrets from '../secrets';
import { AppContext } from './models/realm';
import UsersStackScreen from './navigation/Stacks/UsersStackScreen';
import SignUpScreen from './screens/UsersScreen/SignUpScreen';
import Login from './screens/UsersScreen/Login';
// const { RealmProvider, useRealm } = AppContext;

const App = ()=>{

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <AppProvider id={secrets.appID}>
        <UserProvider fallback={<SignInScreen />}>
          <RealmProvider sync={{
            flexible: true,
          }}> */}
            <AppTab />
          {/* </RealmProvider>
        </UserProvider>
      </AppProvider> */}
    </ApplicationProvider>
  )
}


export default function AppWrapper() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={nbTheme}>
        <ThemeProvider theme={elementTheme}>   
            <App />
        </ThemeProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
