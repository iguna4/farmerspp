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

export default function FarmerDataConfirmModal({
            farmerData,
            setModalVisible,
            modalVisible,
            farmerType,
        }
    ) {
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
        birthDate, birthPlace, address,
        contact, idDocument,
    } = farmerData;

    realm.write(()=>{
        const newFarmer = realm.create('Farmer', {
            _id: uuidv4(),
            names,
            isSprayingAgent,
            gender,
            birthDate,
            birthPlace,
            address,
            contact,
            idDocument,
            ufid: '4843jf',

        })
        console.log('newFarmer:', newFarmer);
        setModalVisible(false);
        setAddDataModalVisible(true)
        
    })
}, [
        realm, 
        farmerData,
        // farmerType
    ]);

    useEffect(()=>{
        if (farmerType === 'Indiv??duo'){

        }
        else if (farmerType === 'Grupo') {

        }
        else if (farmerType === 'Institui????o'){

        }

    }, [farmerType])


  return(

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
 {/* {
     farmerType === 'Indiv??duo' && (

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
                        <Box>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.province !== "Pa??s Estrangeiro" ? farmerData?.birthPlace?.province + " (prov??ncia)" : "Pa??s Estrangeiro"}
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.province !== "Pa??s Estrangeiro" ? farmerData?.birthPlace?.district + " (distrito)" : farmerData?.birthPlace?.district + " (Pa??s)" }
                            </Text>
                            <Text style={styles.values}>
                                {farmerData?.birthPlace?.province !== "Pa??s Estrangeiro" ? farmerData?.birthPlace?.adminPost + " (posto admin.)" : "Nenhum (Prov??ncia)"}
                            </Text>
                            <Text style={styles.values}>
                                {
                                    farmerData?.birthPlace?.province === "Pa??s Estrangeiro" ? "Nenhum (Distrito/Localidade)" :
                                farmerData?.birthPlace?.village ? farmerData?.birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'
                                }
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
                        <Text style={styles.keys}>Doc. Identifica????o:</Text>
                    </Box>
                    <Box w="60%">
                            { farmerData?.idDocument?.docNumber ?
                                (<Text style={styles.values}>{farmerData?.idDocument?.docNumber} ({farmerData?.idDocument?.docType})</Text>)
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
                            { farmerData?.idDocument?.nuit ?
                                (<Text style={styles.values}>{farmerData?.idDocument?.nuit}</Text>)
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
        </Box>
)} */}

{/* {
    farmerType === 'Institui????o' && (
    <Box>
        <Stack direction="row" w="100%" my="1">
            <Box w="40%">
                <Text style={styles.keys}>Institui????o:</Text>
            </Box>
            <Box w="60%" style={styles.values}>
                <Box>
                    <Text style={styles.values}>
                        {farmerData?.name} ({farmerData?.type})
                    </Text>
                    <Text style={styles.values}>
                        {farmerData?.isPrivate ? 'Institui????o Privada' : 'Institui????o P??blica'} 
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
            <Text style={styles.keys}>Endere??o:</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.address?.province} (Prov??ncia)
                </Text>
                <Text style={styles.values}>
                    {farmerData?.address?.district} (Distrito)
                </Text>
                <Text style={styles.values}>
                    {farmerData?.address?.adminPost} (Posto Admin.)
                </Text>
                <Text style={styles.values}>
                    {farmerData?.address?.village ? farmerData.address?.village (localidade/povoado) : 'Nenhum (Localidade/Povoado)'}
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
)} */}

{/* {
    farmerType === 'Grupo' && (
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
            <Text style={styles.keys}>Ano de afilia????o:</Text>
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
                    {farmerData?.licence ? farmerData?.licence + ` (Licen??a/Alvar??)` : 'Nenhum (Licen??a/Alvar??)'} 
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


    <CustomDivider
        marginVertical="1"
        thickness={1}
        bg="grey"
    />

        <Stack direction="row" w="100%" my="1">
        <Box w="40%">
            <Text style={styles.keys}>Endere??o:</Text>
        </Box>
        <Box w="60%">
            <Box>
                <Text style={styles.values}>
                    {farmerData?.address?.province} (Prov??ncia)
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

        marginVertical="1"
        thickness={1}
    <CustomDivider
        bg="grey"
    />
    </Box>
)} */}

     </Modal.Body>
        <Modal.Footer maxHeight="60">
            <Center>
                <Button
                        onPress={()=>addFarmer(farmerData, realm)}
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
                />
        </Center>
    </>
) 
}
