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
  const institutionsList = addFlagToListItem(institutions, 'Instituição');

  // controlling the header on Scrolling
  const [header, setHeader] = useState(true);
  
  
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
    <SafeAreaView 
      style={{    
        flex: 1,
        backgroundColor: 'ghostwhite',
      }}
    >
    <Box 
    // bg="ghostwhite" 
      // minHeight="100%" 
      style={{
        // flex: 1,
        marginVertical: 5,
      }}
    >
      {/* <View> */}

        <View
          style={{
            // flex: 1,
            minHeight: "15%",
            width: '100%',
            // backgroundColor: '#EBEBE4',
            // borderBottomLeftRadius: 50,
            // borderBottomRightRadius: 50,
            paddingHorizontal: 15,
            paddingTop: 30,

            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,

            display: header ? 'flex' : 'none'
          }}
      >
        <Stack
          direction="row" w="100%"
        >
          <Center w="10%">

          </Center>

          <Box w="70%" 

          >
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: 18, 
                  color: '#005000', 
                }}
              >
                {'Ancuabe'}
              </Text>

              <Stack direction="row" space={2} my="2">
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >[{'Produtores:'}{' '}{farmersList.length}]</Text>
                </Center>
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >[{'Parcelas:'}{' '}{'20'}]</Text>
                </Center>
              </Stack>
            </Center>
          </Box>

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
      <LottieAddButton
        styles={{ 
          zIndex: 3, 
          width: 100, 
          height: 100, 
          position: 'absolute', 
          bottom: 100, 
          display: header ? 'flex' : 'none',
          
        }}
        onPress={addFarmer}
        />

      {
      (farmers?.length === 0 && groups.length === 0 && institutions.length === 0) 
      ?
      (
      <Box 
        minH={'100%'}
      >
        <Center 
          height="60%"
          style={{
            // backgroundColor: 'blue',
            margin: 20,
          }}
        >
          <Text 
            style={{
              fontFamily: 'JosefinSans-Regular',
              fontSize: 18,
              // color: "#005000",
              textAlign: 'center',
              lineHeight: 30,
            }}
          >
            Serás o primeiro a iniciar o registo de produtores 
            de caju neste distrito!
          </Text>
          <TickComponent />

        </Center>
      </Box>
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
              // onMomentumScrollBegin={()=>onScroll(e)}
              onScrollBeginDrag={(e)=>{
                console.log('begin scrolling')
                setHeader(false)}}
              onScrollEndDrag={(e)=>{
                console.log('end scrolling')
                setHeader(true)}}
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
      {/* </View> */}
      </Box>
  </SafeAreaView>
  );
}
