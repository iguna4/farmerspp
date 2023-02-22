import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text, Image} from "react-native";
import { Icon, CheckBox, Avatar } from '@rneui/themed';
import { getInitials } from "../../helpers/getInitials";
import COLORS from "../../consts/colors";
import { months } from "../../helpers/dates";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DuplicatesAlertItem = ({ item })=>{
  
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginVertical: 20, }}
      onPress={()=>{
        navigation.navigate('Farmer', {
          ownerId: item._id,
        })
      }}
    >
    <View
      style={{ 
        height: 120, 
        width: '100%',
        backgroundColor: COLORS.ghostwhite,
        borderRadius: 10,
        borderColor: COLORS.main,
        borderWidth: 3,
        flexDirection: 'row',
       }}
    >
      {/* <Avatar 
        size={150}
        // rounded
        title={getInitials(item?.names?.surname)}
        containerStyle={{ backgroundColor: COLORS.grey }}
        source={{ uri: item?.image ? item?.image : 'htt://localhost/not-set-yet' }}
      /> */}

      <Box
        w="35%"
      >
    { item?.image ?
       <Image 
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.lightgrey,
                      
          }}
          alt={getInitials(item?.names?.surname)}
          source={{ uri: item?.image  }}
        />
        :
        <Box
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 100,
            // borderWidth: 1,
            backgroundColor: COLORS.lightgrey,
            width: '100%',
            height: '100%',
          }}
        >
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.lightgrey,
            width: '100%',
            height: '100%',
          }}
        >
          <Icon 
              name="person"
              size={120}
              color={COLORS.grey}
              />
          </Box>
        </Box>
      }
      </Box>

      <Box
         w="65%"
         style={{
          flex: 1,
          alignItems: 'center',
          padding: 5,
         }}
        // px={"4"}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'JosefinSans-Regular',
            color: COLORS.grey,
            lineHeight: 20,
          }}
        >
          {item?.names?.otherNames}{' '}{item?.names?.surname} nasceu aos{' '} 
          {new Date(item?.birthDate).getDay()}-{new Date(item?.birthDate).getMonth()+1}-{new Date(item?.birthDate).getFullYear()}
          {' '}em{' '}{item?.birthPlace?.province}({item?.birthPlace?.district}), mora em{' '}
          {item?.address?.province} ({item?.address?.district}).  O seu registo ocorreu{' '}
          aos{' '}{new Date(item?.createdAt).getDate()}-{new Date(item?.createdAt).getMonth()+1}-{new Date(item?.createdAt).getFullYear()} por {item?.userName}.
          </Text>
      </Box>
    </View>
  </TouchableOpacity>
  )

//   return (

//       <TouchableOpacity
//         onPress={()=>{
//           navigation.navigate('Farmer', {
//             ownerId: item._id,
//           })
//         }}
//       >
//         <Alert max="100%" status="info" my={2}
//           style={{ borderRadius: 10, }}
//         >
//           <VStack space={1} flexShrink={1} w="100%">
//             {/* <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between"> */}
//               {/* <HStack flexShrink={1} space={2} alignItems="center"> */}
//                 {/* <Alert.Icon /> */}

//                 <Avatar 
//                     size={150}
//                     // rounded
//                     title={getInitials(item?.names?.surname)}
//                     containerStyle={{ backgroundColor: COLORS.grey }}
//                     source={{ uri: item?.image ? item?.image : 'htt://localhost/not-set-yet' }}
//                 />


//                 {/* <Text 
//                 style={{
//                   fontSize: 20,
//                   color: COLORS.main,
//                   fontFamily: 'JosefinSans-Bold',
//                 }}
//                 >
//                   {item?.names?.otherNames}{' '}{item?.names?.surname}
//                 </Text> */}
//               {/* </HStack> */}
//             {/* </HStack> */}
//             <HStack flexShrink={1} space={1} alignItems="center">
//               <Box w="30%">
//               <Text 
//                 style={{
//                   fontSize: 16,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//               >
//                 Nascimento: 
//               </Text>
//               </Box>
//               <Box w="70%">
//               <Text  
//                 style={{
//                   fontSize: 16,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//               >              
//                 {new Date(item?.birthDate).getDay()}/{months[new Date(item?.birthDate).getMonth()]}/{new Date(item?.birthDate).getFullYear()}
//               </Text>
//               </Box>
//             </HStack>

//             <HStack 
//             flexShrink={1} 
//             space={1} 
//             alignItems="center">
//               <Box w="30%">
//               <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//               >
//                 Residência: 
//               </Text>
//               </Box>
//               <Box w="70%">
// { 
// item?.address?.village !== '' &&
//              <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//                >
//                 {item?.address?.village}
//               </Text>
// }
// { item?.address?.adminPost &&
//              <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//                >
//                 {item?.address?.adminPost}
//               </Text>
// }
// { item?.address?.district &&
//               <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//                >
//                 {item?.address?.district}
//               </Text>
// }
//               </Box>
//             </HStack>

//             <HStack flexShrink={1} space={1} alignItems="center">
//               <Box w="30%">
//               <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//               >
//                 Registo: 
//               </Text>
//               </Box>
//               <Box w="70%">
//               <Text 
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'JosefinSans-Regular',
//                 }}
//                 >
//                 {new Date(item?.createdAt).getDate()}/{months[new Date(item?.createdAt).getMonth()]}/{new Date(item?.createdAt).getFullYear()} (por {item?.userName ? item?.userName  : 'usuario'})
//               </Text>
//               </Box>
//             </HStack>
//           </VStack>
//         </Alert>
//     </TouchableOpacity>
// )
  }

export default DuplicatesAlertItem;