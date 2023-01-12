import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
import PersonalData from '../../components/PersonalData/PersonalData';
import FarmlandData from '../../components/FarmlandData/FarmlandData';
import GroupData from '../../components/GroupData/GroupData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
const { useRealm, useQuery, useObject } = realmContext; 


const uri = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

const GroupScreen = ({ route, navigation }) =>{
    const ownerId = route.params.ownerId;
    const farmer = useObject('Group', ownerId);
    const farmlands = useQuery('Farmland').filtered('farmer == $0', ownerId);

    const keyExtractor = (item, index)=>index.toString();

    // console.log('farmlands: ', JSON.stringify(farmlands));


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
                paddingVertical: 15,
                padding: 5,
                marginBottom: 20,
            }}
      >

          <Box w="100%"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              {/* <View> */}
            <View
              style={{
                position: 'absolute',
                top: 225,
                left: 60,
                zIndex: 2,
              }}
            >
              <TouchableOpacity>
                <Icon name="add-a-photo" size={30} color="#005000" />
              </TouchableOpacity>
            </View>
            <Image 
              resizeMethod='auto'
              style={[styles.stretch, { borderWidth: 3, borderColor: '#005000', backgroundColor: 'lightgrey', }]}
              source={{ uri }}               
            />
              {/* </View> */}
                <Text 
                style={{
                  
                  color: '#005000',
                  fontSize: 24,
                  fontFamily: 'JosefinSans-Bold',
                  textAlign: 'center',
                  
                }}
                >
                    {farmer?.manager.fullname}
                </Text>
                <Text
                style={{
                  
                  color: '#005000',
                  fontSize: 12,
                  fontFamily: 'JosefinSans-Bold',
                  textAlign: 'center',
                  
                }}                
                >
                    ({farmer.type.includes('Grupo') ? 'Representante' : 'Presidente'})</Text>
            </Box>

    {/* 
        Personal Data Child Component
    */}
    <View        
      style={{
          marginTop: 40,
        }}
    >
        <GroupData farmer={farmer} />
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
            // paddingVertical: 5,
        }}>
          Parcelas de Cajueiros
        </Text>
        <Text
          style={{
              fontSize: 14,
              color: 'grey',
              textAlign: 'center',
              fontFamily: 'JosefinSans-Regular',
              paddingBottom: 5,
          }}
        >
          ({farmlands?.length} parcelas)
        </Text>

        <Stack direction="row" w="100%" px="3">
            <Box w="90%">

            </Box>
            <Box w="10%">

              <TouchableOpacity
                style={{
                  flexDirection: 'row'
                }}
                onPress={()=>navigation.navigate('FarmlandForm1', {
                  ownerId: farmer._id,
                  ownerName: `${farmer.type} ${farmer.name}`,
                  flag: 'Grupo',
                })}
              >
                <Icon name="add-circle" color="red" size={40} />

              </TouchableOpacity>
            </Box>            
        </Stack>




        {
            farmlands?.map((farmland)=>
            (<FarmlandData key={farmland._id} farmland={farmland} />))
        }
        </Box>

        </ScrollView>
</SafeAreaView>
    )
}

const styles = StyleSheet.create({
  stretch: {
    width: 300,
    height: 300,
    borderRadius: 200,
  }
})

export default GroupScreen;