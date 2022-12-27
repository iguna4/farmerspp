/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, InteractionManager, SafeAreaView, Text, View, Animated} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon } from '@rneui/themed';

import farmersFakeList from '../../fakedata/farmersFakeList';
import { Box, Center, Pressable, Stack } from 'native-base';


import FarmerItem from '../../components/FarmerItem/FarmerItem';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';

import LottieAddButton from '../../components/Buttons/LottieAddButton';
import TickComponent from '../../components/LottieComponents/TickComponent';
// import { realm } from '../../models/realm';

import { realmContext } from '../../models/realm';
const { useRealm, useQuery } = realmContext; 


export default function FarmersCcreen({ route, navigation }) {

  const realm = useRealm();
  realm.write(()=>{

  });
  
  // const farmers = [];
  const farmers = useQuery('Farmer');
  const groups = useQuery('Group');
  const institutions = useQuery('Institution');


  // console.log('---------------------------------------')
  // console.log('farmers: ', farmers);
  // console.log('---------------------------------------')
  // console.log('groups: ', groups)
  // console.log('---------------------------------------')
  // console.log('institution: ', institutions)
  // console.log('---------------------------------------')


  const keyExtractor = (item, index)=>index.toString();

  useEffect(()=>{
    // const newTitle = farmers?.length <= 1 
    //                     ? `${groups?.length} produtor (Distrito)`
    //                     : `${groups?.length} produtores (Distrito)`
    // navigation.setOptions({
    //   title: newTitle,
    // })

  }, [])

  // console.log('farmers: ', farmers);
  
  const addFarmer = ()=>{
    navigation.navigate('FarmerForm1', { user: {
      name: 'evariste musekwa',
      district: 'Mogovolas',
      province: 'Nampula',
    }});
  }
  
  
  const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
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
    // <SafeAreaView style={{flex: 1}}>
    <Box bg="ghostwhite" minHeight="100%">

    <LottieAddButton
      styles={{ 
        zIndex: 3, 
        width: 100, 
        height: 100, 
        position: 'absolute', 
        bottom: 10, 
      }}
      onPress={addFarmer}
    />

      {
        farmers?.length === 0 ?
        (
        <Center 
          height="80%"
        >
          <Text 
            style={{
              fontFamily: 'JosefinSans-Italic',
              fontSize: 18,
              color: "#005000",
              textAlign: 'center',
              lineHeight: 30,
            }}
          >
            Serás o primeiro a iniciar o registo de produtores 
            de caju neste distrito!
          </Text>
          <TickComponent />

        </Center>
        )
        :
        (
          <Box 
            // paddingY="5" 
            alignItems="stretch" 
            w="100%" 
            // my="3"
            >
            {/* {farmers.map((item)=>(<Text key={item._id}>{item.names.otherNames}{' '}{item.names.surname}</Text>))} */}
            <FlatList
              
              data={farmers}
              keyExtractor={keyExtractor}
              renderItem={({ item })=><FarmerItem route={route} navigation={navigation} item={item} />}
            />
          </Box>
        )
      }
      </Box>
  // </SafeAreaView>
  );
}
