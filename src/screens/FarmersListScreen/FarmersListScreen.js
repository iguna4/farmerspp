
import React, { useEffect, useState, } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Switch } from 'react-native';
import { Box, Center, Pressable, Stack,  } from 'native-base';

import {  
 widthPercentageToDP as wp,
 heightPercentageToDP as hp,
 listenOrientationChange as lor,
 removeOrientationListener as rol } 
     from 'react-native-responsive-screen';

import { 
 responsiveFontSize,
 responsiveScreenFontSize,
 responsiveHeight,
 responsiveWidth,
 responsiveScreenHeight,
 responsiveScreenWidth,
 useDimensionsChange,

} from 'react-native-responsive-dimensions';


import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import { customizeItem } from '../../helpers/customizeItem';
import GroupItem from '../../components/GroupItem/GroupItem';
import FarmerItem from '../../components/FarmerItem/FarmerItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
import COLORS from '../../consts/colors';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { roles } from '../../consts/roles';
import { Icon } from '@rneui/base';
import { faEllipsisVertical, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const { useRealm, useQuery } = realmContext; 


const districtSingleFarmers = 'districtSingleFarmers';
const districtGroupFarmers = 'districtGroupFarmers';
const districtInstitutionFarmers = 'districtInstitutionFarmers';
const districtFarmlands = 'districtFarmlands';
const serviceProviderSubs = 'serviceProviderSubs';
const actorMembershipSubs = 'actorMembershipSubs';

const userSingleFarmers = 'userSingleFarmers';
const userGroupFarmers = 'userGroupFarmers';
const userInstitutionFarmers = 'userInstitutionFarmers';
const userFarmlands = 'userFarmlands';


const FarmersListScreen = ({ route, navigation}) => {

 const realm = useRealm();
 const user = useUser();
 let customUserData = user.customData;
 customUserData = {
  name: customUserData?.name,
  userDistrict: customUserData?.userDistrict,
  userProvince: customUserData?.userProvince,
  userId: customUserData?.userId,
  role: customUserData?.role,
};

 const farmerType = route.params?.farmerType || 'Indivíduo';
 let farmers; 
 let farmlands;
 let serviceProviders;
 if (farmerType === 'Indivíduo') {
  farmers = realm.objects('Actor').filtered("userDistrict == $0", customUserData?.userDistrict);
  serviceProviders = realm.objects('SprayingServiceProvider').filtered("userDistrict == $0", customUserData?.userDistrict);
  farmlands = realm.objects('Farmland').filtered("userDistrict == $0" , customUserData?.userDistrict);
  farmers = customizeItem(farmers, farmlands, serviceProviders, customUserData, 'Indivíduo')
 }
 else if (farmerType === 'Grupo'){
  farmers = realm.objects('Group').filtered("userDistrict == $0", customUserData?.userDistrict);
  serviceProviders = realm.objects('SprayingServiceProvider').filtered("userDistrict == $0", customUserData?.userDistrict);
  farmlands = realm.objects('Farmland').filtered("userDistrict == $0" , customUserData?.userDistrict);
  farmers = customizeItem(farmers, farmlands, serviceProviders, customUserData, 'Grupo')

 }
 else if (farmerType === 'Instituição') {
  farmers = realm.objects('Institution').filtered("userDistrict == $0", customUserData?.userDistrict);
  serviceProviders = realm.objects('SprayingServiceProvider').filtered("userDistrict == $0", customUserData?.userDistrict);
  farmlands = realm.objects('Farmland').filtered("userDistrict == $0" , customUserData?.userDistrict);
  farmers = customizeItem(farmers, farmlands, serviceProviders, customUserData, 'Instituição')
 }

 const [isEndReached, setIsEndReached] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
 const [fetchedFarmers, setFetchedFarmers] = useState([]);
 // const [fetchedGroups, setFetchedGroups] = useState([]);
 // const [fetchedInstitutions, setFetchedInstitutions] = useState([]);
 const [fetchedFarmlands, setFetchedFarmlands] = useState([]);


  // // This state will be used to toggle between showing all items and only showing the current user's items
  // // This is initialized based on which subscription is already active
  const [showAll, setShowAll] = useState(false
   // realm.subscriptions.findByName(districtSingleFarmers)
   // ||
   // realm.subscriptions.findByName(districtGroupFarmers)
   // ||
   // realm.subscriptions.findByName(districtInstitutionFarmers)
   // ||
   // realm.subscriptions.findByName(districtFarmlands)
 );


useEffect(() => {

        if ((customUserData?.role !== roles.provincialManager) && (customUserData?.role !== roles.ampcmSupervisor)){
          if (farmerType === 'Indivíduo' && showAll){
           realm.subscriptions.update(mutableSubs => {
             mutableSubs.removeByName(districtSingleFarmers);
             mutableSubs.add(
               realm.objects('Actor').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
               {name: districtSingleFarmers},
             );
           });
         
          }
          else if (farmerType === 'Indivíduo' && !showAll){
           realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(districtSingleFarmers);
            mutableSubs.add(
              realm.objects('Actor').filtered(`userId == "${user?.customData?.userId}"`),
              {name: districtSingleFarmers},
            );
          });
          }

          if (farmerType === 'Grupo' && showAll) {
           realm.subscriptions.update(mutableSubs => {
             mutableSubs.removeByName(districtGroupFarmers);
             mutableSubs.add(
               realm.objects('Group').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
               {name: districtGroupFarmers},
             );
           });          

          }
          else if (farmerType === 'Grupo' && !showAll) {
           realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(districtGroupFarmers);
            mutableSubs.add(
              realm.objects('Group').filtered(`userId == "${user?.customData?.userId}"`),
              {name: districtGroupFarmers},
            );
          });      
          }
  
          if (farmerType === 'Instituição' && showAll) {
           realm.subscriptions.update(mutableSubs => {
             mutableSubs.removeByName(districtInstitutionFarmers);
             mutableSubs.add(
               realm.objects('Institution').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
               {name: districtInstitutionFarmers},
             );
           });

          }
          else if (farmerType === 'Instituição' && !showAll){
           realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(districtInstitutionFarmers);
            mutableSubs.add(
              realm.objects('Institution').filtered(`userId == "${user?.customData?.userId}"`),
              {name: districtInstitutionFarmers},
            );
          });

          }

  
          realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(districtFarmlands);
            mutableSubs.add(
              realm.objects('Farmland').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
              {name: districtFarmlands},
            );
          });

          realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(serviceProviderSubs);
            mutableSubs.add(
              realm.objects('SprayingServiceProvider').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
              {name: serviceProviderSubs},
            );
          });
  
          realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(actorMembershipSubs);
            mutableSubs.add(
              realm.objects('ActorMembership').filtered(`userDistrict == "${user?.customData?.userDistrict}"`),
              {name: actorMembershipSubs},
            );
          });
  

        }

      else if (customUserData?.role === roles.provincialManager || customUserData?.role === roles.ampcmSupervisor) {
                  
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.removeByName(provincialStats);
          mutableSubs.add(
            realm.objects('UserStat').filtered(`userProvince == "${user?.customData?.userProvince}"`),
            {name: provincialStats},
          );
        });
  
      }


}, [realm, user, showAll, ]);

