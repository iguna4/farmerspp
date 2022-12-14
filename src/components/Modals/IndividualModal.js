/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import { Text,  Stack, Box, Center, Divider } from 'native-base';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Realm from 'realm';

import { generateUFID } from '../../helpers/generateUFID';
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
        setBirthDate, 
        setDocType, 
        setDocNumber, 
        setNuit,
        
        setFarmerType,

        setFarmerItem,
        setIsCoordinatesModalVisible,

    }
) => {

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    // const [farmerId, setFarmerId] = useState(null);
    const navigation = useNavigation();
    const realm = useRealm()


    // const addGroup = useCallback((farmerData, realm)=>{
        
    // }, [        
    //     realm, 
    //     farmerData,]
    // )


    const addFarmer = useCallback((farmerData, realm) =>{
    const {
        names, isSprayingAgent, gender, 
        familySize,
        birthDate, birthPlace, address,
        contact, idDocument,
    } = farmerData;

    // generate the universally farmer identifier
    const ufid = generateUFID({ names, birthDate, birthPlace });
  
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
            ufid,
        })
        setFarmerItem({
            ownerId: newFarmer._id,
            ownerName: newFarmer.names?.otherNames + ' ' + newFarmer.names?.surname,
            flag: 'Indiv??duo',
        });       
    })
}, [
        realm, 
        farmerData,
        // farmerType
    ]);



  return (
  <>
    <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
    >
            <Stack 
                direction="row" 
                w="100%"
                pt="3"
            >
            <Box w="20%">
                <TouchableOpacity
                    onPress={()=>{
                        // navigation.goBack();
                        setModalVisible(false);
                    }}                            
                >
                    <Icon name='arrow-back-ios' color="#005000" size={30}  />
                </TouchableOpacity>
            </Box>
            <Box w="60%">
                </Box>
                <Box w="20%">
                    <Icon 
                        name="close" 
                        size={35} 
                        color="grey" 
                        onPress={() => setModalVisible(false)}
                    />
                </Box>
            </Stack>
         <ScrollView
            contentContainerStyle={{
                flex: 1, 
                justifyContent: 'center', 
                minHeight: '100%',
                paddingVertical: 15,
            }}
         >
            
            
         <Center 
            style={{ 
                paddingBottom: 5,    
                paddingTop: 10,
                width: '100%',
                // backgroundColor: '#EBEBE4',         
            }}
        >
            <Text
                style={{ 
                    fontFamily: 'JosefinSans-Bold', 
                    fontSize: 24,
                    fontWeigth: 'bold',
                    color: '#000',
                    paddingTop: 15,

                }}
            >
                Confirmar Dados
            </Text>
        </Center>

        <Box 
            mx="6"
            pb="6"
        >
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
                <Text style={styles.keys}>Provedor de Servi??os:</Text>
            </Box>
            <Box w="60%" style={styles.values}>
                <Text style={styles.values}>
                    {farmerData?.isSprayingAgent ? 'Sim' : 'N??o'}
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
                <Text style={styles.keys}>G??nero:</Text>
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
                <Text style={styles.keys}>Resid??ncia:</Text>
            </Box>
            <Box w="60%">
                <Box>
                    <Text style={styles.values}>
                        {farmerData?.address?.province} (prov??ncia)
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
                    Telem??veis:
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
                        {farmerData?.birthPlace?.province + " (prov??ncia)" }
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
                        {farmerData?.birthPlace?.district + " (Pa??s Estrangeiro)" }
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
                <Text style={styles.keys}>Doc. Identifica????o:</Text>
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
        <Center
            w="100%"
        >
            <Button
                onPress={()=>{
                    try {
                        addFarmer(farmerData, realm)
                        setModalVisible(false);
                        setIsCoordinatesModalVisible(true);
                    } catch (error) {
                        throw new Error('Failed to register IndividualFarmer', { cause: error})
                    }
                    finally {
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
                        setBirthDate(null); 
                        setDocType(''); 
                        setDocNumber(''); 
                        setNuit(null);
                    }
                }}
                type="outline"
                title="Salvar Dados"
                containerStyle={{
                    width: '100%',
                }}
            />
        </Center>
        </Box>
    </ScrollView>
    </Modal>
    {/* <Center flex={1} px="3">
        <SuccessModal
            addDataModalVisible={addDataModalVisible}
            setAddDataModalVisible={setAddDataModalVisible}
            setFarmerType={setFarmerType}
            />
    </Center> */}
    </>

  )
}

export default IndividualModal;