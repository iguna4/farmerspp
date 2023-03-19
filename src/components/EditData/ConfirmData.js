
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, } from 'react-native';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { Overlay, Icon, Button } from "@rneui/base";
import COLORS from "../../consts/colors";
import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";
import { resourceValidation } from '../../consts/resourceValidation';

import { useUser } from "@realm/react";
import { realmContext } from '../../models/realmContext';
const {useRealm} = realmContext;

const ConfirmData = ({  
    setIsOverlayVisible,
    isConfirmDataVisible, 
    setIsConfirmDataVisible,
    newDataObject,
    oldDataObject,
    dataToBeUpdated,
    resourceName,
    ownerName,
    resource,
})=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    // console.log('newDataObject: ', newDataObject);
    // console.log('oldDataObject: ', oldDataObject);

    const onUpdateData = (resource, newDataObject, realm, dataToBeUpdated, resourceName) =>{

        realm.write(()=>{
            if (dataToBeUpdated === 'address' && resourceName === 'Farmer') {
                resource.address = newDataObject;
                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;


            }

            if (dataToBeUpdated === 'contact' && resourceName === 'Farmer') {
                resource.contact = newDataObject;
                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }


            if (dataToBeUpdated === 'idDocument' && resourceName === 'Farmer') {
                resource.idDocument = newDataObject;
                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }
        })

    }

    const toggleOverlay = () => {
        setIsConfirmDataVisible(!isConfirmDataVisible);
      };

    return (

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '90%',
            borderRadius: 10,
        }}
        isVisible={isConfirmDataVisible} 
        onBackdropPress={toggleOverlay}
        >
        <View
            style={{
                // minHeight: '70%',
                justifyContent: 'center',
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
                    setIsConfirmDataVisible(false);
                }}
                name="close" 
                size={30} 
                color={COLORS.ghostwhite} 
                />
        </View>


        {  (dataToBeUpdated === 'idDocument' &&  resourceName === 'Farmer') &&        
            <Box
                style={{
                    paddingVertical: 30,
                    // alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Documentos de Identificação Anteriores</Text>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Tipo do documento</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.docType ? oldDataObject?.docType : 'Nenhum' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número do documento</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.docNumber ? oldDataObject?.docNumber : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.nuit ? oldDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack>

                <Box
                    style={{
                        paddingVertical: 20,
                    }}
                > 


                </Box>
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Documentos de Identificação Actuais</Text>

                <Stack direction="row">
                    <Box w="50%">
                        <Text>Tipo do documento</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.docType ? newDataObject?.docType : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Telemóvel alternativo</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.docNumber ? newDataObject?.docNumber : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.nuit ? newDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack>
            </Box>
        }



        {  (dataToBeUpdated === 'contact' &&  resourceName === 'Farmer') &&        
            <Box
                style={{
                    paddingVertical: 30,
                    // alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Contacto Anterior</Text>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Telemóvel principal</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.primaryPhone ? oldDataObject?.primaryPhone : 'Nenhum' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Telemóvel alternativo</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.secondaryPhone ? oldDataObject?.secondaryPhone : 'Nenhum'}</Text>
                    </Box>
                </Stack>

                <Box
                    style={{
                        paddingVertical: 20,
                    }}
                > 


                </Box>
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Contacto Actual</Text>

                <Stack direction="row">
                    <Box w="50%">
                        <Text>Telemóvel principal</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.primaryPhone ? newDataObject?.primaryPhone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Telemóvel alternativo</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.secondaryPhone ? newDataObject?.secondaryPhone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
            </Box>
        }



        {  (dataToBeUpdated === 'address' &&  resourceName === 'Farmer') &&        
            <Box
                style={{
                    paddingVertical: 30,
                    // alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Endereço Anterior</Text>
                <Stack direction="row">
                    <Box w="40%">
                        <Text>Posto Admin.</Text>
                    </Box>
                    <Box w="60%">
                        <Text>{oldDataObject?.adminPost}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="40%">
                        <Text>Localidade</Text>
                    </Box>
                    <Box w="60%">
                        <Text>{oldDataObject?.village}</Text>
                    </Box>
                </Stack>

                <Box
                    style={{
                        paddingVertical: 20,
                    }}
                > 


                </Box>
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        paddingBottom: 5,
                    }}
                >Endereço Actual</Text>

                <Stack direction="row">
                    <Box w="40%">
                        <Text>Posto Admin.</Text>
                    </Box>
                    <Box w="60%">
                        <Text>{newDataObject?.adminPost}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="40%">
                        <Text>Localidade</Text>
                    </Box>
                    <Box w="60%">
                        <Text>{newDataObject?.village}</Text>
                    </Box>
                </Stack>
            </Box>
        }
        </View>
        <Button
            title="Actualizar"
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

                try {
                    onUpdateData(resource, newDataObject, realm, dataToBeUpdated, resourceName)
                } catch (error) {
                    console.log('Could not update data', { cause: error })
                    
                }
                finally{
                    setIsConfirmDataVisible(false);
                    // toggleOverlay();
                    // setIsOverlayVisible(false);
                }
            }}
        />
    </Overlay>

    )
}

const styles = StyleSheet.create({
    button: {
      margin: 10,
    },
    textPrimary: {
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20,
    },
    textSecondary: {
      marginBottom: 10,
      textAlign: 'center',
    //   color: 'ghostwhite',
      fontSize: 17,
    },
    });

    
export default ConfirmData;