/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
 FlatList,  InteractionManager,  ScrollView, 
 Switch, Image, SafeAreaView, Text, View, PermissionsAndroid, 
 TouchableOpacity, SectionList, ActivityIndicator, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon, } from '@rneui/themed';
import { Box, Center, Pressable, Stack } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
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
import Animated, { Layout, LightSpeedInLeft, LightSpeedOutRight, } from 'react-native-reanimated';


import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import COLORS from '../../consts/colors';

import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import { roles } from '../../consts/roles';
import { useCallback } from 'react';
const { useRealm, useQuery } = realmContext; 



function MemberGroupItem ({ item, farmerId, autoRefresh, setAutoRefresh }){

 const realm = useRealm();
 const user = useUser();
 let customUserData = user.customData;

 const currentGroup = realm.objectForPrimaryKey('Group', item._id);

 const [isFarmerAlreadyAdded, setIsFarmerAlreadyAdded] = useState(false);

 // remove the farmer from the group
 const removeFarmerFromGroup = (farmerId, currentGroup)=>{

  try {
   realm.write(()=>{
     const updatedFarmerIds = currentGroup.members?.filter((id)=>(id !== farmerId));
     currentGroup.members = []
     for (let i = 0; i < updatedFarmerIds?.length; i++){
      currentGroup?.members.push(updatedFarmerIds[i]);
     }
     setAutoRefresh(!autoRefresh);

   })
  } catch (error) {
    console.log('The farmer could not be deleted from the group!');
   
  }
 }

 // add the farmer to the group
 const addFarmerToGroup = (farmerId, currentGroup)=>{

    try {
     realm.write(()=>{
       currentGroup?.members.push(farmerId);
       setAutoRefresh(!autoRefresh);
     })
    } catch (error) {
      console.log('The farmer could not be added to the group!');     
    }
 }

// call this every time the currentGroup object changes
 useEffect(()=>{
 // if the farmer is already added to this group
 // then, set the state to true, else set the state to false
  if (currentGroup.members?.find(id=>id === farmerId)) {
   setIsFarmerAlreadyAdded(true);
  }
  else{
   setIsFarmerAlreadyAdded(false);
  }

 }, [ currentGroup ])

 return (
  <Animated.View
      // entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}
      // layout={Layout.springify()}
      style={{
        paddingHorizontal: 10,
        // paddingVertical: 4,
        marginVertical: hp('1%'),
        // backgroundColor: COLORS.sixth,
        borderColor: isFarmerAlreadyAdded ? COLORS.main : COLORS.lightgrey,
        borderWidth: isFarmerAlreadyAdded ? 1 : 0,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        // borderColor: COLORS.main,
        minHeight: hp('10%'),
        width: '100%',
        flex: 1,
        // shadowColor: COLORS.main,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 3,

      }}
  
  >
   <TouchableOpacity
      // disabled={toggleButtonState}
      onPress={()=>{

       if (!currentGroup.members?.find(id=>id === farmerId)) {
        addFarmerToGroup(farmerId, currentGroup);
       }
       else{
        removeFarmerFromGroup(farmerId, currentGroup);
       }

       // setToggleButtonState(!toggleButtonState);
      }}
   >

    <Stack direction="row" w="100%">
       <Box w="10%"
        style={{
         height: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         // borderWidth: 1,
         marginTop: 5,
        }}
       >
        {
         isFarmerAlreadyAdded ?
          <Icon name="check-box" size={30} color={COLORS.main}  />
          :
          <Icon name="add-box" size={30} color={COLORS.lightgrey}  />

        }
       </Box>
       <Box w="90%">
          <Text
           style={{
            fontSize: 16,
            fontFamily: 'JosefinSans-Bold',
            color: isFarmerAlreadyAdded ? COLORS.main : COLORS.black,
            paddingLeft: 10,

           }}
          >{item?.type}: {item?.name}</Text>
           <Text
           style={{
            fontSize: 14,
            fontFamily: 'JosefinSans-Regular',
            color: COLORS.grey,
            paddingLeft: 10,

           }}
          >{item?.type === 'Cooperativa' ? 'Presidente' : 'Representante'}: {item?.manager?.fullname}</Text>
          <Stack direction="row" w="100%">
           <Box w="50%">
            <Text
               style={{
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
                color: COLORS.grey,
                paddingLeft: 10,
     
               }}
            >Membros declarados: {item?.declaredMembers}</Text>
           </Box>
           <Box w="50%">
            <Text
              style={{
               fontSize: 14,
               fontFamily: 'JosefinSans-Regular',
               color: COLORS.grey,
               paddingLeft: 10,
    
              }}   
            >Membros registados: {item?.registeredMembers}</Text>
           </Box>
          </Stack>
       </Box>
    </Stack>
   </TouchableOpacity>

  </Animated.View>
 )
}



export default function MembershipScreen({ route, navigation }) {

 const realm = useRealm();
 const user = useUser();
 let customUserData = user.customData;
 const farmerId = route?.params?.resourceId  // get the farmer id from the previous screen

 const groups = realm.objects('Group').filtered("userDistrict == $0", customUserData?.userDistrict);

 const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
 const [groupsList, setGroupsList] = useState([]);
 const [isEndReached, setIsEndReached] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [autoRefresh, setAutoRefresh] = useState(false);

 const handleEndReached = ()=>{
   if(!isEndReached ){
     setIsLoading(true);
     setTimeout(()=>{
     }, 2000)
     
     setIsLoading(false);
   }
 }

 useEffect(()=>{

  setGroupsList(groups?.map((group)=>({
   _id: group._id,
   type: group.type,
   name: group.name,
   manager: group.manager,
   declaredMembers: group.numberOfMembers?.total,
   registeredMembers: group.members?.length,
  })))

 }, [  setAutoRefresh, autoRefresh ]);



 const keyExtractor = (item, index)=>index.toString();

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
       paddingBottom: 100,
       backgroundColor: 'ghostwhite',
     }}
   >


<View>

     <View
         style={{
           width: '100%',
           paddingHorizontal: wp('3%'),
           // paddingTop: 5,
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
                 fontSize: responsiveFontSize(2),
                 color: COLORS.main, 
               }}
             >
               
             </Text>

             <Stack direction="row" space={2} my="1">
               <Center>
                 <Text
                   style={{ 
                     fontFamily: 'JosefinSans-Regular', 
                     fonSize:responsiveFontSize(1.5), 
                   }}
                 >[{'Usuários:'}{' '}]</Text>
               </Center>
               <Center>
                 <Text
                   style={{ fontFamily: 'JosefinSans-Regular', fonSize: responsiveFontSize(1.5),  }}
                 >[{'Distritos:'}{' '}]</Text>
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

     <Box 
            alignItems="stretch" 
            w="100%" 
            style={{
              marginBottom: 15,
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
              data={groupsList}
              keyExtractor={keyExtractor}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
              renderItem={({ item })=>{
               return <MemberGroupItem  
                 autoRefresh={autoRefresh} 
                 setAutoRefresh={setAutoRefresh} 
                 item={item} 
                 farmerId={farmerId} 
               />
              }}
              ListFooterComponent={()=>{
                if (!isEndReached){
                  return (
                  <Box style={{
                    // height: 10,
                    backgroundColor: COLORS.ghostwhite,
                    paddingBottom: 15,
                    marginBottom: 10,
                  }}>
                    { isLoading ? (<CustomActivityIndicator />) : null }
                  </Box>

                  )
                }
                return null;
                }
              }

             />
          </Box>


</View>



</SafeAreaView>
 );
}
