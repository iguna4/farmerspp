/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { Icon, Button, CheckBox } from '@rneui/themed';
import { Datepicker  } from '@ui-kitten/components';
import AwesomeAlert from 'react-native-awesome-alerts';

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
import { groups, institutions, privateInstitutions, publicInstitutions } from '../../fakedata/farmerTypes';
import validateIndividualFarmerData from '../../helpers/validateIndividualFarmerData';
import validateInstitutionFarmerData from '../../helpers/validateInstitutionFarmerData';
import validateGroupFarmerData from '../../helpers/validateGroupFarmerData';
import TickComponent from '../../components/LottieComponents/TickComponent';
import GroupModal from '../../components/Modals/GroupModal';
import InstitutionModal from '../../components/Modals/InstitutionModal';
import ErrorAlert from '../../components/Alerts/ErrorAlert';


import { generateUFID } from '../../helpers/generateUFID';
import DuplicatesAlert from '../../components/Alerts/DuplicatesAlert';
import { detectDuplicates } from '../../helpers/detectDuplicates';
import FarmerTypeRadioButtons from '../../components/RadioButton/FarmerTypeRadioButtons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';


import { realmContext } from '../../models/realm';
const {useRealm} = realmContext;

export default function InstitutionFarmerForm({ 
    route, navigation,
    institutionType, setInstitutionType, institutionName, setInstitutionName, 
    institutionManagerName, setInstitutionManagerName, institutionManagerPhone, setInstitutionManagerPhone,
    institutionAdminPost, setInstitutionAdminPost, institutionVillage, setInstitutionVillage, 
    institutionNuit, setInstitutionNuit, isPrivateInstitution, setIsPrivateInstitution,
    institutionLicence, setInstitutionLicence,
    errors, setErrors, addressAdminPost,

    selectedAddressAdminPosts, setSelectedAddressAdminPosts, 

 }) {

    // handle modal view
    // const [modalVisible, setModalVisible] = useState(false);

    // const [duplicatesAlert, setDuplicatesAlert] = useState(false);
       
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
                    title="?? uma institui????o privada?"
                    checked={isPrivateInstitution}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            // type="material"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            // type="material"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => setIsPrivateInstitution(!isPrivateInstitution)}
                />
            </Box>
        </Stack>

    <Box w="100%" alignItems="center">
            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'institutionType' in errors}>
                    <FormControl.Label>Tipo de Institui????o</FormControl.Label>
                    <Select
                        selectedValue={institutionType}
                        accessibilityLabel="Tipo de Institui????o"
                        placeholder="Escolha uma institui????o"
                        minHeight={55}
                        dropdownCloseIcon={institutionType 
                                            ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionType('')} /> 
                                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                        }
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />
                        }}
                        mt={1}
                        onValueChange={newInstitutionType => {
                            setErrors((prev)=>({...prev, institutionType: ''}));
                            setInstitutionType(newInstitutionType);
                        }}
                    >
                    {
                        isPrivateInstitution && 
                        privateInstitutions?.map((institution, index)=>(
                            <Select.Item key={index} label={institution} value={institution} />
                        ))
                    }
                    {
                        !isPrivateInstitution && 
                        publicInstitutions?.map((institution, index)=>(
                            <Select.Item key={index} label={institution} value={institution} />
                        ))
                    }
                    </Select>
                {
                'institutionType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.institutionType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="4">
                <FormControl.Label>Nome da Institui????o</FormControl.Label>
                    <CustomInput
                        width="100%"
                        isDisabled={institutionType === '' ? true : false}
                        autoCapitalize="words"
                        placeholder="Nome da Institui????o"
                        value={institutionName}
                        onChangeText={newInstitutionName=>{
                            setErrors(prev=>({...prev, institutionName: ''}))
                            setInstitutionName(newInstitutionName)
                        }}
                    />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
        </Stack>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1">
            <FormControl isRequired my="2" isInvalid={'institutionAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                <Select
                    selectedValue={institutionAdminPost}
                    accessibilityLabel="posto administrativo"
                    placeholder="Escolha posto administrativo"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={institutionAdminPost 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionAdminPost('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newAdminPost => {
                        setErrors((prev)=>({...prev, institutiondminPost: ''}));
                        setInstitutionAdminPost(newAdminPost);
                    }}
                >{
                    selectedAddressAdminPosts?.map((adminPost, index)=>(
                        <Select.Item key={index} label={adminPost} value={adminPost} />
                    ))
                }
                </Select>
            {
            'institutionAdminPost' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionAdminPost}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
        </Box>
        <Box w="50%" px="1">
        <FormControl isRequired my="2">
            <FormControl.Label>Localidade</FormControl.Label>
                <Select
                    selectedValue={institutionVillage}
                    accessibilityLabel="Escolha uma localidade"
                    placeholder="Escolha uma localidade"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={institutionVillage 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionVillage('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newVillage => setInstitutionVillage(newVillage)}
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

        <FormControl isRequired my="1" isInvalid={'institutionManagerName' in errors}>
            <FormControl.Label>Nome Completo do Representante</FormControl.Label>
            <CustomInput
                width="100%"
                type="text"
                autoCapitalize="words"
                placeholder="Nome completo do representante"
                value={institutionManagerName}
                onChangeText={newManagerName=>{
                    setErrors(prev=>({...prev, institutionManagerName: ''}))
                    setInstitutionManagerName(newManagerName)
                }}
            />
            {
            'institutionManagerName' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionManagerName}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'institutionManagerPhone' in errors}>
            <FormControl.Label>Telem??vel do Representante</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder="Telem??vel"
                keyboardType="numeric"
                value={institutionManagerPhone}
                onChangeText={newManagerPhone=>{
                    setErrors((prev)=>({...prev, institutionManagerPhone: ''}))                        
                    setInstitutionManagerPhone(newManagerPhone);
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
            'institutionManagerPhone' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionManagerPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'institutionNuit' in errors}>
                <FormControl.Label>NUIT da Institui????o</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                    value={institutionNuit}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, institutionNuit: ''}));
                        setInstitutionNuit(newNuit)
                    }}
                />
                {
                'institutionNuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.institutionNuit}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        </Stack>
{
    (institutionType.includes('Empresa') || institutionType?.includes('Outr'))
        && 
        (
    
        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'institutionManagerPhone' in errors}>
            <FormControl.Label>Alvar??</FormControl.Label>
            <CustomInput
                width="100%"
                type="text"
                placeholder="Alvar??"
                keyboardType="numeric"
                value={institutionLicence}
                onChangeText={newLicence=>{
                    setErrors((prev)=>({...prev, institutionLicence: ''}))                        
                    setInstitutionLicence(newLicence);
                }}
                />
            {
                'institutionLicence' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.institutionLicence}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            {/* <FormControl isInvalid={'institutionNuit' in errors}>
                <FormControl.Label>NUIT da Institui????o</FormControl.Label>
                <CustomInput
                width="100%"
                type="number"
                placeholder="NUIT"
                    value={institutionNuit}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, institutionNuit: ''}));
                        setInstitutionNuit(newNuit)
                    }}
                    />
                {
                    'institutionNuit' in errors 
                    ? <FormControl.ErrorMessage 
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                    _text={{ fontSize: 'xs'}}>{errors?.institutionNuit}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl> */}
        </Box>
        </Stack>
    )

}


</Box>
</Box>
);
}
