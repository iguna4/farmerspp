import { useNavigation } from "@react-navigation/native";
import { Center, Alert, Stack, Box } from "native-base";
import React, { useState } from "react";
import { Icon, CheckBox } from '@rneui/themed';
import { Button, Text, View, Modal, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
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
        <Modal 
            animationType="slide"
            onRequestClose={()=>setIsPhotoModalVisible(false)}
            visible={isPhotoModalVisible}
            >
            <View style={{ 
                flex: 1, 
                marginTop: 40,
                alignItems: 'center' ,
                marginHorizontal: 10,
                }}
            >

                <Stack direction="row">
                    <Box w="20%"
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
                            <Icon name='arrow-back-ios' color={COLORS.main} size={30}  />
                        </TouchableOpacity>
                    </Box>
                    <Box w="80%">

                    </Box>
                </Stack>
                        <View
                            style={{ flex: 1, justifyContent: 'center',  }}
                            >
                <Stack 
                    direction="column" 
                    space={10} 
                    py="6"
                    mh="10"
                    w="100%"
                    style={{ 
                        backgroundColor: COLORS.lightgrey, 
                        borderColor: COLORS.lightgrey,
                        borderRadius: 10,
                        borderColor: COLORS.main,
                        shadowColor: COLORS.main,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 1.65,
                        elevation: 3,
                    }}
                >
                    <Box alignItems={'center'}>

                    { photoOwnerType === 'Indivíduo'  ?
                        ( <Text
                            style={{ color: COLORS.main, fontSize: 20, fontFamily: 'JosefinSans-Bold', }}
                        >
                            {photoOwner?.names?.otherNames} {photoOwner?.names?.surname}
                        </Text>
                    )
                    : photoOwnerType === 'Usuário' ?
                    (
                        <Text
                        style={{ color: COLORS.main, fontSize: 20, fontFamily: 'JosefinSans-Bold', }}
                        >
                            {photoOwner?.name}
                        </Text>
                    )
                    :
                    (
                        <Text
                        style={{ color: COLORS.main, fontSize: 20, fontFamily: 'JosefinSans-Bold', }}
                        >
                            {photoOwner?.manager?.fullname}
                        </Text>
                    )
                }
                    </Box>
                    <Box 
                        w="100%" 
                        alignItems={'center'} 
                    >
                    <Stack direction="row" w="100%">
                        <Box w="50%">
                                <TouchableOpacity
                                    onPress={()=>{
                                        launchNativeCamera();
                                    }}
                                >
                                    <Icon 
                                        name="photo-camera" 
                                        size={100}  
                                        color={COLORS.main}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{ 
                                        textAlign: 'center', 
                                        fontSize: 16, 
                                        fontFamily: 'JosefinSans-Regular', 
                                        color: COLORS.main, 
                                    }}
                                >
                                    Câmera
                                </Text>
                        </Box>
                        <Box w="50%">
                            <TouchableOpacity
                                onPress={()=>{
                                    launchNativeImageLibrary()
                                }}
                            >
                                <Icon 
                                    name="photo" 
                                    size={100} 
                                    color={COLORS.main} 
                                    />
                            </TouchableOpacity>
                                <Text
                                    style={{ 
                                        textAlign: 'center', 
                                        fontSize: 16, 
                                        fontFamily: 'JosefinSans-Regular', 
                                        color: COLORS.main, 
                                    }}
                                >
                                    Galeria
                                </Text>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
                </View>
            </View>
        </Modal>
    );
}

export default PhotoModal;