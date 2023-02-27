import React, { useState, useEffect, } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Avatar, Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import CustomDivider from '../Divider/CustomDivider';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';

import AwesomeAlert from 'react-native-awesome-alerts';
import { resourceValidation } from '../../consts/resourceValidation';
import EditData from '../EditData/EditData';
import { roles } from '../../consts/roles';
import { errorMessages } from '../../consts/errorMessages';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 



const FarmlandData = ({ farmland })=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const navigation = useNavigation();
    
    // ------------------------------------------
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [validated, setValidated] = useState(false);
    const [invalidated, setInvalidated] = useState(false);

    // ---------------------------------------------

    const validationAction = (realm, resourceId, flag)=>{
        realm.write(()=>{
            const foundFarmland = realm.objectForPrimaryKey('Farmland', `${resourceId}`);
            if (flag === 'validate'){
                foundFarmland.validated = resourceValidation.status.validated;
                foundFarmland.validatedBy = customUserData?.name;
            }
            else if (flag === 'invalidate') {
                foundFarmland.validated = resourceValidation.status.invalidated;
                foundFarmland.validatedBy = customUserData?.name;
            }
        });
    };

    useEffect(()=>{

    }, [ realm, ]);


    return (
        <View
            style={{
                paddingVertical: 10,
            }}
        >
        <AwesomeAlert
            show={alert}
            
            titleStyle={{
                fontSize: 20,
                paddingVertical: 15,
                color: COLORS.ghostwhite,
                fontWeight: 'bold',
                marginBottom: 20,
                backgroundColor: COLORS.main,
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
                // height: '70%',
            }}

            contentStyle={{
                // flex: 1,
                paddingVertical: 20,
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
            confirmButtonColor={COLORS.main}
            onCancelPressed={()=>{
                setAlert(false);
                setValidated(false);
                setInvalidated(false);
            }}
            onConfirmPressed={() => {
                setAlert(false);
                if (validated){
                    validationAction(realm, farmland?._id, 'validate');
                    setValidated(false);
                }
                else if (invalidated){
                    validationAction(realm, farmland?._id, 'invalidate');
                    setInvalidated(false);
                }
            }}
        />



    <Collapse
        style={{
            flex: 1,
        }}
    >
        <CollapseHeader
            style={{                     
                minHeight: 100,
                paddingTop: 24,
                backgroundColor: COLORS.second,
                paddingHorizontal: 10,
            }}
        >
            <View
                style={{
                }}
            >
                <Text
                    style={{ 
                        fontSize: 18, 
                        color: COLORS.ghostwhite,
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Ano de Plantio : {farmland.plantingYear}
                </Text>
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: COLORS.ghostwhite,
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'right',
                    }}
                    >
                    {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                </Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <View
            style={{
                marginBottom: 40,
                padding: 10,
                borderColor: COLORS.main,
                shadowColor: COLORS.main,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 3,
                paddingLeft: 20,
            }}
        >

        <Box
            style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 1,
            flexDirection: 'row',
            borderColor: farmland?.validated === resourceValidation.status.pending ? COLORS.danger : farmland?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red,
            borderWidth: 2,
            borderRadius: 10,
            }}
        >
            <Icon 
                name={farmland?.validated === resourceValidation.status.pending ? 'pending-actions' : farmland?.validated === resourceValidation.status.validated ? 'check-circle' : 'dangerous'}
                size={25}
                color={farmland?.validated === resourceValidation.status.pending ? COLORS.danger : farmland?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red}
            />
            <Text
                style={{
                    color: farmland?.validated === resourceValidation.status.pending ? COLORS.danger : farmland?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red,
                }}
            >
            {farmland?.validated === resourceValidation.status.pending ? resourceValidation.message.pendingResourceMessage : farmland?.validated === resourceValidation.status.validated ? resourceValidation.message.validatedResourceMessage : resourceValidation.message.invalidatedResourceMessage}
            </Text>
        </Box>

        <Stack w="100%" direction="column" py="4">
            <Text
                style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Bold',
                    
                }}
            >
                Descrição
            </Text>

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    {/* Descrição: */}
                </Text>
                </Box>
                <Box w="70%">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmland.description}
                    </Text>
                </Box>
            </Stack>
        </Stack>
        <CustomDivider />

        <Stack w="100%" direction="column" py="4">

            <Stack w="100%" direction="row" >
            <Box w="50%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Cajueiros
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            setIsOverlayVisible(!isOverlayVisible);
                        }
                    }
                >
                <Icon 
                    // name="home" 
                    name="edit" 
                    size={20} 
                    color={farmland?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                />
                </TouchableOpacity>
            </Box>
        </Stack>

            <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Árvores:
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {farmland.trees}
                    </Text>
                </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Idade:
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {new Date().getFullYear() - farmland.plantingYear} anos
                    </Text>
                </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Compasso:
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {farmland.density.mode} {farmland.density.mode === 'Regular' ? ( '( ' + farmland.density?.length + ' x ' + farmland.density?.width + ' )' ) : ''}
                    </Text>
                </Box>
        </Stack>


        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Tipo de plantas:
                </Text>
                </Box>
                <Box w="70%">

                { 
                (
                    farmland.plantTypes?.plantType.length > 0 &&
                    
                    farmland.plantTypes?.plantType?.map(plant=>{
                        return (
                            <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            key={plant}>
                                - {plant}
                            </Text>
                        )
                    })
                    )
                    }
                    {
                        (
                            farmland.plantTypes?.plantType.length === 0 &&
                            <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}>
                                (Desconhecido)
                            </Text>
                        )
                    }
                </Box>
        </Stack>
    {
        farmland.plantTypes?.plantType?.some(el=>el.includes('enxer')) &&

        <Stack w="100%" direction="row">
        <Box w="30%">
        <Text
            style={{
                color: COLORS.grey,
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
                
            }}
            >
            Clones:
        </Text>
        </Box>
        <Box w="70%">
            {
            farmland.plantTypes?.clones?.map(c=>
                (<Text key={c}                
                    style={{
                        color: COLORS.grey,
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                        // paddingLeft: 10,
                    }}>
                    {c === 'Desconhecido' ? '(Desconhecido)' : `- ${c}`}
                </Text>))
            }
        </Box>
        </Stack>

    }
        </Stack>

    <CustomDivider />
    <Stack w="100%" direction="column" py="4">

        <Stack w="100%" direction="row" >
            <Box w="50%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Culturas consociadas
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            
                        }
                    }
                >
                <Icon 
                    // name="home" 
                    name="edit" 
                    size={20} 
                    color={farmland?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                />
                </TouchableOpacity>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
            <Box w="30%" >
            <Text
                style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                    
                }}
                >
                {/* Culturas consociadas: */}
            </Text>
            </Box>
            <Box w="70%">
            {          
                (
                    farmland.consociatedCrops.length === 0
                    ||
                    farmland.consociatedCrops.some((crop)=>crop === 'Nenhuma')   
                ) &&      
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            (Nenhuma)
                        </Text>
            }

