import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native';
import { Box, Stack, Center } from 'native-base';
import { Icon } from '@rneui/base';
import AwesomeAlert from 'react-native-awesome-alerts';
import {  
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol } 
      from 'react-native-responsive-screen';

import { 
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveHeight,
  responsiveWidth,
  responsiveScreenHeight,
  responsiveScreenWidth,
  useDimensionsChange,

} from 'react-native-responsive-dimensions';

import styles from './styles';
import FarmlandData from '../../components/FarmlandData/FarmlandData';
import InstitutionData from '../../components/InstitutionData/InstitutionData';
import COLORS from '../../consts/colors';
import PhotoModal from '../../components/Modals/PhotoModal';

import { realmContext } from '../../models/realmContext';
import { useEffect } from 'react';
import { useUser } from '@realm/react';
import { roles } from '../../consts/roles';
const { useRealm, useQuery, useObject } = realmContext; 

const institution = 'institution';
const institutionFarmlands = 'institutionFarmlands';


export default function InstitutionScreen ({ route, navigation }) {
    const ownerId = route.params.ownerId;
    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;
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
            paddingVertical:hp('1%'),
            backgroundColor: '#EBEBE4',
            // borderTopWidth: 0,
            // borderColor: '#EBEBE4',
            // borderBottomWidth: 3,
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
      <AwesomeAlert
        show={isAddPhoto}
        showProgress={false}
        title="Fotografia"
        message="Pretendes carregar uma nova fotografia?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="   Não   "
        confirmText="   Sim   "
        confirmButtonColor={COLORS.main}
        cancelButtonColor={COLORS.danger}
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
          <Box
            // style={{ justifyContent: 'center'}}
          >

        <Pressable
                onPress={()=>{
                  navigation.navigate('Farmers');
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon 
                        name="arrow-back-ios" 
                        color={COLORS.main}
                        size={wp('8%')}
                        // onPress={()=>{}}
                    /> 
                    <Text
                        style={{
                            color: COLORS.main,
                            fontFamily: 'JosefinSans-Bold',
                            marginLeft: -10,
                        }}
                    >
                        {/* Voltar */}
                    </Text>
                </Pressable>


        {/* <Pressable
            onPress={()=>navigation.goBack()
              // navigate('Farmers')
            }
        >

          <Icon 
              name="arrow-back-ios" 
              color={COLORS.main}
              size={35}
              
              />
            </Pressable> */}
          </Box>

          <Box w="100%" 

          >
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: responsiveFontSize(2), 
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
              marginTop: hp('10%'),
              borderRadius: 30,
              borderWidth: 3,
              borderColor: COLORS.pantone,
            }}
            >
              {/* <View> */}
            <TouchableOpacity
              onPress={()=>{
                if(customUserData?.role !== roles.provincialManager){
                  setIsAddPhoto(!isAddPhoto);
                }
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
     ( <Box>
      <Icon 
        style={{
          position: 'relative',
          top: 10,
        }}
        name="account-circle" 
        size={wp('60%')} 
        color={COLORS.grey} 
      />
    </Box>
   )            
  }
          </TouchableOpacity>            
            
                <Text 
                style={{
                  
                  color: COLORS.main,
                  fontSize:  responsiveFontSize(2.5),
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
                  fontSize:  responsiveFontSize(1.6),
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
{        
    customUserData?.role !== roles.provincialManager &&  
        <Stack direction="row" w="100%" p="4">
            <Box w="20%">

            </Box>
            <Box w="80%" 
              // alignItems={'center'}
              style={{
                alignItems: 'flex-end',
              }}
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
                {/* <Icon 
                  name="add-circle" 
                  color={COLORS.mediumseagreen} 
                  size={wp('15%')} 
                /> */}

                <Box
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: COLORS.mediumseagreen,
                        padding: 4,
            
                    }}
                >
                    <Icon name="save" size={25} color={COLORS.mediumseagreen} />
                    {/* </Box> */}
                    <Text
                        style={{
                            color: COLORS.mediumseagreen,
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',
                            paddingLeft: 5,
                        }}
                    >
                        Registar Pomar
                    </Text>

                </Box>


              </TouchableOpacity>
            </Box>            
          </Stack>
        }

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

