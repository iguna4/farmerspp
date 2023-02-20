
import { 
    View, Text, InteractionManager, 
    SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { Box, Stack, Center,  } from 'native-base';
import {Icon, Overlay, } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import COLORS from '../../consts/colors';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { months } from '../../helpers/dates';
import CustomDivider from '../../components/Divider/CustomDivider'
import PhotoModal from '../Modals/PhotoModal';
import { roles } from '../../consts/roles';
import styles from './styles';
import { secrets } from '../../secrets';
import { errorMessages } from '../../consts/errorMessages';

import { useUser, useApp } from '@realm/react';
import { realmContext } from '../../models/realmContext';
import AwesomeAlert from 'react-native-awesome-alerts';
const { useRealm, useQuery, useObject } = realmContext; 


  export default function UserProfile({ user, setIsGoalUpdateVisible, isUserProfileVisible, setIsUserProfileVisible }) {

    // const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const realm = useRealm();
    const customUserData = user?.customData;
    // const currentUserData = useQuery('User').filtered(`userId =="${customUserData.userId}"`)[0];

    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
    const [isAddPhoto, setIsAddPhoto] = useState(false);

    //-----------------------------------------------------
    const [titleAlert , setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButtom] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [alert, setAlert] = useState(false);
    // ----------------------------------------------------


    // console.log('customUserData--: ', JSON.stringify(customUserData));

    // on user registration
    const updateUserImage = async (userId, imageString) => {
        

        // try to register new user
        try {

            const mongo = user.mongoClient(secrets.serviceName);
            const collection = mongo.db(secrets.databaseName).collection(secrets.userCollectionName);

            // save custom user data 
            const result = await collection.updateOne({
                "userId": userId
            }, 
            {
                $set: {"image": imageString}
            });
            const customUserData = await user.refreshCustomData();

        } catch (error) {
            // console.log('Failed to save image: ', { cause: error })
            if (error.includes(errorMessages.network.logFlag)){
                // Alert message
                setTitleAlert(errorMessages.network.title);
                setMessageAlert(errorMessages.network.message);
                setShowCancelButton(errorMessages.network.showCancelButton);
                setShowConfirmButtom(errorMessages.network.showCancelButton);
                setConfirmText(errorMessages.network.confirmText);
                setCancelText(errorMessages.network.cancelText);
                setAlert(true);
            }
            else {
                // Alert message
                setTitleAlert(errorMessages.server.title);
                setMessageAlert(errorMessages.server.message);
                setShowCancelButton(errorMessages.server.showCancelButton);
                setShowConfirmButtom(errorMessages.service.showConfirmButton);
                setConfirmText(errorMessages.server.confirmText);
                setCancelText(errorMessages.server.cancelText);
                setAlert(true);
            }
            return ;
        }
    };




    const toggleOverlay = () => {
        setIsUserProfileVisible(!isUserProfileVisible);
      };


    return (
    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '100%',
            height: '100%',
            // borderRadius: 10,
            paddingTop: 10,
            // marginBottom: 10,
        }}
        isVisible={isUserProfileVisible} 
        onBackdropPress={toggleOverlay}
    >

    <AwesomeAlert
        show={alert}
        showProgress={false}
        title={titleAlert}
        message={messageAlert}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={showCancelButton}
        showConfirmButton={showConfirmButton}
        cancelText={cancelText}
        confirmText={confirmText}
        confirmButtonColor={COLORS.main}
        cancelButtonColor={COLORS.grey}
        onCancelPressed={() => {
            if (isAddPhoto){
                setIsAddPhoto(false);
            }
            setAlert(false);
        }}
        onConfirmPressed={() => {
            if (isAddPhoto){
                setIsAddPhoto(false);
                setIsPhotoModalVisible(true);
            }
            setAlert(false);
        }}
    />


        <Box h="100%" w="100%" >

        <Stack w="100%"
            style={{
                paddingBottom: 20,
            }}
        >
            <Box w="10%">
                <Icon 
                    name='arrow-back-ios' 
                    color={COLORS.main} 
                    size={30}  
                    onPress={()=>{
                        setIsUserProfileVisible(false);
                    }}
                />           
            </Box>
            <Box w="90%">
            
            </Box>
        </Stack>
        <Center h="90%">
                {/* <Icon 
                    name="account-circle" 
                    size={200} 
                    color={COLORS.grey} 
                /> */}
        <TouchableOpacity
            disabled={true}
            onPress={()=>{
            setIsAddPhoto(true);
            setTitleAlert(errorMessages.addPhoto.title);
            setMessageAlert(errorMessages.addPhoto.message);
            setShowCancelButton(errorMessages.addPhoto.showCancelButton);
            setShowConfirmButtom(errorMessages.addPhoto.showConfirmButton);
            setCancelText(errorMessages.addPhoto.cancelText);
            setConfirmText(errorMessages.addPhoto.confirmText);
            setAlert(true);

            }}
        >
    {            
        customUserData?.image &&   
        ( 
        <>
            <Image 
                source={{ uri: customUserData?.image }}
                style={styles.images}
            />     
        </>
        )        
    }


    {            
        !customUserData?.image &&   
        ( <>
            <Icon name="account-circle" size={200} color={COLORS.grey} />
        </>
        )        
    }
    </TouchableOpacity>


                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontFamily: 'JosefinSans-Bold',
                        color: COLORS.main,
                    }}
                    >
                    {customUserData.name}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        color: COLORS.grey,
                    }}
                    >
                    ({customUserData.role})
                </Text>
            {/* </Box> */}
            <Box w="95%" h="70%"
                style={{
                    marginTop: 5,
                }}
                >
                <Box
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        padding: 15,
                        marginVertical: 10,
                        minHeight: 100,
                        borderColor: COLORS.main,
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
                    <Stack w="100%" direction="row" my="1">
                        <Box w="40%">
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'JosefinSans-Bold',
                                    color: COLORS.grey,
                                }}
                            >
                                Província:
                            </Text>
                        </Box>
                        <Box w="60%">
                            <Text>{customUserData.userProvince}</Text>
                        </Box>
                    </Stack>
                    <Stack w="100%" direction="row"  my="1">
                        <Box w="40%">
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'JosefinSans-Bold',
                                    color: COLORS.grey,
                                }}
                            >Distrito:</Text>
                        </Box>
                        <Box w="60%">
                            <Text>{customUserData.userDistrict?.includes('NA') ? 'Não Aplicável' : customUserData.userDistrict}</Text>
                        </Box>
                    </Stack>
                    <Stack w="100%" direction="row"  my="1">
                        <Box w="40%">
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'JosefinSans-Bold',
                                    color: COLORS.grey,
                                }}                            
                            >Telefone:</Text>
                        </Box>
                        <Box w="60%">
                            <Text>{customUserData.phone}</Text>
                        </Box>
                    </Stack>
                    <Stack w="100%" direction="row"  my="1">
                        <Box w="40%">
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'JosefinSans-Bold',
                                    color: COLORS.grey,
                                }}                            
                                >Email:</Text>
                        </Box>
                        <Box w="60%">
                            <Text>{customUserData.email}</Text>
                        </Box>
                    </Stack>
                    <CustomDivider thickness={2} my={2}  bg={COLORS.main} />
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>{
                                user.logOut()
                            }}
                        >

                        <Stack w="100%" direction="row" my="2" space={5}
                            style={{
                                borderColor: COLORS.danger,
                                borderWidth: 2,
                                padding: 10,
                                borderRadius: 10,
                            }}
                            >
                            <Icon name="logout" size={30} color={COLORS.danger} />
                            <Text 
                                style={{
                                    color: COLORS.danger, 
                                    fontSize: 18, 
                                    fontFamily: 'JosefinSans-Bold'
                                }}
                                >
                                    Terminar sessão
                            </Text>
                        </Stack>
                        </TouchableOpacity>

        { !customUserData.role.includes(roles.provincialManager) &&  
                    <TouchableOpacity
                        onPress={()=>{
                            setIsGoalUpdateVisible(true);
                        }}
                    >

                         <Stack w="100%" direction="row" my="2" space={5}
                            style={{
                                borderColor: COLORS.main,
                                borderWidth: 2,
                                padding: 10,
                                borderRadius: 10,
                            }}
                            >
                            <Icon name="update" size={30} color={COLORS.main} />
                            <Text 
                                style={{
                                    color: COLORS.main, 
                                    fontSize: 18, 
                                    fontFamily: 'JosefinSans-Bold'
                                }}
                                >
                                    Actualizar metas
                            </Text>
                        </Stack>
                    </TouchableOpacity>                    
                    }

                    <TouchableOpacity
                        disabled
                        style={{
                        }}
                        onPress={()=>{

                        }}
                    >

                        <Stack w="100%" direction="row" my="2" space={5}
                            style={{
                                borderColor: COLORS.main,
                                borderWidth: 2,
                                padding: 10,
                                borderRadius: 10,
                            }}
                            >
                            <Icon name="integration-instructions" size={30} color={COLORS.main} />
                            <Text 
                                style={{
                                    color: COLORS.main, 
                                    fontSize: 18, 
                                    fontFamily: 'JosefinSans-Bold'
                                }}
                                >
                                    Manual de usuário
                            </Text>
                        </Stack>
                    </TouchableOpacity>
                    </Box>

                </Box>
            </Box>
        </Center>
        </Box>
        <PhotoModal 
          realm={realm}
          photoOwner={customUserData}
          photoOwnerType={'Usuário'}
          updateUserImage={updateUserImage}
          isPhotoModalVisible={isPhotoModalVisible}
          setIsPhotoModalVisible={setIsPhotoModalVisible}
        />
    </Overlay>
    );
  }


