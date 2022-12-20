/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, InteractionManager, SafeAreaView, Text, View, Animated} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon } from '@rneui/themed';

import { FloatingButton } from '../../components/Buttons/Buttons';
import farmersFakeList from '../../fakedata/farmersFakeList';
import { Box, Center, Pressable, Stack } from 'native-base';
import styles from './styles';
import CustomDivider from '../../components/Divider/CustomDivider';

import Realm from 'realm';
import { AppContext } from '../../models/realm';
import FarmerItem from '../../components/FarmerItem/FarmerItem';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';
const { useRealm, useQuery } = AppContext; 

import LottieView from 'lottie-react-native';
import LottieAddButton from '../../components/Buttons/LottieAddButton';



export default function FarmersCcreen({ route, navigation }) {

  const farmers = useQuery('Farmer');
  const appRealm = useRealm();
  
  // console.log('farmers: ', farmers)

  const keyExtractor = (farmer, index)=>index.toString();

  useEffect(()=>{
    const newTitle = farmers?.length <= 1 
                        ? `Distrito xxx: ${farmers?.length} produtor registado`
                        : `Distrito xxx: ${farmers?.length} produtores registados`
    navigation.setOptions({
      title: newTitle,
    })

  }, [appRealm, farmers])


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
          height="90%"
          // style={{ 
          //   flex: 1, 
          //   justifyContent: 'center', 
          //   alignItems: 'center',
          //   paddingHorizontal: 40,
          //   }}
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
        </Center>
        )
        :
        (
          <Box paddingY="5" alignItems="stretch" w="100%" my="3">
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
