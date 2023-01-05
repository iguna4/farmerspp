import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Box, Stack, Center } from 'native-base';
import { Divider, Icon } from '@rneui/base';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
const { useRealm, useQuery, useObject } = realmContext; 

const FarmerScreen = ({ route, navigation }) =>{

    const ownerId = route.params.ownerId;
    const farmer = useObject('Farmer', ownerId);

    return (
        <SafeAreaView 
            style={{ 
                minHeight: '100%', 
                backgroundColor: 'ghostwhite',

            }}
        >

      <View
          style={{
            // height: "10%",
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: 30,

            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
          }}
      >
        <Stack
          direction="row" w="100%"
        >
          <Center w="10%"
            style={{ justifyContent: 'center'}}
          >
          <Icon 
              name="arrow-back-ios" 
              color="#005000"
              size={35}
            />
          </Center>

          <Box w="70%" 

          >
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: 20, 
                  color: '#005000', 
                }}
              >
                Produtor
              </Text>

              <Stack direction="row" space={2} my="2">
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >
                  </Text>
                </Center>
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >
                    </Text>
                </Center>
              </Stack>
            </Center>
          </Box>

          <Box w="20%"
            style={{ justifyContent: 'center'}}
          >
          {/* <Icon 
              name="search" 
              color="#005000"
              size={40}
            /> */}
          </Box>
        </Stack>
      </View>
      <ScrollView
        style={{ padding: 10, }}
      >
        <View
            style={{ 
                minHeight: 300, 
                width: '100%', 
                background: '#005000',
                padding: 5,
            }}
        >
            <Box w="100%"
                style={{
                    backgroundColor: '#005000',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text 
                style={{
                        
                    color: 'ghostwhite',
                    fontSize: 24,
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                          
                }}
                >
                    {farmer.names.otherNames}{' '}{farmer.names.surname}
                </Text>
                <Text
                style={{
                        
                    color: 'ghostwhite',
                    fontSize: 12,
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                          
                }}                
                >
                    ({farmer.category})</Text>
            </Box>
            <Stack w="100%" direction="row">
                <Box w="40%" py="4">
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',

                        }}
                    >
                    Nascimento:</Text>
                </Box>
                <Box w="60%" py="4">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        {new Date(farmer.birthDate).toLocaleDateString()}{' '}({new Date().getFullYear() - new Date(farmer.birthDate).getFullYear()} anos)
                    </Text>
                    <CustomDivider />
{
            !farmer?.birthPlace?.province?.includes('Estrangeiro') ?
            (
                <Box>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.province + " (província)" }
                    </Text>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.district + " (distrito)" }
                    </Text>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        { farmer?.birthPlace?.adminPost + " (posto admin.)" }
                    </Text>
                </Box>

            )
            : 
            (
                
            <Box>
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.birthPlace?.district + " (País Estrangeiro)" }
                </Text>
            </Box>
            )
}
                </Box>
            </Stack>
            <CustomDivider />
            <Stack w="100%" direction="row">
                <Box w="40%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Endereço:
                </Text>
                </Box>
                <Box w="60%" py="4">
                    <Box>
                        <Text                     
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            {farmer?.address?.province} (província)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.district} (distrito)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.adminPost} (posto admin.)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.village ? farmer?.birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}
                        </Text>
                    </Box>
                </Box>
            </Stack>
            <CustomDivider />

            <Stack w="100%" direction="row">
            <Box w="40%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Contacto:
                </Text>
                </Box>
                <Box w="60%" py="4">
                    <Box>
                        <Text                     
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            {farmer?.address?.province} (província)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.district} (distrito)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.adminPost} (posto admin.)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.village ? farmer?.birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}
                        </Text>
                    </Box>
                </Box>
            </Stack>

        </View>
      </ScrollView>

        </SafeAreaView>
    )
}

export default FarmerScreen;