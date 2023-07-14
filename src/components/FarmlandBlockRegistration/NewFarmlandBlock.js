import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio  } from 'native-base';
import { MultipleSelectList, SelectList  } from 'react-native-dropdown-select-list';
import {  
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol } 
        from 'react-native-responsive-screen';
  
  import { 
    responsiveFontSize,
    responsiveScreenFontSize,
    responsiveHeight,
    responsiveWidth,
    responsiveScreenHeight,
    responsiveScreenWidth,
    useDimensionsChange,
  
  } from 'react-native-responsive-dimensions';

import { Overlay, Icon, Button, CheckBox } from "@rneui/base";
import COLORS from "../../consts/colors";
import { getFullYears, getFullYears2 } from "../../helpers/dates";
import { plantingTypes } from "../../consts/plantingTypes";
import cloneList from "../../consts/clones";
import { CustomInput } from "../Inputs/CustomInput";

import { v4 as uuidv4 } from 'uuid';

import { TouchableOpacity } from "react-native";
import validateBlockData from "../../helpers/validateBlockData";
import AwesomeAlert from "react-native-awesome-alerts";
import { errorMessages } from "../../consts/errorMessages";

import { useUser } from "@realm/react";
import { realmContext } from '../../models/realmContext';
import { resourceValidation } from "../../consts/resourceValidation";
import DangerAlert from "../LottieComponents/DangerAlert";
const {useRealm, useQuery, useObject} = realmContext;


