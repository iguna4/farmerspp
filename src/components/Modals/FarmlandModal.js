/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import { Text,  Stack, Box, Center, Divider } from 'native-base';
import { Button, Icon } from '@rneui/themed';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Realm from 'realm';

import FarmerAddDataModal from './SuccessModal';

import { useNavigation } from '@react-navigation/native';


import { realmContext } from '../../models/realm';
import { categorizeFarmer } from '../../helpers/categorizeFarmer';

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

        setFarmlandId,
        setIsCoordinatesModalVisible,

    }
) => {

    const navigation = useNavigation();
    const realm = useRealm()

const onAddFarmland = useCallback((farmlandData, realm) =>{
    const {
        plantingYear, 
        description,
        consociatedCrops,
        density,
        trees,
        declaredArea,
        plantTypes,
        ownerId,
        flag,
    } = farmlandData;

    if (!ownerId) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'Indica o proprietário desta parcela!',
        };
    }


    let owner;
    if (flag === 'Indivíduo'){
        owner = realm.objectForPrimaryKey('Farmer', ownerId);
    }
    else if (flag === 'Grupo') {
        owner = realm.objectForPrimaryKey('Group', ownerId);
    }
    else if (flag === 'Instituição'){
        owner = realm.objectForPrimaryKey('Institution', ownerId);
    }

    if (!owner) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'O proprietário desta parcela ainda não foi registado!',
        };
    }

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
            farmer: owner._id,
        })

        // set the farmlandId
        setFarmlandId(newFarmland._id);

        // add the created farmland to the Farmer (owner)'s object
        owner.farmlands.push(newFarmland);

        if (flag === 'Indivíduo'){            
            // categorize by 'comercial' | 'familiar' | 'nao-categorizado'
            owner.category = categorizeFarmer(owner.farmlands);
        }
        
    })

},
    [
        realm, farmlandData
    ]
)

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




    <Box mx="6" mt="5" >
        <CustomDivider
            marginVertical="1"
            thickness={1}
            bg="grey"
        />
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
                    {farmlandData?.trees} (árvores)
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
                    {
                        farmlandData?.density?.mode === 'Regular' && (
                            <>
                        <Text style={styles.values}>
                            {farmlandData?.density?.length + ' (comprimento)'}
                        </Text>
                        <Text style={styles.values}>
                            {farmlandData?.density?.width + ' (largura)'}
                        </Text>
                    </>
                )}
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
        <Center
            w="100%"
        >
            <Button
                onPress={()=>{
                    try {
                        onAddFarmland(farmlandData, realm);    
                        setIsCoordinatesModalVisible(true);
                        setModalVisible(false);
                    } catch (error) {
                        throw new Error('Failed to register Farmland', { cause: error})
                    }
                    finally{
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

export default FarmlandModal;