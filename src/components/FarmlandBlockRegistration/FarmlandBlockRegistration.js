import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio  } from 'native-base';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';

import { Overlay, Icon, Button, CheckBox } from "@rneui/base";
import COLORS from "../../consts/colors";
import { getFullYears } from "../../helpers/dates";
import { plantingTypes } from "../../consts/plantingTypes";
import cloneList from "../../consts/clones";
import { CustomInput } from "../Inputs/CustomInput";

import { v4 as uuidv4 } from 'uuid';

// import { useUser } from '@realm/react';

import { realmContext } from '../../models/realmContext';
const {useRealm, useQuery, useObject} = realmContext;


export default function FarmlandBlockRegistration({ 
    // farmland, setFarmland, 
    customUserData, 
    farmlandId,
    isOverlayVisible, setIsOverlayVisible, errors, setErrors,
    plantingYear, setPlantingYear, blockTrees, setBlockTrees,
    usedArea, setUsedArea, plantTypes, setPlantTypes,
    clones, setClones, densityLength, setDensityLength,
    densityWidth, setDensityWidth,
    isDensityModeIrregular, isDensityModeRegular, setIsDensityModeIrregular,
    setIsDensityModeRegular,

    visualizeBlockData,
}){

    const realm = useRealm();
    const foundFarmland = realm.objectForPrimaryKey('Farmland', farmlandId);


 const toggleOverlay = () => {
  setIsOverlayVisible(!isOverlayVisible);
};


 return (
  <Overlay 
  overlayStyle={{ 
      backgroundColor: 'ghostwhite', 
      width: '95%',
      maxHeight: '95%',
      borderRadius: 10,
      paddingBottom: 5,
  }}
  isVisible={isOverlayVisible} 
  onBackdropPress={toggleOverlay}
>
  <View
      style={{ 
          width: '100%', 
          backgroundColor: COLORS.mediumseagreen,
          marginBottom: 10, 
      }}
  >
      <Text
          style={{ 
              textAlign: 'center',
              color: COLORS.ghostwhite,
              fontSize: 24,
              fontFamily: 'JosefinSans-Bold',

          }}
      >Bloco {foundFarmland?.blocks?.length + 1}</Text>

  </View>

    <ScrollView
        style={{

        }}
    >
        <View
            style={{
                minHeight: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 50,
            }}
        >
            <Stack direction="row" mx="3" w="100%">
                <Box w="45%" px="1">

                </Box>
                <Box w="10%">
                    
                </Box>
                <Box w="45%" px="1">
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
                        setErrors(prev=>({...prev, usedArea: ''}))
                        setUsedArea(newNumber)
                    }}
                />
                    
                {
                    'usedArea' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.usedArea}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
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
                    setErrors(prev=>({...prev, blockTrees: ''}))
                    setBlockTrees(newNumber)
                }}
            />
                
            {
                'blockTrees' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.blockTrees}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
            </Box>
        </Stack>  
        </Box>


        <FormControl isRequired my="1" isInvalid={'plantTypes' in errors}>
            <FormControl.Label>Tipo de plantas</FormControl.Label>
            <MultipleSelectList
                setSelected={(type)=>{
                    setErrors(prev=>({...prev, plantTypes: ''}))
                    setPlantTypes(type)}
                }
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

        <FormControl my="1" isRequired isInvalid={'clones' in errors} >
            <FormControl.Label>Clones</FormControl.Label>
            <MultipleSelectList
                setSelected={(type)=>{
                    setErrors(prev=>({...prev, clones: ''}))
                    setClones(type)}
                }
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
    )        
    }

    <Box w="100%">
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
                    })    
        
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
                        setErrors(prev=>({...prev, density: ''}))
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
                    setErrors(prev=>({...prev, density: ''}))
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



    </View>
  <Button
      title="Salvar Bloco"
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

        visualizeBlockData();

    }}
  />
</ScrollView>
</Overlay>

 )
}