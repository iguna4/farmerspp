/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { Icon, Button, CheckBox } from '@rneui/themed';
import { Datepicker  } from '@ui-kitten/components';

import { CustomInput } from '../../components/Inputs/CustomInput';
import administrativePosts from '../../fakedata/administrativePosts';
import provinces from '../../fakedata/provinces';
import districts from '../../fakedata/districts';
import villages from '../../fakedata/villages';
import CustomDivider from '../../components/Divider/CustomDivider';
import styles from './styles';
import IndividualModal from '../../components/Modals/IndividualModal'
// import FarmerDataConfirmModal from '../../components/Modals/FarmerDataConfirmModal';
// import FarmerAddDataModal from '../../components/Modals/FarmerAddDataModal';
import { fullYears, getFullYears, localeDateService, useDatepickerState } from '../../helpers/dates';
// import validateFarmerData from '../../helpers/validateFarmerData';
import countries from '../../fakedata/countries';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { groups, institutions } from '../../fakedata/farmerTypes';
import validateIndividualFarmerData from '../../helpers/validateIndividualFarmerData';
import validateInstitutionFarmerData from '../../helpers/validateInstitutionFarmerData';
import validateGroupFarmerData from '../../helpers/validateGroupFarmerData';
import TickComponent from '../../components/LottieComponents/TickComponent';
import GroupModal from '../../components/Modals/GroupModal';
import InstitutionModal from '../../components/Modals/InstitutionModal';
import ErrorAlert from '../../components/Alerts/ErrorAlert';


import { realmContext } from '../../models/realm';
import { generateUFID } from '../../helpers/generateUFID';
import DuplicatesAlert from '../../components/Alerts/DuplicatesAlert';
import { detectDuplicates } from '../../helpers/detectDuplicates';
import FarmerTypeRadioButtons from '../../components/RadioButton/FarmerTypeRadioButtons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
const {useRealm} = realmContext;



