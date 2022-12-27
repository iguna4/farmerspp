/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import { Text,  Stack, Box, Center } from 'native-base';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
// import Modal from "react-native-modal";

// import styles from './styles';
import { Pressable, View, Modal, StyleSheet } from 'react-native';
import LottieAddButton from '../Buttons/LottieAddButton';
import LottieProcessCompletedButton from '../Buttons/LottieProcessCompletedButton';

export default function SuccessModal({
    addDataModalVisible,
    setAddDataModalVisible,
    setFarmerType,
    farmerId,
}) {

    const navigation = useNavigation();

    useEffect(()=>{
        if (addDataModalVisible) {
            setTimeout(()=>{
                setAddDataModalVisible(false);
                setFarmerType('')
            }, 5000)
        }

    }, [addDataModalVisible])

  return (
     <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={addDataModalVisible}
        onRequestClose={() => {
          setAddDataModalVisible(false);
          setFarmerType('');
        }}
        statusBarTranslucent={false}
      >
        <View 
            style={{ 
                flex: 1, 
                paddingVertical: 50,
                alignItems: 'center'
            }}
            >
            <LottieProcessCompletedButton />
            <View 
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    marginVertical: 20, 
                    paddingVertical: 20,
                }}
            >
                <Text
                style={{
                    paddingVertical: 10,
                    fontSize: 18,
                    fontFamily: 'JosefinSans-Regular',
                    color: '#005000',
                }}
                >O registo ocorrido com sucesso!</Text>
                {/* <Stack direction="row" w="100%">
                    <Box w="50%" alignItems="center">
                        <Pressable
                            onPress={()=>{
                                // navigation.goBack();
                                navigation.goBack();
                                setAddDataModalVisible(false);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'JosefinSans-Bold',
                                    fontSize: 18,
                                    color: '#005000',
                                }}
                            >
                            <Icon 
                                name="arrow-back"
                                size={15}
                                color="#005000"
                            />
                                Voltar</Text>
                        </Pressable>
                    </Box>
                    <Box w="50%" alignItems="center">
                        <Pressable
                            onPress={()=>{
                                // navigation.goBack();
                                setAddDataModalVisible(false);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'JosefinSans-Bold',
                                    fontSize: 18,
                                    color: '#005000',
                                }}                            
                            >
                              Pomar
                            <Icon 
                                name="add"
                                size={15}
                                color="#005000"
                            />
                              </Text>
                        </Pressable>
                    </Box>
                </Stack> */}
            </View>
        </View>

      </Modal>
    </View>
  );
}
