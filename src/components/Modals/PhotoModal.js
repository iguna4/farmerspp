import { useNavigation } from "@react-navigation/native";
import { Center, Alert, Stack, Box, } from "native-base";
import React, { useState, useCallback, } from "react";
import { Overlay } from "@rneui/base";

import { Icon, CheckBox } from '@rneui/themed';
import { Button, Text, View, Modal, Pressable, TouchableOpacity, SafeAreaView, Image } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


import COLORS from "../../consts/colors";

import { useUser } from "@realm/react";

function PhotoModal({ 
    realm, 
    photoOwner, 
    photoOwnerType, 
    isPhotoModalVisible, 
    setIsPhotoModalVisible,
    updateUserImage,
    }) {

    const navigation = useNavigation();
    const user = useUser();
    const customUserData = user?.customData;
    // console.log('userId: ', user.id);

    const launchNativeCamera = () => {
        let options = {
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, (response) => {
        //   console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {

            const source = { uri: response.uri };
            const imageString = 'data:image/jpeg;base64,' + response.assets[0].base64;

            if (photoOwnerType !== 'Usuário') {
                realm.write(()=>{
                    // photoOwner.image = 'data:image/jpeg;base64,' + response.assets[0].base64;
                    photoOwner.image = imageString;
                });
            }
            else {
                updateUserImage(customUserData.userId, imageString)
            }
            setIsPhotoModalVisible(false);

            if (photoOwnerType === 'Grupo') {
                navigation.navigate('Group', {
                    ownerId: photoOwner?._id,
                })
            } 
            else if (photoOwnerType === 'Indivíduo') {
                navigation.navigate('Farmer', {
                    ownerId: photoOwner?._id,
                })
            } 
            else if (photoOwnerType === 'Instituição') {
                navigation.navigate('Institution', {
                    ownerId: photoOwner?._id,
                })
            }
            else if (photoOwnerType === 'Usuário') {
                // taking user photo
                // navigation.goBack();
            }
        
          }
        });
    };
  

    const deletePhoto = useCallback((photoOwner, realm)=>{
        realm.write(()=>{
          photoOwner.image = '';
        })
        
        if (photoOwnerType === 'Grupo') {
            navigation.navigate('Group', {
                ownerId: photoOwner?._id,
            })
        } 
        else if (photoOwnerType === 'Indivíduo') {
            navigation.navigate('Farmer', {
                ownerId: photoOwner?._id,
            })
        } 
        else if (photoOwnerType === 'Instituição') {
            navigation.navigate('Institution', {
                ownerId: photoOwner?._id,
            })
        }
        else if (photoOwnerType === 'Usuário') {
            // taking user photo
            // navigation.goBack();
        }
        
        setIsPhotoModalVisible(false);
        
    }, [ photoOwner ]);

      const launchNativeImageLibrary = () => {
        let options = {
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = { uri: response.assets.uri };

            // realm.write(()=>{
            //   photoOwner.image = 'data:image/jpeg;base64,' + response.assets[0].base64;
            // })
            const imageString = 'data:image/jpeg;base64,' + response.assets[0].base64;

            if (photoOwnerType !== 'Usuário') {
                realm.write(()=>{
                    // photoOwner.image = 'data:image/jpeg;base64,' + response.assets[0].base64;
                    photoOwner.image = imageString;
                });
            }
            else {
                updateUserImage(customUserData.userId, imageString)
            }

            setIsPhotoModalVisible(false);
            if (photoOwnerType === 'Grupo') {
                navigation.navigate('Group', {
                    ownerId: photoOwner?._id,
                })
            } 
            else if (photoOwnerType === 'Indivíduo') {
                navigation.navigate('Farmer', {
                    ownerId: photoOwner?._id,
                })
            } 
            else if (photoOwnerType === 'Instituição') {
                navigation.navigate('Institution', {
                    ownerId: photoOwner?._id,
                })
            }
            else if (photoOwnerType === 'Usuário') {
                // taking user photo
                // navigation.goBack();
            }
          }
        });
    
      } 

    return (
        <Overlay 
            animationType="slide"
            onBackdropPress={()=>setIsPhotoModalVisible(false)}
            isVisible={isPhotoModalVisible}
            style={{
                backgroundColor: COLORS.black,
                opacity: .6,               
            }}
            // transparent
            >
            <View style={{ 
                flex: 1, 
                marginTop: 40,
                alignItems: 'center' ,
                marginHorizontal: 10,
                // backgroundColor: COLORS.black,
                width: '100%',
                height: '100%',
                // opacity: .6,

                }}
            >


            <Box w="20%"
                style={{
                    position: 'absolute',
                    top: -20,
                    right: -40,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity
                style={{ flexDirection: 'row' }}
                    onPress={()=>{
                        setIsPhotoModalVisible(false);
                        if (photoOwnerType === 'Grupo') {
                            navigation.navigate('Group', {
                                ownerId: photoOwner?._id,
                            })
                        } 
                        else if (photoOwnerType === 'Indivíduo') {
                            navigation.navigate('Farmer', {
                                ownerId: photoOwner?._id,
                            })
                        } 
                        else if (photoOwnerType === 'Instituição') {
                            navigation.navigate('Institution', {
                                ownerId: photoOwner?._id,
                            })
                        }
                    }}                            
                >
                    <Icon name='close' color={COLORS.ghostwhite} size={30}  />
                </TouchableOpacity>
            </Box>

        <Box
            style={{
                flex: 1,
                height: '50%',
                marginTop: 10,
            }}
        >
    {   photoOwner?.image ?
         <Image 
              source={{ uri: photoOwner?.image }}
              style={{
                minWidth: 400,
                minHeight: 300,
              }}
        />
        :
        <Icon 
        style={{
        minWidth: 400,
        minHeight: 300,
        }}
        name="account-circle" 
        size={200} 
        color={COLORS.grey} 
      />
            
            
    }
        </Box>

           <View >
            <Stack 
                direction="column" 
                space={4} 
                py="6"
                mh="5"
                w="100%"
                style={{ 
                    backgroundColor: COLORS.ghostwhite, 
                    borderColor: COLORS.ghostwhite,
                    borderRadius: 10,
                    position: 'relative',
                    bottom: 10,
                }}
            >
                {/* <Box alignItems={'flex-start'}>

                { photoOwnerType === 'Indivíduo'  ?
                    ( <Text
                        style={{ color: COLORS.grey, fontSize: 16, fontFamily: 'JosefinSans-Bold', }}
                    >
                        {photoOwner?.names?.otherNames} {photoOwner?.names?.surname}
                    </Text>
                )
                : photoOwnerType === 'Usuário' ?
                (
                    <Text
                    style={{ color: COLORS.grey, fontSize: 16, fontFamily: 'JosefinSans-Bold', }}
                    >
                        {photoOwner?.name}
                    </Text>
                )
                :
                (
                    <Text
                    style={{ color: COLORS.grey, fontSize: 16, fontFamily: 'JosefinSans-Bold', }}
                    >
                        {photoOwner?.manager?.fullname}
                    </Text>
                )
            }
            </Box> */}
            <Box 
                w="100%" 
                alignItems={'center'} 
            >
                <Stack direction="row" w="100%">
                    <Box w="33%">
                            <TouchableOpacity
                                onPress={()=>{
                                    launchNativeCamera();
                                }}
                            >
                                <Icon 
                                    name="photo-camera" 
                                    size={40}  
                                    color={COLORS.main}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{ 
                                    textAlign: 'center', 
                                    fontSize: 14, 
                                    fontFamily: 'JosefinSans-Regular', 
                                    color: COLORS.grey, 
                                }}
                            >
                                Câmera
                            </Text>
                    </Box>
                    <Box w="33%">
                        <TouchableOpacity
                            onPress={()=>{
                                launchNativeImageLibrary()
                            }}
                        >
                            <Icon 
                                name="photo-library" 
                                size={40} 
                                color={COLORS.main} 
                                />
                        </TouchableOpacity>
                            <Text
                                style={{ 
                                    textAlign: 'center', 
                                    fontSize: 14, 
                                    fontFamily: 'JosefinSans-Regular', 
                                    color: COLORS.grey, 
                                }}
                            >
                                Galeria
                            </Text>
                        </Box>
                        <Box w="33%">
                        <TouchableOpacity
                            onPress={()=>{
                               deletePhoto(photoOwner, realm);
                            }}
                            disabled={!photoOwner?.image}
                        >
                            <Icon 
                                name="delete" 
                                size={40} 
                                color={!photoOwner?.image ? COLORS.lightgrey : COLORS.danger} 
                                />
                        </TouchableOpacity>
                            <Text
                                style={{ 
                                    textAlign: 'center', 
                                    fontSize: 14, 
                                    fontFamily: 'JosefinSans-Regular', 
                                    color: COLORS.grey, 
                                }}
                            >
                                Apagar
                            </Text>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </View>
    </View>
    </Overlay>
    );
}

export default PhotoModal;