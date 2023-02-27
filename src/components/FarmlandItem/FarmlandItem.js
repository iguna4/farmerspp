import {TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {Icon, Avatar } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates'
import { resourceValidation } from '../../consts/resourceValidation';


export default function FarmlandItem ({ item, route, }) {

   const [visible, setVisible] = useState(false);
   const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 10,
        marginVertical: 10,
        // minHeight: 100,
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
       <TouchableOpacity
         onPress={()=>{
           navigation.navigate('Farmer', {
             ownerId: item.farmer,
           })
         }}
         >
      <Stack direction="row" w="100%" space={3}>
       <Box w="30%">
       <Text 
         style={{
           fontSize: 16,
           fontFamily: 'JosefinSans-Bold',
           color: COLORS.main,
         }}
         >
          Ano de plantio:
         </Text>

       </Box>

      <Box w="70%" >
       <Text 
          style={{
            fontSize: 16,
            fontFamily: 'JosefinSans-Regular',
            color: COLORS.grey,
          }}
          >
           {item?.plantingYear} ({item?.description})
        </Text>  

      </Box>
    </Stack> 


    <Stack direction="row" w="100%" space={3}>
       <Box w="30%">
       <Text 
         style={{
           fontSize: 16,
           fontFamily: 'JosefinSans-Bold',
           color: COLORS.main,
         }}
         >
          Cajueiros:
         </Text>

       </Box>

      <Box w="70%" >
       <Text 
          style={{
            fontSize: 16,
            fontFamily: 'JosefinSans-Regular',
            color: COLORS.grey,
          }}
          >
           {item?.trees} árvores (Compasso {item.density?.mode})
        </Text>  

      </Box>
    </Stack> 



    </TouchableOpacity>


  </View>
  )
}

// export default FarmerItem