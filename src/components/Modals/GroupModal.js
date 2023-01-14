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

import SuccessModal from './SuccessModal';
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

        setFarmerItem,
        setIsCoordinatesModalVisible,

    }
) => {

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    // const [farmerId, setFarmerId] = useState(null);
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
        setFarmerItem({
            ownerId: newGroup._id,
            ownerName: newGroup.type + ' ' + newGroup.name,
            flag: 'Grupo',        
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
        animationType="slide"
        onRequestClose={()=>setModalVisible(false)}
        // statusBarTranslucent={false}
    >
        <Stack 
                direction="row" 
                w="100%"
                // pt="3"
                style={{
                    backgroundColor: '#EBEBE4',
                }}
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

        <Box mx="6">
        <CustomDivider
            marginVertical="1"
            thickness={1}
            bg="grey"
        />
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
            <Text style={styles.keys}>Ano de {farmerData?.type?.includes('Grupo') ? "criação" : "legalização"}</Text>
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
                    {farmerData?.nuit ? farmerData?.nuit + ` (NUIT)` : 'Nenhum (NUIT)'} 
                </Text>
                <Text style={styles.values}>
                    {farmerData?.licence ? farmerData?.licence + ` (Licença/Alvará)` : 'Nenhum (Licença/Alvará)'} 
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
                {farmerData.manager?.fullname} ({farmerData?.type?.includes('Grupo') ? "Representante" : "Presidente"})
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
    <Center
        w="100%"
    >
        <Button
            onPress={()=>{
                try {
                    addGroup(farmerData, realm)
                    setModalVisible(false);
                    setIsCoordinatesModalVisible(true);
                } catch (error) {
                    throw new Error('Failed to register Group', { cause: error})
                }
                finally {
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
    </>

  )
}

export default GroupModal;