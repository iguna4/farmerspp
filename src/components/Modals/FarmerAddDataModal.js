/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import { Modal, Text,  Stack, Box, Center } from 'native-base';
import { Button, Icon } from '@rneui/themed';

import styles from './styles';

export default function FarmerAddDataModal({
    addDataModalVisible,
    setAddDataModalVisible,
}) {
  return (
      <Modal
        isOpen={addDataModalVisible}
        onClose={() => setAddDataModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="full"
        _backdropFade="slide"
    >
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header
                style={{
                    backgroundColor: '#005000',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'center',
                        color:'white',
                        fontSize: 18,
                    }}>
                        Produtor:
                </Text>
            </Modal.Header>
            <Modal.Body minHeight="350">
                <Center my="10">
                    <Text style={{fontFamily: 'JosefinSans-Regular', color: 'grey'}}>Adicionar...</Text>
                </Center>
                <Stack direction="row" w="100%" my="5">
                    <Box w="50%" alignItems="center" py="5">
                        <Icon
                            name="photo-camera"
                            color="#005000"
                            size={60}
                        />
                        <Text style={styles.iconDescription}>Foto</Text>
                    </Box>
                    <Box w="50%" alignItems="center" py="5">
                        <Icon
                            name="add-circle"
                            size={60}
                            color="#005000"
                        />
                        <Text style={styles.iconDescription}>Pomar</Text>
                    </Box>
                </Stack>
            </Modal.Body>

        </Modal.Content>
      </Modal>
  );
}
