/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
 FlatList,  InteractionManager,  ScrollView, 
 Switch, Image, SafeAreaView, Text, View, PermissionsAndroid, 
 TextInput,
 TouchableOpacity, SectionList, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon, SearchBar } from '@rneui/themed';
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
import Toast from 'react-native-toast-message';

import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import COLORS from '../../consts/colors';

import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import { roles } from '../../consts/roles';
import { useCallback } from 'react';
import CustomDivider from '../../components/Divider/CustomDivider';
// import { TextInput } from 'react-native-paper';
const { useRealm, useQuery } = realmContext; 



function MemberGroupItem ({ 
 item, farmerId, autoRefresh, 
 setAutoRefresh, 
 setCountIdOccurrence, countIdOccurrence,
 isFarmerAdded,
 setIsFarmerAdded,
 isFarmerRemoved,
 setIsFarmerRemoved,
 farmerName,
}){

 const realm = useRealm();
 const user = useUser();
 let customUserData = user.customData;

 const currentGroup = realm.objectForPrimaryKey('Group', item?._id);

 const [isFarmerAlreadyAdded, setIsFarmerAlreadyAdded] = useState(false);

 const showRemovedFarmerToast = () => {
  Toast.show({
    type: 'removedFarmerFromGroup',
    text1: 'Remoção da organização',
    props: { message: `Anotada retirada de ${farmerName} da ${currentGroup?.type}: ${currentGroup?.name}!`},
  });
 }

 const showAddedFarmerToast = () => {
  Toast.show({
    type: 'addedFarmerToGroup',
    text1: 'Adesão à organização',
    props: { message: `Anotada adesão de ${farmerName} a ${currentGroup?.type}: ${currentGroup?.name}!`},
  });
 }
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
     setIsFarmerRemoved(true);
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
       setIsFarmerAdded(true);
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
      exiting={LightSpeedOutRight}
      style={{
        paddingHorizontal: 10,
        marginVertical: hp('1%'),
        minHeight: hp('10%'),
        width: '100%',
        flex: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },

      }}
  
  >
    <Stack direction="row" w="100%">
     <Box w="10%"
        style={{
         height: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 5,
        }}
     >
      <TouchableOpacity
        onPress={()=>{
         if (!currentGroup.members?.find(id=>id === farmerId)) {
          addFarmerToGroup(farmerId, currentGroup);
          // show the sucess (for adding farmer to the group) toast message
          showAddedFarmerToast();
         }
         else{
          removeFarmerFromGroup(farmerId, currentGroup);
          // show the error (for removing farmer from the group) toast message
          showRemovedFarmerToast();
         }
         // reset the counter to zero
         setCountIdOccurrence(0);
        }}
       >
          {
           isFarmerAlreadyAdded ?
            <Icon name="check-box" size={30} color={COLORS.main}  />
            :
            <Icon name="add-box" size={30} color={COLORS.lightgrey}  />

          }
       </TouchableOpacity>
     </Box>

       <Box w="80%">
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
            color: COLORS.black,
            paddingLeft: 10,

           }}
          >{item?.type === 'Cooperativa' ? 'Presidente' : 'Representante'}: {item?.manager?.fullname}</Text>
          <Stack direction="row" w="100%">
           <Box w="50%">
            <Text
               style={{
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
                color: COLORS.grey,
                paddingLeft: 10,
     
               }}
            >Declarados: {item?.declaredMembers}</Text>
           </Box>
           <Box w="50%">
            <Text
              style={{
               fontSize: 13,
               fontFamily: 'JosefinSans-Regular',
               color: isFarmerAlreadyAdded ? COLORS.main : COLORS.grey,
               paddingLeft: 10,
    
              }}   
            >Registados: {item?.members?.length}</Text>
           </Box>
          </Stack>
       </Box>
       <Box w="10%"
        style={{
         height: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 5,
        }}
     >
      <TouchableOpacity
        onPress={()=>{

        }}
       >
        <Icon name="arrow-forward-ios" size={20} color={isFarmerAlreadyAdded ? COLORS.main : COLORS.lightgrey}  />
       </TouchableOpacity>
     </Box>
    </Stack>
    {/* <CustomDivider /> */}
  </Animated.View>
 )
}



