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

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={elementTheme}>
        <NativeBaseProvider theme={nbTheme}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppTab />
          </ApplicationProvider>
        </NativeBaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