{
    (
        farmland.consociatedCrops.length > 0
  
    ) && 
    farmland.consociatedCrops?.map(c=>
        (<Text key={c}                             
            style={{
                color: COLORS.grey,
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
                // paddingLeft: 10,
            }}>
            - {c}
        </Text>))
}
            </Box>
        </Stack>
    </Stack>
    <CustomDivider />
        
    <Stack w="100%" direction="column" py="4">
        <Stack w="100%" direction="row" >
            <Box w="50%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Área
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            
                        }
                    }
                >
                <Icon 
                    // name="home" 
                    name="edit" 
                    size={20} 
                    color={farmland?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                />
                </TouchableOpacity>
            </Box>
        </Stack>

       <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Total declarada:
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.totalArea} hectares
                </Text>
            </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Aproveitada:
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.usedArea} hectares
                </Text>
            </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Auditada:
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.auditedArea ? `${farmland.auditedArea} hectares` : '(Desconhecida)'}
                </Text>
            </Box>
        </Stack>
    </Stack>

    <CustomDivider />
     
    <Stack w="100%" direction="column" py="4">
        <Stack w="100%" direction="row" >
            <Box w="50%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Coordenadas
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{

                    }}
                    onPress={
                        ()=>navigation.navigate('FarmlandAreaAudit', {
                            farmlandId: farmland._id,
                        })
                    }
                >
                    <Icon 
                        name="add-location-alt" 
                        size={30} 
                        color={COLORS.main}
                        // color={farmland?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                    />
                </TouchableOpacity>
            </Box>
        </Stack>
{
    farmland.extremeCoordinates.length > 0 &&
    farmland.extremeCoordinates?.map((coords)=>{
        return (
           <Stack key={coords.position} w="100%" direction="row">
                <Box w="30%">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Ponto {coords.position} 
                    </Text>
                </Box>
                <Box w="70%">
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Latitude: {coords.latitude}
                    </Text>
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Longitude: {coords.longitude}
                    </Text>
                </Box>
            </Stack>
        )
    })
}
{
    farmland.extremeCoordinates.length === 0 &&
    (
        <Stack  w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: COLORS.grey,
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}
                >
                {/*  */}
            </Text>
        </Box>
        <Box w="70%">
            <Text                     
                style={{
                    color: COLORS.grey,
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}
                >
                (Nenhumas)
            </Text>
        </Box>
    </Stack>
    )

}

