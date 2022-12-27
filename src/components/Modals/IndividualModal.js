/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import { Modal, Text,  Stack, Box, Center, Divider } from 'native-base';
import { Button } from '@rneui/themed';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Realm from 'realm';

import SuccessModal from './SuccessModal';
import { generateUUID } from '../../helpers/generateUUID';
import { generateFormattedDate } from '../../helpers/generateFormattedDate';
import { generateFormattedAdminPost } from '../../helpers/generateFormattedAdminPost';
import { generateFormattedSurname } from '../../helpers/generateFormattedSurname';
import { useNavigation } from '@react-navigation/native';

import { realmContext } from '../../models/realm';
const {useRealm} = realmContext;

const IndividualModal = (
    {
        modalVisible,
        setModalVisible,
        farmerData,

        setSurname, 
        setOtherNames, 
        setIsSprayingAgent, 
        setGender,
        setFamilySize,
        setAddressVillage, 
        setAddressAdminPost, 
        setPrimaryPhone, 
        setSecondaryPhone,
        setBirthProvince, 
        setBirthDistrict, 
        setBirthAdminPost, 
        // setBirthVillage,
        setBirthDate, 
        setDocType, 
        setDocNumber, 
        setNuit,
        setFarmerType,

    }
) => {

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    const [farmerId, setFarmerId] = useState(null);
    const navigation = useNavigation();
    const realm = useRealm()


    const addGroup = useCallback((farmerData, realm)=>{
        
    }, [        
        realm, 
        farmerData,]
    )


    const addFarmer = useCallback((farmerData, realm) =>{
    const {
        names, isSprayingAgent, gender, 
        familySize,
        birthDate, birthPlace, address,
        contact, idDocument,
    } = farmerData;

    realm.write(()=>{
        const newFarmer = realm.create('Farmer', {
            _id: uuidv4(),
            names,
            isSprayingAgent,
            gender,
            familySize,
            birthDate,
            birthPlace,
            address,
            contact,
            idDocument,
            ufid: '4843jf',

        })
        console.log('newFarmer:', newFarmer);
        setModalVisible(false);
        setAddDataModalVisible(true);
        setSurname(''); 
        setOtherNames(''); 
        setIsSprayingAgent(false); 
        setGender('');
        setFamilySize('');
        setAddressVillage(''); 
        setAddressAdminPost(''); 
        setPrimaryPhone(null); 
        setSecondaryPhone(null);
        setBirthProvince(''); 
        setBirthDistrict(''); 
        setBirthAdminPost(''); 
        // setBirthVillage('');
        setBirthDate(null); 
        setDocType(''); 
        setDocNumber(''); 
        setNuit(null);
       
        
    })
}, [
        realm, 
        farmerData,
        // farmerType
    ]);



  return (
  <>
    <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="1"
        top="1"
        size="full"
        _backdropFade="slide"
    >
        <Modal.Content maxHeight="90%">
            <Modal.CloseButton />
            <Modal.Header 
                style={{ backgroundColor: '#005000'}}>
                <Text 
                    style={{
                        fontFamily: 'JosefinSans-Bold', 
                        textAlign: 'center', 
                        color:'white', 
                        fontSize: 18,
                    }}
                >
                    Confirma dados 
                </Text>
            </Modal.Header>
        <Modal.Body minHeight="450">
        <CustomDivider
            marginVertical="1"
            thickness={1}
            bg="grey"
        />

         <Box>
        <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Nome Completo:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.names?.surname} (Apelido)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.names?.otherNames} (Outros nomes)
                            </Text>
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
                        <Text style={styles.keys}>Provedor de Serviços:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text style={styles.values}>
                            {farmerData?.isSprayingAgent ? 'Sim' : 'Não'}
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
                        <Text style={styles.keys}>Género:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text style={styles.values}>{farmerData?.gender}</Text>
                    </Box>
                </Stack>

                <CustomDivider
                    marginVertical="1"
                    thickness={1}
                    bg="grey"
                />
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        <Text style={styles.keys}>Agregado Familiar:</Text>
                    </Box>
                    <Box w="60%" style={styles.values}>
                        <Text style={styles.values}>{farmerData?.familySize} (membros)</Text>
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
                        <Text style={styles.values}>
                            {farmerData?.birthDate ? new Date(farmerData?.birthDate).toLocaleDateString() : 'Nenhum'}
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
                        <Text style={styles.keys}>Residência:</Text>
                    </Box>
                    <Box w="60%">
                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.address?.province} (província)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.address?.district} (distrito)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.address?.adminPost} (posto admin.)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.address?.village ? farmerData?.birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}
                            </Text>
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
                        <Text style={styles.keys}>
                            Telemóveis:
                        </Text>
                    </Box>
                    <Box w="60%">
                    { farmerData?.contact?.primaryPhone && farmerData?.contact?.secondaryPhone ?
                        (
                            <Box>
                            <Text style={styles.values}>
                                {farmerData?.contact?.primaryPhone} (principal)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.contact?.secondaryPhone} (alternativo)
                            </Text>
                        </Box>
                        )
                        :
                        farmerData?.contact?.primaryPhone ?
                        (
                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.contact?.primaryPhone} (principal)
                            </Text>
                            <Text style={styles.values}>
                                Nenhum (alternativo)
                            </Text>
                        </Box>
                        )
                        :
                        farmerData?.contact?.secondaryPhone ?
                        (
                            <Box>
                            <Text style={styles.values}>
                                Nenhum (principal)
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.contact?.secondaryPhone} (alternativo)
                            </Text>
                        </Box>
                        )
                        :
                        (
                            <Box>
                            <Text style={styles.values}>
                                Nenhum (principal)
                            </Text>
                            <Text style={styles.values}>
                                Nenhum (alternativo)
                            </Text>
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
                        <Text style={styles.keys}>
                            Local Nascimento:
                        </Text>
                    </Box>
                    <Box w="60%">
                {
                    !farmerData?.birthPlace?.province?.includes('Estrangeiro') ?
                    (
                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.province + " (província)" }
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.district + " (distrito)" }
                            </Text>
                            <Text style={styles.values}>
                                { farmerData?.birthPlace?.adminPost + " (posto admin.)" }
                            </Text>
                        </Box>

                    )
                    : 
                    (

                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.district + " (País Estrangeiro)" }
                            </Text>
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
                        <Text style={styles.keys}>Doc. Identificação:</Text>
                    </Box>
                    <Box w="60%">
                            { farmerData?.idDocument?.docNumber ?
                                (<Text style={styles.values}>{farmerData?.idDocument?.docNumber} ({farmerData?.idDocument?.docType})</Text>)
                                :
                                (<Text style={styles.values}>Nenhum (Nenhum)</Text>)
                            }
                    </Box>
                </Stack>
                <Stack direction="row" w="100%" my="1">
                    <Box w="40%">
                        {/* <Text style={styles.keys}>NUIT:</Text> */}
                    </Box>
                    <Box w="60%">
                            { farmerData?.idDocument?.nuit ?
                                (<Text style={styles.values}>{farmerData?.idDocument?.nuit} (NUIT)</Text>)
                                :
                                (<Text style={styles.values}>Nenhum (NUIT)</Text>)
                            }
                    </Box>
                </Stack>
                <CustomDivider
                marginVertical="1"
                thickness={1}
                bg="grey"
                />
        </Box>

        </Modal.Body>
        <Modal.Footer maxHeight="60">
            <Center>
                <Button
                        onPress={()=>{
                            addFarmer(farmerData, realm)
                        }}
                        title="Salvar Dados"
                        buttonStyle={{
                            width: 300,
                        }}
                    />
            </Center>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        <Center flex={1} px="3">
            <SuccessModal
                addDataModalVisible={addDataModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
                farmerId={farmerId}
                setFarmerType={setFarmerType}
            />
        </Center>
    </>

  )
}

export default IndividualModal;