import {TouchableOpacity, View, Text,} from 'react-native';
import React, { useState, useEffect, } from 'react';
import {Avatar, Icon } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates';
import { resourceValidation } from '../../consts/resourceValidation';


const InstitutionItem = ({ item, route }) => {

   const navigation = useNavigation();
   const [farmlandStatus, setFarmlandStatus] = useState('');
   
   useEffect(()=>{

    if (item?.farmlandsList?.length > 0) {
      if (item?.farmlandsList.some(farmland => farmland.validated === resourceValidation.status.invalidated)) {
        setFarmlandStatus(resourceValidation.status.invalidated);
      }
      else if (item?.farmlandsList.some(farmland => farmland.validated === resourceValidation.status.pending)) {
        setFarmlandStatus(resourceValidation.status.pending);
      }
      else {
        setFarmlandStatus(resourceValidation.status.validated);
      }
    }
    else {
      // setFarmlandStatus(resourceValidation.status.invalidated);
    }

   }, [ item ]);


  return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        borderColor: COLORS.main,
        minHeight: 100,
        width: '100%',
        flex: 1,
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
    <Box w="80%">

    <TouchableOpacity
      onPress={()=>{
        navigation.navigate('Institution', {
          ownerId: item._id,
        })
      }}  
      >

      <Box>

      <Text 
        style={{
          fontSize: 18,
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
      </Box>
    <Stack direction="column" >
        <Stack direction="row">
          <Box w="100%" style={{ }}>
        <Stack direction="row">
            <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Italic',
                }}
                >
                Responsável: {item.manager}
            </Text>
        </Stack>

        <Stack direction="row">
            <Box w="50%" >
              <Text 
                style={{
                  fontSize: 14,
                  fontFamily: 'JosefinSans-Italic',
                }}
                >
                Tel: {item.phone}
              </Text>
            </Box>
            {/* <Box w="50%"> */}
            {/* <Stack direction="row"> */}
                <Box style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: farmlandStatus === resourceValidation.status.pending ? COLORS.danger : farmlandStatus === resourceValidation.status.validated ? COLORS.main : COLORS.red,
                  justifyContent: 'space-between',
                }}>
                    <Text 
                      style={{
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Italic',
                        marginHorizontal: 2,
                        paddingHorizontal: 5,
                      }}
                      >
                      Parcelas: {' '}{item.farmlands}
                    </Text>
                    <Icon  name={
                      farmlandStatus === resourceValidation.status.pending 
                      ? 'pending-actions' 
                      : 
                      farmlandStatus === resourceValidation.status.validated 
                      ? 'check-circle' 
                      :
                      item?.farmlands === 0
                      ? 'error-outline'
                      : 'dangerous'
                    }
                          size={20}
                          color={farmlandStatus === resourceValidation.status.pending ? COLORS.danger : farmlandStatus === resourceValidation.status.validated ? COLORS.main : COLORS.red}
                    />
                  {/* </Box> */}
              {/* </Stack> */}
            </Box>
            <Box w="5%"></Box>
        </Stack>
        </Box>
        </Stack>
      </Stack>
    </TouchableOpacity>
    </Box>
    {/* <Box w="5%"></Box> */}
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
          Registo:  {item.createdAt} por {item.user}
        </Text>
      </Box>
  </Stack>
    </View>
  )
}

export default InstitutionItem;