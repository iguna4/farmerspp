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

import FarmerAddDataModal from './SuccessModal';
import { generateUUID } from '../../helpers/generateUUID';
import { generateFormattedDate } from '../../helpers/generateFormattedDate';
import { generateFormattedAdminPost } from '../../helpers/generateFormattedAdminPost';
import { generateFormattedSurname } from '../../helpers/generateFormattedSurname';
import { useNavigation } from '@react-navigation/native';
import SuccessModal from './SuccessModal';

import { realmContext } from '../../models/realm';
const {useRealm} = realmContext;

const FarmlandModal = (
    {
        modalVisible,
        setModalVisible,
        farmlandData,

        setPlantingYear, 
        setDescription,
        setConsociatedCrops, 
        setClones,
        setTrees, 
        setDeclaredArea, 
        setDensityLength, 
        setDensityWidth,
        setPlantTypes, 
        setDensityMode, 

    }
) => {

    const [addDataModalVisible, setAddDataModalVisible] = useState(false);
    const navigation = useNavigation();
    const realm = useRealm()


const addFarmland = useCallback((farmlandData, realm) =>{
    const {
        plantingYear, 
        description,
        consociatedCrops,
        density,
        trees,
        declaredArea,
        plantTypes,
        farmerId,
    } = farmlandData;

    const farmer = realm.objectForPrimaryKey('Farmer', farmerId);

    realm.write(()=>{
        const newFarmland = realm.create('Farmland', {
            _id: uuidv4(),
            plantingYear,
            description,
            consociatedCrops,
            density,
            trees,
            declaredArea,
            plantTypes,
            farmer: farmer._id,
        })
        console.log('newFarmland:', newFarmland);
    })
    setModalVisible(false);
    setAddDataModalVisible(true);

    setPlantingYear('');
    setDescription('');
    setConsociatedCrops([]);
    setClones([]);
    setTrees('');
    setDeclaredArea('');
    setDensityLength('');
    setDensityWidth('');
    setPlantTypes([]);
    setDensityMode('');
}, [
        realm, 
        farmlandData,
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
                    <Text style={styles.keys}>Pomar:</Text>
                </Box>
                <Box w="60%" style={styles.values}>
                    <Text style={styles.values}>
                        {farmlandData?.description}
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
                    <Text style={styles.keys}>Ano de plantio:</Text>
                </Box>
                <Box w="60%" style={styles.values}>
                    <Text style={styles.values}>
                        {farmlandData?.plantingYear} (ano)
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
                    <Text style={styles.keys}>Culturas consociadas:</Text>
                </Box>
                <Box w="60%" style={styles.values}>
                    <Text style={styles.values}>
                        {farmlandData?.consociatedCrops?.map(crop=>`${crop}; `)}
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
                    <Text style={styles.keys}>Cajueiros:</Text>
                </Box>
                <Box w="60%" style={styles.values}>
                    <Text style={styles.values}>
                        {farmlandData?.trees} (cajueiros)
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
                    <Text style={styles.keys}>Área declarada:</Text>
                </Box>
                <Box w="60%" style={styles.values}>
                    <Text style={styles.values}>
                        {farmlandData?.declaredArea} (hectares)
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
                    <Text style={styles.keys}>Compasso:</Text>
                </Box>
                <Box w="60%">
                    <Box>
                        <Text style={styles.values}>
                            {farmlandData?.density?.mode}
                        </Text>
                        <Text style={styles.values}>
                            {farmlandData?.density?.mode === 'Regular' ? farmlandData?.density?.length + ' (comprimento)' : ''}
                        </Text>
                        <Text style={styles.values}>
                            {farmlandData?.density?.mode === 'Regular' ? farmlandData?.density?.width + ' (largura)' : ''}
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
                    <Text style={styles.keys}>Tipo de plantio:</Text>
                </Box>
                <Box w="60%">
                    <Box>
                        <Text style={styles.values}>
                            {farmlandData.plantTypes?.plantTypes?.map(p=>`${p}; `)}
                        </Text>
                        <Text style={styles.values}>
                            {
                            farmlandData.plantTypes?.plantTypes?.some(el=>el.includes('enxer')) 
                            ?  farmlandData.plantTypes?.clones?.map(clone=>`${clone}; `) + '(clones)'
                            : ''}
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
                            addFarmland(farmlandData, realm)
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
        {/* <Center flex={1} px="3">
            <SuccessModal
                addDataModalVisible={addDataModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
                farmerId={farmerId}
                setFarmerType={setFarmerType}
            />
        </Center> */}
    </>

  )
}

export default FarmlandModal;