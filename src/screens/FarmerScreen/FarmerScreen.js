import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable, StyleSheet, Platform } from 'react-native';
import { Box, Stack, Center, } from 'native-base';
import { Divider, Icon, Avatar } from '@rneui/base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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

import PersonalData from '../../components/PersonalData/PersonalData';
import FarmlandData from '../../components/FarmlandData/FarmlandData';
import styles from './styles';
import COLORS from '../../consts/colors';
import PhotoModal from '../../components/Modals/PhotoModal';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
import { roles } from '../../consts/roles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from 'react-native';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
const { useRealm, useQuery, useObject } = realmContext; 

const singleFarmer = 'singleFarmer';
const ownFarmlands = 'ownFarmlands';


export default function FarmerScreen ({ route, navigation }) {
    const ownerId = route.params.ownerId;
    const farmersIDs = route.params?.farmersIDs;
    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;
    const farmer = realm.objectForPrimaryKey('Actor', ownerId);
    const farmlands = realm.objects("Farmland").filtered('farmerId == $0', ownerId);
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [currentNode, setCurrentNode] = useState({next: null, prev: null, current: null });
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
    // ------------------------------------------------------------------------
    // Editing Single Farmer Data
    


    // ----------------------------------------------------------------------

    useEffect(()=>{

      if(farmersIDs?.length > 0){
        current = farmersIDs.find((node)=>node.current === ownerId);
        setCurrentNode(current);
      }

    }, [ ownerId  ]);


    useEffect(() => {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(singleFarmer);
        mutableSubs.add(
          realm.objects('Actor').filtered(`_id == "${ownerId}"`),
          {name: singleFarmer},
        );
      });
  
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(ownFarmlands);
        mutableSubs.add(
          realm.objects('Farmland').filtered(`farmerId == "${ownerId}"`),
          {name: ownFarmlands},
        );
      });
      

    }, [realm, refresh ]);

    // useEffect(()=>{

    // }, [ navigation ]);


    if (loadingActivitiyIndicator) {
      return <CustomActivityIndicator 
          loadingActivitiyIndicator={loadingActivitiyIndicator}
          setLoadingActivityIndicator={setLoadingActivityIndicator}
      />
    }




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



      <View
          style={{
            // height: "10%",
            width: '100%',
            paddingHorizontal: 5,
            paddingVertical:hp('1%'),
            backgroundColor: '#EBEBE4',
            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
            alignItems: 'center',
          }}
      >
        <Stack
          direction="row" w="100%"
        >
          <Box 
            // style={{ justifyContent: 'center'}}
          >

          <Pressable
                onPress={()=>{
                  navigation.navigate('Farmers');
                  // setRefresh(!refresh);
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
                  // .navigate('Farmers')
                }
            >
                <Icon 
                    name="arrow-back-ios" 
                    color={COLORS.main}
                    size={35}
                    />
            </Pressable> */}
          </Box>

          <Box w="100%">
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: responsiveFontSize(2), 
                  color: COLORS.main, 
                }}
              >
                Produtor Singular
              </Text>

              <Stack direction="row" space={2} >
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
        </Stack>
      </View>

        <Box
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height / 2,
            left: 0,
            zIndex: 10,
          }}
        >
{   currentNode?.prev &&
     <TouchableOpacity
            style={{
              height: 60,
              width: 30,
              backgroundColor: COLORS.lightgrey,
              opacity: .5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>{
              setLoadingActivityIndicator(true);
              navigation.navigate('Farmer', {
                ownerId: currentNode?.prev,
                farmersIDs,
              });
            }}
          >
            <Icon name="arrow-back-ios" size={40} color={COLORS.ghostwhite} />
          </TouchableOpacity>}
        </Box>


      <Box
        style={{
          position: 'absolute',
          top: Dimensions.get('window').height / 2,
          right: 0,
          zIndex: 10,
        }}
      >
      {currentNode?.next &&
          <TouchableOpacity
            style={{
              height: 60,
              width: 30,
              backgroundColor: COLORS.lightgrey,
              opacity: .5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>{
              setLoadingActivityIndicator(true);
              navigation.navigate('Farmer', {
                ownerId: currentNode?.next,
                farmersIDs,
              })
            }}
          >
            <Icon name="arrow-forward-ios" size={40} color={COLORS.ghostwhite} />
          </TouchableOpacity>}
        </Box>


      <ScrollView
        contentContainerStyle={{
            // paddingVertical: 15,
            padding: 5,
            // marginBottom: 60,
        }}
      >

        <Box w="100%"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp('10%'),
            borderRadius: 30,
            borderWidth: 3,
            borderColor: COLORS.pantone,
          }}
        >
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
          farmer?.image &&   
          ( 
          <>
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
        {farmer?.names?.otherNames}{' '}{farmer?.names?.surname}
      </Text>
{ farmer?.assets?.map((asset, index)=>(
      <Text
        key={index}
        style={{  
          color: COLORS.main,
          fontSize:  responsiveFontSize(1.6),
          fontFamily: 'JosefinSans-Bold',
          textAlign: 'center',
          position: 'relative',
          top: -50,
        }}                
      >
        ({asset.category} {asset.subcategory})
      </Text>

))     
    }
    </Box>

    
    {/* 
        Personal Data Child Component
      */}
    <View
        style={{
          marginTop: 40,
        }}
    >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            fontFamily: 'JosefinSans-Bold',
            textAlign: 'right',
            padding: 10,
            letterSpacing: 5,
          }}
        >{farmer?.identifier}</Text>
        <PersonalData 
          setRefresh={setRefresh} 
          refresh={refresh} 
          farmer={farmer} 
        />
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
        >({farmlands?.length})</Text>

{     
  customUserData?.role !== roles.provincialManager &&  
      <Stack direction="row" w="100%" p="4">
          <Box w="50%">

          </Box>
          <Box w="50%" 
              // alignItems={'center'}
              style={{
                alignItems: 'flex-end',
              }}
            >

              <TouchableOpacity
                style={{
                  flexDirection: 'row'

                }}
                onPress={()=>{
                  navigation.navigate('FarmlandForm1', {
                  ownerId: farmer._id,
                  ownerName: `${farmer?.names?.otherNames} ${farmer?.names?.surname}`,
                  flag: 'Indivíduo',
                })
                setRefresh(!refresh);
              }}
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
                    <FontAwesomeIcon icon={faTree} size={20} color={COLORS.mediumseagreen} />
                    {/* <Icon name="save" size={20} color={COLORS.mediumseagreen} /> */}
                    {/* </Box> */}
                    <Text
                        style={{
                            color: COLORS.mediumseagreen,
                            fontSize: 14,
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
            (<FarmlandData 
              key={farmland?._id} 
              farmland={farmland} 
              setRefresh={setRefresh} 
              refresh={refresh}  
            />))
        }
        </Box>
        <PhotoModal 
          realm={realm}
          photoOwner={farmer}
          photoOwnerType={'Indivíduo'}
          isPhotoModalVisible={isPhotoModalVisible}
          setIsPhotoModalVisible={setIsPhotoModalVisible}
        />
        </ScrollView>
</SafeAreaView>
    )
};

