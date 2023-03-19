import {TouchableOpacity, View, Text,} from 'react-native';
import React, { useState, useEffect, } from 'react';
import {Icon, Avatar } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates'
import { resourceValidation } from '../../consts/resourceValidation';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 


const subScribedFarmlands = 'subScribedFarmlands';


const FarmerItem = ({ item, route, farmerType }) => {

   const navigation = useNavigation();
   const [farmlandStatus, setFarmlandStatus] = useState('');

   useEffect(()=>{

    if (item?.farmlandsList?.length > 0) {
      if (item?.farmlandsList.some(farmland => farmland.status === resourceValidation.status.invalidated)) {
        setFarmlandStatus(resourceValidation.status.invalidated);
      }
      else if (item?.farmlandsList.some(farmland => farmland.status === resourceValidation.status.pending)) {
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
        minHeight: 100,
        width: '100%',
        flex: 1,
        borderTopColor: COLORS.second,
        borderTopWidth: 10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
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
          name={item?.status === resourceValidation.status.pending ? 'pending-actions' : item?.status === resourceValidation.status.validated ? 'check-circle' : 'dangerous'}
          size={30}
          color={item?.status === resourceValidation.status.pending ? COLORS.danger : item?.status === resourceValidation.status.validated ? COLORS.main : COLORS.red}
        />
      </Box>
      <Stack direction="row" w="100%">
      <Center w="15%" m="2">

        <Avatar 
            size={60}
            rounded
            title={item.imageAlt}
            containerStyle={{ backgroundColor: COLORS.grey }}
            source={{ 
              uri: item.image
            }}
        />
  {    item?.isSprayingAgent &&   
        <Box
          style={{
            position: 'absolute',
            bottom: -1,
            left: -8,
          }}
        >
          <Icon name="verified-user" color="blue" />
        </Box>
      }
      </Center>

      <Box w="80%">

      <TouchableOpacity
        onPress={()=>{
          console.log('see farmer screen')
          navigation.navigate('Farmer', {
            ownerId: item._id,
          })
        }}
        >
      <Text 
        style={{
          fontSize: 18,
          fontFamily: 'JosefinSans-Bold',
          color: COLORS.main,
        }}
        >
        {item.name}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: COLORS.main,
          paddingTop: 6,
          
        }}
        >
        
      </Text>
    </Text>

    <Stack direction="column" >


        <Stack direction="row">
          <Box w="100%" >
            <Box style={{ 
            // flexDirection: 'row',
          }}>
            
            {
              item.assets?.map((asset, index)=>(
                <Text 
                key={index}
                  style={{
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Italic',
                  }}
                  >
                  {asset.category} {asset.subcategory}
                </Text>
              ))
            }
            
          </Box>
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
                <Box 
                // w="30%"
                style={{
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
                      Pomares: {' '}{item.farmlands}
                    </Text>
                    <Icon  name={
                      farmlandStatus === resourceValidation.status.pending 
                      ? 'pending-actions' 
                      : 
                      farmlandStatus === resourceValidation.status.validated 
                      ? 'check-circle' 
                      :
                      item?.farmlandsList.length === 0
                      ? 'error-outline'
                      : 'dangerous'
                    }
                          size={20}
                          color={farmlandStatus === resourceValidation.status.pending ? COLORS.danger : farmlandStatus === resourceValidation.status.validated ? COLORS.main : COLORS.red}
                    />
                  {/* </Box> */}
              {/* </Stack> */}
            </Box>
            <Box w="5%">

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

export default FarmerItem