
import React, { useState, useEffect, useCallback } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, TextInput, View } from 'react-native';
import { Overlay, Icon, Button, CheckBox } from "@rneui/base";
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';

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

})=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    // // ----------------------------------------------------
    const [errors, setErrors] = useState({});
    const [overlayTitle, setOverlayTitle] = useState('');


    useEffect(()=>{
        if (dataToBeUpdated === 'groupManager' && resourceName === 'Group'){
            setGroupManagerName(resource?.manager.fullname);
            setGroupManagerPhone(resource?.manager.phone);
            setOverlayTitle('Actualizar Contacto.');

            setOldGroupManagerName(resource?.manager.fullname);
            setOldGroupManagerPhone(resource?.manager.phone);
        }

        // if (dataToBeUpdated === 'contact' && resourceName === 'Farmer') {
        //     setPrimaryPhone(resource?.contact.primaryPhone);
        //     setSecondaryPhone(resource?.contact.secondaryPhone);
        //     setOverlayTitle('Actualizar contactos.');

        //     setOldPrimaryPhone(resource?.contact.primaryPhone);
        //     setOldSecondaryPhone(resource?.contact.secondaryPhone);
        // }

        // if (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') {
        //     setDocType(resource?.idDocument.docType);
        //     setDocNumber(resource?.idDocument.docNumber);
        //     setNuit(resource?.idDocument.nuit);

        //     setOverlayTitle('Actualizar Documentos de Identidade.');

        //     setOldDocType(resource?.idDocument.docType);
        //     setOldDocNumber(resource?.idDocument.docNumber);
        //     setOldNuit(resource?.idDocument.nuit);
        // }

    }, [ dataToBeUpdated, resourceName ]);

    const onConfirmUpdate = (dataToBeUpdated, resourceName)=> {

        const validatedData = validateGroupEditedData({
            // groupNuit, oldGroupNuit,
            // groupLicence, oldGroupLicence,
            groupManagerName, oldGroupManagerName,
            groupManagerPhone, oldGroupManagerPhone,
        }, errors, setErrors, dataToBeUpdated, resourceName);

        const newData = {};
        const oldData = {};


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


        // if (dataToBeUpdated === 'contact' && resourceName === 'Farmer') {

        //     // new incoming data
        //     newData['primaryPhone'] = validatedData?.primaryPhone ? Number(parseInt(validatedData?.primaryPhone)) : 0;
        //     newData['secondaryPhone'] = validatedData?.secondaryPhone ? Number(parseInt(validatedData?.secondaryPhone)) : 0;


        //     // old data
        //     oldData['primaryPhone'] = oldPrimaryPhone ? Number(parseInt(oldPrimaryPhone)) : 0;
        //     oldData['secondaryPhone'] = oldSecondaryPhone ? Number(parseInt(oldSecondaryPhone)) : 0;
        

        //     setNewDataObject(newData);
        //     setOldDataObject(oldData);
        // }


        // if (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') {

        //     // new incoming data
        //     newData['docType'] = validatedData?.docType?.trim();
        //     newData['docNumber'] = validatedData?.docNumber ? validatedData?.docNumber : '';
        //     newData['nuit'] = validatedData?.nuit ? Number(parseInt(validatedData?.nuit)) : 0;

        //     // old data
        //     oldData['docType'] = oldDocType ? oldDocType : 'Não tem';
        //     oldData['docNumber'] = oldDocNumber ? oldDocNumber : '';
        //     oldData['nuit'] = oldNuit ? oldNuit : 0;

        //     setNewDataObject(newData);
        //     setOldDataObject(oldData);
        // }

    }


    // console.log('errors: ', errors);
    // console.log('oldDataObject: ', oldDataObject);

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
      };

    return (

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '90%',
            borderRadius: 10,
            paddingBottom: 10,
        }}
        isVisible={isOverlayVisible} 
        onBackdropPress={toggleOverlay}
    >

        <View
            style={{
                // minHeight: '80%',
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

    {/* update the farmer idDocuments */}

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
            // icon={
            // <Icon
            //     name="save"
            //     type="font-awesome"
            //     color="white"
            //     size={25}
            //     iconStyle={{ 
            //         marginRight: 10,
            //         // color: COLORS.ghostwhite,
            //         paddingHorizontal: 10,
            //      }}
            // />
            // }
            containerStyle={{
                backgroundColor: COLORS.second,
                borderRadius: 10,
                // color: COLORS.ghostwhite,
            }}
            type="outline"
            onPress={()=>{
                if(!validateGroupEditedData({
                    // groupNuit, oldGroupNuit,
                    // groupLicence, oldGroupLicence,
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