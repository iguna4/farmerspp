import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text} from "react-native";
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
        onPress={()=>{
          navigation.navigate('Farmer', {
            ownerId: item._id,
          })
        }}
      >
        <Alert max="100%" status="info" my={2}
          style={{ borderRadius: 10, }}
        >
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                {/* <Alert.Icon /> */}

                <Avatar 
                    size={60}
                    rounded
                    title={getInitials(item?.names?.surname)}
                    containerStyle={{ backgroundColor: COLORS.grey }}
                    source={{ uri: item?.image ? item?.image : 'htt://localhost/not-set-yet' }}
                />


                <Text 
                style={{
                  fontSize: 20,
                  color: COLORS.main,
                  fontFamily: 'JosefinSans-Bold',
                }}
                >
                  {item.names.otherNames}{' '}{item.names.surname}
                </Text>
              </HStack>
            </HStack>
            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Nascimento: 
              </Text>
              </Box>
              <Box w="70%">
              <Text  
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >              
                {new Date(item.birthDate).getDay()}/{months[new Date(item.birthDate).getMonth()]}/{new Date(item.birthDate).getFullYear()}
              </Text>
              </Box>
            </HStack>

            <HStack 
            flexShrink={1} 
            space={1} 
            alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Residência: 
              </Text>
              </Box>
              <Box w="70%">
{ 
item.address?.village !== '' &&
             <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
               >
                {item.address.village}
              </Text>
}
{ item.address.adminPost &&
             <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
               >
                {item.address.adminPost}
              </Text>
}
{ item.address.district &&
              <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
               >
                {item.address.district}
              </Text>
}
              </Box>
            </HStack>

            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Registo: 
              </Text>
              </Box>
              <Box w="70%">
              <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Regular',
                }}
                >
                {new Date(item.createdAt).getDate()}/{months[new Date(item.createdAt).getMonth()]}/{new Date(item.createdAt).getFullYear()} ({item?.user ? item?.user  : 'usuario'})
              </Text>
              </Box>
            </HStack>
          </VStack>
        </Alert>
    </TouchableOpacity>
)
  }

export default DuplicatesAlertItem;