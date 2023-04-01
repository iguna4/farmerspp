import { useNavigation } from "@react-navigation/native";
import { Center, Alert, Stack, Box } from "native-base";
import React, { useState } from "react";
import { Icon, CheckBox } from '@rneui/themed';
import { Button, Text, View, Modal, Pressable, TouchableOpacity } from "react-native";
import COLORS from "../../consts/colors";
// import Modal from "react-native-modal";

function SuccessAlert({ 
    isCoordinatesModalVisible, 
    setIsCoordinatesModalVisible, 
    farmlandId,
    farmerItem,
    flag,
    }) {

    const navigation = useNavigation();

    const navigateBack = ()=>{
        if (flag === 'farmer'){
            if (farmerItem.flag === 'Grupo'){
                navigation.navigate('Group', {
                    ownerId: farmerItem.ownerId,
                });
            }
            else if (farmerItem.flag === 'Indivíduo'){
                navigation.navigate('Farmer', {
                    ownerId: farmerItem.ownerId,
                });
            }
            else if(farmerItem.flag === 'Instituição') {
                navigation.navigate('Institution', {
                    ownerId: farmerItem.ownerId,
                });
            }

        }
        else if(flag === 'farmland') {

        }
    }


    return (
        <Modal 
            animationType="slide"
            onRequestClose={()=>setIsCoordinatesModalVisible(false)}
            visible={isCoordinatesModalVisible}
        >
            <View style={{ 
                flex: 1, 
                marginTop: 25,
                height: '100%',
                alignItems: 'center' ,
                marginHorizontal: 10,
                }}
            >
                <Box w="100%">

                <Stack direction="row" w="100%">
                    <Box >
                        <Pressable
                            onPress={()=>{
                                // navigation.navigate('Farmers');
                                navigateBack();
                                setIsCoordinatesModalVisible(false);
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
                            size={25}
                            // onPress={()=>{}}
                        /> 
                        <Text
                            style={{
                                color: COLORS.main,
                                fontFamily: 'JosefinSans-Bold',
                                marginLeft: -10,
                            }}
                        >
                            Voltar
                        </Text>
                        </Pressable>
                    </Box>
                    <Box w="100%">

                    </Box>
                </Stack>
                </Box>
                <Box w="100%" h="60%"
                    style={{
                        // flex: 1,
                        justifyContent: 'center',
                    }}
                >

                <Stack 
                    direction="column" 
                    space={10} 
                    // py="6"
                    mh="10"
                    w="100%"
                    >
                    <Box alignItems={'center'}>
                        <Icon name="check-circle" size={150} color={COLORS.main} />
                    </Box>
                    <Box 
                        w="100%" 
                        alignItems={'center'} 
                        // ph="40"
                        >
                        <Text
                            style={{ 
                                fontFamily: 'JosefinSans-Bold', 
                                textAlign: 'center',
                                color: COLORS.main, 
                                fontSize: 24, 
                                paddingHorizontal: 30,
                            }}
                            >
                            Registo ocorrido com successo!
                        </Text>
                    </Box>
                </Stack>
                </Box>
                <Center
                    h="40%"
                >
        {/* The block of code below is not used any more. Kindly remove it 
            whenever you feel to
        */}

        {  farmlandId &&  ( 
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('FarmlandAreaAudit', {
                            farmlandId,
                        })
                        setIsCoordinatesModalVisible(false);
                    }}
                >
                <Box
                    // alignItems={'center'}
                    style={{

                        borderWidth: 2,
                        borderColor: COLORS.main,
                        borderRadius: 30,
                        width: 300,
                        maxHeight: 60,
                        justifyContent: 'center',
                        
                    }}
                >
                    <Text
                        style={{ 
                            fontSize: 24, 
                            fontFamily: 'JosefinSans-Bold', 
                            color: COLORS.main,
                            textAlign: 'center',
                        }}
                    >
                        Auditar Área
                    </Text>
                </Box>
                </TouchableOpacity>
        )}
    {/* 
        The block of code below is still in use
        Do not remove it
    */}
{  farmerItem?.ownerId &&  
            ( 
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('FarmlandForm1', farmerItem);
                    setIsCoordinatesModalVisible(false);
                }}                
            >
            <Box
                // alignItems={'center'}
                style={{

                    borderWidth: 2,
                    borderColor: COLORS.main,
                    borderRadius: 30,
                    width: 300,
                    maxHeight: 60,
                    justifyContent: 'center',
                    
                }}
            >
                <Text
                    style={{ 
                        fontSize: 24, 
                        fontFamily: 'JosefinSans-Bold', 
                        color: COLORS.main,
                        textAlign: 'center',
                    }}
                >
                    Registar Pomar
                </Text>
            </Box>
        </TouchableOpacity>
)}
            </Center>
        </View>
    </Modal>
    );
}

export default SuccessAlert;