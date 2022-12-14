import {Alert, FlatList, SafeAreaView,  TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Icon, Avatar } from '@rneui/themed';

import { Box, Center, HStack, Pressable, Stack, VStack,  } from 'native-base';
import styles from './styles';
import CustomDivider from '../Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';
import { sumTreesOrAreas } from '../../helpers/sumTreesOrAreas';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const uri =  `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

const GroupItem = ({ item, route, requestCameraPermission }) => {

   const navigation = useNavigation();
  // console.log('item:', JSON.stringify(item));
  return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        // backgroundColor: '#EBEBE4',
        borderColor: '#005000',
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',
        shadowColor: "#005000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,

      }}
    >
      <Stack direction="row" w="100%">
      <Center w="20%" m="2">
      <Pressable
        onPress={()=>{}}
      >

        <View
        style={{
          position: 'absolute',
          top: 25,
          left: -10,
          zIndex: 2,
        }}
        >
        
          <Icon name="add-a-photo" size={20} color="#005000" />
        </View>
        <Avatar 
            size={80}
            rounded
            title={getInitials(item?.manager?.fullname)}
            containerStyle={{ backgroundColor: "grey" }}
            source={{ uri }}
        />
        </Pressable>
      </Center>

      <Box w="80%">
    <TouchableOpacity
      onPress={()=>{
        navigation.navigate('Group', {
          ownerId: item._id,
        })
      }}    
    >

      <Text 
        style={{
          fontSize: 20,
          fontFamily: 'JosefinSans-Bold',
          color: '#005000',
        }}
      >
        {item?.name}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: '#005000',
          paddingTop: 6,
          
        }}
        >
        {' '}({item?.type})
        </Text>
      </Text>
    <Stack direction="column" >
        <Stack direction="row">
          <Box w="80%" style={{ }}>
        <Stack direction="row">
            {/* <Box w="80%" > */}
              <Text 
                style={{
                  fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                // paddingTop: 6,
                }}
              >
               {item?.type?.includes('Grupo') ? 'Representante: ' : 'Presidente: '} 
              {
                item?.manager?.fullname
              }
              </Text>
        </Stack>
            {/* </Box>
            <Box w="20%">
            
          </Box> */}
        <Stack direction="row">
            <Box w="50%" >
              <Text 
                style={{
                  fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                // paddingTop: 6,
                }}
              >
                Tel: {
                  item?.manager?.phone ? item?.manager?.phone
                  : 'Nenhum'
                }
              </Text>
            </Box>
            <Box w="50%">
            <Stack direction="row">
                  <Text 
                    style={{
                      fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                    // paddingTop: 6,
                  }}
                  >
                    Parcelas: {' '}
                  </Text>
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>{item?.farmlands.length}</Text>
              </Stack>
            </Box>
        </Stack>
        </Box>
        <Box w="20%" style={{ }}>
          <Pressable
            onPress={()=>navigation.navigate('FarmlandForm1', {
              ownerId: item._id,
              ownerName: `${item.type} ${item.name}`,
              flag: 'Grupo',
            })}
          >
            <FontAwesomeIcon icon={faTree} size={30} color="#005000" />
          </Pressable>
        </Box>
        </Stack>
      </Stack>
  </TouchableOpacity>
  </Box>
  </Stack>

  <Stack direction="row" w="100%" style={{ paddingTop: 10,  }}>
        <Box w="100%">
          <Text 
            style={{ fontFamily: 'JosefinSans-Italic'}}
          >
            Registo: {new Date(item.createdAt).toLocaleDateString()} por {'user'}
          </Text>
        </Box>
      </Stack>
    </View>
  )
}

export default GroupItem;