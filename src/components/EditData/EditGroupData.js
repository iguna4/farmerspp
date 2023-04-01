
import React, { useState, useEffect, useCallback } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, TextInput, View } from 'react-native';
import { Overlay, Icon, Button, CheckBox } from "@rneui/base";
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';

import ConfirmData from './ConfirmData';
import COLORS from "../../consts/colors";
import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";

import administrativePosts from '../../consts/administrativePosts';
import provinces from '../../consts/provinces';
import districts from '../../consts/districts';
import villages from '../../consts/villages';
import countries from '../../consts/countries';
import idDocTypes from '../../consts/idDocTypes';
import { CustomInput } from '../Inputs/CustomInput';
import { fullYears, getFullYears, localeDateService, useDatepickerState } from '../../helpers/dates';
import { groupPurposes } from '../../consts/groupPurposes';
import { groups, institutions } from '../../consts/farmerTypes';
import { groupAffiliationStatus } from '../../consts/groupAffiliationStatus';


import validateGroupEditedData from '../../helpers/validateGroupEditedData';


import { useUser } from "@realm/react";
import { realmContext } from '../../models/realmContext';
const {useRealm} = realmContext;


const EditGroupData = ({  
    isOverlayVisible, 
    setIsOverlayVisible,
    isConfirmDataVisible,
    setIsConfirmDataVisible,

    ownerName,
    resource,
    
    resourceName,
    dataToBeUpdated,

    newDataObject,
    oldDataObject,
    setNewDataObject,
    setOldDataObject,

    // the group manager personal data
    groupManagerPhone,
    setGroupManagerPhone,
    groupManagerName,
    setGroupManagerName,
    oldGroupManagerPhone,
    setOldGroupManagerPhone,
    oldGroupManagerName,
    setOldGroupManagerName,

    // the group members data
    isGroupActive,
    setIsGroupActive,
    isGroupInactive,
    setIsGroupInactive,

    isOldGroupActive,
    isOldGroupInactive,
    setIsOldGroupActive,
    setIsOldGroupInactive,

    groupMembersNumber,
    setGroupMembersNumber,
    groupWomenNumber,
    setGroupWomenNumber,

    oldGroupMembersNumber,
    setOldGroupMembersNumber,
    oldGroupWomenNumber,
    setOldGroupWomenNumber,

    groupNuit,
    setGroupNuit,
    groupAffiliationYear,
    setGroupAffiliationYear,
    groupCreationYear,
    setGroupCreationYear,
    groupLegalStatus,
    setGroupLegalStatus,
    groupOperatingLicence,
    setGroupOperatingLicence,

    oldGroupNuit,
    setOldGroupNuit,
    oldGroupAffiliationYear,
    setOldGroupAffiliationYear,
    oldGroupCreationYear,
    setOldGroupCreationYear,
    oldGroupLegalStatus,
    setOldGroupLegalStatus,
    oldGroupOperatingLicence, 
    setOldGroupOperatingLicence,   

    // group type
    groupType,
    setGroupType,
    oldGroupType,
    setOldGroupType,

    groupName,
    setGroupName,
    oldGroupName,
    setOldGroupName,
    groupGoals,
    setGroupGoals,
    oldGroupGoals,
    setOldGroupGoals,


})=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    // // ----------------------------------------------------
    const [errors, setErrors] = useState({});
    const [overlayTitle, setOverlayTitle] = useState('');

    // erase dados for affiliationyear, nuit, and licence
    // if legal status is not 'legalizado'
    useEffect(()=>{
        if(groupLegalStatus !== groupAffiliationYear.affiliated){
            setGroupAffiliationYear('');
            setGroupNuit('');
            setGroupOperatingLicence('');
        }
    }, [ groupLegalStatus ]);


    useEffect(()=>{
        if (dataToBeUpdated === 'groupType' && resourceName === 'Group') {
            setGroupName(resource?.name);
            setGroupType(resource?.type);
            setGroupGoals(resource?.assets?.map(asset=>asset.subcategory));
            setOverlayTitle('Actualizar Tipo de Grupo');

            setOldGroupName(resource?.name);
            setOldGroupType(resource?.type);
            setOldGroupGoals(resource?.assets?.map(asset=>asset.subcategory));
                
        }

        if (dataToBeUpdated === 'groupManager' && resourceName === 'Group'){
            setGroupManagerName(resource?.manager.fullname);
            setGroupManagerPhone(resource?.manager.phone);
            setOverlayTitle('Actualizar Contacto.');

            setOldGroupManagerName(resource?.manager.fullname);
            setOldGroupManagerPhone(resource?.manager.phone);
        }

        if (dataToBeUpdated === 'groupMembers' && resourceName === 'Group') {
            setIsGroupActive(Boolean(resource?.operationalStatus) ? true : false);
            setIsGroupInactive(!Boolean(resource?.operationalStatus) ? true : false);
            setOverlayTitle('Actualizar Efectividade.');

            setIsOldGroupActive(Boolean(resource?.operationalStatus) ? true : false);
            setIsOldGroupInactive(!Boolean(resource?.operationalStatus) ? true : false);

            setGroupMembersNumber(resource?.numberOfMembers.total);
            setGroupWomenNumber(resource?.numberOfMembers.women);

            setOldGroupMembersNumber(resource?.numberOfMembers.total);
            setOldGroupWomenNumber(resource?.numberOfMembers.women);
        }

        if (dataToBeUpdated === 'groupIdentity' && resourceName === 'Group') {
            setGroupAffiliationYear(resource?.affiliationYear);
            setGroupOperatingLicence(resource?.licence);
            setGroupNuit(resource?.nuit);
            setGroupCreationYear(resource?.creationYear);
            setGroupLegalStatus(resource?.legalStatus);

            setOverlayTitle('Actualizar Identidade.');

            setOldGroupAffiliationYear(resource?.affiliationYear);
            setOldGroupOperatingLicence(resource?.licence);
            setOldGroupNuit(resource?.nuit);
            setOldGroupCreationYear(resource?.creationYear);
            setOldGroupLegalStatus(resource?.legalStatus);
        }

    }, [ dataToBeUpdated, resourceName ]);

    const onConfirmUpdate = (dataToBeUpdated, resourceName)=> {

        // validate the data input by the user
        const validatedData = validateGroupEditedData({
            // user changing group name, type, and goals
            groupName, groupType, groupGoals,
            oldGroupName, oldGroupType, oldGroupGoals,

            // user changing group identity
            groupAffiliationYear, groupCreationYear,
            groupLegalStatus, groupOperatingLicence,
            oldGroupAffiliationYear, oldGroupCreationYear,
            oldGroupLegalStatus, oldGroupOperatingLicence, 
            groupNuit, oldGroupNuit,

            // user changing group efectivity
            isGroupActive, isGroupInactive, isOldGroupActive,
            isOldGroupInactive, groupMembersNumber, oldGroupMembersNumber,
            groupWomenNumber, oldGroupWomenNumber,

            // user chaning group contact
            groupManagerName, oldGroupManagerName,
            groupManagerPhone, oldGroupManagerPhone,
        }, errors, setErrors, dataToBeUpdated, resourceName);

        const newData = {};
        const oldData = {};

        if (dataToBeUpdated === 'groupType' && resourceName === 'Group') {
            // incoming data
            newData['type'] = validatedData?.type ? validatedData?.type?.trim() : '';
            newData['name'] = validatedData?.name ? validatedData?.name?.trim() : '';
            // normalize the asset object
            newData['goals'] = (validatedData?.goals?.length > 0) ? validatedData?.goals : [];

            // old data
            oldData['type'] = oldGroupType ? oldGroupType : '';
            oldData['name'] = oldGroupName ? oldGroupName : '';
            // normalize the asset object 
            oldData['goals'] = oldGroupGoals ? oldGroupGoals : [];

            setNewDataObject(newData);
            setOldDataObject(oldData);
        }


        if (dataToBeUpdated === 'groupIdentity' && resourceName === 'Group') {

            // new incoming data
            newData['legalStatus'] = validatedData?.legalStatus ? validatedData?.legalStatus?.trim() : '';
            newData['licence'] = validatedData?.licence ? validatedData?.licence?.trim() : '';
            newData['creationYear'] = validatedData?.creationYear ? Number(parseInt(validatedData?.creationYear)) : 0;
            newData['affiliationYear'] = validatedData?.affiliationYear ? Number(parseInt(validatedData?.affiliationYear)) : 0;
            newData['nuit'] = validatedData?.nuit ? Number(parseInt(validatedData?.nuit)) : 0;

            // old data
            oldData['legalStatus'] = oldGroupLegalStatus ? oldGroupLegalStatus?.trim() : '';
            oldData['licence'] = oldGroupOperatingLicence ? oldGroupOperatingLicence?.trim() : '';
            oldData['creationYear'] = oldGroupCreationYear ? Number(parseInt(oldGroupCreationYear)) : 0;
            oldData['affiliationYear'] = oldGroupAffiliationYear ? Number(parseInt(oldGroupAffiliationYear)) : 0;
            oldData['nuit'] = oldGroupNuit ? Number(parseInt(oldGroupNuit)) : 0;

            setNewDataObject(newData);
            setOldDataObject(oldData);
        }

        if (dataToBeUpdated === 'groupManager' && resourceName === 'Group') {

            // new incoming data
            newData['fullname'] = validatedData?.fullname ? validatedData?.fullname?.trim() : '';
            newData['phone'] = validatedData?.phone ? Number(parseInt(validatedData?.phone)) : 0;

            // old data
            oldData['fullname'] = oldGroupManagerName ? oldGroupManagerName?.trim() : '';
            oldData['phone'] = oldGroupManagerPhone ? Number(parseInt(oldGroupManagerPhone)) : 0;
        
            setNewDataObject(newData);
            setOldDataObject(oldData);
        }

        if (dataToBeUpdated === 'groupMembers' && resourceName === 'Group') {

            // new incoming data
            newData['operationalStatus'] = validatedData?.operationalStatus ? validatedData?.operationalStatus : false;
            newData['total'] = validatedData?.total ? Number(parseInt(validatedData?.total)) : 0;
            newData['women'] = validatedData?.women ? Number(parseInt(validatedData?.women)) : 0;

            // old data
            oldData['operationalStatus'] = isOldGroupActive ? isOldGroupActive : false;
            oldData['total'] = oldGroupMembersNumber ? Number(parseInt(oldGroupMembersNumber)) : 0;
            oldData['women'] = oldGroupWomenNumber ? Number(parseInt(oldGroupWomenNumber)) : 0;
        
            setNewDataObject(newData);
            setOldDataObject(oldData);
        }

    }

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
      };

    return (

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '90%',
            borderRadius: 10,
            // marginBottom: 10,
            maxHeight: '80%',
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

    {/* update the group data */}


{
    (dataToBeUpdated === 'groupType' && resourceName === 'Group') &&
    <Stack direction="column">
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
                                    ? <Icon name="close" size={25} color="grey" onPress={()=>setGroupType('')} /> 
                                    : <Icon size={45} name="arrow-drop-down" color={COLORS.main} />
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

        <FormControl isRequired my="4" isInvalid={'groupName' in errors}>
            <FormControl.Label>Nome</FormControl.Label>
                <CustomInput
                    width="100%"
                    isDisabled={groupType === '' ? true : false}
                    autoCapitalize="words"
                    placeholder="Nome do grupo"
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

        <FormControl  isInvalid={'groupGoals' in errors} isRequired>
            <FormControl.Label>Finalidades de {!groupType ? 'Grupo' : groupType }</FormControl.Label>
                <MultipleSelectList
                    setSelected={(goal)=>{
                        setErrors(prev=>({...prev, groupGoals: ''}));
                        setGroupGoals(goal);
                    }}
                    data={groupPurposes}
                    notFoundText={'Finalidade não encontrada'}
                    placeholder="Finalidade de grupo"
                    save="value"
                    label="Finalidade de grupo"
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
                            color="grey" 
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
            'groupGoals' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupGoals}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>

    </Stack>
}



