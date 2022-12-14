/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, InteractionManager, SafeAreaView, Text, View, PermissionsAndroid, Animated} from 'react-native';
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

import GroupItem from '../../components/GroupItem/GroupItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
import GroupItem2 from '../../components/GroupItem/GroupItem2';
import CustomDivider  from '../../components/Divider/CustomDivider'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
   } from "react-native-popup-menu";
import { Camera, useCameraDevices } from "react-native-vision-camera";

import { realmContext } from '../../models/realm';
import PopupMenu from '../../components/PopupMenu/PopupMenu';
const { useRealm, useQuery } = realmContext; 


export default function FarmersScreen({ route, navigation }) {
  // const [farmersList, setFarmersList] = useState([]);

  const realm = useRealm();
  // realm.write(()=>{

  // });
  
  // const farmers = [];
  const farmers = useQuery('Farmer');
  const groups = useQuery('Group');
  const institutions = useQuery('Institution');

  const individualsList = addFlagToListItem(farmers, 'Indivíduo')
  const groupsList = addFlagToListItem(groups, 'Grupo')
  const institutionsList = addFlagToListItem(institutions, 'Instituição');

  // useCameraDevice
  const devices = useCameraDevices();
  const device = devices.back;
  const [isCameraActive, setIsCamerActive] = useState(false);
  
  
  // merge the three arrays of farmers and sort the items by createdAt 
  let farmersList = [];
  let farmlandsList = [];

  if (individualsList.length > 0){
    farmersList = farmersList.concat(individualsList)
  }
  if (groupsList.length > 0){
    farmersList = farmersList.concat(groupsList);
  }
  if (institutionsList.length > 0){
    farmersList = farmersList.concat(institutionsList);
  }
  if (farmersList.length > 0){
    farmersList = farmersList
        ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
  }
  
  // concatenate all farmlands
  const farmlandIds = farmersList
        ?.filter((farmer) =>farmer?.farmlands?.length > 0)
        ?.map(({ farmlands }) => {
          farmlandsList = [...farmlandsList, ...farmlands ]
        });

  useEffect(()=>{
    /**
     *  const subscribedFarmers = realm.objects('Farmer').filtered(`district ==${user?.district}`);
     *  const updateSubscriptions = async () =>{
     *    await realm.subscriptions.update(mutableSubs => {
     *      mutableSubs.add(subscribedFarmers, {name: farmerSubscriptionName});
     * }); 
     * };
     * updateSubscriptions();
     * 
     */


  }, [farmers, groups, institutions, realm, farmersList]);

  const keyExtractor = (item, index)=>index.toString();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log("You can use the camera");
        return navigation.navigate('CameraDevice');
        // return ;

      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
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

  // console.log('farmersList:', JSON.stringify(farmersList));

  return (
    <SafeAreaView 
      style={{    
        flex: 1,
        backgroundColor: 'ghostwhite',
      }}
    >
    <Box 
      style={{
        // marginVertical: 5,
        // marginBottom: 20,
      }}
    >
      <View
          style={{
            minHeight: "10%",
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: 10,

            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,

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
                  >[{'Parcelas:'}{' '}{farmlandsList.length}]</Text>
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
      {/* <Box> */}
      {/* </Box> */}
      <LottieAddButton
        styles={{ 
          zIndex: 3, 
          width: 100, 
          height: 100, 
          position: 'absolute', 
          top: 400, 
         
        }}
        onPress={addFarmer}
        />

      {
      (farmers?.length === 0 && groups.length === 0 && institutions.length === 0) 
      ?
      (
      <Box 
        // minH={'100%'}
      >
        <Center 
          // height="100%"
          style={{
            margin: 20,
          }}
        >
          <Text 
            style={{
              fontFamily: 'JosefinSans-Regular',
              fontSize: 18,
              textAlign: 'center',
              lineHeight: 30,
            }}
          >
            Serás o primeiro a iniciar o registo de produtores 
            de caju neste distrito!
          </Text>
          <TickComponent />

            {/* <PopupMenu /> */}
        </Center>
      </Box>
    )
        :
        (
          <Box 
            alignItems="stretch" 
            w="100%" 
            style={{
              marginBottom: 80,
            }}
            >
            <FlatList
              data={farmersList}
              keyExtractor={keyExtractor}
              renderItem={({ item })=>{
                if(item.flag === 'Grupo'){
                  return <GroupItem requestCameraPermission={requestCameraPermission} route={route} item={item} />
                }
                else if (item.flag === 'Indivíduo'){
                    return <FarmerItem requestCameraPermission={requestCameraPermission} route={route} navigation={navigation} item={item} />
                }
                else if (item.flag === 'Instituição'){
                    return <InstitutionItem requestCameraPermission={requestCameraPermission} route={route}  item={item} />
                }
              }
              }

             />
          </Box>
        )
      }
      {/* </View> */}
      </Box>
    

      {/* <PopupMenu /> */}
  

  </SafeAreaView>
  );
}