export default function MembershipScreen({ route, navigation }) {

 const realm = useRealm();
 const user = useUser();
 let customUserData = user.customData;
 const farmerId = route?.params?.resourceId;  // get the farmer id from the previous screen
 const farmerName = route?.params.farmerName;

 const groups = realm.objects('Group').filtered("userDistrict == $0", customUserData?.userDistrict);

 // const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
 const [groupsList, setGroupsList] = useState([]);
 const [isEndReached, setIsEndReached] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [autoRefresh, setAutoRefresh] = useState(false);
 const [isFarmerAdded, setIsFarmerAdded] = useState(false);
 const [isFarmerRemoved, setIsFarmerRemoved] = useState(false);
 
 // all IDs of farmers whom have already been registered in any of the groups.
 // this array of ids helps check whether the current farmer is already regitered in any of the groups
 const [countIdOccurrence, setCountIdOccurrence] = useState(0);
 // search an organization (group)
 const [search, setSearch] = useState("");

 const updateSearch = (search) => {
  setSearch(search);
};


 const handleEndReached = ()=>{
   if(!isEndReached ){
     setIsLoading(true);
     setTimeout(()=>{
     }, 2000)
     
     setIsLoading(false);
   }
 }

 const priorizeSelectedGroups = (groupsList)=>{

 }

 useEffect(()=>{
  // this turn the fetched realm group into a iterable data structure
  // of which items are group objects with customized properties
  setGroupsList(groups?.map((group)=>{
   return group;
 }));

 if (groupsList.length > 0){
  // reset the counter to zero before new countings
  // setCountIdOccurrence(0);
  groupsList.map((group)=>{
   if (group.members.indexOf(farmerId) >= 0) {
    setCountIdOccurrence(prev=>prev + 1);
   }
  })
 }

 }, [   autoRefresh ]);




 const keyExtractor = (item, index)=>index.toString();

 // useFocusEffect(
 //   React.useCallback(() => {
 //     const task = InteractionManager.runAfterInteractions(() => {
 //       setLoadingActivityIndicator(true);
 //     });
 //     return () => task.cancel();
 //   }, [])
 // );


 // if (loadingActivitiyIndicator) {
 //   return <CustomActivityIndicator 
 //       loadingActivitiyIndicator={loadingActivitiyIndicator}
 //       setLoadingActivityIndicator={setLoadingActivityIndicator}
 //   />
 // }


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
           minHeight: 50,
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
        <Stack
          direction="row" w="100%"
        >
          <Box>
          <Pressable
                onPress={()=>navigation.goBack()
                }
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                    <Icon 
                        name="arrow-back-ios" 
                        color={COLORS.main}
                        size={wp('8%')}
                        // onPress={()=>{}}
                    /> 
                    <Text
                        style={{
                            color: COLORS.main,
                            fontFamily: 'JosefinSans-Bold',
                            marginLeft: -10,
                        }}
                    >
                        {/* Voltar */}
                    </Text>
                </Pressable>
          </Box>

          <Box w="100%" 
           style={{
            alignItems:'center',
            justifyContent: 'center',
           }}
          >
            <Center w="90%"
            >
              <SearchBar
                // lightTheme
                style={{
                 
                }}
                platform={Platform.OS.android}
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                clearIcon
                containerStyle={{
                 display: 'none',
                 // flex: 1,
                 width: '100%',
                 // height: 50,
                 // backgroundColor: '#EBEBE4',
                }}
                clearButtonMode="always"
                // icon={{ type: 'font-awesome', name: 'search' }}
              />
            </Center>
          </Box>

        </Stack>
     </View>

    <CustomDivider />
     <Box 
      w="100%" 
      px="4" 
      py="3"
      style={{
       // backgroundColor: '#EBEBE4',
      }}
     >
 { countIdOccurrence === 0 &&    
 
 <Box w="100%"
 style={{
  paddingHorizontal: 5,
  flexDirection: 'row',
 }}
>

   <Box w="20%" 
     style={{
      justifyContent: 'center',
      alignitems: 'center',
      // paddingRight: 30,
     }}
    >
      <Icon name="group-add" size={50} color={COLORS.grey} />
     </Box>
     <Box
      w="80%"
      style={{
       marginLeft: 10,
       justifyContent: 'center',
       // alignitems: 'center',
      }}
     >
           <Text
            style={{
             color: COLORS.black,
             fontSize: 16,
             fontFamily: 'JosefinSans-Bold',
             lineHeight: 20,
            }} 
          >
         
           {farmerName}
          </Text>
            <Text
            style={{
             // paddingLeft: 10,
             color: COLORS.red,
             fontSize: 16,
             fontFamily: 'JosefinSans-Regular',
             lineHeight: 20,
            }}
           >
             Marca a organização 
         </Text>
        </Box>
    </Box>

        }
     

   { countIdOccurrence > 0 && 
   <Box w="100%"
    style={{
     paddingHorizontal: 5,
     flexDirection: 'row',
    }}
   >

    <Box w="20%" 
     style={{
      justifyContent: 'center',
      alignitems: 'center',
      // paddingRight: 30,
     }}
    >
      <Icon name="group-work" size={50} color={COLORS.main} />
     </Box>
     <Box
      w="80%"
      style={{
       marginLeft: 10,
       justifyContent: 'center',
       // alignitems: 'center',
      }}
     >
         <Text
            style={{
             color: COLORS.black,
             fontSize: 16,
             fontFamily: 'JosefinSans-Bold',
             lineHeight: 20,
            }} 
          >
           {farmerName}
         </Text>
         <Text
          style={{
           // paddingLeft: 10,
           color: COLORS.grey,
           fontSize: 16,
           fontFamily: 'JosefinSans-Regular',
           lineHeight: 20,
          }}
         > 
          aderiu a {countIdOccurrence} {countIdOccurrence === 1 ? "organização" : "organizações"} 
          </Text>
     </Box>
     </Box>       
     }
     </Box>
     
     <CustomDivider />

     <Box 
            alignItems="stretch" 
            w="100%" 
            style={{
              marginBottom: 40,
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
                 countIdOccurrence={countIdOccurrence}
                 setCountIdOccurrence={setCountIdOccurrence}
                 isFarmerAdded={isFarmerAdded}
                 setIsFarmerAdded={setIsFarmerAdded}
                 isFarmerRemoved={isFarmerRemoved}
                 setIsFarmerRemoved={setIsFarmerRemoved}
                 farmerName={farmerName}
               />
              }}
              ListFooterComponent={()=>{
                if (!isEndReached){
                  return (
                  <Box style={{
                    // height: 10,
                    backgroundColor: COLORS.ghostwhite,
                    // paddingBottom: 45,
                    marginBottom: 140,
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
