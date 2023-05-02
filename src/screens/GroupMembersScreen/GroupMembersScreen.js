import React, { useState, useEffect } from 'react';
import { 
 View, Text, ScrollView, FlatList, StyleSheet, SafeAreaView, 
 TouchableOpacity, Image, Pressable,
 ImageBackground,
 } from 'react-native';
import { Box, Stack, Center } from 'native-base';
import { Icon, Card, } from '@rneui/base';
import AwesomeAlert from 'react-native-awesome-alerts';
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
import { useNavigation } from '@react-navigation/native';

import Animated, { Layout, LightSpeedInLeft, LightSpeedOutRight, } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faUserTie } from '@fortawesome/free-solid-svg-icons';

import COLORS from '../../consts/colors';

import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import CustomDivider from '../../components/Divider/CustomDivider';
import { getInitials } from '../../helpers/getInitials';
// import { TextInput } from 'react-native-paper';
const { useRealm, useQuery } = realmContext; 



export function MemberItem({ item, isGroupManager, }) {

 const navigation = useNavigation();


 return (
   <Animated.View
    exiting={LightSpeedOutRight}
    style={{
     marginHorizontal: 10,
     marginVertical: 10,
     borderWidth: isGroupManager ? 5 : 0,
     borderColor: isGroupManager ? COLORS.main : '',
     width: '45%',
     height: 150,
     shadowOffset: {
       width: 0,
       height: 3,
     },

   }}
   >
    <TouchableOpacity
     onPress={()=>{
      navigation.navigate('Farmer', { ownerId: item._id });
     }}
    >
      <View
       style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightgrey,
       }}
      >
{ 
 item.image &&
<ImageBackground
         source={{ uri: item.image }}
         style={{
          width: '100%',
          height: '100%',
         }}
         resizeMode="cover"
        >
       <View
        style={{
         padding: 5,
         // position: 'relative',
         // top: 10,
         // left: 12,
        }}
       >
          <Text
           style={{
            fontSize: 14,
            color: COLORS.black,
            fontFamily: 'JosefinSans-Italic',
            
            zIndex: 10,
           }}
           >
           {item.names.otherNames} {item.names.surname}
          </Text>

          <Text
           style={{
            fontSize: 12,
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Regular',
            textAlign: 'right',
            zIndex: 10,
           }}
           >
           ({new Date().getFullYear() - new Date(item.birthDate).getFullYear()} anos)
          </Text>
       </View>
        </ImageBackground>
   }

   {
    !item.image &&
    <View
    style={{
     padding: 5,
     // position: 'relative',
     // top: 10,
     // left: 12,
    }}
   >
    <View
     style={{
      position: 'absolute',
      top: 45,
      left: 40,
      
     }}
    >
     <FontAwesomeIcon icon={faUserTie} size={90} color={COLORS.grey} />
    </View>
      <Text
       style={{
        fontSize: 14,
        color: COLORS.black,
        fontFamily: 'JosefinSans-Italic',
        
        zIndex: 10,
       }}
       >
       {item.names.otherNames} {item.names.surname}
      </Text>

      <Text
       style={{
        fontSize: 12,
        color: COLORS.grey,
        fontFamily: 'JosefinSans-Regular',
        textAlign: 'right',
        zIndex: 10,
       }}
       >
       ({new Date().getFullYear() - new Date(item.birthDate).getFullYear()} anos)
      </Text>
    
    
    </View>
   }
      </View>

    </TouchableOpacity>
   
   </Animated.View>
 )
}




export default function GroupMembersScreen({ navigation, route }) {

 const { groupId } = route.params;
 const realm = useRealm();

 const group = realm.objectForPrimaryKey('Group', groupId);
 const members = group?.members.map((memberId)=>{
  return realm.objectForPrimaryKey('Actor', memberId);
 });

 const [membersList, setMembersList] = useState([]);


 const handleMembersList = ()=>{
  setMembersList(members.map(member => member));
 }
 
 useEffect(()=>{

  handleMembersList();

 }, [ realm ])
 

 const keyExtractor = (item, index)=>index.toString();



 return (
  <SafeAreaView 
  style={{ 
      minHeight: '100%', 
      backgroundColor: COLORS.ghostwhite,
      // margin: 20,

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
         <Center w="10%">
          <Pressable
            onPress={()=>{
              navigation.navigate('Group', {
               ownerId: groupId
              });
            }}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icon 
                    name="arrow-back-ios" 
                    color={COLORS.main}
                    size={wp('8%')}
                /> 
            </Pressable>
          </Center>

          <Box w="80%">
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: 14, 
                  color: COLORS.main, 
                }}
              >
                {group?.name}
              </Text>

              <Stack direction="row" space={2} my="1">
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: responsiveFontSize(1), 
                    }}
                  >
                   [{'Declarados:'}{' '}{group?.numberOfMembers.total}]
                   </Text>
                </Center>
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: responsiveFontSize(1), 
                    }}
                  >
                   [{'Registados:'}{' '}{membersList.length}]
                   </Text>
                </Center>
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

          </Box>
        </Stack>
      </View>

      <View
       style={{
        padding: 10,
        // justifyContent: 'center',
        alignItems: 'center',

       }}
      >

      <FlatList
       numColumns={2}
       horizontal={false}
       StickyHeaderComponent={()=>(
         <Box style={{
           height: hp('10%'),
           justifyContent: 'center',
           alignItems: 'center',
         }}>
         </Box>
       )}
      stickyHeaderHiddenOnScroll={true}
      data={membersList}
      keyExtractor={keyExtractor}
      // onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      renderItem={({ item })=>{
       // check if this MemberItem is of the Group Manager
       const isGroupManager = item._id === group.manager;
        return <MemberItem  route={route} isGroupManager={isGroupManager}  item={item} /> 
      }}
      ListFooterComponent={()=>{ 
       return (<Box
        style={{
         paddingBottom: 150,
        }}
       >
        <Text></Text>
       </Box>)
      }} 
    />

  </View>


</SafeAreaView>
 )
}