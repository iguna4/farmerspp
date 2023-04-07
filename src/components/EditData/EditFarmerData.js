
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
import validateFarmerEditedData from '../../helpers/validateFarmerEditedData';

import { useUser } from "@realm/react";
import { realmContext } from '../../models/realmContext';
const {useRealm} = realmContext;


const EditFarmerData = ({  
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

    addressProvince,
    addressDistrict,
    addressAdminPost,
    addressVillage,

    addressOldProvince,
    addressOldDistrict,
    addressOldAdminPost,
    addressOldVillage,

    setAddressProvince,
    setAddressDistrict,
    setAddressAdminPost,
    setAddressVillage,
    selectedAddressAdminPosts,
    setSelectedAddressAdminPosts,
    setAddressOldProvince,
    setAddressOldDistrict,
    setAddressOldAdminPost,
    setAddressOldVillage,

    // contact
    primaryPhone,
    secondaryPhone,
    setPrimaryPhone,
    setSecondaryPhone,
    oldPrimaryPhone,
    oldSecondaryPhone,
    setOldPrimaryPhone,
    setOldSecondaryPhone,

    // idDocument
    docNumber, setDocNumber,
    docType, setDocType,
    nuit, setNuit,

    oldDocNumber, setOldDocNumber,
    oldDocType, setOldDocType,
   oldNuit, setOldNuit,

})=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    // // ----------------------------------------------------
    const [errors, setErrors] = useState({});
    const [overlayTitle, setOverlayTitle] = useState('');


    useEffect(()=>{
        if (dataToBeUpdated === 'address' && resourceName === 'Farmer'){
            setAddressProvince(customUserData?.userProvince);
            setAddressDistrict(customUserData?.userDistrict);
            setAddressAdminPost(resource?.address.adminPost);
            setAddressVillage(resource?.address.village);
            setOverlayTitle('Actualizar endereço.');

            setAddressOldProvince(customUserData?.userProvince);
            setAddressOldDistrict(customUserData?.userDistrict);
            setAddressOldAdminPost(resource?.address.adminPost);
            setAddressOldVillage(resource?.address.village);
        }

        if (dataToBeUpdated === 'contact' && resourceName === 'Farmer') {
            setPrimaryPhone(resource?.contact.primaryPhone);
            setSecondaryPhone(resource?.contact.secondaryPhone);
            setOverlayTitle('Actualizar contactos.');

            setOldPrimaryPhone(resource?.contact.primaryPhone);
            setOldSecondaryPhone(resource?.contact.secondaryPhone);
        }

        if (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') {
            setDocType(resource?.idDocument.docType);
            setDocNumber(resource?.idDocument.docNumber);
            setNuit(resource?.idDocument.nuit);

            setOverlayTitle('Actualizar Documentos de Identidade.');

            setOldDocType(resource?.idDocument.docType);
            setOldDocNumber(resource?.idDocument.docNumber);
            setOldNuit(resource?.idDocument.nuit);
        }

    }, [ dataToBeUpdated, resourceName ]);

    const onConfirmUpdate = (dataToBeUpdated, resourceName)=> {

        const validatedData = validateFarmerEditedData({
            addressAdminPost, addressVillage, primaryPhone,
            secondaryPhone, docType, docNumber, nuit,
            addressOldAdminPost, addressOldVillage, oldPrimaryPhone,
            oldSecondaryPhone, oldDocType, oldDocNumber, oldNuit,
        }, errors, setErrors, dataToBeUpdated, resourceName);

        const newData = {};
        const oldData = {};

        if (dataToBeUpdated === 'address' && resourceName === 'Farmer') {
            //  new incoming data
            newData['province'] = addressProvince;
            newData['district'] = addressDistrict;
            newData['adminPost'] = validatedData?.adminPost;
            newData['village'] = validatedData?.village;

            // old data
            oldData['province'] = addressOldProvince;
            oldData['district'] = addressOldDistrict;
            oldData['adminPost'] = addressOldAdminPost;
            oldData['village'] = addressOldVillage;
            
            setNewDataObject(newData);
            setOldDataObject(oldData);
        }

        if (dataToBeUpdated === 'contact' && resourceName === 'Farmer') {

            // new incoming data
            newData['primaryPhone'] = validatedData?.primaryPhone ? Number(parseInt(validatedData?.primaryPhone)) : 0;
            newData['secondaryPhone'] = validatedData?.secondaryPhone ? Number(parseInt(validatedData?.secondaryPhone)) : 0;


            // old data
            oldData['primaryPhone'] = oldPrimaryPhone ? Number(parseInt(oldPrimaryPhone)) : 0;
            oldData['secondaryPhone'] = oldSecondaryPhone ? Number(parseInt(oldSecondaryPhone)) : 0;
        

            setNewDataObject(newData);
            setOldDataObject(oldData);
        }


        if (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') {

            // new incoming data
            newData['docType'] = validatedData?.docType?.trim();
            newData['docNumber'] = validatedData?.docNumber ? validatedData?.docNumber : '';
            newData['nuit'] = validatedData?.nuit ? Number(parseInt(validatedData?.nuit)) : 0;

            // old data
            oldData['docType'] = oldDocType ? oldDocType : 'Não tem';
            oldData['docNumber'] = oldDocNumber ? oldDocNumber : '';
            oldData['nuit'] = oldNuit ? oldNuit : 0;

            setNewDataObject(newData);
            setOldDataObject(oldData);
        }

    }

    useEffect(()=>{
        if (docType === 'Não tem'){
            setDocNumber('');
        }
    }, [docType])


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
                justifyContent: 'center',
                maxHeight: '100%',
                // marginVertical: 10,
            }}
        >
                    <View
                        style={{ 
                            width: '100%', 
                            backgroundColor: COLORS.pantone, 
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
        (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') &&
        <Stack direction="column">
        <Stack >
          
            <FormControl my="2" isRequired isInvalid={'docType' in errors}>
                <FormControl.Label>Tipo do documento</FormControl.Label>
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
                                        ? <Icon name="close" size={20} color="grey" onPress={()=>setDocType('')} /> 
                                        : <Icon size={45} name="arrow-drop-down" color={COLORS.pantone} />
                                    }
                      mt={1}
                      onValueChange={newDocType => {
                        setErrors((prev)=>({
                            ...prev, 
                            docType: '',
                            docNumber: '',
                        }));
                        setDocType(newDocType);
                      }}
                  >
                {  
                idDocTypes?.map((docType)=><Select.Item key={docType} label={docType} value={docType} />)                 
                }
                </Select>
                {
                'docType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.docType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
           </Stack>
           <Stack>
           
{       !(docType === 'Não tem') &&  
           <FormControl my="3" isInvalid={'docNumber' in errors}>
                <FormControl.Label>Número do documento</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    isDisabled={(docType === 'Não tem' || docType === '') ? true : false }
                    value={docNumber?.toString()}
                    placeholder={docNumber ? docNumber?.toString() : 'Nenhum'}
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
            
            }

            </Stack>

            <Stack >
         
            <FormControl isInvalid={'nuit' in errors}>
                <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder={nuit ? nuit?.toString() : 'Nenhum'}
                    value={nuit?.toString()}
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
            </Stack>
        </Stack>

    }




    {/* update the farmer contacts  */}
    {
        (dataToBeUpdated === 'contact' && resourceName === 'Farmer') &&
            <Stack direction="column">
            <Box w="100%" 
                style={{
                    alignItems: 'center',
                }}
            >
            <FormControl my="1" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telemóvel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder={primaryPhone ? primaryPhone?.toString() : 'Nenhum'}
                    keyboardType="numeric"
                    value={primaryPhone ? primaryPhone?.toString() : ''}
                    onChangeText={newPhone=>{
                        setErrors((prev)=>({...prev, primaryPhone: ''}))                        
                        setPrimaryPhone(newPhone);
                    }}
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={20}
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
            <Box w="100%" 
                style={{
                    alignItems: 'center',
                }}
            
            >
            <FormControl my="1" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telemóvel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder={secondaryPhone ? secondaryPhone?.toString() : 'Nenhum'}
                    keyboardType="numeric"
                    value={secondaryPhone ? secondaryPhone?.toString() : ''}
                    onChangeText={(newPhone=>{
                        setErrors((prev)=>({...prev, secondaryPhone: ''}))
                        setSecondaryPhone(newPhone)
                    })
                    }
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={20}
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
    }




    {/*  update the farmer address */}

{
    (dataToBeUpdated === 'address' && resourceName === 'Farmer') &&
    <Box> 
        <Stack>            
            <FormControl isRequired my="1" isInvalid={'addressAdminPost' in errors}>
                <FormControl.Label>Posto Adm.</FormControl.Label>
                    <Select
                        selectedValue={addressProvince ? addressAdminPost: ''}
                        accessibilityLabel="Escolha um posto administrativo"
                        placeholder="Escolha um posto administrativo"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={addressAdminPost 
                            ? <Icon name="close" size={20} color="grey" onPress={()=>setAddressAdminPost('')} /> 
                            : <Icon size={45} name="arrow-drop-down" color={COLORS.pantone} />
                        }
                        mt={1}
                    onValueChange={newAdminPost=> {
                        setErrors((prev)=>({...prev, addressAdminPost: ''}));
                        setAddressAdminPost(newAdminPost);
                    }}
                    >
                    {
                        administrativePosts[addressDistrict]?.map((adminPost, index)=>(
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
        </Stack>
        <Stack>
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
                                        ? <Icon name="close" size={20} color="grey" onPress={()=>setAddressVillage('')} /> 
                                        : <Icon size={45} name="arrow-drop-down" color={COLORS.pantone} />
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
        </Stack>
    </Box>
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
                if(!validateFarmerEditedData({
                    addressAdminPost, addressVillage, primaryPhone,
                    secondaryPhone, docType, docNumber, nuit,
                    addressOldAdminPost, addressOldVillage, oldPrimaryPhone,
                    oldSecondaryPhone, oldDocType, oldDocNumber, oldNuit,
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


    
export default EditFarmerData;