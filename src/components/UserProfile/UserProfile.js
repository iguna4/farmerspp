
import { 
    View, Text, InteractionManager, 
    SafeAreaView, Image, TouchableOpacity } from 'react-native'
  import React, { useCallback, useState, useEffect } from 'react'
  import { Box, Stack, Center,  } from 'native-base';
  import COLORS from '../../consts/colors';
  
  import {Icon, Overlay, } from '@rneui/themed';
  import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
  import { useFocusEffect } from '@react-navigation/native';
  import { months } from '../../helpers/dates';
  import CustomDivider from '../../components/Divider/CustomDivider'
  
    
  import { useUser, useApp } from '@realm/react';
  import { realmContext } from '../../models/realmContext';
import { roles } from '../../consts/roles';
  const { useRealm, useQuery, useObject } = realmContext; 

  export default function UserProfile({ user, setIsGoalUpdateVisible, isUserProfileVisible, setIsUserProfileVisible }) {

    // const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const customUserData = user?.customData;

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
            {/* <Box
                pb="4"
                h="30%"
            > */}
                <Icon 
                    name="account-circle" 
                    size={200} 
                    color={COLORS.grey} 
                />
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
                }}
                >
                <Box
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                        // borderTopLeftRadius: 20,
                        padding: 10,
                        backgroundColor: COLORS.ghostwhite,
                        // borderWidth: 2,
                        borderColor: COLORS.main,
                        shadowColor: COLORS.second,
                        shadowOffset: {
                            width: 2,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 3,
                        opacity: 3,
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
                                borderColor: COLORS.main,
                                borderWidth: 2,
                                padding: 10,
                                borderRadius: 10,
                            }}
                            >
                            <Icon name="logout" size={30} color={COLORS.main} />
                            <Text 
                                style={{
                                    color: COLORS.main, 
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
    </Overlay>
    );
  }


