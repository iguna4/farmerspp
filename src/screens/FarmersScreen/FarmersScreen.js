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

    const hideTabBar = (e) => {
      let offset = 0;
      const currentOffset = e.nativeEvent.contentOffset.y;
      // const dif = currentOffset - ;  
  
      if (currentOffset < 0) {
        navigation.setOptions({ showTabBar: false });
      } else {
        navigation.setParams({ showTabBar: false });
      }
      // console.log('dif=',dif);
  
      // this.offset = currentOffset;
    }      
  




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
        marginBottom: 50,
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
        <View>

          <View
            style={{
              // flex: 1,
              height: "10%",
              width: '100%',
              // backgroundColor: '#EBEBE4',
              // borderBottomLeftRadius: 50,
              // borderBottomRightRadius: 50,
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
          <Stack
            direction="row" w="100%"
          >
            <Box w="20%" 
              style={{ justifyContent: 'center'}}
            >
              <Icon 
                name="arrow-back" 
                color="#005000"
                size={40}
              />
            </Box>

            <Center w="60%" 

            >
              {'Ancuabe'}
            </Center>

            <Box w="20%"
              style={{ justifyContent: 'center'}}
            >
            <Icon 
                name="search" 
                color="#005000"
                size={40}
              />
            </Box>
          </Stack>
        </View>
          <Box 
            // paddingY="5" 
            alignItems="stretch" 
            w="100%" 
            // my="3"
            >
            {/* {farmers.map((item)=>(<Text key={item._id}>{item.names.otherNames}{' '}{item.names.surname}</Text>))} */}
            <FlatList
              // onMomentumScrollBegin={()=>onScroll(e)}
              // onScroll={(e)=>{
              //   hideTabBar(e)
              // }}
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
          </View>
        )
      }
      </Box>
  // </SafeAreaView>
  );
}
