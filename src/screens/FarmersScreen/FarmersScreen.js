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

import { addFlagToListItem } from '../../helpers/addFlagToListItem'

import { realmContext } from '../../models/realm';
import GroupItem from '../../components/GroupItem/GrupItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
const { useRealm, useQuery } = realmContext; 


export default function FarmersCcreen({ route, navigation }) {
  // const [farmersList, setFarmersList] = useState([]);

  const realm = useRealm();
  realm.write(()=>{

  });
  
  // const farmers = [];
  const farmers = useQuery('Farmer');
  const groups = useQuery('Group');
  const institutions = useQuery('Institution');

  const individualsList = addFlagToListItem(farmers, 'Indivíduo')
  const groupsList = addFlagToListItem(groups, 'Grupo')
  const institutionsList = addFlagToListItem(institutions, 'Instituição')
  
  // merge the three arrays of farmers and sort the items by createdAt 
  const farmersList = 
        [...individualsList, ...groupsList, ...institutionsList]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            
  


  useEffect(()=>{


  }, [farmers, groups, institutions, realm])




  const keyExtractor = (item, index)=>index.toString();

  
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
    <Box bg="ghostwhite" minHeight="100%" 
      style={{
        marginBottom: 20,
      }}
    >

    <LottieAddButton
      styles={{ 
        zIndex: 3, 
        width: 100, 
        height: 100, 
        position: 'absolute', 
        bottom: 50, 
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
              
              data={farmersList}
              keyExtractor={keyExtractor}
              // renderItem={({ item })=><FarmerItem route={route} navigation={navigation} item={item} />}
              //  renderItem={({ item })=><GroupItem route={route}  item={item} />}
               renderItem={({ item })=>{
                  if(item.flag === 'Grupo'){
                    return <GroupItem route={route}  item={item} />
                  }
                  else if (item.flag === 'Indivíduo'){
                    return <FarmerItem route={route} navigation={navigation} item={item} />
                  }
                  else if (item.flag === 'Instituição'){
                    return <InstitutionItem route={route}  item={item} />
                  }
                }
               }

            />
          </Box>
        )
      }
      </Box>
  // </SafeAreaView>
  );
}
