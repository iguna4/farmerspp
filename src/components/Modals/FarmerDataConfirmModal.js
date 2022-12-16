/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useState} from 'react';
import { Modal, Text,  Stack, Box, Center } from 'native-base';
import { Button } from '@rneui/themed';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

import Realm from 'realm';
import { AppContext } from '../../models/realm';
const { useRealm } = AppContext;

export default function FarmerDataConfirmModal({
            farmerData,
            setModalVisible,
            modalVisible,
            setAddDataModalVisible,}
    ) {

    const { 
        names, 
        gender, 
        birthDate, 
        birthPlace, 
        address,  
        contact,
        idDocument,
    } = farmerData;

    const appRealm = useRealm();

    const addFarmer = useCallback((farmerData)=>{
        appRealm.write(()=>{
            const newFarmer = appRealm.create('Farmer', {
                _id: new Realm.BSON.ObjectId(),
                surname: farmerData.names?.surname,
                otherNames: farmerData.names?.otherNames,
                gender: farmerData.gender,
                birthDate: new Date(farmerData.birthDate),
                address: {
                    province: farmerData.address?.province,
                    district: farmerData.address?.district,
                    adminPost: farmerData.address?.adminPost,
                    village: farmerData.address?.village,
                },
                birthPlace: {
                    province: farmerData.birthPlace?.province,
                    district: farmerData.birthPlace?.district,
                    adminPost: farmerData.birthPlace?.adminPost,
                    village: farmerData.birthPlace?.village,
                },
                contact: {
                    primaryPhone: farmerData.contact?.primaryPhone,
                    secondaryPhone: farmerData.contact?.secondaryPhone,
                },
                idDocument: {
                    docType: farmerData.idDocument?.docType,
                    docNumber: farmerData.idDocument?.docNumber,
                    nuit: farmerData.idDocument?.nuit,
                }        
            })
            console.log('new farmer: ', newFarmer);
        })
    }, [appRealm])

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
                        <Box>
                            <Text style={styles.values}>{names?.surname} (apelido)</Text>
                            <Text style={styles.values}>{names?.otherNames} (outros nomes)</Text>
                        </Box>
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
                        <Text style={styles.values}>{gender}</Text>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Data Nascimento:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text style={styles.values}>{birthDate ? new Date(birthDate).toLocaleDateString() : 'Nenhum'}</Text>
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
                        <Box>
                            <Text style={styles.values}>{address?.province} (província)</Text>
                            <Text style={styles.values}>{address?.district} (distrito)</Text>
                            <Text style={styles.values}>{address?.adminPost} (posto admin.)</Text>
                            <Text style={styles.values}>{address?.village ? birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}</Text>
                        </Box>
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
                    { contact?.primaryPhone && contact?.secondaryPhone ?
                        (
                        <Box>
                            <Text style={styles.values}>{contact?.primaryPhone} (principal)</Text>
                            <Text style={styles.values}>{contact?.secondaryPhone} (alternativo)</Text>
                        </Box>
                        )
                        :
                        contact?.primaryPhone ?
                        (
                        <Box>
                            <Text style={styles.values}>{contact?.primaryPhone} (principal)</Text>
                            <Text style={styles.values}>Nenhum alternativo</Text>
                        </Box>
                        )
                        :
                        contact?.secondaryPhone ?
                        (
                        <Box>
                            <Text style={styles.values}>Nenhum principal</Text>
                            <Text style={styles.values}>{contact?.secondaryPhone} (alternativo)</Text>
                        </Box>
                        )
                        :
                        (
                        <Box>
                            <Text style={styles.values}>Nenhum principal</Text>
                            <Text style={styles.values}>Nenhum alternativo</Text>
                        </Box>
                        )
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
                        <Text style={styles.keys}>Local Nascimento:</Text>
                    </Box>
                    <Box w="60%">
                        <Box>
                            <Text style={styles.values}>{birthPlace?.province} (província)</Text>
                            <Text style={styles.values}>{birthPlace?.district} (distrito)</Text>
                            <Text style={styles.values}>{birthPlace?.adminPost} (posto admin.)</Text>
                            <Text style={styles.values}>{birthPlace?.village ? birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}</Text>
                        </Box>
                    </Box>
                </Stack>
                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Doc. Identificação:</Text>
                    </Box>
                    <Box w="60%">
                            { idDocument?.docNumber ?
                                (<Text style={styles.values}>{idDocument?.docNumber} ({idDocument?.docType})</Text>)
                                :
                                (<Text style={styles.values}>Nenhum</Text>)
                            }
                    </Box>
                </Stack>
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>NUIT:</Text>
                    </Box>
                    <Box w="60%">
                            { idDocument?.nuit ?
                                (<Text style={styles.values}>{idDocument?.nuit}</Text>)
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
                            addFarmer(farmerData)
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
