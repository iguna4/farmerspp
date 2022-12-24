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

import FarmerAddDataModal from './FarmerAddDataModal';
import { generateUUID } from '../../helpers/generateUUID';
import { generateFormattedDate } from '../../helpers/generateFormattedDate';
import { generateFormattedAdminPost } from '../../helpers/generateFormattedAdminPost';
import { generateFormattedSurname } from '../../helpers/generateFormattedSurname';
import { useNavigation } from '@react-navigation/native';

import { realmContext } from '../../models/realm';
const {useRealm} = realmContext;

const GroupModal = (
    {
        modalVisible,
        setModalVisible,
        farmerData,
        farmerType,
        setFarmerType,


        setGroupType, 
        setGroupName, 
        setGroupAffiliationYear, 
        setGroupAdminPost, 
        setGroupVillage,
        setGroupManagerName, 
        setGroupManagerPhone,
        setGroupOperatingLicence, 
        setGroupNuit, 
        setGroupMembersNumber,
        setGroupWomenNumber,

    }
) => {

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    const [farmerId, setFarmerId] = useState(null);
    const navigation = useNavigation();
    const realm = useRealm()

    const addGroup = useCallback((farmerData, realm) =>{
    const {
        type, 
        name, 
        address, 
        affiliationYear,
        members,
        manager,
        licence,
        nuit,
    } = farmerData;

    realm.write(()=>{
        const newGroup = realm.create('Group', {
            _id: uuidv4(),
            type,
            name,
            members,
            affiliationYear,
            manager,
            licence,
            address,
            nuit,
        })
        console.log('group:', newGroup);
        setModalVisible(false);
        setAddDataModalVisible(true);

        setGroupType('');
        setGroupName('');
        setGroupAffiliationYear(''); 
        setGroupAdminPost('');
        setGroupVillage('');
        setGroupManagerName('');
        setGroupManagerPhone('');
        setGroupOperatingLicence(''); 
        setGroupNuit(''); 
        setGroupMembersNumber('')
        setGroupWomenNumber('')
        
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
                <Text style={styles.keys}>Grupo:</Text>
            </Box>
            <Box w="60%" style={styles.values}>
                <Box>
                    <Text style={styles.values}>
                        {farmerData?.name} ({farmerData?.type})
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
            <Text style={styles.keys}>Membros</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData.members?.women} (Mulheres)
                </Text>
            </Box>
            <Box>
                <Text style={styles.values}>
                    {farmerData.members?.total - farmerData.members?.women} (Homens)
                </Text>
            </Box>
            <Box>
                <Text style={styles.values}>________</Text>
                <Text style={styles.values}>
                    {farmerData.members?.total} (Total)
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
            <Text style={styles.keys}>Ano de afiliação:</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.affiliationYear}
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
            <Text style={styles.keys}>Documentos:</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.licence ? farmerData?.licence + ` (Licença/Alvará)` : 'Nenhum (Licença/Alvará)'} 
                </Text>
                <Text style={styles.values}>
                    {farmerData?.nuit ? farmerData?.nuit + ` (NUIT)` : 'Nenhum (NUIT)'} 
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
            <Text style={styles.keys}>Contacto:</Text>
        </Box>
        <Box w="60%">
            <Text style={styles.values}>
                {farmerData.manager?.fullname} (Gerente)
            </Text>
            <Text style={styles.values}>
            {
                farmerData.manager?.phone ? 
                farmerData.manager?.phone + ` (Telefone)` : 
                'Nenhum (Telefone)' 
            }
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
            <Text style={styles.keys}>Endereço:</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.address?.province} (Província)
                </Text>
                <Text style={styles.values}>
                    {farmerData?.address?.district} (Distrito)
                </Text>
                <Text style={styles.values}>
                    {farmerData?.address?.adminPost} (Posto Admin.)
                </Text>
                <Text style={styles.values}>
                    {farmerData.address?.village ? farmerData.address?.village (localidade/povoado) : 'Nenhum (Localidade/Povoado)'}
                </Text>
            </Box>
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
                            addGroup(farmerData, realm)
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
            <FarmerAddDataModal
                addDataModalVisible={addDataModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
                farmerId={farmerId}
                setFarmerType={setFarmerType}
            />
        </Center>
    </>

  )
}

export default GroupModal;