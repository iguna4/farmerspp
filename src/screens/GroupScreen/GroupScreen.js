import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Pressable } from 'react-native';
import { Box, Stack, Center } from 'native-base';
import { Icon } from '@rneui/base';
import AwesomeAlert from 'react-native-awesome-alerts';

import FarmlandData from '../../components/FarmlandData/FarmlandData';
import GroupData from '../../components/GroupData/GroupData';
import COLORS from '../../consts/colors';
import PhotoModal from '../../components/Modals/PhotoModal';
import styles from './styles';

import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 



export default function GroupScreen ({ route, navigation }) {
    const ownerId = route.params.ownerId;
    const realm = useRealm();
    const farmer = useObject('Group', ownerId);
    const farmlands = useQuery('Farmland').filtered('farmer == $0', ownerId);
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

    const keyExtractor = (item, index)=>index.toString();

    return (
        <SafeAreaView 
            style={{ 
                minHeight: '100%', 
                backgroundColor: COLORS.ghostwhite,

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

      <View
          style={{
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: 10,
            backgroundColor: '#EBEBE4',
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
          <Center w="10%">
          <Pressable
              onPress={()=>navigation.navigate('Farmers')}
          >

            <Icon 
                name="arrow-back-ios" 
                color={COLORS.main}
                size={35}
                />
          </Pressable>`
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
                {farmer?.type}
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
          </Box>
        </Stack>
      </View>
      <ScrollView
            contentContainerStyle={{
                paddingVertical: 15,
                padding: 5,
            }}
      >

          <Box w="100%"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 60,
              borderRadius: 5,
              borderColor: COLORS.main,
              shadowColor: COLORS.main,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.27,
              shadowRadius: 1.65,
      
              elevation: 1,
            }}
            >
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
     farmer?.image &&   
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
            color: COLORS.black,
            textAlign: 'center',
            fontFamily: 'JosefinSans-Bold',
        }}>
          Parcelas de Cajueiros
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
          ({farmlands?.length} parcelas)
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
                  flag: 'Grupo',
                })}
              >
                <Icon name="add-circle" color={COLORS.second} size={60} />

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
          photoOwnerType={'Grupo'}
          isPhotoModalVisible={isPhotoModalVisible}
          setIsPhotoModalVisible={setIsPhotoModalVisible}
        />
        </ScrollView>
</SafeAreaView>
    )
}


