
import React, { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, TextInput, View } from 'react-native';
import { Overlay, Icon, Button, CheckBox } from "@rneui/base";
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';

import ConfirmData from './ConfirmData';
import COLORS from "../../consts/colors";
import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";
import { getFullYears } from "../../helpers/dates";
import { plantingTypes } from "../../consts/plantingTypes";
import cloneList from "../../consts/clones";



// import administrativePosts from '../../consts/administrativePosts';
// import provinces from '../../consts/provinces';
// import districts from '../../consts/districts';
// import villages from '../../consts/villages';
// import countries from '../../consts/countries';
// import idDocTypes from '../../consts/idDocTypes';
import { crops } from '../../consts/crops';

import { CustomInput } from '../Inputs/CustomInput';
import validateFarmlandEditedData from '../../helpers/validateFarmlandEditedData';

import { useUser } from "@realm/react";
import { realmContext } from '../../models/realmContext';
import validateEditedBlockData from "../../helpers/validateEditedBlockData";
const {useRealm} = realmContext;


const EditFarmlandData = ({  
    isOverlayVisible, 
    setIsOverlayVisible,
    isConfirmDataVisible,
    setIsConfirmDataVisible,

    ownerName,
    resource,
    blocks,
    
    resourceName,
    dataToBeUpdated,

    newDataObject,
    oldDataObject,
    setNewDataObject,
    setOldDataObject,

    // farmland main data
    description, setDescription, consociatedCrops, setConsociatedCrops,
    totalArea, setTotalArea, trees, setTrees,

    oldDescription, setOldDescription, oldConsociatedCrops,
    setOldConsociatedCrops, oldTotalArea, setOldTotalArea,
    oldTrees, setOldTrees,

    // block data
    setBlockId,
    blockId,

    plantingYear, setPlantingYear, blockTrees, setBlockTrees,
    usedArea, setUsedArea, densityWidth,  setDensityWidth,
    densityLength, setDensityLength, plantTypes, setPlantTypes,
    clones, setClones, addedClone, setAddedClone,
    isDensityModeIrregular, setIsDensityModeIrregular,
    isDensityModeRegular, setIsDensityModeRegular, sameTypeTreesList,
    setSameTypeTreesList, remainingArea, setRemainingArea,

    oldBlockId, etOldBlockId, oldPlantingYear, setOldPlantingYear,
    oldBlockTrees, setOldBlockTrees, oldUsedArea, setOldUsedArea,
    oldDensityWidth, setOldDensityWidth, oldDensityLength,
    setOldDensityLength, oldPlantTypes, setOldPlantTypes,
    oldClones, setOldClones, addedOldClone, setAddedOldClone,
    isOldDensityModeIrregular,
    setIsOldDensityModeIrregular, isOldDensityModeRegular,
    setIsOldDensityModeRegular, oldSameTypeTreesList,
    setOldSameTypeTreesList, oldRemainingArea, setOldRemainingArea,

    isEditBlockVisible, setIsEditBlockVisible,
    setAutoRefresh, autoRefresh,

})=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    // // ----------------------------------------------------
    const [errors, setErrors] = useState({});
    const [overlayTitle, setOverlayTitle] = useState('');

    const [editBlockIsOn, setEditBlockIsOn] = useState(false);

    useEffect(()=>{

    //     // let selectedClones = [];
    //     // let mergedSameTypeTrees = [];
    //     const filteredPlantTypes = plantTypes.filter(plantType=>!plantType.includes('enxer'));
    //     const selectedClones = clones?.map(clone=>`Clone: ${clone}`);
    //     const mergedSameTypeTrees = filteredPlantTypes.concat(selectedClones);

        // setSameTypeTreesList(prev=>[...prev, {}]);

    }, [ clones, plantTypes ]);


    useEffect(()=>{

        // save the block if everything is fine
        if (editBlockIsOn){
            // edit the block
            // addBlockData();
            setEditBlockIsOn(false);
        }

        // find out the remaing area
        if (isEditBlockVisible) {
            const totalArea = resource?.totalArea;
            const blocksAreas = resource?.blocks?.map(block=>block?.usedArea)?.reduce((acc, el)=> acc + el, 0);
            const remainingArea = totalArea - blocksAreas;
            setRemainingArea(remainingArea);
        }

    }, [ 
        editBlockIsOn,
        isEditBlockVisible,
        resource, 
        // farmresouland,
    ]);



    useEffect(()=>{
        if (dataToBeUpdated === 'farmlandMainData' && resourceName === 'Farmland'){
            setDescription(resource?.description);
            setConsociatedCrops(resource?.consociatedCrops);
            setTotalArea(resource?.totalArea);
            setTrees(resource?.trees);
            setOverlayTitle('Actualizar dados do pomar.');

            setOldDescription(resource?.description);
            setOldConsociatedCrops(resource?.consociatedCrops);
            setOldTotalArea(resource?.totalArea);
            setOldTrees(resource?.trees);
        }

        if (dataToBeUpdated === 'blockData' && resourceName === 'Farmland') {
            const block = resource?.blocks.find((block)=>block._id === blockId);
            setPlantingYear(block?.plantingYear);
            setUsedArea(block?.usedArea);
            setBlockTrees(block?.trees);
            setPlantTypes(block?.plantTypes.plantType);
            setSameTypeTreesList(block.sameTypeTrees);
            if (block?.density.mode === 'Regular') {
                setDensityWidth(block?.density.width);
                setDensityLength(block?.density.length);
                setOldDensityWidth(block?.density.width);
                setOldDensityLength(block?.density.length);
                setIsDensityModeIrregular(false);
                setIsDensityModeRegular(true);
            }
            else{
                setIsDensityModeIrregular(true);
                setIsDensityModeRegular(false);
            }
            if (block?.plantTypes?.plantType.some((el)=>el?.includes('enxert')) ) {
                setClones(block?.plantTypes.clones);
                setOldClones(block?.plantTypes.clones);
            }

            setOverlayTitle('Actualizar bloco de cajueiros.');

            
            setOldPlantingYear(block?.plantingYear);
            setOldUsedArea(block?.usedArea);
            setOldBlockTrees(block?.trees);
            setOldPlantTypes(block?.plantTypes.plantType);
            setOldSameTypeTreesList(block?.sameTypeTrees);
        }

    }, [ dataToBeUpdated, resourceName ]);

    const onConfirmUpdate = (dataToBeUpdated, resourceName)=> {

        
        const newData = {};
        const oldData = {};
        
        if (dataToBeUpdated === 'farmlandMainData' && resourceName === 'Farmland') {
            
            const validatedData = validateFarmlandEditedData({
    
                description, consociatedCrops, totalArea,
                trees, oldDescription, oldConsociatedCrops,
                oldTotalArea, oldTrees,
                blocks,
            }, errors, setErrors, dataToBeUpdated, resourceName);

            // new incoming data
            newData['description'] = validatedData?.description;
            newData['consociatedCrops'] = validatedData?.consociatedCrops;
            newData['totalArea'] = validatedData?.totalArea;
            newData['trees'] = validatedData?.trees;

            // old data
            oldData['description'] = oldDescription;
            oldData['consociatedCrops'] = oldConsociatedCrops;
            oldData['totalArea'] = oldTotalArea;
            oldData['trees'] = oldTrees;
            
        }

        if (dataToBeUpdated === 'blockData' && resourceName === 'Farmland') {
            const validatedData = validateEditedBlockData({    
                plantingYear, blockTrees, usedArea,
                isDensityModeIrregular, isDensityModeRegular, densityLength,
                densityWidth, plantTypes, clones, sameTypeTreesList, 
                remainingArea,
            }, errors, setErrors, dataToBeUpdated, resourceName);

            // incoming data
            newData['plantingYear'] = validatedData?.plantingYear;
            newData['density'] = validatedData?.density;
            newData['trees'] = validatedData?.trees;
            newData['usedArea'] = validatedData?.usedArea;
            newData['plantTypes'] = validatedData?.plantTypes;
            newData['sameTypeTrees'] = validatedData?.sameTypeTrees;
 
            // old data
            oldData['plantingYear'] = oldPlantingYear;
            oldData['density'] = {
                mode: isOldDensityModeRegular ? 'Regular' : 'Irregular',
                length: isOldDensityModeRegular ? oldDensityLength : '',
                width: isOldDensityModeRegular ? oldDensityWidth : '',
            };
            oldData['trees'] = oldBlockTrees;
            oldData['usedArea'] = oldUsedArea;
            oldData['plantTypes'] = {
                plantType: oldPlantTypes,
                clones: oldClones,
            };
            oldData['sameTypeTrees'] = oldSameTypeTreesList;
        }

        setNewDataObject(newData);
        setOldDataObject(oldData);
    }


    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
      };

    return (

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '90%',
            maxHeight: '80%',
            borderRadius: 10,
            // paddingBottom: 10,
        }}
        isVisible={isOverlayVisible} 
        onBackdropPress={toggleOverlay}
    >

        <View
            style={{
                // minHeight: '80%',
                maxHeight: '100%',
                justifyContent: 'center',
                // marginVertical: 10,
            }}
        >
            <View
                style={{ 
                    width: '100%', 
                    backgroundColor: COLORS.main, 
                }}
            >
                <Text
                    style={{ 
                        textAlign: 'center',
                        color: COLORS.ghostwhite,
                        fontSize: 18,
                        paddingVertical: 5,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                >{ownerName}</Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
            >
                <Icon 
                    onPress={()=>{
                        setIsOverlayVisible(false);
                        setIsEditBlockVisible(false);
                    }}
                    name="close" 
                    size={30} 
                    color={COLORS.ghostwhite} 
                />
            </View>
            <ScrollView
                style={{
                    // flex: 1,
                    // minHeight: '100%',
                    // marginVertical: 10,
                }}
            >
            <Box>
                <Text
                    style={{ 
                        textAlign: 'center',
                        color: COLORS.black,
                        fontSize: 18,
                        paddingVertical: 15,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                >{overlayTitle}</Text>
            </Box>

    {/* update the farmland block data */}

    {
        (dataToBeUpdated === 'blockData' && resourceName === 'Farmland' && blockId) &&
        <Stack direction="column">
        <Stack direction="row" w="100%" space={1}>
            <Box w="50%">
                <FormControl isRequired my="1" isInvalid={'plantingYear' in errors}>
                    <FormControl.Label>Ano de plantio</FormControl.Label>
                        <Select
                            selectedValue={plantingYear}
                            accessibilityLabel="Ano de plantio"
                                placeholder="Escolha o ano"
                            minHeight={55}
                            _selectedItem={{
                                bg: 'teal.600',
                                fontSize: 'lg',
                                endIcon: <CheckIcon size="5" />,
                            }}
                            dropdownCloseIcon={plantingYear 
                                    ? <Icon 
                                        name="close" 
                                        size={25} 
                                        color="grey" 
                                        onPress={()=>setPlantingYear('')} 
                                    /> 
                                    : <Icon 
                                        size={40} 
                                        name="arrow-drop-down" 
                                        color={COLORS.mediumseagreen} 
                                    />
                                }
                            mt={1}
                            onValueChange={newYear => {
                                setErrors((prev)=>({...prev, plantingYear: ''}));
                                setPlantingYear(newYear);
                            }}
                        >
                            {
                                getFullYears(100)?.map((year, index)=>(
                                    <Select.Item key={index} label={`${year}`} value={year} />
                                ))
                            }
                        </Select>
                    {
                        'plantingYear' in errors 
                    ? <FormControl.ErrorMessage 
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                    _text={{ fontSize: 'xs'}}>{errors?.plantingYear}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                    }
                </FormControl>
            </Box>

        <Box w="50%"
                style={{
                    position: 'absolute',
                    top: 5,
                    right: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: false ? COLORS.red : COLORS.mediumseagreen,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'right',
                    }}
                >
                    Este pomar tem...
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: false ? COLORS.red : COLORS.mediumseagreen,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'right',
                    }}
                >
                    {resource?.blocks?.length} blocos;             
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: false ? COLORS.red : COLORS.mediumseagreen,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'right',
                    }}
                >
                    {resource.trees} árvores;
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: false ? COLORS.red : COLORS.mediumseagreen,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'right',
                    }}
                >
                    {remainingArea?.toFixed(2)} hectares disponíveis.
                </Text>
            </Box> 
        </Stack>

        <FormControl isRequired my="2" isInvalid={'usedArea' in errors}>
            <FormControl.Label>Área Aproveitada</FormControl.Label>
                <CustomInput
                    width="100%"
                    keyboardType="numeric"
                    textAlign="center"
                    placeholder="Hectares"
                    value={usedArea?.toString()}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({
                            ...prev, 
                            blockTrees: '', 
                            usedArea: '',
                            treeDensity: '',
                        }))
                        setUsedArea(newNumber)
                    }}
                />
                    
            {/* {
                'usedArea' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.usedArea}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            } */}
        </FormControl>

        <FormControl isRequired my="2" isInvalid={'blockTrees' in errors}>
            <FormControl.Label>N° de Cajueiros</FormControl.Label>
            <CustomInput
                width="100%"
                keyboardType="numeric"
                textAlign="center"
                placeholder="Cajueiros"
                value={blockTrees?.toString()}
                onChangeText={newNumber=>{
                    setErrors(prev=>({
                        ...prev, 
                        blockTrees: '', 
                        usedArea: '',
                        treeDensity: '',
                    }))
                    setBlockTrees(newNumber);
                }}
            />
                
            {/* {
                'blockTrees' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.blockTrees}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            } */}
        </FormControl>


        <FormControl isRequired my="1" isInvalid={'densityMode' in errors}>
            <FormControl.Label>                
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Regular',
                        color: COLORS.grey,
                        paddingHorizontal: 15,
                    }}
                >Compasso</Text>
            </FormControl.Label>
            <Stack  direction="row" w="100%">
                <Box w="50%" >
                <CheckBox
                        center
                        fontFamily = 'JosefinSans-Bold'
                        containerStyle={{
                            backgroundColor: COLORS.ghostwhite,
                        }}
                        textStyle={{
                            fontWeight: '120',
                            color: isDensityModeRegular ? COLORS.mediumseagreen : COLORS.grey,
                        }}
                        title="Regular"
                        checked={isDensityModeRegular}
                        checkedIcon={
                            <Icon
                                name="check-box"
                                color={COLORS.mediumseagreen}
                                size={30}
                                iconStyle={{ marginRight: 1 }}
                            />
                        }
                        uncheckedIcon={
                            <Icon
                                name="radio-button-unchecked"
                                color={COLORS.grey}
                                size={30}
                                iconStyle={{ marginRight: 1 }}
                            />
                        }
                        onPress={() => {
                            setIsDensityModeRegular(true);
                            setIsDensityModeIrregular(false);
                            setErrors({
                                ...errors,
                                densityMode: '',
                            })

                        }}
                        />
                </Box>
                <Box w="50%">
                    <CheckBox
                        center
                        fontFamily = 'JosefinSans-Bold'
                        containerStyle={{
                            backgroundColor: COLORS.ghostwhite,
                        }}
                        textStyle={{
                            
                            fontWeight: '120',
                            color: isDensityModeIrregular ? COLORS.mediumseagreen : COLORS.grey,
                        }}
                        title="Irregular"
                        checked={isDensityModeIrregular}
                        checkedIcon={
                            <Icon
                                name="check-box"
                                color={COLORS.mediumseagreen}
                                size={30}
                                iconStyle={{ marginRight: 1 }}
                            />
                        }
                        uncheckedIcon={
                            <Icon
                                name="radio-button-unchecked"
                                color={COLORS.grey}
                                size={30}
                                iconStyle={{ marginRight: 1 }}
                            />
                        }
                        onPress={() => {
                            setIsDensityModeIrregular(true);
                            setIsDensityModeRegular(false);    
                            setErrors({
                                ...errors,
                                densityMode: '',
                            });
                            setDensityWidth('');   
                            setDensityLength('');
                
                        }}
                    />
                </Box>
                </Stack>    
                {
                'densityMode' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.densityMode}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

    { isDensityModeRegular  && (
    
    <Stack direction="row" w="100%">
        <Box w="45%" >
            <FormControl my="1" isRequired isInvalid={'density' in errors}>
                <FormControl.Label>Comprimento</FormControl.Label>
                <CustomInput
                    width="100%"
                    textAlign="center"
                    keyboardType="numeric"
                    placeholder="Comprimento"
                    value={densityLength?.toString()}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({
                            ...prev, 
                            density: '',
                            blockTrees: '', 
                            usedArea: '',
                            treeDensity: '',
                        }))
                        setDensityLength(newNumber)
                    }}
                    />
                    
                {
                    'density' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.density}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        <Box w="10%" 
            style={{
                justifyContent: 'center', 
                alignItems: 'center',
                paddingTop: ('density' in errors) ? 10 : 20,
            }}
            >
            <Text 
                style={{ 
                    fontSize: 20,
                }}
            >
                X
            </Text>
        </Box>
        <Box w="45%">
        <FormControl my="1" isRequired isInvalid={'density' in errors}>
            <FormControl.Label>Largura</FormControl.Label>
            <CustomInput
                width="100%"
                keyboardType="numeric"
                textAlign="center"
                placeholder="Largura"
                value={densityWidth?.toString()}
                onChangeText={newNumber=>{
                    setErrors(prev=>({
                        ...prev, 
                        density: '',
                        blockTrees: '', 
                        usedArea: '',
                        treeDensity: '',
                    }))
                    setDensityWidth(newNumber)
                }}
            />
                
            {
                'density' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.density}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl> 
        </Box>
    </Stack>            
)}