// useEffect(()=>{
//  if ((customUserData?.role !== roles.provincialManager)  && (customUserData?.role !== roles.ampcmSupervisor)){
//    // if (!showAll ) { // this is a bug! it should: showAll should set to true for it to setAll
//    //   setFetchedFarmers(farmers);
//    //   // setFetchedGroups(groups);
//    //   // setFetchedInstitutions(institutions);
//    //   setFetchedFarmlands(farmlands);
//    // }
//    // else{
//      setFetchedFarmers(farmers);
//      // setFetchedGroups(groups.filter(group=>group?.userId === customUserData.userId));
//      // setFetchedInstitutions(institutions.filter(institution=>institution?.userId === customUserData.userId));
//      setFetchedFarmlands(farmlands);
//      // console.log('fetched:', fetchedFarmers)
//    // }
//  }

// }, [ showAll, realm ]);




const addFarmer = ()=>{
 navigation.navigate('FarmerForm1', { customUserData });
}



 
  // console.log('farmerType: ', farmers);
  const keyExtractor = (item, index)=>index.toString();

  const handleEndReached = ()=>{
   if(!isEndReached && !isLoading){
     setIsLoading(true);
     setTimeout(()=>{
       setIsLoading(false);
     }, 2000)

   }
 }

 
 if (loadingActivitiyIndicator) {
  return <CustomActivityIndicator
      loadingActivitiyIndicator={loadingActivitiyIndicator}
      setLoadingActivityIndicator={setLoadingActivityIndicator}
  />
}


  return (
    <SafeAreaView
     style={{
      backgroundColor: COLORS.ghostwhite,
      flex: 1,
     }}
    >
      <View
          style={{
            // minHeight: "15%",
            width: '100%',
            paddingHorizontal: 5,
            paddingVertical: 10,
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
          <Center w="20%">
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

          <Box w="60%">
            <Center>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: responsiveFontSize(2), 
                  color: COLORS.main, 
                }}
              >
                { showAll ? customUserData?.userDistrict : customUserData?.name}
              </Text>

              <Stack direction="row" space={2} my="1">
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: responsiveFontSize(1), 
                    }}
                  >[{farmerType === 'Grupo' ? 'Organizações:' : farmerType === 'Indivíduo' ? 'Produtores:' : 'Instituições:'}{' '}{farmers?.length}]</Text>
                </Center>
                {/* <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: responsiveFontSize(1), 
                    }}
                  >[{'Pomares:'}{' '}{farmlands?.length}]</Text>
                </Center> */}
              </Stack>
            </Center>
          </Box>
          <Box 
            w="10%"
            style={{ 
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              style={{ 
                justifyContent: 'center',
                borderRadius: 100,
              }}
            >
                <TouchableOpacity
                    style={{

                    }}
                    onPress={
                        ()=>{
                            // setIsEllipsisVisible(true);
                    }}
                >
                <Box>
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        size={25} 
                        color={COLORS.main}
                        fade 
                    />

                </Box>
                </TouchableOpacity>

            </Box>
          </Box>
          <Box 
            w="10%"
            style={{ 
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              style={{ 
                justifyContent: 'center',
                borderRadius: 100,
              }}
            >
                <TouchableOpacity
                    style={{

                    }}
                    onPress={
                        ()=>{
                            // setIsEllipsisVisible(true);
                    }}
                >
                <Box>
                    <FontAwesomeIcon 
                        icon={faEllipsisVertical} 
                        size={25} 
                        color={COLORS.main}
                        fade 
                    />

                </Box>
                </TouchableOpacity>

            </Box>
          </Box>
        </Stack>
      </View>




      {
       farmers?.length > 0 ?
         <Box 
            alignItems="stretch" 
            w="100%" 
            style={{
              marginVertical: 7,
              // marginTop: 10,
            }}
          >
            <FlatList

              StickyHeaderComponent={()=>(
                <Box style={{
                  height: hp('10%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {/* <Text>Hello! Here is the sticky header!</Text> */}
                </Box>
              )}
              stickyHeaderHiddenOnScroll={true}
              data={farmers}
              keyExtractor={keyExtractor}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
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
              ListFooterComponent={()=>{
                if (!isEndReached){
                  return (
                  <Box style={{
                    // height: 10,
                    backgroundColor: COLORS.ghostwhite,
                    paddingBottom: 15,
                    marginBottom: 100,
                  }}>
                  </Box>

                  )
                }
                return null;
                }
              }

             />
          </Box>
          :
          <Box
              style={{
               justifyContent: 'center',
               alignItems: 'center',
               height: '100%',
              }}
          >
           <Text
            style={{
             color: COLORS.black,
             fontSize: 16,
             fontFamily: 'JosefinSans-Bold',
             marginHorizontal: 40,
             lineHeight: 22,
             textAlign: 'center',
            }}
           >
            Registe 
            {farmerType === 'Grupo' ? ' organizações' : farmerType === 'Indivíduo' ? ' produtores': ' instituições'}
            {' '}deste distrito!
            </Text>
          </Box>
      }
    </SafeAreaView>
  );
}

export default FarmersListScreen;
