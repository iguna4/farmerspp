/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { View, Text } from 'react-native'
import React from 'react'

import {Button, ListItem, Avatar, FAB, Icon } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button title="Add" onPress={()=>navigation.navigate('Farmers')} />
      <Icon
        raised
        name="heartbeat"
        type="font-awesome"
        color="#005000"
        onPress={() => console.log('hello')}
      />
    </View>
  )
}
