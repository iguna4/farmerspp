import {TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {Icon, Avatar } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates'


const FarmerItem = ({ item, route, farmerType }) => {

   const [visible, setVisible] = useState(false);
   const navigation = useNavigation();



  return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        // backgroundColor: '#EBEBE4',
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',
        borderColor: COLORS.main,
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
      <Center w="15%" m="2">
        <Avatar 
            size={60}
            rounded
            title={getInitials(item?.names?.surname)}
            containerStyle={{ backgroundColor: COLORS.grey }}
            source={{ uri: item?.image ? item?.image : 'htt://localhost/not-set-yet' }}
        />
      </Center>

      <Box w="85%">

      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('Farmer', {
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
        {item.names.otherNames}{' '}{item.names.surname}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: COLORS.main,
          paddingTop: 6,
          
        }}
        >
        {' '}({item.category})
      </Text>
    </Text>

    <Stack direction="column" >


        <Stack direction="row">
          <Box w="100%" style={{ }}>
        <Stack direction="row">
          <Text 
            style={{
              fontSize: 15,
              fontFamily: 'JosefinSans-Italic',
            // paddingTop: 6,
            }}
            >
            Provedor-S-Pulverização: {'  '}
          </Text>
          {
            item.isSprayingAgent ?
            <Icon name="check-circle" color="green" />
            :
            <Icon name="close" color="red" />
          }
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
              item.contact.primaryPhone ? item.contact.primaryPhone
              : item.contact.secondaryPhone ? item.contact.secondaryPhone : 'Nenhum'
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
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>{item.farmlands.length}</Text>
              </Stack>
            </Box>
      </Stack>

        </Box>
        {/* <Box w="20%" style={{ 
          marginTop: 20,
          
        }}>
          <Pressable
            onPress={()=>navigation.navigate('FarmlandForm1', {
              ownerId: item._id,
              ownerName: item.names?.otherNames + ' ' + item.names?.surname,
              flag: 'Indivíduo',
            })}
            >
            <FontAwesomeIcon icon={faTree} size={30} color={COLORS.main} />
          </Pressable>
        </Box> */}
        </Stack>
      </Stack>
    </TouchableOpacity>
  </Box>
  </Stack>
  
  <Stack direction="row" w="100%" style={{ paddingTop: 5,  }} >
      <Box w="100%">
        <Text 
          style={{ 
            textAlign: 'right',
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Italic',
            fontSize: 12,
          }}
          >
          Registo:{' '}                 
          {new Date(item.createdAt).getDate()}/{months[new Date(item.createdAt).getMonth()]}/{new Date(item.createdAt).getFullYear()}
          {' '} por {item.user}
        </Text>
      </Box>
  </Stack>
  </View>
  )
}

export default FarmerItem