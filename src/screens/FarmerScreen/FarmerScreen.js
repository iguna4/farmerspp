import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, Pressable } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
import PersonalData from '../../components/PersonalData/PersonalData';
import FarmlandData from '../../components/FarmlandData/FarmlandData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
const { useRealm, useQuery, useObject } = realmContext; 

const FarmerScreen = ({ route, navigation }) =>{
    const ownerId = route.params.ownerId;
    const farmer = useObject('Farmer', ownerId);
    const farmlands = useQuery('Farmland').filtered('farmer == $0', ownerId);

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
            paddingTop: 10,

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
            <Pressable
                onPress={()=>navigation.navigate('Farmers')}
            >
                <Icon 
                    name="arrow-back-ios" 
                    color="#005000"
                    size={35}
                    />
            </Pressable>
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
            contentContainerStyle={{
                // minHeight: '100%',
                paddingVertical: 15,
                padding: 5,
                marginBottom: 20,
            }}
      >

        {/* <View
            style={{ 
                minHeight: 300, 
                width: '100%', 
                background: '#005000',
            }}
        > */}
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
    
    {/* 
        Personal Data Child Component
    */}
    <View
        
    >
        <PersonalData farmer={farmer} />
    </View>

    <Box 
        alignItems="stretch" 
        w="100%" 
        style={{
            flex: 1,
            paddingVertical: 5,
            marginBottom: 100,
        }}
    >
        <Text style={{
            fontSize: 18,
            color: '#000',
            textAlign: 'center',
            fontFamily: 'JosefinSans-Bold',
            paddingVertical: 5,
        }}>Parcelas de Cajueiros</Text>

        { farmlands?.length === 0 &&
          <Box
            alignItems={'center'}
            style={{ justifyContent: 'center'}}
          >
            <Text
              style={{ fontSize: 16, fontFamily: 'JosefinSans-Regular', textAlign: 'center', color: 'red', }}
            >
              Nenhuma registada
            </Text>

            <Box  style={{
              minHeight: 150,
              justifyContent: 'center',

             }}>
              <Pressable
                onPress={()=>navigation.navigate('FarmlandForm1', {
                  ownerId: farmer._id,
                  ownerName: farmer.names?.otherNames + ' ' + farmer.names?.surname,
                  flag: 'Indivíduo',
                })}
              >
                <FontAwesomeIcon icon={faTree} size={35} color="#005000" />
              </Pressable>
            </Box>
          </Box>
        }

        {
            farmlands?.map((farmland)=>
            (<FarmlandData key={farmland._id} farmland={farmland} />))
        }
        </Box>
        {/* </View> */}
        </ScrollView>
</SafeAreaView>
    )
}

export default FarmerScreen;