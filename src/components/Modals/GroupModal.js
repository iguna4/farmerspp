/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import { Text,  Stack, Box, Center, Divider } from 'native-base';
import { Modal, ScrollView, Pressable, View, TouchableOpacity } from 'react-native';
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
import { user } from '../../consts/user';


import { realmContext } from '../../models/realmContext';
import COLORS from '../../consts/colors';
import { groupAffiliationStatus } from '../../consts/groupAffiliationStatus';
const {useRealm, useObject, useQuery } = realmContext;

export default function GroupModal (
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
        // setGroupManagerName, 
        // setGroupManagerPhone,
        setGroupOperatingLicence, 
        setGroupNuit, 
        setGroupMembersNumber,
        setGroupWomenNumber,

        setFarmerItem,
        setIsCoordinatesModalVisible,

        customUserData,


    }
){

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    // const [farmerId, setFarmerId] = useState(null);
    const navigation = useNavigation();
    const realm = useRealm();

    // const currentUserStat = useObject('UserStat', customUserData?.userId);
    const currentUserStat = useQuery('UserStat').filtered("userId == $0", customUserData?.userId)[0];

    const addGroup = useCallback((farmerData, realm) =>{
    const {
        operationalStatus,
        type, 
        name, 
        address, 
        creationYear,
        legalStatus,
        affiliationYear,
        numberOfMembers,
        assets,
        // manager,
        licence,
        nuit,
    } = farmerData;

    realm.write(async ()=>{
        const newGroup = await realm.create('Group', {
            _id: uuidv4(),
            operationalStatus,
            type,
            name,
            creationYear,
            legalStatus,
            affiliationYear,
            address,
            numberOfMembers,
            assets,
            // manager,
            licence,
            nuit,
            userDistrict: customUserData?.userDistrict,
            userProvince: customUserData?.userProvince,
            userId: customUserData?.userId,
            userName: customUserData?.name,
        })
        setFarmerItem({
            ownerId: newGroup._id,
            ownerName: newGroup.type + ' ' + newGroup.name,
            flag: 'Grupo',        
        });
    });

    // update userStat (1 more farmer registered by the user)
    if(currentUserStat) {
        realm.write(()=>{
            currentUserStat.registeredFarmers = currentUserStat.registeredFarmers + 1; 
        })
    } 
    else {
        realm.write(()=>{
            const newStat = realm.create('UserStat', {
                _id: uuidv4(),
                userName: customUserData.name,
                userId: customUserData.userId,
                userDistrict: customUserData.userDistrict,
                userProvince: customUserData.userProvince,
                userRole: customUserData.role,
                registeredFarmers: 1,
            });
        })
    }

}, [
        realm, 
        farmerData,
        // farmerType
    ]);



  return (
    <View
        style={{ flex: 1, }}
    >
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
            <Box>
                <Pressable
                    onPress={()=>{
                        // navigation.goBack();
                        setModalVisible(false);
                    }}   
                    style={{
                        position: 'absolute',
                        left: 5,
                        top: 4,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon 
                        name="arrow-back-ios" 
                        color={COLORS.main}
                        size={25}
                        // onPress={()=>{}}
                    /> 
                    {/* <Text
                        style={{
                            color: COLORS.main,
                            fontFamily: 'JosefinSans-Bold',
                            marginLeft: -10,
                        }}
                    >
                        Voltar
                    </Text> */}
                </Pressable>
            </Box>
            <Box w="80%">
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
                minHeight: '120%',
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
                    <Text style={styles.values}>
                        {farmerData?.operationalStatus ? 'Activo': 'Inactivo'} 
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
            <Text style={styles.keys}>Finalidade:</Text>
        </Box>
        <Box w="60%" style={styles.values}>
            <Box>
                {
                    farmerData?.assets?.map((asset, index)=>(
                        <Text key={index} style={styles.values}>
                            - {asset?.subcategory} 
                        </Text>
                    ))
                }
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
                    {farmerData.numberOfMembers?.women} (Mulheres)
                </Text>
            </Box>
            <Box>
                <Text style={styles.values}>
                    {farmerData.numberOfMembers?.total - farmerData.numberOfMembers?.women} (Homens)
                </Text>
            </Box>
            <Box>
                <Text style={styles.values}>________</Text>
                <Text style={styles.values}>
                    {farmerData.numberOfMembers?.total} (Total)
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
            <Text style={styles.keys}>Estado de legalização</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.legalStatus}
                </Text>
                <Text style={styles.values}>
                    {farmerData?.creationYear} (an de criação)
                </Text>
                {
                    farmerData?.legalStatus === groupAffiliationStatus.affiliated &&
                    <Text style={styles.values}>
                        {farmerData?.affiliationYear} (ano de legalização)
                    </Text>
                }
            </Box>
        </Box>
    </Stack>


{   farmerData?.legalStatus === groupAffiliationStatus.affiliated &&
    <>
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
    </>
}


    {/* <CustomDivider
        marginVertical="1"
        thickness={1}
        bg="grey"
    /> */}

    {/* <Stack direction="row" w="100%" my="1">
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
    </Stack> */}
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
                    {farmerData.address?.village ? farmerData.address?.village + ' (localidade)' : 'Nenhum (Localidade)'}
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
                    // setGroupManagerName('');
                    // setGroupManagerPhone('');
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
    </View>

  )
}

// export default GroupModal;