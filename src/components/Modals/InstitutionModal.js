/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import { Text,  Stack, Box, Center, Divider } from 'native-base';
import { Modal, ScrollView, Pressable, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import AwesomeAlert from 'react-native-awesome-alerts';


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
const {useRealm, useObject, useQuery} = realmContext;

export default function InstitutionModal (
    {
        modalVisible,
        setModalVisible,
        farmerData,
        farmerType,
        setFarmerType,

        setInstitutionType, 
        setInstitutionName, 
        setInstitutionAdminPost, 
        setInstitutionVillage,
        setInstitutionManagerName, 
        setInstitutionManagerPhone,
        setInstitutionNuit, 
        setIsPrivateInstitution,
        setInstitutionLicence,


        setFarmerItem,
        farmerItem,
        setIsCoordinatesModalVisible,

        customUserData,


    }
) {

   const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const navigation = useNavigation();
    const realm = useRealm();

    // const currentUserStat = useObject('UserStat', customUserData?.userId);
    const currentUserStat = useQuery('UserStat').filtered("userId == $0", customUserData?.userId)[0];



    const addInstitution = useCallback((farmerData, realm) =>{
    const {
        type, 
        name, 
        // private: private,
        assets,
        address, 
        manager,
        nuit,
        licence,
    } = farmerData;

    realm.write(async ()=>{
        const newInstitution = await realm.create('Institution', {
            _id: uuidv4(),
            type,
            name,
            private: farmerData?.private,
            assets,
            address,
            manager,
            nuit,
            licence,
            userDistrict: customUserData?.userDistrict,
            userProvince: customUserData?.userProvince,            
            userId: customUserData?.userId,
            userName: customUserData?.name,
        })
        setFarmerItem({
            ownerId: newInstitution?._id,
            ownerName: `${newInstitution?.type} ${newInstitution?.name}`,
            flag: 'Instituição',            
        });  
    })

    // update user stat (1 more farmer registered by the user)
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
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        
    >
        <Stack 
            direction="row" 
            w="100%"
            // pt="3"
            style={{
                backgroundColor: '#EBEBE4',
            }}
        >
            <Box >


                <Pressable
                    onPress={()=>{
                        // navigation.goBack();
                        setModalVisible(false);
                    }} 
                    style={{
                        position: 'absolute',
                        left: 0,
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
                    <Text
                        style={{
                            color: COLORS.main,
                            fontFamily: 'JosefinSans-Bold',
                            marginLeft: -10,
                        }}
                    >
                        Voltar
                    </Text>
                </Pressable>



                {/* <TouchableOpacity
                    onPress={()=>{
                        // navigation.goBack();
                        setModalVisible(false);
                    }}                            
                >
                    <Icon name='arrow-back-ios' color="#005000" size={30}  />
                </TouchableOpacity> */}
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
        <AwesomeAlert
          show={successAlert}
          showProgress={false}
          title="Registo Sucedido"
          message="Foi registado com sucesso!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
        //   cancelText="No, cancel"
          confirmText="   OK!   "
          confirmButtonColor="#005000"
        //   onCancelPressed={() => {
        //     setGeoAlert(false);
        //   }}
          onConfirmPressed={() => {
            setSuccessAlert(false);
          }}
        />
    <Box mx="6">
        <CustomDivider
            marginVertical="1"
            thickness={1}
            bg="grey"
        />
        <Stack direction="row" w="100%" my="1">
            <Box w="40%">
                <Text style={styles.keys}>Instituição:</Text>
            </Box>
            <Box w="60%" style={styles.values}>
                <Box>
                    <Text style={styles.values}>
                        {farmerData?.name} ({farmerData?.type})
                    </Text>
                    <Text style={styles.values}>
                        {farmerData?.isPrivate ? 'Instituição Privada' : 'Instituição Pública'} 
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
            <Text style={styles.values}>
                {farmerData?.nuit ? farmerData?.nuit + ' (NUIT)' : 'Nenhum (NUIT)'}
            </Text>
    {  farmerData?.private &&
              <Text style={styles.values}>
                {farmerData?.licence ? farmerData?.licence + ' (Alvará/Licença)' : 'Nenhum (Alvará/Licença)'}
            </Text>
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
            <Text style={styles.keys}>Contacto:</Text>
        </Box>
        <Box w="60%">
            <Text style={styles.values}>
                {farmerData?.manager?.fullname} (Responsável)
            </Text>
            <Text style={styles.values}>
            {
                farmerData?.manager?.phone ? 
                farmerData?.manager?.phone + ' (Telefone)' :
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
                    {farmerData?.address?.village ? farmerData.address?.village + ' (localidade)' : 'Nenhum (Localidade)'}
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
                    addInstitution(farmerData, realm)
                    setModalVisible(false);
                    setIsCoordinatesModalVisible(true);
                    // setSuccessAlert(true);
                    
                } catch (error) {
                    throw new Error('Failed to register Institution', { cause: error})
                }
                finally{
                    setInstitutionType('');
                    setInstitutionName('');
                    setInstitutionAdminPost(''); 
                    setInstitutionVillage('');
                    setInstitutionManagerName(''); 
                    setInstitutionManagerPhone(null);
                    setInstitutionNuit(null);
                    setIsPrivateInstitution(false);
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

// export default InstitutionModal;