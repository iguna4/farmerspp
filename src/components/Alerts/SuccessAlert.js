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

    // console.log('farmlandId:', farmlandId);

    return (
        <Modal 
            animationType="slide"
            onRequestClose={()=>setIsCoordinatesModalVisible(false)}
            visible={isCoordinatesModalVisible}
        >
            <View style={{ 
                flex: 1, 
                marginTop: 25,
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
                                navigation.navigate('Farmers');
                                setIsCoordinatesModalVisible(false);
                            }}                            
                        >
                            <Icon name='arrow-back-ios' color={COLORS.main} size={30}  />
                        </TouchableOpacity>
                    </Box>
                    <Box w="80%">

                    </Box>
                </Stack>
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
                <Center
                    pt="10"
                >
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
                    Registar Parcela
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