export default function IndividualFarmerForm({ 
    route, navigation,
    gender, setGender, familySize, setFamilySize, selectedAddressAdminPosts, setSelectedAddressAdminPosts,
    addressVillage, setAddressVillage, addressAdminPost, setAddressAdminPost,
    birthProvince, setBirthProvince, birthDistrict, setBirthDistrict, birthAdminPost, setBirthAdminPost,
    birthDate, setBirthDate, errorAlert, setErrorAlert, 
    setModalVisible, setDuplicatesAlert, docType, setDocType, docNumber, setDocNumber,
    isSprayingAgent, setIsSprayingAgent, 
    surname, setSurname, otherNames, setOtherNames,
    primaryPhone, setPrimaryPhone, secondaryPhone, setSecondaryPhone,
    nuit, setNuit, errors, setErrors, 

}) {


  return (
    <Box px="3" my="6">
        <Stack  direction="row" mx="3" w="100%">
            <Box w="20%" px="1">

            </Box>
            <Box w="80%" px="1">
                <CheckBox
                    center
                    fontFamily = 'JosefinSans-Italic'
                    containerStyle={{
                        backgroundColor: 'ghostwhite',
                    }}
                    textStyle={{
                        
                        fontWeight: '100',
                        color: '#005000',
                    }}
                    title="?? Provedor de Servi??os de Pulveriza????o?"
                    checked={isSprayingAgent}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => setIsSprayingAgent(!isSprayingAgent)}
                />
            </Box>
        </Stack>
        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'surname' in errors}>
                <FormControl.Label>Apelido</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo"
                    value={surname}
                    onChangeText={newSurname=>{
                        setErrors(prev=>({...prev, surname: ''}))
                        setSurname(newSurname)
                    }}
                />
                {
                'surname' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.surname}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            <FormControl isRequired my="1" isInvalid={'otherNames' in errors}>
                <FormControl.Label>Outros Nomes</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo"
                    value={otherNames}
                    onChangeText={newNames=>{
                        setErrors(prev=>({...prev, otherNames: ''}))
                        setOtherNames(newNames)
                    }}
                />
                {
                'otherNames' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.otherNames}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="1" isInvalid={'gender' in errors}>
                <FormControl.Label>G??nero</FormControl.Label>
                  <Select
                      selectedValue={gender}
                      accessibilityLabel="G??nero"
                      placeholder="G??nero"
                      minHeight={55}
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                     dropdownCloseIcon={gender 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setGender('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                      onValueChange={newGender => {
                        setErrors((prev)=>({...prev, gender: ''}));
                        setGender(newGender)
                    }}
                  >
                    <Select.Item label="Masculino" value="Masculino" />
                    <Select.Item label="Feminino" value="Feminino" />
                    <Select.Item label="Outro" value="Outro" />
                  </Select>
                {
                'gender' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.gender}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>

            <Box w="50%" px="1" pt="2">
            <FormControl isRequired isInvalid={'familySize' in errors}>
                <FormControl.Label>Agregado Familiar</FormControl.Label>
                    <CustomInput
                        width="100%"
                        type="number"
                        textAlign="center"
                        placeholder="Agregado familiar"
                        value={familySize}
                        keyboardType="numeric"
                        onChangeText={newSize=>{
                            setErrors((prev)=>({...prev, familySize: ''}));
                            setFamilySize(newSize)
                        }}
                    />
                {
                'familySize' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.familySize}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            <CustomDivider
                marginVertical="2"
                thickness={2}
                bg="#005000"
            />

            <Center>
                <Text style={styles.formSectionDescription}>Endere??o e Contacto</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'addressAdminPost' in errors}>
                    <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={addressAdminPost}
                        accessibilityLabel="Escolha sua prov??ncia"
                        placeholder="Escolha sua prov??ncia"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={addressAdminPost 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setAddressAdminPost('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                        mt={1}
                        onValueChange={newAdminPost => {
                            setErrors((prev)=>({...prev, addressAdminPost: ''}));
                            setAddressAdminPost(newAdminPost);
                        }}
                    >{
                        selectedAddressAdminPosts?.map((adminPost, index)=>(
                            <Select.Item key={index} label={adminPost} value={adminPost} />
                        ))
                    }
                    </Select>
                {
                'addressAdminPost' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.addressAdminPost}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="3">
                <FormControl.Label>Localidade</FormControl.Label>
                    <Select
                        selectedValue={addressVillage}
                        accessibilityLabel="Escolha uma localidade"
                        placeholder="Escolha uma localidade"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={addressVillage 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setAddressVillage('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                        mt={1}
                        onValueChange={newVillage => setAddressVillage(newVillage)}
                    >
                    {
                        villages[addressAdminPost]?.map((village, index)=>(
                            <Select.Item key={index} label={village} value={village} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl my="1" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telem??vel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telem??vel"
                    keyboardType="numeric"
                    value={primaryPhone}
                    onChangeText={newPhone=>{
                        setErrors((prev)=>({...prev, primaryPhone: ''}))                        
                        setPrimaryPhone(newPhone);
                    }}
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={30}
                            type="material"
                        />
                    }
                />
                {
                'primaryPhone' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.primaryPhone}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl my="1" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telem??vel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telem??vel"
                    keyboardType="numeric"
                    value={secondaryPhone}
                    onChangeText={(newPhone=>{
                        setErrors((prev)=>({...prev, secondaryPhone: ''}))
                        setSecondaryPhone(newPhone)
                    })
                    }
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={30}
                            type="material"
                        />
                    }
                />
                {
                'secondaryPhone' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.secondaryPhone}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            <CustomDivider
                marginVertical="2"
                thickness={2}
                bg="#005000"
            />

            <Center>
                <Text style={styles.formSectionDescription}>Dados de Nascimento</Text>
            </Center>

    <Stack direction="row" mx="3" my="2" w="100%">
        <Box w="50%" px="1" pt="1" >
            <FormControl isRequired isInvalid={'birthDate' in errors}>
                <FormControl.Label>Data de Nascimento</FormControl.Label>
                    <Datepicker
                        placeholder="Nascimento"
                        min={new Date(1900, 0, 0)}
                        max={new Date(2010, 0, 0)}
                        size="large"
                        placement="top end"
                        style={styles.datepicker}
                        date={birthDate}
                        dateService={localeDateService}
                        // {...localePickerState}
                        accessoryRight={
                            birthDate 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setBirthDate(null)} /> 
                                    : <Icon name="date-range" color="#005000" />
                        }
                        onSelect={nextDate => {
                            setErrors(prev=>({...prev, birthDate: null }))
                            setBirthDate(nextDate)
                    }}
                />
                {
                'birthDate' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthDate}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>    


        <Box w="50%" px="1">
            <FormControl isRequired isInvalid={'birthProvince' in errors}>
                <FormControl.Label>Prov??ncia</FormControl.Label>
                    <Select
                        selectedValue={birthProvince}
                        accessibilityLabel="Escolha uma prov??ncia"
                        placeholder="Escolha uma prov??ncia"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={birthProvince 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setBirthProvince('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                        mt={1}
                        onValueChange={newProvince => {
                            setErrors((prev)=>({...prev, birthProvince: ''}))
                            setBirthProvince(newProvince)
                        }}
                    >{
                        provinces?.map((province, index)=>(
                            <Select.Item key={index} label={province} value={province} />
                        ))
                    }
                    </Select>
                {
                'birthProvince' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthProvince}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

{ !birthProvince?.includes('Cidade') && (

        <Stack direction="row" mx="3" my="2" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="1" isInvalid={'birthDistrict' in errors}>
                <FormControl.Label>{birthProvince === "Pa??s Estrangeiro" ? 'Pa??s' : 'Distrito'}</FormControl.Label>
                    <Select
                        selectedValue={birthDistrict}
                        accessibilityLabel="Escolha um distrito"
                        placeholder={birthProvince?.includes('Estrangeiro') ? "Escolha um pa??s" : "Escolha um distrito"}
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={birthDistrict 
                        ? <Icon name="close" size={25} color="red" onPress={()=>setBirthDistrict('')} /> 
                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                    }
                    mt={1}
                    onValueChange={newDistrict => {
                        setErrors((prev)=>({...prev, birthDistrict: ''}));
                        setBirthDistrict(newDistrict);
                        }}
                    >
                    {   birthProvince === "Pa??s Estrangeiro" 
                        ? countries?.map((country, index)=>(
                            <Select.Item key={index} label={country} value={country} />
                        ))
                        :
                        districts[birthProvince]?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                            ))
                        }
                    </Select>
                {
                'birthDistrict' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthDistrict}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
        
        {
            (
                !birthProvince?.includes('Estrangeiro') && 
                !birthDistrict?.includes('Cidade') &&
                !birthProvince?.includes('Maputo')
                
            ) 
            && 
            (
                
                <FormControl isRequired my="1" isInvalid={'birthAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={birthProvince ? birthAdminPost: ''}
                        accessibilityLabel="Escolha um posto administrativo"
                        placeholder="Escolha um posto administrativo"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={birthAdminPost 
                            ? <Icon name="close" size={25} color="red" onPress={()=>setBirthAdminPost('')} /> 
                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                    onValueChange={newAdminPost=> {
                        setErrors((prev)=>({...prev, birthAdminPost: ''}));
                        setBirthAdminPost(newAdminPost);
                    }}
                    >
                    {
                        administrativePosts[birthDistrict]?.map((adminPost, index)=>(
                            <Select.Item key={index} label={adminPost} value={adminPost} />
                            ))
                        }
                    </Select>
                {
                    'birthAdminPost' in errors 
                    ? <FormControl.ErrorMessage 
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                    _text={{ fontSize: 'xs'}}>{errors?.birthAdminPost}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        
        )
    }
        </Box>
    </Stack>
)}


        <CustomDivider
            marginVertical="2"
            thickness={2}
            bg="#005000"
        />
            
        <Center>
            <Text 
                style={styles.formSectionDescription}
            >
                Documentos de Identifica????o
            </Text>
        </Center>

        <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl my="2" isInvalid={'docType' in errors}>
                <FormControl.Label>Tipo de documento</FormControl.Label>
                  <Select
                      selectedValue={docType}
                      accessibilityLabel="Tipo de doc."
                      placeholder="Tipo de documento"
                      minHeight={55}
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      dropdownCloseIcon={docType 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setDocType('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                      mt={1}
                      onValueChange={newDocType => {
                        setErrors((prev)=>({...prev, docType: ''}));
                        setDocType(newDocType);
                      }}
                  >
                    <Select.Item label="Bilhete de Identidade (BI)" value="Bilhete de Identidade" />
                    <Select.Item label="Passaporte" value="Passaporte" />
                    <Select.Item label="Carta de Condu????o" value="Carta de Condu????o" />
                    <Select.Item label="C??dula" value="C??dula" />
                    <Select.Item label="Cart??o de Eleitor" value="Cart??o de Eleitor" />
                    <Select.Item label="DIRE" value="DIRE" />
                    <Select.Item label="Cart??o de Refugiado" value="Cart??o de Refugiado" />
                  </Select>
                {
                'docType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.docType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl my="3" isInvalid={'docNumber' in errors}>
                <FormControl.Label>N??mero do Documento</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    isDisabled={docType === '' ? true : false }
                    value={docNumber}
                    placeholder="N??mero do Documento"
                    onChangeText={newDocNumber=>{
                        setErrors((prev)=>({...prev, docNumber: ''}));
                        setDocNumber(newDocNumber)
                    }}
                />
                {
                'docNumber' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.docNumber}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid={'nuit' in errors}>
                <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                    value={nuit}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, nuit: ''}));
                        setNuit(newNuit)
                    }}
                />
                {
                'nuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.nuit}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            </Box>
            </Stack>
        </Box>

    </Box>
  );
}
