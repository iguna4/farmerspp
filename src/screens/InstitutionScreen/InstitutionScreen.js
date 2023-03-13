import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native';
import { Box, Stack, Center } from 'native-base';
import { Icon } from '@rneui/base';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from './styles';
import FarmlandData from '../../components/FarmlandData/FarmlandData';
import InstitutionData from '../../components/InstitutionData/InstitutionData';
import COLORS from '../../consts/colors';
import PhotoModal from '../../components/Modals/PhotoModal';

import { realmContext } from '../../models/realmContext';
import { useEffect } from 'react';
const { useRealm, useQuery, useObject } = realmContext; 

const institution = 'institution';
const institutionFarmlands = 'institutionFarmlands';


export default function InstitutionScreen ({ route, navigation }) {
    const ownerId = route.params.ownerId;
    const realm = useRealm();
    const farmer = realm.objectForPrimaryKey('Institution', ownerId);
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
    const farmlands = realm.objects("Farmland").filtered('farmerId == $0', ownerId);

    const keyExtractor = (item, index)=>index.toString();

    useEffect(() => {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(institution);
        mutableSubs.add(
          realm.objects('Institution').filtered(`_id == "${ownerId}"`),
          {name: institution},
        );
      });
  
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(institutionFarmlands);
        mutableSubs.add(
          realm.objects('Farmland').filtered(`farmerId == "${ownerId}"`),
          {name: institutionFarmlands},
        );
      });

    }, [realm ]);

    // useEffect(()=>{

    // }, [ navigation ]);

    return (
        <SafeAreaView 
            style={{ 
                minHeight: '100%', 
                backgroundColor: COLORS.ghostwhite,

            }}
        >

      <View
          style={{
            // height: "10%",
            width: '100%',
            paddingHorizontal: 5,
            // paddingTop: 10,
            backgroundColor: '#EBEBE4',
            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
            alignItems: 'center',
          }}
      >
      <AwesomeAlert
        show={isAddPhoto}
        showProgress={false}
        title="Fotografia"
        message="Pretendes carregar uma nova fotografia?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="   Não   "
        confirmText="   Sim!   "
        confirmButtonColor={COLORS.main}
        cancelButtonColor={COLORS.grey}
        onCancelPressed={() => {
            setIsAddPhoto(false);
        }}
        onConfirmPressed={() => {
          setIsAddPhoto(false);
          setIsPhotoModalVisible(true);
        }}
      />

        <Stack
          direction="row" w="100%"
        >
          <Center w="10%"
            // style={{ justifyContent: 'center'}}
          >
        <Pressable
            onPress={()=>navigation.goBack()
              // navigate('Farmers')
            }
        >

          <Icon 
              name="arrow-back-ios" 
              color={COLORS.main}
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
                  fontSize: 16, 
                  color: COLORS.main, 
                }}
              >
                Produtor Institucional
              </Text>

              <Stack direction="row" space={2}>
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: 14, 
                    }}
                  >
                  </Text>
                </Center>
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: 14, 
                    }}
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
                // paddingVertical: 15,
                padding: 5,
            }}
      >
         <Box w="100%"
            style={{
              alignItems: 'center',
              marginTop: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: COLORS.grey,
            }}
            >
              {/* <View> */}
            <TouchableOpacity
              onPress={()=>{
                setIsAddPhoto(true);
              }}
              style={{
                position: 'relative',
                top: -50,
              }}
            >
{            
     farmer?.image  &&   
     ( <>
          <Image 
            source={{ uri: farmer?.image }}
            style={styles.images}
          />
      </>
     )        
  }


{            
     !farmer?.image &&   
     ( <>
        <Icon name="account-circle" size={245} color={COLORS.grey} /> 
      </>
     )        
  }
          </TouchableOpacity>            
            
                <Text 
                style={{
                  
                  color: COLORS.main,
                  fontSize: 24,
                  fontFamily: 'JosefinSans-Bold',
                  textAlign: 'center',
                  position: 'relative',
                  top: -50,        
                }}
                >
                    {farmer?.manager?.fullname}
                </Text>
                <Text
                style={{
                  
                  color: COLORS.main,
                  fontSize: 12,
                  fontFamily: 'JosefinSans-Bold',
                  textAlign: 'center',
                  position: 'relative',
                  top: -50,              
                }}                
                >
                    (Responsável)</Text>
            </Box>
    
    {/* 
        Personal Data Child Component
    */}
    <View
      style={{
        marginTop: 40,
      }}
    >
        <InstitutionData farmer={farmer} />
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
            color: COLORS.black,
            textAlign: 'center',
            fontFamily: 'JosefinSans-Bold',
            // paddingVertical: 5,
        }}>
          Pomares
        </Text>
        <Text
          style={{
              fontSize: 14,
              color: COLORS.grey,
              textAlign: 'center',
              fontFamily: 'JosefinSans-Regular',
              paddingBottom: 5,
          }}
        >
          ({farmlands?.length})
        </Text>
        <Stack direction="row" w="100%">
            <Box w="70%">

            </Box>
            <Box w="30%" 
              alignItems={'center'}
            >

              <TouchableOpacity
                style={{
                  flexDirection: 'row'
                }}
                onPress={()=>navigation.navigate('FarmlandForm1', {
                  ownerId: farmer?._id,
                  ownerName: `${farmer?.type} ${farmer?.name}`,
                  flag: 'Instituição',
                })}
              >
                <Icon name="add-circle" color={COLORS.pantone} size={60} />

              </TouchableOpacity>
            </Box>            
        </Stack>

        {
            farmlands?.map((farmland)=>
            (<FarmlandData key={farmland?._id} farmland={farmland} />))
        }
        </Box>
        <PhotoModal 
          realm={realm}
          photoOwner={farmer}
          photoOwnerType={'Instituição'}
          isPhotoModalVisible={isPhotoModalVisible}
          setIsPhotoModalVisible={setIsPhotoModalVisible}
        />
        </ScrollView>
</SafeAreaView>
    )
}

