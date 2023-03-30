
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
    // setIsOverlayVisible,
    isConfirmDataVisible, 
    setIsConfirmDataVisible,

    newDataObject,
    oldDataObject,

    dataToBeUpdated,

    resourceName,
    ownerName,
    resource,

    blockId,
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


            if (dataToBeUpdated === 'institutionDocument' && resourceName === 'Institution') {
                resource.nuit = newDataObject?.nuit;
                resource.licence = newDataObject?.licence;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }


            if (dataToBeUpdated === 'institutionManager' && resourceName === 'Institution') {
                resource.manager.fullname = newDataObject?.fullname;
                resource.manager.phone = newDataObject?.phone;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }

            if (dataToBeUpdated === 'groupManager' && resourceName === 'Group') {
                resource.manager.fullname = newDataObject?.fullname;
                resource.manager.phone = newDataObject?.phone;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }

            if (dataToBeUpdated === 'groupMembers' && resourceName === 'Group') {
                resource.operationalStatus = newDataObject?.operationalStatus;
                resource.numberOfMembers.total = newDataObject?.total;
                resource.numberOfMembers.women = newDataObject?.women;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }

            if (dataToBeUpdated === 'groupIdentity' && resourceName === 'Group') {
                resource.affiliationYear = newDataObject?.affiliationYear;
                resource.creationYear = newDataObject?.creationYear;
                resource.legalStatus = newDataObject?.legalStatus;
                resource.licence = newDataObject?.licence;
                resource.nuit = newDataObject?.nuit;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }

            if (dataToBeUpdated === 'groupType' && resourceName === 'Group') {
                resource.name = newDataObject?.name;
                resource.type = newDataObject?.type;
                resource.assets = newDataObject?.goals?.map(goal=>({assetType: 'Caju', category: 'Grupo', subcategory: goal,}));

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;
                resource.status = resourceValidation.status.pending;
            }

            if (dataToBeUpdated === 'farmlandMainData' && resourceName === 'Farmland') {
                resource.description = newDataObject?.description;
                resource.consociatedCrops = newDataObject?.consociatedCrops;
                resource.trees = newDataObject?.trees;
                resource.totalArea = newDataObject?.totalArea;

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                // resource.userProvince = newData?.province;
                // resource.userDistrict = newData?.district;

                resource.status = resourceValidation.status.pending;
            }


            if (dataToBeUpdated === 'blockData' && resourceName === 'Farmland') {
                const block = resource?.blocks.find((block)=>block._id === blockId);

                console.log('block to be updated:', block);

                resource.modifiedAt = new Date();
                resource.modifiedBy = customUserData?.name;
                resource.status = resourceValidation.status.pending;
            }

        });

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

    {/* farmland block */}
    
    {
        (dataToBeUpdated === 'blockData' && resourceName === 'Farmland') &&
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
        >
            Dados Anteriores do Bloco de Cajueiros
        </Text>

        <Stack direction="row">
            <Box w="50%">
                <Text>Área aproveitada</Text>
            </Box>
            <Box w="50%">
               <Text>{oldDataObject?.usedArea ? `${oldDataObject?.usedArea} hectares` : 'Nenhum'}</Text>
            </Box>
        </Stack>
        <Stack direction="row">
            <Box w="50%">
                <Text>Compasso</Text>
            </Box>
            <Box w="50%">
                <Text>
                    {oldDataObject.density?.mode ? oldDataObject.density.mode : 'Nenhum'}
                    {oldDataObject.density?.mode === 'Regular' && `(${oldDataObject.density?.width} x ${oldDataObject.density?.length} metros)`}
                </Text>
            </Box>
        </Stack>

        <Stack direction="row">
            <Box w="50%">
                <Text>Cajueiros</Text>
            </Box>
            <Box w="50%">
                <Text>{oldDataObject.trees ? `${oldDataObject.trees} árvores` : 'Nenhum'}</Text>
            </Box>
        </Stack>
   
        <Stack direction="row">
            <Box w="50%">
               <Text></Text>
            </Box>
            <Box w="50%">
               <Text></Text>
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
        >
            Dados Actuais do Pomar
        </Text>
    
        <Stack direction="row">
            <Box w="50%">
                <Text>Descrição</Text>
            </Box>
            <Box w="50%">
                <Text></Text>
            </Box>
        </Stack>
        <Stack direction="row">
            <Box w="50%">
                <Text>Culturas consociadas</Text>
            </Box>
            <Box w="50%">
               <Text></Text>
            </Box>
        </Stack>
        <Stack direction="row">
            <Box w="50%">
                <Text>Área total</Text>
            </Box>
            <Box w="50%">
               <Text></Text>
            </Box>
        </Stack>
        <Stack direction="row">
            <Box w="50%">
                <Text>N° de cajueiros</Text>
            </Box>
            <Box w="50%">
               <Text></Text>
            </Box>
        </Stack> 
        </Box>
        
    }


