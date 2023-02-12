/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, InteractionManager, Image, SafeAreaView, Text, View, PermissionsAndroid, Animated} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon } from '@rneui/themed';
import { Box, Center, Pressable, Stack } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';


import FarmerItem from '../../components/FarmerItem/FarmerItem';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import LottieAddButton from '../../components/Buttons/LottieAddButton';
import TickComponent from '../../components/LottieComponents/TickComponent';
import { addFlagToListItem } from '../../helpers/addFlagToListItem'
import GroupItem from '../../components/GroupItem/GroupItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
import COLORS from '../../consts/colors';
// import { user } from '../../consts/user';
// import { getCustomUserData } from '../../helpers/getCustomUserData';

import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
const { useRealm, useQuery } = realmContext; 


const farmerSubscriptionName = 'singleFarmers';
const ownFarmerssSubscriptionName = 'ownSingleFarmers';
const districtSingleFarmers = 'districtSingleFarmers';
const districtGroupFarmers = 'districtGroupFarmers';
const districtInstitutionFarmers = 'districtInstitutionFarmers';


export default function FarmersScreen({ route, navigation }) {

  const realm = useRealm();

  const farmers = useQuery('Farmer');
  const groups = useQuery('Group');
  const institutions = useQuery('Institution');

  // current user
  const user = useUser();

  // custom user data
  let customUserData = user.customData;

  // extract needed custom user data
  customUserData = {
    name: customUserData?.name,
    userDistrict: customUserData?.userDistrict,
    userProvince: customUserData?.userProvince,
    userId: customUserData?.userId,
  };

  const individualsList = addFlagToListItem(farmers, 'Indivíduo')
  const groupsList = addFlagToListItem(groups, 'Grupo')
  const institutionsList = addFlagToListItem(institutions, 'Instituição');

 
  
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

  useEffect(() => {
    // if (showAllItems) {
    //   realm.subscriptions.update(mutableSubs => {
    //     mutableSubs.removeByName(ownItemsSubscriptionName);
    //     mutableSubs.add(realm.objects(Item), {name: itemSubscriptionName});
    //   });
    // } 
    // else if (showImportantOnly) {
    //   realm.subscriptions.update(mutableSubs=>{
    //     mutableSubs.removeByName(itemSubscriptionName);
    //     mutableSubs.add(
    //       realm.objects(Item).filtered(`owner_id =="${user?.id}" && priority <= 1`),
    //       {name: ownItemsSubscriptionName}
    //     );
    //   });
    // }
    // else {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(districtSingleFarmers);
        mutableSubs.add(
          realm.objects('Farmer').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
          {name: districtSingleFarmers},
        );
      });

      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(districtGroupFarmers);
        mutableSubs.add(
          realm.objects('Group').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
          {name: districtGroupFarmers},
        );
      });


      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(districtInstitutionFarmers);
        mutableSubs.add(
          realm.objects('Institution').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
          {name: districtInstitutionFarmers},
        );
      });



    // }
  }, [realm, user ]);

  const keyExtractor = (item, index)=>index.toString();

  
  const addFarmer = ()=>{
    navigation.navigate('FarmerForm1', { customUserData });
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

  return (
    <SafeAreaView 
      style={{    
        flex: 1,
        backgroundColor: 'ghostwhite',
        paddingBottom: 60,
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
            paddingTop: 5,
            backgroundColor: '#EBEBE4',
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
            <Image
                  style={{ width: 40, height: 40, borderRadius: 100, }}
                  source={require('../../../assets/images/iamLogo2.png')}
                  // resizeMode={FastImage.resizeMode.contain}
            />
          </Center>

          <Box w="70%">
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: 18, 
                  color: COLORS.main, 
                }}
              >
                {customUserData.userDistrict}
              </Text>

              <Stack direction="row" space={2} my="1">
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: 14, 
                    }}
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
                color={COLORS.main}
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
                  return <GroupItem  route={route} item={item} />
                }
                else if (item.flag === 'Indivíduo'){
                    return <FarmerItem  route={route} navigation={navigation} item={item} />
                }
                else if (item.flag === 'Instituição'){
                    return <InstitutionItem  route={route}  item={item} />
                }
              }
              }

             />
          </Box>
        )
      }

      </Box>
  </SafeAreaView>
  );
}
