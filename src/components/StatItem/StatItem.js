import {TouchableOpacity, View, Text,} from 'react-native';
import React from 'react';
import {Avatar } from '@rneui/themed';

import { Box, Center, Stack,  } from 'native-base';
import { getInitials } from '../../helpers/getInitials';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { months } from '../../helpers/dates';
import { getPercentage } from '../../helpers/getPercentage';


export default function StatItem ({ item, route }){

   const navigation = useNavigation();

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

    <Stack direction="row" w="100%">
        <Center w="15%" m="2">
            <Avatar 
                size={60}
                rounded
                title={getInitials(item?.userName)}
                containerStyle={{ backgroundColor: COLORS.grey }}
                source={{ uri: 'http://localhost/not-set-yet'  }}
            />
        </Center>
        <Box w="85%">

        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('UserStat', {
              userId: item?.userId,
              userName: item?.userName,
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
                {item?.userName}
            </Text>
            <Stack direction="row" w="100%" space={1}
                style={{ padding: 5, }}
            >
                <Box w="30%">

                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text
                        style={{ 
                            color: COLORS.black, 
                            fontFamily: 'JosefinSand-Bold',
                            fontSize: 15,
                        }}
                    >Meta</Text>
                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text
                        style={{ 
                            color: COLORS.black, 
                            fontFamily: 'JosefinSand-Bold',
                            fontSize: 15,
                        }}
                    >Realização</Text>
                </Box>
            </Stack>
            <Stack direction="row" w="100%" 
                style={{ padding: 5, }}
            >
                <Box w="30%">
                    <Text
                        style={{ 
                            color: COLORS.black, 
                            fontFamily: 'JosefinSand-Bold',
                            fontSize: 15,
                        }}
                    >Produtores</Text>
                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text
                        style={{
                            // textAlign: 'center',

                        }}
                    >{item?.targetFarmers}</Text>
                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text>{getPercentage(item?.registeredFarmers, item?.targetFarmers)}</Text>
                </Box>
            </Stack>
            <Stack direction="row" w="100%" 
                style={{ padding: 5, }}
            >
                <Box w="30%">
                    <Text
                        style={{ 
                            color: COLORS.black, 
                            fontFamily: 'JosefinSand-Bold',
                            fontSize: 15,
                        }}
                    >Pomares</Text>
                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text>{item?.targetFarmlands}</Text>
                </Box>
                <Box w="35%" alignItems={"center"}>
                    <Text>{getPercentage(item?.registeredFarmlands, item?.targetFarmlands)}</Text>
                </Box>
            </Stack>
        </TouchableOpacity>
    </Box>
    </Stack>
</View>
  )
}

// export default StatItem;