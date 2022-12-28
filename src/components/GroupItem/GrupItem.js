import {Alert, FlatList, SafeAreaView,  TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Icon } from '@rneui/themed';

import { Box, Center, HStack, Pressable, Avatar, Stack, VStack,  } from 'native-base';
import styles from './styles';
import CustomDivider from '../Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';
import { sumTreesOrAreas } from '../../helpers/sumTreesOrAreas';



const GroupItem = ({ item, route }) => {

   const navigation = useNavigation();

  return (
    <Box 
      borderBottomWidth="1"
      borderBottomRadius={10}
      // borderColor="muted.800"
      // _dark={{
      //   borderColor: 'muted.50'
      // }}
      // pl={["2", "2"]} 
      // pr={["2", "2"]} 
      // py="4"
      style={{
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',

      }}
    >
      <Text 
        style={{
          fontSize: 20,
          fontFamily: 'JosefinSans-Bold',
          color: '#005000',
        }}
      >
        {item.name}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: '#005000',
          paddingTop: 6,
          
        }}
        >
        {' '}({item.type})
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
                Gerente: {'  '}
              {
                item.manager.fullname
              }
              </Text>
        </Stack>
            {/* </Box>
            <Box w="20%">
              
            </Box> */}
        <Stack direction="row">
            <Box w="80%" >
              <Text 
                style={{
                fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                // paddingTop: 6,
                }}
              >
                Tel: {
                item.manager.phone ? item.manager.phone
                : 'Nenhum'
              }
              </Text>
            </Box>
        </Stack>
        <Stack direction="row" space={4}>
            <Box w="50%" >
                {/* <Box w="70%"> */}
              <Stack direction="row">
                  <Text 
                    style={{
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                    // paddingTop: 6,
                    }}
                  >
                    Cajueiros: {' '}
                  </Text> 
                  <Text style={{ fontSize: 15, paddingTop: 2, }}>
                    {sumTreesOrAreas(item?.farmlands, 'trees')}
                  </Text>
              </Stack>
            </Box>
                {/* <Box w="30%">
                </Box>
            </Box> */}
            
            <Box w="50%">
                {/* <Box w="70%"> */}
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
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>
                    {item.farmlands.length}
                  </Text>
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
            <Icon name="arrow-right" size={80} color="#005000" />
          </Pressable>
        </Box>
        </Stack>
      </Stack>
      {/* </Box> */}
      <Stack direction="row" w="100%" style={{  }} >
        <Box w="25%"><Text style={{ fontFamily: 'JosefinSans-Italic'}}>{'user'}</Text></Box>
         <Box w="25%"></Box>
        <Box w="25%"></Box>
        <Box w="25%"><Text style={{ fontFamily: 'JosefinSans-Italic', textAlign: 'right'}}>{new Date(item.createdAt).toLocaleDateString()}</Text></Box>
      </Stack>
    </Box>
  )
}

export default GroupItem;