<FormControl isRequired my="1" isInvalid={'plantTypes' in errors}>
        <FormControl.Label>Tipo de plantas</FormControl.Label>
        <MultipleSelectList
            setSelected={(type)=>{
                setErrors(prev=>({...prev, plantTypes: ''}));
                setPlantTypes(type)
                // if (type) {
                //     console.log('type:', JSON.stringify(type));
                //     setSameTypeTreesList(prev=>[...prev, {type, trees: ''}])
                // }
            }}
            data={plantingTypes}
            placeholder="Tipo de plantas"
            save="value"
            label="Tipo de plantas"
            arrowicon={
                <Icon 
                    size={45} 
                    name="arrow-drop-down" 
                    color={COLORS.mediumseagreen} 
                    />
                }
                closeicon={
                    <Icon 
                    name="close" 
                    size={20} 
                    color={COLORS.grey}
                    />
            }
            fontFamily='JosefinSans-Regular'
            dropdownTextStyles={{
                fontSize: 18,
            }}
            inputStyles={{
                fontSize: 16,
                color: '#A8A8A8',
            }}
            boxStyles={{
                borderRadius: 4,
                minHeight: 55,
            }}
            />
        {
            'plantTypes' in errors 
        ? <FormControl.ErrorMessage 
        leftIcon={<Icon name="error-outline" size={16} color="red" />}
        _text={{ fontSize: 'xs'}}>{errors?.plantTypes}</FormControl.ErrorMessage> 
        : <FormControl.HelperText></FormControl.HelperText>
        }
    </FormControl>

    
{   plantTypes?.some((el)=>el?.includes('enxert')) 
    && (
        <>
        <FormControl my="1" isRequired isInvalid={'clones' in errors} >
            <FormControl.Label>Clones</FormControl.Label>
            <MultipleSelectList
                setSelected={(type)=>{
                    setErrors(prev=>({...prev, clones: ''}));
                    setClones(type)
                    // if (!type?.includes('enxer')) {
                    // setSameTypeTreesList(prev=>[...prev, {type, trees: ''}])
                    // }
                
                }}
                data={cloneList}
                placeholder="clones"
                save="value"
                label="Clones"
                arrowicon={
                    <Icon 
                        size={45} 
                        name="arrow-drop-down" 
                        color={COLORS.mediumseagreen} 
                    />
                }
                closeicon={
                    <Icon 
                        name="close" 
                        size={20} 
                        color={COLORS.grey} 
                    />
                    }
                    fontFamily='JosefinSans-Regular'
                dropdownTextStyles={{
                    fontSize: 18,
                }}
                inputStyles={{
                    fontSize: 16,
                    color: '#A8A8A8',
                }}
                boxStyles={{
                    borderRadius: 4,
                    minHeight: 55,
                }}
                />
            {
                'clones' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.clones}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }     
        </FormControl>
        <Box w="100%" alignItems={"center"} style={{
            flexDirection: 'row'
        }}>
            <Box w="70%">
                <FormControl  my="1" isInvalid={'addedClone' in errors}>
                    <FormControl.Label>Adiciona novo clone</FormControl.Label>
                    <CustomInput
                        width="100%"
                        type="text"
                        placeholder="Clone não econtrado na lista"
                        value={addedClone}
                        onChangeText={newClone=>{
                            setErrors({
                                ...errors,
                                addedClone: '',
                            })
                            setAddedClone(newClone);
                        }}
                        />
                {   'addedClone' in errors ?
                    <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.addedClone}</FormControl.ErrorMessage> 
                    :
                    <FormControl.HelperText></FormControl.HelperText>
                    }
                </FormControl>
            </Box>
            <Box
                // w="15%"
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    position: 'relative',
                    bottom: -5,
                    left: 0,
                }}
                >
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                        marginTop: 10,
                        padding: 5,
                        borderRadius: 100,
                        backgroundColor: COLORS.mediumseagreen,
                        borderColor: COLORS.mediumseagreen,
                        borderWidth: 1,
                    }}


                    onPress={()=>{
                        if (addedClone){
                            // let updatedCloneList = [...allClones].unshift(addedClone)
                            // setAllClones(updatedCloneList);
                            setClones(prev=>[...prev, addedClone]);

                            setAddedClone('');
                        }
                        else{
                            setErrors({
                                ...errors,
                                addedClone: 'Indica novo clone'
                            });
                        }
                    }}
                >
                    <Icon name="arrow-downward" size={35} color={COLORS.ghostwhite} />
                </TouchableOpacity>
            </Box>
            <Box w="15%">

            </Box>

        </Box>

        </>
    )        
    }

    
{  (plantTypes.length > 0 && sameTypeTreesList.length > 0) &&
    <Box w="100%" mt="5"
        style={{     }}
    >
        <Box 
            w="100%"
            px="5"
            style={{
                backgroundColor: COLORS.mediumseagreen,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 2, 
                borderColor: COLORS.mediumseagreen,

            }}
        >
            <Stack direction="row" space={2} mb="1">
                <Box w="65%">
                    <Text
                        style={{
                            color: COLORS.ghostwhite,
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',
                        }}
                    >
                        Tipos de plantas
                    </Text>
                </Box>
                <Box w="35%">
                    <Text
                        style={{
                            color: COLORS.ghostwhite,
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',
                        }}
                    >
                        Cajueiros
                    </Text>
                </Box>
            </Stack>
        </Box>

    {
        (errors?.sameTypeTrees) && 
            <Box style={{
                    flexDirection: 'row',
                }}>
                    <Icon name="error-outline" size={26} color="red" />
                    <Text
                    style={{
                        color: COLORS.red,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        paddingLeft: 5, 
                    }}
                >
                    {errors?.sameTypeTrees}
                </Text>
            </Box>
    }

    { sameTypeTreesList?.map((sameTypeTree, index)=>(
        <Box w="100%" key={index} px="5" my="2"
            style={{
                borderColor: COLORS.lightgrey,
                borderWidth: 2,
            }}
        >
            <Stack direction="row" w="100%" space={2} mt="1">
                <Box w="65%"
                    style={{ 
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'JosefinSans-Regular',
                            color: COLORS.grey,
                        }}
                    >
                        {sameTypeTree?.treeType}
                    </Text>
                </Box>
                <Box w="35%">
                    <CustomInput
                        width="100%"
                        textAlign="center"
                        keyboardType="numeric"
                        placeholder="Cajueiros"
                        value={sameTypeTree?.trees?.toString()}
                        onChangeText={newTrees=>{
                            setErrors(prev=>({...prev, sameTypeTrees: ''}));
                            setSameTypeTreesList(sameTypeTreesList.map((object)=>{
                                if (object?.treeType === sameTypeTree?.treeType){
                                    object.trees = newTrees;
                                }
                                return object;
                            }));

                        }}
                    />
                </Box>
            </Stack>
        </Box>
        ))}
    </Box>
    }

     </Stack>
    }



    {/* update the farmland main data */}

    {
        (dataToBeUpdated === 'farmlandMainData' && resourceName === 'Farmland' && blockId === '') &&
        <Stack direction="column">

        {
            (errors?.areaInconsistencies || errors?.treesInconsistencies) &&
            <Box
                style={{
                    backgroundColor: COLORS.danger,
                }}
            >
            {
                errors?.areaInconsistencies && <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.areaInconsistencies}</Text>       
            }
            {
                errors?.treesInconsistencies && <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.treesInconsistencies}</Text>       
            }
            </Box>
        } 

        <FormControl isRequired my="1" isInvalid={'description' in errors}>
                <FormControl.Label>Localização do Pomar</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    placeholder="Descrição da localização"
                    value={description}
                    onChangeText={newDescription=>{
                        setErrors(prev=>({
                            ...prev, 
                            consociatedCrops: '',
                            totalArea: '',
                            trees: '',
                            description: '',
                        
                        }))
                        setDescription(newDescription)
                    }}
                    />
                {
                'description' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.description}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <FormControl my="1" isRequired isInvalid={'consociatedCrops' in errors}>
                <FormControl.Label>Culturas consociadas</FormControl.Label>
                <MultipleSelectList
                    setSelected={(crop)=>{
                        setErrors(prev=>({
                            ...prev, 
                            consociatedCrops: '',
                            totalArea: '',
                            trees: '',
                            description: '',
                        }));
                        setConsociatedCrops(crop);
                    }}
                    data={crops}
                    save="value"
                    arrowicon={
                        <Icon 
                        size={45} 
                        name="arrow-drop-down" 
                        color={COLORS.main} 
                        />
                    }
                    closeicon={
                        <Icon 
                        name="close" 
                        size={20} 
                        color={COLORS.grey}
                        />
                    }
                    fontFamily='JosefinSans-Regular'
                    dropdownTextStyles={{
                        fontSize: 18,
                    }}
                    inputStyles={{
                        fontSize: 16,
                        color: '#A8A8A8',
                    }}
                    boxStyles={{
                        borderRadius: 4,
                        minHeight: 55,
                    }}
                    label="Culturas"
                    placeholder="Culturas consociadas"
                />
                {
                'consociatedCrops' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={14} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.consociatedCrops}</FormControl.ErrorMessage> 
                : 
                <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <FormControl isRequired my="2" isInvalid={'totalArea' in errors}>
                <FormControl.Label>Área Total Declarada</FormControl.Label>
                <CustomInput
                    width="100%"
                    keyboardType="numeric"
                    textAlign="center"
                    placeholder="Hectares"
                    value={totalArea?.toString()}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({
                            ...prev, 
                            consociatedCrops: '',
                            totalArea: '',
                            trees: '',
                            description: '',
                            areaInconsistencies: '',
                        }))
                        setTotalArea(newNumber)
                    }}
                />
                    
                {
                    'totalArea' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.totalArea}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <FormControl isRequired my="2" isInvalid={'trees' in errors}>
            <FormControl.Label>N° Total de Cajueiros</FormControl.Label>
            <CustomInput
                width="100%"
                keyboardType="numeric"
                textAlign="center"
                placeholder="Cajueiros"
                value={trees?.toString()}
                onChangeText={newNumber=>{
                    setErrors(prev=>({
                        ...prev, 
                        consociatedCrops: '',
                        totalArea: '',
                        trees: '',
                        description: '',
                        treesInconsistencies: '',
                    }))
                    setTrees(newNumber)
                }}
            />
                
            {
                'trees' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.trees}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>

        </Stack>

    }






        <Button
            title="Confirmar Dados"
            titleStyle={{
                color: COLORS.ghostwhite,
                fontFamily: 'JosefinSans-Bold',
            }}
            iconPosition="right"

            containerStyle={{
                backgroundColor: COLORS.second,
                borderRadius: 10,
            }}
            type="outline"
            onPress={()=>{
                if(dataToBeUpdated === 'farmlandMaiData' && !validateFarmlandEditedData({
                    description, consociatedCrops, totalArea,
                    trees, oldDescription, oldConsociatedCrops,
                    oldTotalArea, oldTrees,
                    blocks,
                }, errors, setErrors, dataToBeUpdated, resourceName)) {
                    return ;
                }

                if (dataToBeUpdated === 'blockData' && !validateEditedBlockData({
                    plantingYear, blockTrees, usedArea,
                    isDensityModeIrregular, isDensityModeRegular, densityLength,
                    densityWidth, plantTypes, clones, sameTypeTreesList, 
                    remainingArea,
                }, errors, setErrors)) {
                    return ;
                }

                onConfirmUpdate(dataToBeUpdated, resourceName);
                setIsOverlayVisible(false);
                setIsEditBlockVisible(false);
                setIsConfirmDataVisible(true);

            }}
        />
        </ScrollView>

        </View>

    </Overlay>

    )
}


    
export default EditFarmlandData;