export default function NewFarmlandBlock({ 

    isNewBlockVisible,
    setIsNewBlockVisible,
    farmland,
    setAutoRefresh,
    autoRefresh,
    
}){

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;
    const [addedClone, setAddedClone] = useState('');
  
    const [addBlockIsOn, setAddBlockIsOn] = useState(false);

    // ------------------------------------------
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    const [errors, setErrors] = useState({});
    
    // ---------------------------------------------

    const [remainingArea, setRemainingArea] = useState();

    const [plantingYear, setPlantingYear] = useState('');

    const [usedArea, setUsedArea] = useState('');
    const [blockTrees, setBlockTrees] = useState('');
    const [densityWidth, setDensityWidth] = useState('');
    const [densityLength, setDensityLength] = useState('');
    const [plantTypes, setPlantTypes] = useState([]);
    const [clones, setClones] = useState([]);
    const [isDensityModeIrregular, setIsDensityModeIrregular] = useState(false);
    const [isDensityModeRegular, setIsDensityModeRegular] = useState(false);
    const [sameTypeTreesList, setSameTypeTreesList] = useState([]);
    
    // ----------------------------------------------
   
    const toggleOverlay = () => {
        setIsNewBlockVisible(!isNewBlockVisible);
    };


    const addBlockData = ( )=>{

        let blockData = {
            plantingYear, 
            usedArea, 
            densityWidth,
            densityLength,
            blockTrees,
            plantTypes,
            clones,
            isDensityModeIrregular,
            isDensityModeRegular,
            sameTypeTreesList,
            remainingArea,
        }

        // if any required data is not validated
        // a alert message is sent to the user   
        if (!validateBlockData(blockData, errors, setErrors)) {

            setAlert(true);

            setTitleAlert(errorMessages.farmlandError.title);
            setMessageAlert(errorMessages.farmlandError.message);
            setShowCancelButton(errorMessages.farmlandError.showCancelButton);
            setShowConfirmButton(errorMessages.farmlandError.showConfirmButton);
            setCancelText(errorMessages.farmlandError.cancelText);
            setConfirmText(errorMessages.farmlandError.confirmText);
            
            return;
        }

        // created the validated data object to be passed to the FarmlandModal component
        let retrievedBlockData = validateBlockData(blockData, errors, setErrors);

        const block = {
            _id: uuidv4(),
            plantingYear: retrievedBlockData?.plantingYear,
            density:  retrievedBlockData?.density,
            trees: retrievedBlockData?.trees,
            usedArea: retrievedBlockData?.usedArea,
            sameTypeTrees: retrievedBlockData?.sameTypeTrees,
            plantTypes: retrievedBlockData?.plantTypes,
            userName: customUserData?.name,
            createdAt: new Date(),
            modifiedAt: new Date(),
        };
      
        onAddBlock(block, farmland, realm);

        setIsNewBlockVisible(false);
    }


    const onAddBlock = useCallback((block, farmland, realm) =>{

        // update the sum of the blocks trees
        let blocksTrees = farmland?.blocks?.map(block=>block?.trees).reduce((acc, el)=>acc + el, 0);
        blocksTrees = block?.trees + blocksTrees;
        let updatedTotalTrees;
        if (farmland?.trees < blocksTrees) {
            // update only if the number of the block trees are greater that the total's
            updatedTotalTrees = farmland?.trees + (blocksTrees - farmland?.trees);
        }
        else {
            updatedTotalTrees = farmland?.trees;
        }

        realm.write(()=>{
            farmland?.blocks?.push(block);

            // only update the resource status to 'pending' only when blocksTrees == updatedTotalTrees
            if ((blocksTrees === updatedTotalTrees)){
                farmland.status = resourceValidation.status.pending;
            }
            farmland.trees = updatedTotalTrees;
        });

        setAutoRefresh(!autoRefresh);

    }, [realm, farmland ]);


    useEffect(()=>{

        // save the block if everything is fine
        if (addBlockIsOn){
            // add the block
            addBlockData();
            setAddBlockIsOn(false);
        }

        // find out the remaing area
        if (isNewBlockVisible) {
            const totalArea = farmland?.totalArea;
            const blocksAreas = farmland?.blocks?.map(block=>block?.usedArea)?.reduce((acc, el)=> acc + el, 0);
            const remainingArea = totalArea - blocksAreas;
            setRemainingArea(remainingArea);
        }

    }, [ 
        addBlockIsOn,
        isNewBlockVisible, 
        farmland,
    ]);



    useEffect(()=>{

        let selectedClones = [];
        let mergedSameTypeTrees = [];
        const filteredPlantTypes = plantTypes.filter(plantType=>!plantType.includes('enxer'));
        if (plantTypes.filter(plantType=>plantType.includes('enxer')).length > 0){
            selectedClones = clones?.filter(clone => clone !== 'Outro')?.map(clone=>`Clone: ${clone}`);
            mergedSameTypeTrees = filteredPlantTypes.concat(selectedClones);
        }
        else{
            mergedSameTypeTrees = filteredPlantTypes;
            if(clones?.length > 0){
                setClones([]);
            }
        }
        let normalizedSameTypeTrees = mergedSameTypeTrees?.map((treeType)=>({
            treeType,
            trees: '',
        }));
        setSameTypeTreesList(normalizedSameTypeTrees);

    }, [ clones, plantTypes]);


 return (
  <Overlay 
  overlayStyle={{ 
      backgroundColor: COLORS.ghostwhite, 
      width: '95%',
      maxHeight: '95%',
      minHeight: '40%',
      borderRadius: 10,
      paddingBottom: 5,
  }}
    isVisible={isNewBlockVisible} 
    onBackdropPress={()=>{
        setIsNewBlockVisible(false);
    }}
>
    {
    remainingArea <= 0.1 &&
    <View
    style={{ 
        width: '100%', 
    }}
    >
        {/* <View
            style={{
                position: 'absolute',
                top: -20,
                left: -20,
            }}
        >
            <DangerAlert />
        </View> */}
        <View
            style={{ 
                width: '100%', 
                flexDirection: 'row',
            }}
        >
            <Box w="90%">
                <Text
                    style={{ 
                        textAlign: 'center',
                        color: COLORS.black,
                        fontSize: responsiveFontSize(2),
                        fontFamily: 'JosefinSans-Bold',
                    }}
                >
                    Insuficiência da área
                </Text>
            </Box>
            <Box w="10%">
                <TouchableOpacity 
                    onPress={()=>{
                        setIsNewBlockVisible(false);
                    }}
                >
                <Icon name="close" color={COLORS.grey} size={25} />
                </TouchableOpacity>
            </Box>
        </View>

        {/* <View
            style={{
                // minHeight: '40%',
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 2,
                // paddingBottom: 50,
                // borderWidth: 1,
            }}
        >
                <Box w="55%" px="1" 
                    style={{
                        position: 'absolute',
                        top: 0,
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
                        {farmland?.blocks?.length} blocos;             
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: false ? COLORS.red : COLORS.mediumseagreen,
                            fontFamily: 'JosefinSans-Regular',
                            textAlign: 'right',
                        }}
                    >
                        {farmland.trees} árvores;
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: false ? COLORS.red : COLORS.mediumseagreen,
                            fontFamily: 'JosefinSans-Regular',
                            textAlign: 'right',
                        }}
                    >
                        {remainingArea?.toFixed(1)} hectares disponíveis.
                    </Text>
                </Box>  
                <Box
                    style={{
                        // borderWidth: 1,
                    }}
                >

                </Box>
        </View> */}

        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
                paddingTop: 50,
            }}
        >
            <Text
                style={{
                    color: COLORS.grey,
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Regular',
                    textAlign: 'center',
                    lineHeight: 20,
                }}
            >
                Este pomar não tem área suficiente para uma nova parcela de cajueiros.
            </Text>
 
        </View>

        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
                paddingTop: 15,
            }}
        >
            <Text
                style={{
                    color: COLORS.red,
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Regular',
                    textAlign: 'center',
                    lineHeight: 25,
                    // height: '30%',
                }}
            >
                ({remainingArea?.toFixed(1)} hectares disponíveis) 
            </Text>
        </View>

        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 30,
            }}
        >
            <TouchableOpacity
                onPress={()=>{
                    setIsNewBlockVisible(false);
                }}
            >
                <View
                    style={{
                        // borderWidth: 3,
                        // borderRadius: 100,
                        paddingHorizontal: 15,
                        paddingVertical: 4,
                        // borderColor: COLORS.mediumseagreen,
                        flexDirection: 'row',
                    }}
                >
                    <Icon name="arrow-back" size={25} color={COLORS.mediumseagreen}  />

                    <Text
                        style={{
                            color: COLORS.mediumseagreen,
                            fontSize: 15,
                            fontFamily: 'JosefinSans-Bold',
                        }}
                    >Voltar</Text>
                </View>

            </TouchableOpacity>
        </View>
    </View>   
    }

    { remainingArea > 0.1 &&
    <>
    
        <AwesomeAlert
            show={alert}
            
            titleStyle={{
                fontSize: 20,
                paddingVertical: 10,
                // color: COLORS.ghostwhite,
                fontWeight: 'bold',
                marginBottom: 20,
                // backgroundColor: COLORS.mediumseagreen,
                width: '100%',
                textAlign: 'center',

            }}
            messageStyle={{
                fontSize: 18,
                color: COLORS.grey,
                fontFamily: 'JosefinSans-Regular',
                lineHeight: 25,
                textAlign: 'center',
            }}

            alertContainerStyle	={{
                // width: 300,
                }}

            overlayStyle={{
                // width: 100,

            }}

            contentContainerStyle={{
                width: '90%',
                minHeight: '30%',
            }}

            contentStyle={{
                // flex: 1,
                paddingVertical: 1,
            }}

            cancelButtonStyle={{
                width: 120,
                marginRight: 15,
                }}
        
                cancelButtonTextStyle={{
                    fontSize: 18,
                    textAlign: 'center',
                //   fontWeight: 'bold',
                    fontFamily: 'JosefinSans-Bold',
                }}
        
                confirmButtonStyle={{
                width: 120,
                marginLeft: 15,
                }}
        
                confirmButtonTextStyle={{
                fontSize: 18,
                textAlign: 'center',
                //   fontWeight: 'bold',
                fontFamily: 'JosefinSans-Bold',
                }}

                showProgress={false}
                title={titleAlert}
                message={messageAlert}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={showCancelButton}
                showConfirmButton={showConfirmButton}
                cancelText={cancelText}
                confirmText={confirmText}
                cancelButtonColor="#DD6B55"
                confirmButtonColor={COLORS.danger}
                onCancelPressed={()=>{
                    setAlert(false);
                }}
                onConfirmPressed={() => {
                    setAlert(false);
                }}
            />




    <View
        style={{ 
            width: '100%', 
            marginBottom: 10, 
            flexDirection: 'row',
        }}
    >
        <Box w="90%">

            {/* { remainingArea > 0.1 &&  */}
            <Text
                style={{ 
                    textAlign: 'center',
                    color: COLORS.black,
                    fontSize: responsiveFontSize(2),
                    fontFamily: 'JosefinSans-Bold',

                }}
            >
                Parcela {farmland?.blocks?.length + 1}
            </Text>

        </Box>
        <Box w="10%">
            <TouchableOpacity 
                onPress={()=>{
                    setIsNewBlockVisible(false);
                }}
            >
            <Icon name="close" color={COLORS.grey} size={25} />
            </TouchableOpacity>
        </Box>

    </View>

        <ScrollView
            decelerationRate={'normal'}
            fadingEdgeLength={2}
            keyboardDismissMode = 'on-drag'
            keyboardShouldPersistTaps = 'handled'
            style={{

            }}
        >
            <View
                style={{
                    minHeight: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 2,
                    paddingBottom: 50,
                }}
            >
                <Box w="55%" px="1" 
                    style={{
                        position: 'absolute',
                        top: 0,
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
                        {farmland?.blocks?.length} {farmland?.blocks?.length <= 1 ? 'parcela': 'parcelas'}             
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: false ? COLORS.red : COLORS.mediumseagreen,
                            fontFamily: 'JosefinSans-Regular',
                            textAlign: 'right',
                        }}
                    >
                        {farmland.trees} árvores;
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: false ? COLORS.red : COLORS.mediumseagreen,
                            fontFamily: 'JosefinSans-Regular',
                            textAlign: 'right',
                        }}
                    >
                        {remainingArea?.toFixed(1)} hectares disponíveis.
                    </Text>
                </Box>  

    {/* show this only there is no more area for more cashew trees blocks */}
    {/* {
        remainingArea <= 0.1 &&  */}
        {/* <Box 
            style={{
                // height: '100%',
                flex: 1,
                justifyContent: 'center',
                width: '100%',
                borderWidth: 1,
            }}
        >
            <Text
            
            >
                Este pomar nao tem area suficiente para 
            </Text>

        </Box> */}
    {/* } */}


    {/* Show this only there is enough area for a new cashew trees block */}
    {/* {
        remainingArea > 0.1 && */}
        <>
        <Stack direction="row" mx="3" w="100%">
                <Box w="45%" px="1">
                    <FormControl isRequired my="1" isInvalid={'plantingYear' in errors}>
                        <FormControl.Label>Ano de plantio</FormControl.Label>
                            <SelectList
                            data={getFullYears2}
                            setSelected={newYear => {
                                setErrors((prev)=>({...prev, plantingYear: ''}));
                                setPlantingYear(newYear);
                            }}
                            save="value"
                            placeholder='Escolher ano'
                            searchPlaceholder='Procurar ano'
                            maxHeight={400}
                            fontFamily='JosefinSans-Regular'
                            notFoundText='Ano não encontrado'
                            dropdownTextStyles={{
                                fontSize: 16,
                                color: COLORS.black,
                                padding: 5,
                            }}
                            arrowicon={
                                <Icon 
                                // size={35} 
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
                            inputStyles={{
                                fontSize: 15,
                                color: plantingYear ? COLORS.black : COLORS.grey,
                            }}
                            boxStyles={{
                                minHeight: 55,
                                borderRadius: 5,
                                borderColor: COLORS.lightgrey,
                                marginTop: 5,
                            }}

                        />


                            {/* <Select
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
                                            size={20} 
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
                            </Select> */}
                        {
                            'plantingYear' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.plantingYear}</FormControl.ErrorMessage> 
                        : <FormControl.HelperText></FormControl.HelperText>
                        }
                    </FormControl>

                </Box>
                <Box w="10%">
                    
                </Box>
        
            </Stack>   


                <Box
                    style={{

                    }}
                >
                <Stack direction="row" w="100%" space={2}>
                    <Box w="48%">
                    <FormControl isRequired my="2" isInvalid={'usedArea' in errors}>
                        <FormControl.Label>Área Aproveitada</FormControl.Label>
                        <CustomInput
                            width="100%"
                            keyboardType="numeric"
                            textAlign="center"
                            placeholder="Hectares"
                            value={usedArea}
                            onChangeText={newNumber=>{
                                setErrors(prev=>({
                                    ...prev, 
                                    blockTrees: null, 
                                    usedArea: null,
                                    treeDensity: null,
                                }))
                                setUsedArea(newNumber)
                            }}
                        />
                            
                        {/* {
                            'usedArea' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.usedArea}</FormControl.ErrorMessage> 
                        : <FormControl.HelperText><Text></Text></FormControl.HelperText>
                        } */}
                    </FormControl>
                    </Box>

                <Box w="48%"
                    style={{
                        justifyContent: 'flex-end'
                    }}
                >
                <FormControl isRequired my="2" isInvalid={'blockTrees' in errors}>
                    <FormControl.Label>N° de Cajueiros</FormControl.Label>
                    <CustomInput
                        width="100%"
                        keyboardType="numeric"
                        textAlign="center"
                        placeholder="Cajueiros"
                        value={blockTrees}
                        onChangeText={newNumber=>{
                            setErrors(prev=>({
                                ...prev, 
                                blockTrees: null, 
                                usedArea: null,
                                treeDensity: null,
                            }))
                            setBlockTrees(newNumber);

                        }}
                    />
                        
                    {/* {
                        'blockTrees' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.blockTrees}</FormControl.ErrorMessage> 
                        : <FormControl.HelperText><Text></Text></FormControl.HelperText>
                    } */}
                    </FormControl>
                    </Box>
                </Stack> 
                {
                    (errors?.blockTrees && errors?.usedArea) &&
                    <Box
                        style={{
                            backgroundColor: COLORS.danger,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.usedArea}</Text>       
                        <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.blockTrees}</Text>       
                        <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.treeDensity}</Text>        
                    </Box>
                } 

                {
                    (errors?.blockTrees && !errors?.usedArea) &&
                    <Box
                    //     style={{
                    //         backgroundColor: COLORS.danger,
                    //         marginTop: -30,
                    //     }}
                    >
                        {/* <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.usedArea}</Text>        */}
                        <Text style={{ fontSize: 14, color: COLORS.red, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.red} /> {errors?.blockTrees}</Text>       
                        {/* <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.treeDensity}</Text>         */}
                    </Box>
                } 

                {
                    (!errors?.blockTrees && errors?.usedArea) &&
                    <Box
                    //     style={{
                    //         backgroundColor: COLORS.danger,
                    //         marginTop: -30,
                    //     }}
                    >
                        <Text style={{ fontSize: 14, color: COLORS.red, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.red} /> {errors?.usedArea}</Text>       
                        {/* <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.blockTrees}</Text>        */}
                        {/* <Text style={{ fontSize: 14, color: COLORS.ghostwhite, padding: 6, }}> <Icon name="error-outline" size={20} color={COLORS.ghostwhite} /> {errors?.treeDensity}</Text>         */}
                    </Box>
                } 
                </Box>

                <Box w="100%"
                            style={{ marginTop: (errors?.usedArea && errors?.blockTrees) ? 0 : 0}}
                >
                <FormControl isRequired my="1" isInvalid={'densityMode' in errors}>
                    <FormControl.Label>                
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'JosefinSans-Regular',
                                color: COLORS.grey,
                                paddingLeft: 15,
                            }}
                        >
                            Compasso
                        </Text>
                    </FormControl.Label>
                <Stack  direction="row" mx="3" w="100%">
                <Box w="50%" px="1">
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
                <Box w="50%" px="1">
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

            </Box>




            { isDensityModeRegular  && (
            
            <Stack direction="row" mx="3" w="100%">
                <Box w="45%" px="1">
                    <FormControl my="1" isRequired isInvalid={'density' in errors}>
                        <FormControl.Label>Comprimento</FormControl.Label>
                        <CustomInput
                            width="100%"
                            textAlign="center"
                            keyboardType="numeric"
                            placeholder="Comprimento"
                            value={densityLength}
                            onChangeText={newNumber=>{
                                setErrors(prev=>({
                                    ...prev, 
                                    density: '',
                                    blockTrees: null, 
                                    usedArea: null,
                                    treeDensity: null,
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
                <Box w="45%" px="1">
                <FormControl my="1" isRequired isInvalid={'density' in errors}>
                    <FormControl.Label>Largura</FormControl.Label>
                    <CustomInput
                        width="100%"
                        keyboardType="numeric"
                        textAlign="center"
                        placeholder="Largura"
                        value={densityWidth}
                        onChangeText={newNumber=>{
                            setErrors(prev=>({
                                ...prev, 
                                density: '',
                                blockTrees: null, 
                                usedArea: null,
                                treeDensity: null,
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
                        setPlantTypes(type)}
                    }
                    data={plantingTypes}
                    notFoundText={'Tipo de planta não encontrado'}
                    placeholder="Tipo de plantas"
                    searchPlaceholder='Seleccionar tipo de plantas'
                    save="value"
                    label="Tipo de plantas"
                    badgeStyles={{
                        backgroundColor: COLORS.mediumseagreen,                        
                    }}
                    badgeTextStyles={{
                        fontSize: 16
                    }}
                    arrowicon={
                        <Icon 
                            // size={45} 
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
                        fontSize: 16,
                        color: COLORS.black,
                        padding: 5,
                    }}
                    inputStyles={{
                        fontSize: 16,
                        color: '#A8A8A8',
                    }}
                    boxStyles={{
                        minHeight: 55,
                        borderRadius: 5,
                        borderColor: COLORS.lightgrey,
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
                            setClones(type)}
                        }
                        data={cloneList}
                        notFoundText={'Clone não encontrado'}
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

{ clones?.find(clone => clone === "Outro") &&
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
        }

                </>
            )        
            }

        {  (plantTypes.length > 0 && sameTypeTreesList.length > 0) &&
            <Box 
                w="100%" 
                my="5"
                style={{      }}
            >

                {
                    (errors?.sameTypeTrees) && <Box style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                        }}>
                            <Icon name="error-outline" size={26} color="red" />
                            <Text
                            style={{
                                color: COLORS.red,
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                                paddingLeft: 5, 
                                marginLeft: 5,
                            }}
                        >{errors?.sameTypeTrees}</Text>
                        </Box>
                }
                    <Box 
                        w="100%"
                        mb="2"
                        style={{
                            // backgroundColor: COLORS.mediumseagreen,
                            // borderTopLeftRadius: 20,
                            // borderTopRightRadius: 20,
                            // borderWidth: 2, 
                            // borderColor: COLORS.mediumseagreen,
            
                        }}
                    >


                    <Stack direction="row" space={2} >
                        <Box w="65%">
                            <Text
                                style={{
                                    color: COLORS.mediumseagreen,
                                    fontSize: 16,
                                    fontFamily: 'JosefinSans-Bold',
                                }}
                            >Tipos de plantas</Text>
                        </Box>
                        <Box w="35%">
                            <Text
                                style={{
                                    color: COLORS.mediumseagreen,
                                    fontSize: 16,
                                    fontFamily: 'JosefinSans-Bold',
                                }}
                            >Cajueiros</Text>
                        </Box>

                    </Stack>
                </Box>


                { sameTypeTreesList?.map((sameTypeTree, index)=>(
                        <Box 
                            w="100%" 
                            key={index} 
                            // px="5" 
                            mb="1"
                            style={{
                                // borderColor: COLORS.lightgrey,
                                // borderWidth: 2,
                            }}
                        >
                            <Stack 
                                direction="row" 
                                w="100%" 
                                space={2} 
                                // mt="1"
                            >
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
                                        <Icon name="arrow-forward" color={COLORS.grey} size={10} /> {sameTypeTree?.treeType}
                                    </Text>
                                </Box>
                                <Box w="35%">
                                    <CustomInput
                                        width="90%"
                                        textAlign="center"
                                        keyboardType="numeric"
                                        placeholder="Cajueiros"
                                        value={sameTypeTree?.trees}
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
                    ))
                }
            </Box>
        }
    </>
    {/* } */}

        </View>

    <Button
        title="Salvar Parcela"
        titleStyle={{
            color: COLORS.ghostwhite,
            fontFamily: 'JosefinSans-Bold',
        }}
        iconPosition="right"

        containerStyle={{
            backgroundColor: COLORS.mediumseagreen,
            borderRadius: 10,

        }}
        type="outline"
        onPress={()=>{
            setAddBlockIsOn(true); 

        }}
    />
    </ScrollView>
    </>
}

</Overlay>

 )
}