{/* farmland data updating */}

{
     (dataToBeUpdated === 'farmlandMainData' && resourceName === 'Farmland') &&
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
     >
         Dados Anteriores do Pomar
     </Text>
     <Stack direction="row">
         <Box w="50%">
             <Text>Descrição</Text>
         </Box>
         <Box w="50%">
             <Text>{oldDataObject?.description ? oldDataObject?.description : 'Nenhuma' }</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>Culturas consociadas</Text>
         </Box>
         <Box w="50%">
            <Text>{oldDataObject?.consociatedCrops?.length > 0 ? oldDataObject?.consociatedCrops?.join('; ') : 'Nenhuma'}</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>Área total</Text>
         </Box>
         <Box w="50%">
            <Text>{oldDataObject?.totalArea ? oldDataObject?.totalArea : 'Nenhuma'}</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>N° de cajueiros</Text>
         </Box>
         <Box w="50%">
            <Text>{oldDataObject?.trees ? oldDataObject?.trees : 'Nenhum'}</Text>
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
     >
         Dados Actuais do Pomar
     </Text>
 
     <Stack direction="row">
         <Box w="50%">
             <Text>Descrição</Text>
         </Box>
         <Box w="50%">
             <Text>{newDataObject?.description ? newDataObject?.description : 'Nenhuma' }</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>Culturas consociadas</Text>
         </Box>
         <Box w="50%">
            <Text>{newDataObject?.consociatedCrops?.length > 0 ? newDataObject?.consociatedCrops?.join('; ') : 'Nenhuma'}</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>Área total</Text>
         </Box>
         <Box w="50%">
            <Text>{newDataObject?.totalArea ? newDataObject?.totalArea : 'Nenhuma'}</Text>
         </Box>
     </Stack>
     <Stack direction="row">
         <Box w="50%">
             <Text>N° de cajueiros</Text>
         </Box>
         <Box w="50%">
            <Text>{newDataObject?.trees ? newDataObject?.trees : 'Nenhum'}</Text>
         </Box>
     </Stack> 
     </Box>
}



        {/* groups data updating  */}

{
    (dataToBeUpdated === 'groupType' && resourceName === 'Group') &&

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
    >
        Tipo de Grupo Anterior
    </Text>
    <Stack direction="row">
        <Box w="50%">
            <Text>Nome</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.name ? oldDataObject?.name : 'Nenhum' }</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Tipo</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.type ? oldDataObject?.type : 'Nenhum'}</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Finalidade</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.goals?.length > 0 ? oldDataObject?.goals?.join('; ') : 'Nenhuma'}</Text>
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
    >
        Tipo de Grupo Actual
    </Text>

    <Stack direction="row">
        <Box w="50%">
            <Text>Nome</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.name ? newDataObject?.name : 'Nenhum' }</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Tipo</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.type ? newDataObject?.type : 'Nenhum'}</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Finalidade</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.goals?.length > 0 ? newDataObject?.goals?.join('; ') : 'Nenhuma'}</Text>
        </Box>
    </Stack>

    </Box>

}



