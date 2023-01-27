import {TouchableOpacity, View, Text,} from 'react-native';
import React from 'react';
import {Avatar } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates';


const InstitutionItem = ({ item, route }) => {

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
    <Center w="15%" m="2">

    <Avatar 
            size={60}
            rounded
            title={getInitials(item?.manager?.fullname)}
            containerStyle={{ backgroundColor: COLORS.grey }}
            source={{ uri: item?.image ? item?.image : 'htt://localhost/not-set-yet' }}
        />
    </Center>
    <Box w="85%">

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
          <Box w="100%" style={{ }}>
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

export default InstitutionItem;