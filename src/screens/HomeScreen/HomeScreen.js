/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { View, Text, InteractionManager, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState} from 'react'
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';


import {Button, ListItem, Avatar, FAB, Icon } from '@rneui/themed';
import Realm from 'realm';
import { realmContext } from '../../models/realm';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';
const { useRealm, useQuery } = realmContext; 

export default function HomeScreen({ navigation }) {
  const realm = useRealm();

  realm.write(()=>{

  })

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
    <SafeAreaView
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        // alignItems: 'center', 
        backgroundColor: 'ghostwhite', 
      }}
    >
      <View
        style={{
          // flex: 1,
          height: "30%",
          width: '100%',
          // backgroundColor: '#EBEBE4',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingHorizontal: 10,
          paddingTop: 30,

          borderTopWidth: 0,
          borderColor: '#EBEBE4',
          borderBottomWidth: 3,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          

          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
          // shadowOpacity: 0.01,
          // shadowRadius: 0.65,
  
          // elevation: 2,

        }}
      >
        <Stack w="100%" direction="row">
          <Box w="40%">
            <Text>Extensionista</Text>
          </Box>

          <Box w="30%">
            <Text>Extensionista</Text>
          </Box>
          
          <Box w="30%">
            <Text>Extensionista</Text>
          </Box>
        </Stack>
      </View>

      <View 
        style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'ghostwhite', 
          }}
      >
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
    </SafeAreaView>
  )
}
