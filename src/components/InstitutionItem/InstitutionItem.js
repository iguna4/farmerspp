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
import COLORS from '../../consts/colors';

const uri =  `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

const InstitutionItem = ({ item, route, requestCameraPermission }) => {

   const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        // backgroundColor: '#EBEBE4',
        borderColor: COLORS.main,
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',
        shadowColor: COLORS.main,
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
        
        <Icon name="add-a-photo" size={20} color={COLORS.main} />
        </View>
      <Avatar 
        size={80}
        rounded
        title={getInitials(item?.manager?.fullname)}
        containerStyle={{ backgroundColor: COLORS.grey }}
        source={{ uri }}
        />
      </Pressable>
    </Center>
    <Box w="80%">

    <TouchableOpacity
      onPress={()=>{
        navigation.navigate('Institution', {
          ownerId: item._id,
        })
      }}  
      >


      <Text 
        style={{
          fontSize: 20,
          fontFamily: 'JosefinSans-Bold',
          color: COLORS.main,
        }}
      >
        {item?.type === 'Outro' ? 'Empresa': `${item?.type}`}{' '}{item?.name}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: COLORS.main,
          paddingTop: 6,
          
        }}
        >
        {' '}({item?.isPrivate ? 'Instituição Privada' : 'Instituição Pública'})
        </Text>
      </Text>
    <Stack direction="column" >
        <Stack direction="row">
          <Box w="80%" style={{ }}>
        <Stack direction="row">
            <Text 
                style={{
                  fontSize: 15,
                  fontFamily: 'JosefinSans-Italic',
                  // paddingTop: 6,
                }}
                >
                Responsável: {' '}
              {
                item?.manager?.fullname
              }
            </Text>
        </Stack>

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
              ownerId: item?._id,
              ownerName: `${item?.type} ${item?.name}`,
              flag: 'Instituição',
            })}
            >
            <FontAwesomeIcon icon={faTree} size={30} color={COLORS.main} />
          </Pressable>
        </Box>
        </Stack>
      </Stack>
    </TouchableOpacity>
    </Box>
    </Stack>

     <Stack direction="row" w="100%" style={{ paddingTop: 10,  }} >
        <Box w="100%">
          <Text 
            style={{ fontFamily: 'JosefinSans-Italic'}}
          >
            Registo: {new Date(item?.createdAt).toLocaleDateString()} por {'user'}
          </Text>
        </Box>
      </Stack>
    </View>
  )
}

export default InstitutionItem;