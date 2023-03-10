/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  FlatList,  InteractionManager,  ScrollView, 
  Switch, Image, SafeAreaView, Text, View, PermissionsAndroid, 
  Animated, TouchableOpacity, SectionList, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon, } from '@rneui/themed';
import { Box, Center, Pressable, Stack } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';


import FarmerItem from '../../components/FarmerItem/FarmerItem';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import LottieAddButton from '../../components/Buttons/LottieAddButton';
import TickComponent from '../../components/LottieComponents/TickComponent';
import { customizeItem } from '../../helpers/customizeItem'
import GroupItem from '../../components/GroupItem/GroupItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
import COLORS from '../../consts/colors';
// import { user } from '../../consts/user';
// import { getCustomUserData } from '../../helpers/getCustomUserData';

import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import { roles } from '../../consts/roles';
import StatItem from '../../components/StatItem/StatItem';
const { useRealm, useQuery } = realmContext; 


const userSingleFarmers = 'userSingleFarmers';
const userGroupFarmers = 'userGroupFarmers';
const userInstitutionFarmers = 'userInstitutionFarmers';
const userFarmlands = 'userFarmlands';

const districtSingleFarmers = 'districtSingleFarmers';
const districtGroupFarmers = 'districtGroupFarmers';
const districtInstitutionFarmers = 'districtInstitutionFarmers';
const districtFarmlands = 'districtFarmlands';

const provincialStats = 'provincialStats';


export default function FarmersScreen({ route, navigation }) {

  const realm = useRealm();
  const user = useUser();
  let customUserData = user.customData;

  const farmers = realm.objects('Actor').filtered("userDistrict == $0", customUserData?.userDistrict);
  const groups = realm.objects('Group').filtered("userDistrict == $0", customUserData?.userDistrict);
  const institutions = realm.objects('Institution').filtered("userDistrict == $0", customUserData?.userDistrict);
  const farmlands = realm.objects('Farmland').filtered("userDistrict == $0" , customUserData?.userDistrict);
  const stats = realm.objects('UserStat').filtered("userProvince == $0", customUserData?.userProvince);

  const districts =  Array.from(new Set(stats.map((stat)=>stat?.userDistrict))).filter(district=>district !== 'NA');

  customUserData = {
    name: customUserData?.name,
    userDistrict: customUserData?.userDistrict,
    userProvince: customUserData?.userProvince,
    userId: customUserData?.userId,
    role: customUserData?.role,
  };

  const individualsList = customizeItem(farmers, farmlands, customUserData, 'Indivíduo')
  const groupsList = customizeItem(groups, farmlands, customUserData, 'Grupo')
  const institutionsList = customizeItem(institutions, farmlands, customUserData, 'Instituição');
  const filteredStats = stats?.filter(stat => (stat.userDistrict !== 'NA'));


  
  // ---------------------------------------------------------------------------- 
  const listStatsByDistrict = (stats)=>{
    // get the array of all the districts in which users are living
    // to create a SectionList where each item has title and data properties
    // excluding the stats whose district value is 'NA'
    const districts = Array.from(new Set(stats.map(stat=>stat.userDistrict))).filter(district=>district !== 'NA').sort();
    const statsByDistrict = [];
    for (let i = 0; i < districts.length; i++) {
      const district = districts[i];
      let newObject = {};
      const usersStats = stats.filter(stat=>stat.userDistrict === district);
      newObject["title"] = `${district}`;
      newObject["data"] = usersStats;
      statsByDistrict.push(newObject);
    }

    return statsByDistrict;
  }

  const statsByDistrict = listStatsByDistrict(stats);
  
  //  ---------------------------------------------------------------------------------



  // This state will be used to toggle between showing all items and only showing the current user's items
  // This is initialized based on which subscription is already active
  const [showAll, setShowAll] = useState(
    realm.subscriptions.findByName(districtSingleFarmers)
    ||
    realm.subscriptions.findByName(districtGroupFarmers)
    ||
    realm.subscriptions.findByName(districtInstitutionFarmers)
    ||
    realm.subscriptions.findByName(districtFarmlands)
  );
 
  // merge the three arrays of farmers and sort the items by createdAt 
  let farmersList = [];

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


  useEffect(() => {
      
      if (showAll && (customUserData?.role !== roles.provincialManager)) {
        
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(userSingleFarmers);
          mutableSubs.add(
            realm.objects('Actor').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
            {name: districtSingleFarmers},
          );
        });
      
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(userGroupFarmers);
          mutableSubs.add(
            realm.objects('Group').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
            {name: districtGroupFarmers},
          );
        });          

        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(userInstitutionFarmers);
          mutableSubs.add(
            realm.objects('Institution').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
            {name: districtInstitutionFarmers},
          );
        });

        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(userFarmlands);
          mutableSubs.add(
            realm.objects('Farmland').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
            {name: districtFarmlands},
          );
        });

      }
      else if (!showAll && (customUserData?.role !== roles.provincialManager)) {
      
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(districtSingleFarmers);
          mutableSubs.add(
            realm.objects('Actor').filtered(`userId == "${user?.customData?.userId}"`),
            {name: userSingleFarmers},
          );
        });
        
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(districtGroupFarmers);
          mutableSubs.add(
            realm.objects('Group').filtered(`userId == "${user?.customData?.userId}"`),
            {name: userGroupFarmers},
          );
        });
          
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(districtInstitutionFarmers);
          mutableSubs.add(
            realm.objects('Institution').filtered(`userId == "${user?.customData?.userId}"`),
            {name: userInstitutionFarmers},
          );
        });  
        
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(userFarmlands);
          mutableSubs.add(
            realm.objects('Farmland').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
            {name: districtFarmlands},
          );
        });
        
    }
    else if (customUserData?.role === roles.provincialManager) {

      // realm.subscriptions.update(mutableSubs => {
      //   mutableSubs.removeByName(districtSingleFarmers);
      //   mutableSubs.add(
      //     realm.objects('Farmer').filtered("userDistrict == $0", "Meconta"),
      //     {name: userSingleFarmers},
      //   );
      // });
      
      // realm.subscriptions.update(mutableSubs => {
      //   mutableSubs.removeByName(districtGroupFarmers);
      //   mutableSubs.add(
      //     realm.objects('Group').filtered("userDistrict IN $0", districts),
      //     {name: userGroupFarmers},
      //   );
      // });
        
      // realm.subscriptions.update(mutableSubs => {
      //   mutableSubs.removeByName(districtInstitutionFarmers);
      //   mutableSubs.add(
      //     realm.objects('Institution').filtered("userDistrict IN $0", districts),
      //     {name: userInstitutionFarmers},
      //   );
      // });  
      
      // realm.subscriptions.update(mutableSubs => {
      //   mutableSubs.removeByName(userFarmlands);
      //   mutableSubs.add(
      //     realm.objects('Farmland').filtered("userDistrict IN $0", districts),
      //     {name: districtFarmlands},
      //   );
      // });
            
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(provincialStats);
        mutableSubs.add(
          realm.objects('UserStat').filtered(`userProvince == "${user?.customData?.userProvince}"`),
          {name: provincialStats},
        );
      });

    }

  }, [realm, user, showAll ]);

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
      }}
    >
{/* 
    Show this if the user is a provincial manager
*/}

