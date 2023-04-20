import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text, Image} from "react-native";
import { Icon, CheckBox, Avatar } from '@rneui/themed';
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


import { getInitials } from "../../helpers/getInitials";
import COLORS from "../../consts/colors";
import { months } from "../../helpers/dates";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomDivider from "../Divider/CustomDivider";

const DuplicatesAlertItem = ({ item })=>{
  
  
  const navigation = useNavigation();

  return (
    <Box
      style={{ 
        marginBottom: 10, 
        backgroundColor: COLORS.fourth,
        borderRadius: 10,
        width: '100%',
        paddingRight: 10,
      }}
    >
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('Farmer', {
            ownerId: item._id,
          })
        }}
      >
      <View
        style={{ 
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <Box
          w="25%"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
      { item?.image ?
          <Avatar 
            size={wp('13%')}
            rounded
            title={item.imageAlt}
            containerStyle={{ backgroundColor: COLORS.grey }}
            source={{ 
              uri: item.image
            }}
          />
          :
          <Box
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
          <Box
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Icon 
                name="person"
                size={80}
                color={COLORS.grey}
                />
            </Box>
          </Box>
        }
        </Box>

        <Box
          w="75%"
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 5,
            flexDirection: 'row',
          }}
        >

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Regular',
              textAlign: 'justify',
              color: COLORS.black,
              lineHeight: 20,
            }}
          >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Bold',
              textAlign: 'justify',
              color: COLORS.black,
              lineHeight: 20,
            }}
          >
            {item?.names?.otherNames}{' '}{item?.names?.surname}{' '}
          </Text>
            nasceu aos{' '}{new Date(item?.birthDate).getDate()}/{new Date(item?.birthDate).getMonth()+1}/{new Date(item?.birthDate).getFullYear()}
            {' '}em{' '}{item?.birthPlace?.province}({item?.birthPlace?.district}), mora em{' '}
            {item?.address?.province} ({item?.address?.district}), registado aos{' '}{new Date(item?.createdAt).getDate()}/{new Date(item?.createdAt).getMonth()+1}/{new Date(item?.createdAt).getFullYear()} por {item?.userName}.
            </Text>
        </Box>
      </View>
    </TouchableOpacity>
    </Box>
  )}

export default DuplicatesAlertItem;