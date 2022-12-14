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
import { groups, institutions } from '../../fakedata/farmerTypes';
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

export default function GroupFarmerForm({ 
    route, navigation,
    groupType, setGroupType, groupName, setGroupName, 
    groupAdminPost, setGroupAdminPost, groupVillage, setGroupVillage,
    groupManagerName, setGroupManagerName, groupManagerPhone, setGroupManagerPhone,
    groupOperatingLicence, setGroupOperatingLicence, groupNuit, setGroupNuit,
    groupAffiliationYear, setGroupAffiliationYear, 
    groupMembersNumber, setGroupMembersNumber, groupWomenNumber, setGroupWomenNumber,
    errors, setErrors, 
    selectedAddressAdminPosts, setSelectedAddressAdminPosts, addressAdminPost

}) {

    // const [duplicatesAlert, setDuplicatesAlert] = useState(false);

    // const [suspectedDuplicates, setSuspectedDuplicates] = useState([]);
        
  return (

    <Box px="3" my="6">
        <Box w="100%" alignItems="center">
            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'groupType' in errors}>
                    <FormControl.Label>Tipo de grupo</FormControl.Label>
                    <Select
                        selectedValue={groupType}
                        accessibilityLabel="Grupo"
                        placeholder="Tipo de grupo "
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        dropdownCloseIcon={groupType 
                                            ? <Icon name="close" size={25} color="red" onPress={()=>setGroupType('')} /> 
                                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                        }
                        onValueChange={newGroupType => {
                            setErrors((prev)=>({...prev, groupType: ''}));
                            setGroupType(newGroupType)
                        }}
                    >
                        {
                            groups?.map((group, index)=>(
                            <Select.Item key={index} label={group} value={group} />
                        ))  
                        }
                    </Select>
                {
                'groupType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="4" isInvalid={'groupName' in errors}>
                <FormControl.Label>Designa????o do grupo</FormControl.Label>
                    <CustomInput
                        width="100%"
                        isDisabled={groupType === '' ? true : false}
                        autoCapitalize="words"
                        placeholder="Designa????o do grupo"
                        value={groupName}
                        onChangeText={newGroupName=>{
                            setErrors(prev=>({...prev, groupName: ''}))
                            setGroupName(newGroupName)
                        }}
                    />
                {
                'groupName' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupName}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
        </Stack>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupMembersNumber' in errors} isRequired>
            <FormControl.Label>Total de membros</FormControl.Label>
            <CustomInput
                width="100%"
                type="number"
                placeholder="N??mero de membros"
                textAlign={'center'}
                keyboardType="numeric"
                value={groupMembersNumber}
                onChangeText={groupMembers=>{
                    setErrors((prev)=>({...prev, groupMembersNumber: ''}))                        
                    setGroupMembersNumber(groupMembers);
                }}
            />
            {
            'groupMembersNumber' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupMembersNumber}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'groupWomenNumber' in errors} isRequired>
                <FormControl.Label>Total de mulheres</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="N??mero de mulheres"
                    textAlign={'center'}
                    isDisabled={groupMembersNumber === '' ? true : false}
                    value={groupWomenNumber}
                    keyboardType="numeric"
                    onChangeText={womenNumber=>{
                        setErrors((prev)=>({...prev, groupWomenNumber: ''}));
                        setGroupWomenNumber(womenNumber)
                    }}
                />
                {
                'groupWomenNumber' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupWomenNumber}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        </Stack>


        <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="1" isInvalid={'groupAffiliationYear' in errors}>
                    <FormControl.Label>Ano de {groupType?.includes('Grupo') ? "cria????o" : "legaliza????o"}</FormControl.Label>
                    <Select
                        selectedValue={groupAffiliationYear}
                        accessibilityLabel="Escolha o ano"
                        placeholder="Escolha o ano"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={groupAffiliationYear 
                                        ? <Icon 
                                            name="close" 
                                            size={25} 
                                            color="red" 
                                            onPress={()=>setGroupAffiliationYear('')} 
                                        /> 
                                        : <Icon 
                                            size={40} 
                                            name="arrow-drop-down" 
                                            color="#005000" 
                                        />
                                    }
                        mt={1}
                        onValueChange={newYear => {
                            setErrors((prev)=>({...prev, groupAffiliationYear: ''}));
                            setGroupAffiliationYear(newYear);
                        }}
                    >
                    {
                        getFullYears()?.map((year, index)=>(
                            <Select.Item key={index} label={`${year}`} value={year} />
                        ))
                    }
                    </Select>
                {
                'groupAffiliationYear' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupAffiliationYear}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">

            </Box>
        </Stack>

    <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupOperatingLicence' in errors}>
            <FormControl.Label>Alvar??</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder={groupType ? `Alvar?? da ${groupType}` : `Alvar?? do grupo`}
                keyboardType="numeric"
                isDisabled={groupType === '' ? true : false}
                value={groupOperatingLicence}
                onChangeText={newOperatingLicence=>{
                    setErrors((prev)=>({...prev, groupOperatingLicence: ''}))                        
                    setGroupOperatingLicence(newOperatingLicence);
                }}
            />
            {
            'groupOperatingLicence' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupOperatingLicence}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'groupNuit' in errors}>
                <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder={groupType ? `NUIT da ${groupType}` : `NUIT do grupo`}
                    value={groupNuit}
                    isDisabled={groupType === '' ? true : false}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, groupNuit: ''}));
                        setGroupNuit(newNuit)
                    }}
                />
                {
                'groupNuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupNuit}</FormControl.ErrorMessage> 
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
            <Text 
                style={styles.formSectionDescription}
            >
                Endere??o e Contacto
            </Text>
        </Center>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1">
            <FormControl isRequired my="2" isInvalid={'groupAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                <Select
                    selectedValue={groupAdminPost}
                    accessibilityLabel="posto administrativo"
                    placeholder="Escolha posto administrativo"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={groupAdminPost 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setGroupAdminPost('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newAdminPost => {
                        setErrors((prev)=>({...prev, groupAdminPost: ''}));
                        setGroupAdminPost(newAdminPost);
                    }}
                >
                {
                    selectedAddressAdminPosts?.map((adminPost, index)=>(
                        <Select.Item key={index} label={adminPost} value={adminPost} />
                    ))
                }
                </Select>
            {
            'groupAdminPost' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupAdminPost}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
        </Box>
        <Box w="50%" px="1">
        <FormControl isRequired my="2">
            <FormControl.Label>Localidade</FormControl.Label>
                <Select
                    selectedValue={groupVillage}
                    accessibilityLabel="Escolha uma localidade"
                    placeholder="Escolha uma localidade"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />
                    }}
                    dropdownCloseIcon={groupVillage
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setGroupVillage('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newVillage => setGroupVillage(newVillage)}
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

        </Box>

        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'groupManagerName' in errors}>
                <FormControl.Label>Nome do {groupType?.includes('Grupo') ? "Representante" : "Presidente"}</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo do Gerente"
                    value={groupManagerName}
                    onChangeText={newName=>{
                        setErrors(prev=>({...prev, groupManagerName: ''}))
                        setGroupManagerName(newName)
                    }}
                />
                {
                'groupManagerName' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupManagerName}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
 
        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupManagerPhone' in errors}>
            <FormControl.Label>Telem??vel do {groupType?.includes('Grupo') ? "Representante" : "Presidente"}</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder="Telem??vel"
                keyboardType="numeric"
                value={groupManagerPhone}
                onChangeText={newManagerPhone=>{
                    setErrors((prev)=>({...prev, groupManagerPhone: ''}))                        
                    setGroupManagerPhone(newManagerPhone);
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
            'groupManagerPhone' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupManagerPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
        </Box>
    </Stack>



    </Box>
    </Box>
  );
}
