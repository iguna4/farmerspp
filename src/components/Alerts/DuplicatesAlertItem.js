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
      style={{ marginBottom: 10, }}
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
        borderTopColor: COLORS.second,
        borderTopWidth: 10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderColor: COLORS.main,
        // borderWidth: 3,
        shadowColor: COLORS.main,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
        flexDirection: 'row',
       }}
    >
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
            backgroundColor: COLORS.lightgrey,
            width: '100%',
            height: '100%',
          }}
        >
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
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
  )}

export default DuplicatesAlertItem;