</Stack>

<CustomDivider />

<Stack direction="column" w="100%" style={{ paddingTop: 5,  }} >
      <Box w="100%">
        <Text 
          style={{ 
            textAlign: 'right',
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Italic',
            fontSize: 12,
          }}
          >
          Registo:{' '}                 
          {new Date(farmland.createdAt).getDate()}-{new Date(farmland.createdAt).getMonth()+1}-{new Date(farmland.createdAt).getFullYear()}
          {' '} por {farmland?.userName === customUserData?.name ? 'mim' : farmland?.userName}
        </Text>
      </Box>
      {
    farmland?.validated === resourceValidation.status.invalidated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Invalidado por {farmland?.validatedBy}
            </Text>
        </Box>
    }
    {
    farmland?.validated === resourceValidation.status.validated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Validado por {farmland?.validatedBy}
            </Text>
        </Box>
    }

</Stack>


{ (customUserData?.role === roles.provincialManager) && (farmland?.validated !== resourceValidation.status.validated ) &&
<Stack direction="row" w="100%" style={{ paddingTop: 5,  }} space={6} >
        <Box w="50%"
            style={{
                alignItems: 'center',
            }}
            >
            <TouchableOpacity
                disabled={farmland?.validated === resourceValidation.status.validated ? true : false}
                onPress={()=>{
                    // validationAction(realm, farmer._id, 'validate');
                    setAlert(true);
                    setValidated(true);
                    setTitleAlert(errorMessages.resourceValidation.title);
                    setMessageAlert(errorMessages.resourceValidation.message);
                    setShowCancelButton(errorMessages.resourceValidation.showCancelButton);
                    setShowConfirmButton(errorMessages.resourceValidation.showConfirmButton);
                    setCancelText(errorMessages.resourceValidation.cancelText);
                    setConfirmText(errorMessages.resourceValidation.confirmText);
                }}
            >
                <Text
                    style= {{
                        color: farmland.validated === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.main,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                    }}
                >
                    Validar Registo
                </Text>
            </TouchableOpacity>
        </Box>
        <Box w="50%"
            style={{
                alignItems: 'center',
                paddingRight: 10,
            }}
        >
            <TouchableOpacity
                disabled={farmland?.validated === resourceValidation.status.validated ? true : false}
                onPress={()=>{
                    setAlert(true);
                    setInvalidated(true);
                    setTitleAlert(errorMessages.resourceInvalidation.title);
                    setMessageAlert(errorMessages.resourceInvalidation.message);
                    setShowCancelButton(errorMessages.resourceInvalidation.showCancelButton);
                    setShowConfirmButton(errorMessages.resourceInvalidation.showConfirmButton);
                    setCancelText(errorMessages.resourceInvalidation.cancelText);
                    setConfirmText(errorMessages.resourceInvalidation.confirmText);
                }}
            >
                <Text
                    style= {{
                        color: farmland?.validated === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.red,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                    }}
                >
                    Invalidar Registo
                </Text>
            </TouchableOpacity>

        </Box>
    </Stack>
}


</View>

{
    isOverlayVisible && 
    (
    <EditData 
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
        ownerName={farmland?.description}
    />
    )
}

    </CollapseBody>
</Collapse>  
</View>
    )
}

export default FarmlandData;