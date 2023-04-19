/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from '@rneui/themed';
import {NativeBaseProvider } from 'native-base';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,  } from '@ui-kitten/components';
import { Provider as PaperProvider } from 'react-native-paper';

import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt);


import AppTabs from './navigation/Tabs/AppTabs';
import elementTheme from './elementTheme';
import nbTheme from './nbTheme';
import WelcomeScreen from './screens/Fallback/WelcomeScreen';
import CustomActivityIndicator from './components/ActivityIndicator/CustomActivityIndicator';

import {enableLatestRenderer} from 'react-native-maps';


import { secrets } from './secrets';
import { AppProvider, UserProvider } from '@realm/react';
import { realmContext } from './models/realmContext';
const { RealmProvider} = realmContext;


// enableLatestRenderer();



export default function App() {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#EBEBE4" />
    <SafeAreaProvider>
      <NativeBaseProvider theme={nbTheme}>
        <ThemeProvider theme={elementTheme}>   
          <ApplicationProvider {...eva} theme={eva.light}>


            <AppProvider id={secrets.appID} baseUrl={secrets.baseUrl}>
              <UserProvider 
                fallback={<WelcomeScreen />}
              >
                <RealmProvider 
                  sync={{
                    flexible: true,
                    onError: (_, error)=>{
                      console.log('Error:', error);
                    }
                  }}
                  fallback={<CustomActivityIndicator />}
                >
                  <PaperProvider>
                    <AppTabs />
                  </PaperProvider>
                </RealmProvider>
              </UserProvider>
            </AppProvider>


          </ApplicationProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
    </>
  );
}
