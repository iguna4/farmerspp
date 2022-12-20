/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { View, Text, InteractionManager } from 'react-native'
import React, { useCallback, useEffect, useState} from 'react'

import {Button, ListItem, Avatar, FAB, Icon } from '@rneui/themed';
import Realm from 'realm';
import { AppContext } from '../../models/realm';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';
// const { useRealm } = AppContext;

export default function HomeScreen({ navigation }) {
  // const appRealm = useRealm();

  const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setLoadingActivityIndicator(true);
      // Expensive task
    });

    return () => task.cancel();
  }, [])
);


  if (loadingActivitiyIndicator) {
    return <CustomActivityIndicator 
        loadingActivitiyIndicator={loadingActivitiyIndicator}
        setLoadingActivityIndicator={setLoadingActivityIndicator}
    />
  }
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ghostwhite', }}>
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