{
    (dataToBeUpdated === 'groupIdentity' &&  resourceName === 'Group') && 
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
    >
        Identidade Anterior
    </Text>
    <Stack direction="row">
        <Box w="50%">
            <Text>Situação Legal</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.legalStatus ? oldDataObject?.legalStatus : 'Nenhum' }</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Ano de Criação</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.creationYear ? oldDataObject?.creationYear : 'Nenhum'}</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Ano de Legalização</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.affiliationYear ? oldDataObject?.affiliationYear : 'Nenhum'}</Text>
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

    <Stack direction="row">
        <Box w="50%">
            <Text>Alvará</Text>
        </Box>
        <Box w="50%">
            <Text>{oldDataObject?.licence ? oldDataObject?.licence : 'Nenhum'}</Text>
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
    >
        Identidade Actual
    </Text>

    <Stack direction="row">
        <Box w="50%">
            <Text>Situação Legal</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.legalStatus ? newDataObject?.legalStatus : 'Nenhum' }</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Ano de Criação</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.creationYear ? newDataObject?.creationYear : 'Nenhum'}</Text>
        </Box>
    </Stack>
    <Stack direction="row">
        <Box w="50%">
            <Text>Ano de Legalização</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.affiliationYear ? newDataObject?.affiliationYear : 'Nenhum'}</Text>
        </Box>
    </Stack>

    <Stack direction="row">
        <Box w="50%">
            <Text>NUIT</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.nuit ? newDataObject.nuit : 'Nenhum'}</Text>
        </Box>
    </Stack>

    <Stack direction="row">
        <Box w="50%">
            <Text>Alvará</Text>
        </Box>
        <Box w="50%">
            <Text>{newDataObject?.licence ? newDataObject?.licence : 'Nenhum'}</Text>
        </Box>
    </Stack>
    </Box>
}


        {  (dataToBeUpdated === 'groupMembers' &&  resourceName === 'Group') &&        
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
                >Efectividade Anterior</Text>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Modo de Funcionamento</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.operationalStatus ? 'Activo' : 'Inactivo' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Total de Membros</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.total ? oldDataObject?.total : 0}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Total de Mulheres </Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.women ? oldDataObject?.women : 0}</Text>
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
                >Efectividade Actual</Text>

                <Stack direction="row">
                    <Box w="50%">
                        <Text>Modo de Funcionamento</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.operationalStatus ? 'Activo' : 'Inactivo'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Total de Membros</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.total ? newDataObject?.total : 0}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Total de Mulheres</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.women ? newDataObject?.women : 0}</Text>
                    </Box>
                </Stack>
            </Box>
        }




        {  (dataToBeUpdated === 'groupManager' &&  resourceName === 'Group') &&        
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
                        <Text>Nome do Presidente</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.fullname ? oldDataObject?.fullname : 'Nenhum' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número de telemóvel</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.phone ? oldDataObject?.phone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.nuit ? oldDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}

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
                        <Text>Nome do Presidente</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.fullname ? newDataObject?.fullname : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número de telemóvel</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.phone ? newDataObject?.phone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.nuit ? newDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}
            </Box>
        }



        {/* Institutions data updating  */}

        {  (dataToBeUpdated === 'institutionManager' &&  resourceName === 'Institution') &&        
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
                        <Text>Nome do Responsável</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.fullname ? oldDataObject?.fullname : 'Nenhum' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número de telemóvel</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.phone ? oldDataObject?.phone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.nuit ? oldDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}

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
                        <Text>Nome do Responsável</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.fullname ? newDataObject?.fullname : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número de telemóvel</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.phone ? newDataObject?.phone : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.nuit ? newDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}
            </Box>
        }




        {  (dataToBeUpdated === 'institutionDocument' &&  resourceName === 'Institution') &&        
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
                >Documentação Anterior</Text>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT da instituição</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.nuit ? oldDataObject?.nuit : 'Nenhum' }</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número do alvará</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.licence ? oldDataObject?.licence : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{oldDataObject?.nuit ? oldDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}

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
                >Documentação Actual</Text>

                <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT da instituição</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.nuit ? newDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="50%">
                        <Text>Número do alvará</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.licence ? newDataObject?.licence : 'Nenhum'}</Text>
                    </Box>
                </Stack>
                {/* <Stack direction="row">
                    <Box w="50%">
                        <Text>NUIT</Text>
                    </Box>
                    <Box w="50%">
                        <Text>{newDataObject?.nuit ? newDataObject?.nuit : 'Nenhum'}</Text>
                    </Box>
                </Stack> */}
            </Box>
        }




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
                        <Text>Número do documento</Text>
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