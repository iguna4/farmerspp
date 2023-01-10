/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, View, Text } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import {NativeBaseProvider } from 'native-base';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout,  } from '@ui-kitten/components';



import AppTab from './navigation/Tabs/AppTab';
import elementTheme from './elementTheme';
import nbTheme from './nbTheme';

// import SignInScreen from './screens/UsersScreen/SignInScreen';
// import secrets from '../secrets';
// import { AppContext } from './models/realm';
// import UsersStackScreen from './navigation/Stacks/UsersStackScreen';
// import SignUpScreen from './screens/UsersScreen/SignUpScreen';
// import Login from './screens/UsersScreen/Login';

import Realm from 'realm';
import {AppProvider, UserProvider, useUser } from '@realm/react';
import { realmContext } from './models/realm';
import { secrets } from './secrets';
import Login from './screens/Fallback/Login';
const { RealmProvider} = realmContext;

const App = ()=>{

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  // app configuration
  // const app = new Realm.App({
  //   id: secrets.appID,
  // });

  // console.log('app object: ', JSON.stringify(app))

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="ghostwhite" />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppProvider id={secrets.appID}>
        {/* <UserProvider  */}
        {/* // fallback={<Login />} */}
        {/* > */}
          {/* <RealmProvider 
            sync={{
              flexible: true,
              onError: (_, error)=>{
                console.log('Error:', error);
              }
            }}
            fallback={<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading..</Text></View>}
          > */}
            <AppTab />
          {/* </RealmProvider> */}
        {/* </UserProvider> */}
      </AppProvider>
    </ApplicationProvider>
    </>
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
