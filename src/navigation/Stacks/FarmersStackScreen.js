/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import React from 'react';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

import FarmersScreen from '../../screens/FarmersScreen/FarmersScreen';
import FarmerForm1Screen from '../../screens/FarmerForm1Screen/FarmerForm1Screen';
import FarmlandForm1Screen from '../../screens/FarmlandForm1Screen/FarmlandForm1Screen';
import FarmlandAreaAuditScreen from '../../screens/FarmlandAreaAuditScreen/FarmlandAreaAuditScreen';
import FarmerScreen from '../../screens/FarmerScreen/FarmerScreen';
import InstitutionScreen from '../../screens/InstitutionScreen/InstitutionScreen';
import GroupScreen from '../../screens/GroupScreen/GroupScreen';

const FarmersStack = createNativeStackNavigator();

export default function FarmersStackScreen() {
  return (
      <FarmersStack.Navigator
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
          title: 'Produtores',
        }}
      >
        <FarmersStack.Screen name="Farmers" component={FarmersScreen} />
        <FarmersStack.Screen name="FarmerForm1" component={FarmerForm1Screen} />
        <FarmersStack.Screen name="FarmlandForm1" component={FarmlandForm1Screen} />
        <FarmersStack.Screen name="FarmlandAreaAudit" component={FarmlandAreaAuditScreen} />
        {/* <FarmersStack.Screen name="IndividualFarmerForm" component={IndividualFarmerForm} /> */}
        {/* <FarmersStack.Screen name="InstitutionalFarmer" component={IndividualFarmerForm} /> */}
        {/* <FarmersStack.Screen name="GroupFarmer" component={IndividualFarmerForm} /> */}

        <FarmersStack.Screen name="Farmer" component={FarmerScreen} />
        <FarmersStack.Screen name="Group" component={GroupScreen} />
        <FarmersStack.Screen name="Institution" component={InstitutionScreen} />

      </FarmersStack.Navigator>
  );
}
