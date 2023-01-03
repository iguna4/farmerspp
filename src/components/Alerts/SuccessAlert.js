import { useNavigation } from "@react-navigation/native";
import { Center, Alert, Stack, Box } from "native-base";
import React, { useState } from "react";
import { Icon, CheckBox } from '@rneui/themed';
import { Button, Text, View, Modal, Pressable, TouchableOpacity } from "react-native";
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
                marginTop: 40,
                alignItems: 'center' 
                }}
            >
                <Stack direction="row">
                    <Box w="20%">
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.goBack();
                                setIsCoordinatesModalVisible(false);
                            }}                            
                        >
                            <Icon name='arrow-back-ios' color="#005000" size={30}  />
                        </TouchableOpacity>
                    </Box>
                    <Box w="80%">

                    </Box>
                </Stack>
                <Stack 
                    direction="column" 
                    space={10} 
                    py="6"
                    mh="10"
                    w="100%"
                >
                    <Box alignItems={'center'}>
                        <Icon name="check-circle" size={200} color="#005000" />
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
                                color: '#005000', 
                                fontSize: 40, 
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
            }}
        >
        <Box
            alignItems={'center'}
            style={{

                borderWidth: 2,
                borderColor: '#005000',
                borderRadius: 30,
                width: 300,
                height: 60,
                justifyContent: 'center',
                
            }}
        >
            <Text
                style={{ 
                    fontSize: 30, 
                    fontFamily: 'JosefinSans-Bold', 
                    color: '#005000'
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
                onPress={()=>navigation.navigate('FarmlandForm1', farmerItem)}                
            >
            <Box
                alignItems={'center'}
                style={{

                    borderWidth: 2,
                    borderColor: '#005000',
                    borderRadius: 30,
                    width: 300,
                    height: 60,
                    justifyContent: 'center',
                    
                }}
            >
                <Text
                    style={{ 
                        fontSize: 30, 
                        fontFamily: 'JosefinSans-Bold', 
                        color: '#005000'
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