{ 
(customUserData?.role === roles.provincialManager) &&
<View>

      <View
          style={{
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
        <Stack direction="row" w="100%"  >
          <Center w="15%">
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
                {customUserData?.userProvince}
              </Text>

              <Stack direction="row" space={2} my="1">
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: 14, 
                    }}
                  >[{'Usuários:'}{' '}{filteredStats.length}]</Text>
                </Center>
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >[{'Distritos:'}{' '}{districts.length}]</Text>
                </Center>
              </Stack>
            </Center>
          </Box>
          <Box 
            w="15%"
          >

          </Box>
        </Stack>
      </View>

      {
      (stats?.length === 0) 
      ?
      (
      <Box>
        <Center 
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
              color: COLORS.red,
            }}
          >
            A província de {customUserData?.userProvince} ainda não possui usuários activos!
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
              marginBottom: 140,
            }}
            >
            <SectionList
              
              sections={statsByDistrict}
              keyExtractor={(item, index) => {
                return item.userId
              }}
              renderItem={({item}) => (
                    <StatItem  route={route} navigation={navigation} item={item} />
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text 
                  style={{
                    paddingLeft: 10,
                    fontWeight: 'bold',
                    color: COLORS.danger,
                  }}
                >
                  {title}
                </Text>
              )}
            />
          </Box>
        )
      }


</View>
}



{/* 
   Show this if the user is a field agent only
*/}
      
{    
  (customUserData?.role !== roles.provincialManager) &&
<Box 
    >
      <View
          style={{
            // minHeight: "15%",
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
          <Center w="15%">
            <Switch
              trackColor={{ true: COLORS.main, false: COLORS.grey }}
              thumbColor={ showAll ? COLORS.grey : COLORS.main }
              onValueChange={ () => {
                setShowAll(!showAll);
                setLoadingActivityIndicator(true);
              }
            }
              value={showAll}
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
                { !showAll ? customUserData?.userDistrict : customUserData?.name}
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
                  >[{'Parcelas:'}{' '}{farmlands.length}]</Text>
                </Center>
              </Stack>
            </Center>
          </Box>
          <Box 
            w="15%"
            style={{ 
              justifyContent: 'center',
              borderRadius: 100,
              borderWidth: 1,
              borderColor: COLORS.main,
              backgroundColor: COLORS.main,
            }}
          >
            <TouchableOpacity
              onPress={addFarmer}
            >
              <Icon 
                  name="person-add" 
                  color={COLORS.ghostwhite}
                  size={40}
                  />
            </TouchableOpacity>
          </Box>
        </Stack>
      </View>

      {
      (farmers?.length === 0 && groups.length === 0 && institutions.length === 0) 
      ?
      (
      <Box>
        <Center 
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
            {/* Serás o primeiro a iniciar o registo de produtores 
            de caju neste distrito! */}
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
              marginBottom: 120,
              marginTop: 10,
            }}
          >
            <FlatList

              StickyHeaderComponent={()=>(
                <Box style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {/* <Text>Hello! Here is the sticky header!</Text> */}
                </Box>
              )}
              stickyHeaderHiddenOnScroll={true}
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
              ListFooterComponent={()=>(
                <Box style={{
                  height: 100,
                  backgroundColor: COLORS.ghostwhite,
                }}>
                </Box>)
              }

             />
          </Box>
        )
      }

      </Box>
}  

</SafeAreaView>
  );
}
