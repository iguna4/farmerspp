/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState} from 'react'

import {Button, ListItem, Avatar, FAB, Icon } from '@rneui/themed';
import Realm from 'realm';
import { AppContext } from '../../models/realm';
// const { useRealm } = AppContext;

export default function HomeScreen({ navigation }) {
  // const appRealm = useRealm();

  // const addUser = useCallback(()=>{
  //   appRealm.write(()=>{
  //     const newUser = appRealm.create('User', {
  //       _id: new Realm.BSON.ObjectId(),
  //       fullname: 'Evariste Musekwa', 
  //       email: 'evariste@gmail.com', 
  //       password: 'evariste',
  //       primaryPhone: 860140080,
  //       secondaryPhone: 0,
  //       address: {
  //         province: 'Nampula',
  //         district: 'Mogovolas',
  //       },
  //     });
  //     console.log('new user:', newUser);
  //   });

  // }, [])
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button 
        title="Add" 
        onPress={()=>{}
        // addUser
        } />
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