{
    (dataToBeUpdated === 'groupIdentity' && resourceName === 'Group') && 
    <Stack direction="column">
                <FormControl isRequired my="1" isInvalid={'groupCreationYear' in errors}>
                    <FormControl.Label>Ano de criação</FormControl.Label>
                    <Select
                        selectedValue={groupCreationYear}
                        accessibilityLabel="Escolha o ano"
                        placeholder="Escolha o ano"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={groupCreationYear 
                                        ? <Icon 
                                            name="close" 
                                            size={20} 
                                            color="grey" 
                                            onPress={()=>setGroupCreationYear('')} 
                                        /> 
                                        : <Icon 
                                            size={45} 
                                            name="arrow-drop-down" 
                                            color={COLORS.main} 
                                        />
                                    }
                        mt={1}
                        onValueChange={newYear => {
                            setErrors((prev)=>({...prev, groupCreationYear: ''}));
                            setGroupCreationYear(newYear);
                        }}
                    >
                    {
                        getFullYears()?.map((year, index)=>(
                            <Select.Item key={index} label={`${year}`} value={year} />
                        ))
                    }
                    </Select>
                {
                'groupCreationYear' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupCreationYear}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>

            <FormControl isRequired my="1" isInvalid={'groupLegalStatus' in errors}>
                    <FormControl.Label>Situação Legal</FormControl.Label>
                    <Select
                        selectedValue={groupLegalStatus}
                        accessibilityLabel="Escolha a situação"
                        placeholder="Escolha a situação"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={groupLegalStatus
                                        ? <Icon 
                                            name="close" 
                                            size={20} 
                                            color="grey" 
                                            onPress={()=>setGroupLegalStatus('')} 
                                        /> 
                                        : <Icon 
                                            size={45} 
                                            name="arrow-drop-down" 
                                            color={COLORS.main} 
                                        />
                                    }
                        mt={1}
                        onValueChange={status => {
                            setErrors((prev)=>({
                                ...prev, 
                                groupCreationYear: '',
                                groupLegalStatus: ''
                            }));
                            setGroupLegalStatus(status);
                        }}
                    >
                        <Select.Item label={groupAffiliationStatus.notAffiliated} value={groupAffiliationStatus.notAffiliated} />
                        <Select.Item label={groupAffiliationStatus.pendingAffiliation} value={groupAffiliationStatus.pendingAffiliation} />
                        <Select.Item label={groupAffiliationStatus.affiliated} value={groupAffiliationStatus.affiliated} />
                    </Select>
                {
                'groupLegalStatus' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupLegalStatus}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>








{  groupLegalStatus === groupAffiliationStatus.affiliated &&
    <>

    <FormControl isRequired my="1" isInvalid={'groupAffiliationYear' in errors}>
        <FormControl.Label>Ano de legalização</FormControl.Label>
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
                            size={20} 
                            color="grey" 
                            onPress={()=>setGroupAffiliationYear('')} 
                        /> 
                        : <Icon 
                        size={45} 
                        name="arrow-drop-down" 
                            color={COLORS.main} 
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

        <FormControl  isInvalid={'groupOperatingLicence' in errors} isRequired>
        <FormControl.Label>N°. de Alvará</FormControl.Label>
        <CustomInput
            width="100%"
            // type="telephoneNumber"
            placeholder="Alvará"
            // keyboardType="numeric"
            // isDisabled={groupType === '' ? true : false}
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

        <FormControl isInvalid={'groupNuit' in errors} isRequired>
            <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                    value={groupNuit}
                    // isDisabled={groupType === '' ? true : false}
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

        </>
    }


        </Stack>
    }

