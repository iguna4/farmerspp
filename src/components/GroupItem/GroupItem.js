import {TouchableOpacity, View, Text,} from 'react-native';
import React from 'react';
import {Avatar, Icon } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates';
import { resourceValidation } from '../../consts/resourceValidation';


const GroupItem = ({ item, route }) => {

   const navigation = useNavigation();
   
   return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        minHeight: 100,
        width: '100%',
        flex: 1,
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
      <Box
        style={{
          position: 'absolute',
          top: 1,
          right: 1,
          zIndex: 1,
        }}
      >
        <Icon 
          name={item?.validated === resourceValidation.status.pending ? 'pending-actions' : item?.validated === resourceValidation.status.validated ? 'check-circle' : 'dangerous'}
          size={30}
          color={item?.validated === resourceValidation.status.pending ? COLORS.danger : item?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red}
        />
      </Box>
      <Stack direction="row" w="100%">
      <Center w="15%" m="2">

      <Avatar 
            size={60}
            rounded
            title={item.imageAlt}
            containerStyle={{ backgroundColor: COLORS.grey }}
            source={{ uri: item.image }}
        />
      </Center>

      <Box w="85%">
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
          color: COLORS.main,
        }}
      >
        {item?.name}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: COLORS.main,
          paddingTop: 6,
          
        }}
        >
        {' '}({item?.type})
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
                }}
              >
               {item?.type?.includes('Grupo') ? 'Representante: ' : 'Presidente: '} 
              {item.manager}
              </Text>
        </Stack>
        <Stack direction="row">
            <Box w="50%" >
              <Text 
                style={{
                  fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                }}
              >
                Tel: {item.phone}
              </Text>
            </Box>
            <Box w="50%">
            <Stack direction="row">
                  <Text 
                    style={{
                      fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                  }}
                  >
                    Parcelas: {' '}
                  </Text>
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>
                    {item.farmlands}
                    </Text>
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
          Registo: {item.createdAt} por {item.user}
        </Text>
      </Box>
  </Stack>
    </View>
  )
}

export default GroupItem;