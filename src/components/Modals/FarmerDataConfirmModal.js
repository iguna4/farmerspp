/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import { Modal, Text,  Stack, Box, Center } from 'native-base';
import { Button } from '@rneui/themed';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

export default function FarmerDataConfirmModal(
    {
    surname,
    names,
    gender,
    birthDate,
    birthPlace,
    address,
    phone,
    phone2,
    idDocument,
    nuit,
    setModalVisible,
    modalVisible,
    setAddDataModalVisible,
    }) {

  return <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="full"
        _backdropFade="slide"
    >
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header style={{ backgroundColor: '#005000'}}><Text style={{fontFamily: 'JosefinSans-Bold', textAlign: 'center', color:'white', fontSize: 18}}>Confirma dados do produtor</Text></Modal.Header>
            <Modal.Body minHeight="450">
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Nome Completo:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text>{names}{' '}{surname}</Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Sexo:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text>{gender}</Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Data de Nascimento:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text>{birthDate?.toLocalDateString()}</Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Residência:</Text>
                    </Box>
                    <Box w="60%">
                        <Text style={styles.values}>[
                            {address?.province};
                            {address?.district};
                            {address?.adminPost};
                            {address?.village}
                            ]
                        </Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Telemóveis:</Text>
                    </Box>
                    <Box w="60%">
                            { phone && phone2 ?
                                (<Text style={styles.values}>[{phone};{phone2}]</Text>)
                                :
                                phone ?
                                (<Text style={styles.values}>[{phone}]</Text>)
                                :
                                phone2 ?
                                (<Text style={styles.values}>[{phone2}] (alternativo)</Text>)
                                :
                                (<Text style={styles.values}>Nenhum</Text>)
                            }
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Local de Nascimento:</Text>
                    </Box>
                    <Box w="60%">
                        <Text style={styles.values}>[
                            {birthPlace?.province};
                            {birthPlace?.district};
                            {birthPlace?.adminPost};
                            {birthPlace?.village}
                            ]
                        </Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Documento de Identificação:</Text>
                    </Box>
                    <Box w="60%">
                            { idDocument?.idNumber ?
                                (<Text style={styles.values}>{idDocument?.idNumber} ({idDocument?.idType})</Text>)
                                :
                                (<Text style={styles.values}>Nenhum</Text>)
                            }
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>NUIT:</Text>
                    </Box>
                    <Box w="60%">
                            { nuit ?
                                (<Text style={styles.values}>{nuit}</Text>)
                                :
                                (<Text style={styles.values}>Nenhum</Text>)
                            }
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
            </Modal.Body>
            <Modal.Footer maxHeight="60">
                <Center>
                    <Button
                        onPress={() => {
                            setModalVisible(false);
                            setAddDataModalVisible(true);
                        }}
                        title="Confirmar"
                        buttonStyle={{
                            width: 300,
                        }}
                    />
                </Center>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* <VStack space={8} alignItems="center">
        <Button w="104" onPress={() => {
        setModalVisible(!modalVisible);
      }}>
          Open Modal
        </Button>
        <Text textAlign="center">
          Open modal and focus on the input element to see the effect.
        </Text>
      </VStack> */}
    </>;
}