{
 (dataToBeUpdated === 'groupMembers' && resourceName === 'Group') && 
    <Stack direction="column">
        <FormControl isRequired my="1" isInvalid={'operationalStatus' in errors}>
            <FormControl.Label>                
                <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Regular',
                    color: COLORS.grey,
                    paddingHorizontal: 15,
                }}
                >
                Este grupo é...</Text>
            </FormControl.Label>
            <Stack  direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <CheckBox
                    center
                    fontFamily = 'JosefinSans-Italic'
                    containerStyle={{
                        backgroundColor: COLORS.ghostwhite,
                    }}
                    textStyle={{
                        fontWeight: '120',
                        color: COLORS.main,
                    }}
                    title="Activo"
                    checked={isGroupActive}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            color={COLORS.main}
                            size={30}
                            iconStyle={{ marginRight: 1 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            color={COLORS.main}
                            size={30}
                            iconStyle={{ marginRight: 1 }}
                        />
                    }
                    onPress={() => {
                        setIsGroupInactive(false);
                        setIsGroupActive(true)
                    
                    }}
                    />
            </Box>
            <Box w="50%" px="1">
                <CheckBox
                    center
                    fontFamily = 'JosefinSans-Italic'
                    containerStyle={{
                        backgroundColor: COLORS.ghostwhite,
                    }}
                    textStyle={{
                        
                        fontWeight: '120',
                        color: COLORS.main,
                    }}
                    title="Inactivo"
                    checked={isGroupInactive}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            color={COLORS.main}
                            size={30}
                            iconStyle={{ marginRight: 1 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            color={COLORS.main}
                            size={30}
                            iconStyle={{ marginRight: 1 }}
                        />
                    }
                    onPress={() => {
                        setIsGroupInactive(true);
                        setIsGroupActive(false);                        
                    }}
                    />
                </Box>
            </Stack>    
            {
            'operationalStatus' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.operationalStatus}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>


            <FormControl  isInvalid={'groupMembersNumber' in errors} isRequired>
            <FormControl.Label>Total de membros</FormControl.Label>
            <CustomInput
                width="100%"
                type="number"
                placeholder="Número de membros"
                textAlign={'center'}
                keyboardType="numeric"
                value={groupMembersNumber?.toString()}
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

        <FormControl isInvalid={'groupWomenNumber' in errors} isRequired>
                <FormControl.Label>Total de mulheres</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Número de mulheres"
                    textAlign={'center'}
                    isDisabled={groupMembersNumber === '' ? true : false}
                    value={groupWomenNumber?.toString()}
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

     </Stack>
    }


    {
        (dataToBeUpdated === 'groupManager' && resourceName === 'Group') &&
        <Stack direction="column">
          
          <FormControl isRequired my="1" isInvalid={'groupManagerName' in errors}>
            <FormControl.Label>Nome do Presidente</FormControl.Label>
            <CustomInput
                width="100%"
                type="text"
                autoCapitalize="words"
                placeholder="Nome completo do Presidente"
                value={groupManagerName}
                onChangeText={newManagerName=>{
                    setErrors(prev=>({...prev, groupManagerName: ''}))
                    setGroupManagerName(newManagerName)
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

        <FormControl  isInvalid={'groupManagerPhone' in errors}>
            <FormControl.Label>Telemóvel do Presidente</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder={groupManagerPhone ? groupManagerPhone.toString() : 'Nenhum'}
                keyboardType="numeric"
                value={groupManagerPhone?.toString()}
                onChangeText={newManagerPhone=>{
                    setErrors((prev)=>({...prev, groupManagerPhone: ''}))                        
                    setGroupManagerPhone(newManagerPhone);
                }}
                InputLeftElement={
                    <Icon
                        name="phone"
                        color="grey"
                        size={25}
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
                // color: COLORS.ghostwhite,
            }}
            type="outline"
            onPress={()=>{
                if(!validateGroupEditedData({
                    groupName, groupType, groupGoals,
                    oldGroupName, oldGroupType, oldGroupGoals,

                    groupAffiliationYear, groupCreationYear,
                    groupLegalStatus, groupOperatingLicence,
                    oldGroupAffiliationYear, oldGroupCreationYear,
                    oldGroupLegalStatus, oldGroupOperatingLicence, 
                    groupNuit, oldGroupNuit,

                    isGroupActive, isGroupInactive, isOldGroupActive,
                    isOldGroupInactive, groupMembersNumber, oldGroupMembersNumber,
                    groupWomenNumber, oldGroupWomenNumber,
                    groupManagerName, oldGroupManagerName,
                    groupManagerPhone, oldGroupManagerPhone,
                }, errors, setErrors, dataToBeUpdated, resourceName)) {
                    return ;
                }
                onConfirmUpdate(dataToBeUpdated, resourceName);
                setIsOverlayVisible(false);
                setIsConfirmDataVisible(true);

            }}
        />
        </ScrollView>

        </View>

    </Overlay>

    )
}


    
export default EditGroupData;