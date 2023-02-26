import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import CustomDivider from '../../components/Divider/CustomDivider';
import COLORS from '../../consts/colors';
import { TouchableOpacity } from 'react-native';
import EditData from '../EditData/EditData';
import { errorMessages } from '../../consts/errorMessages';
import { roles } from '../../consts/roles';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import { resourceValidation } from '../../consts/resourceValidation';
const { useRealm, useQuery, useObject } = realmContext; 

const PersonalData = ({ farmer })=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    // ------------------------------------------
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [errorFlag, seterrorFlag] = useState(null);
    const [validated, setValidated] = useState(false);
    const [invalidated, setInvalidated] = useState(false);

    // ---------------------------------------------

    const validationAction = (realm, resourceId, flag)=>{
        realm.write(()=>{
            const foundFarmer = realm.objectForPrimaryKey('Farmer', `${resourceId}`);
            // console.log('foundFarmer: ', JSON.stringify(foundFarmer));
            if (flag === 'validate'){
                foundFarmer.validated = resourceValidation.status.validated;
                foundFarmer.validatedBy = customUserData?.name;
            }
            else if (flag === 'invalidate') {
                foundFarmer.validated = resourceValidation.status.invalidated;
                foundFarmer.validatedBy = customUserData?.name;
            }
        });
    };

    useEffect(()=>{

    }, [ realm, ])

    return (
        <>
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
                        validationAction(realm, farmer?._id, 'validate');
                        setValidated(false);
                    }
                    else if (invalidated){
                        validationAction(realm, farmer?._id, 'invalidate');
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
                backgroundColor: COLORS.main,
                paddingHorizontal: 10,
                marginVertical: 10,
                
                
            }}
            >
            <View
                style={{
                    
                }}
                >
                <Text
                    style={{ 
                        fontSize: 18, 
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',
                        

                    }}
                    >
                    Dados Pessoais
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
            borderColor: farmer?.validated === resourceValidation.status.pending ? COLORS.danger : farmer?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red,
            borderWidth: 2,
            borderRadius: 10,
            }}
        >
            <Icon 
                name={farmer?.validated === resourceValidation.status.pending ? 'pending-actions' : farmer?.validated === resourceValidation.status.validated ? 'check-circle' : 'dangerous'}
                size={25}
                color={farmer?.validated === resourceValidation.status.pending ? COLORS.danger : farmer?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red}
            />
            <Text
                style={{
                    color: farmer?.validated === resourceValidation.status.pending ? COLORS.danger : farmer?.validated === resourceValidation.status.validated ? COLORS.main : COLORS.red,
                }}
            >
            {farmer?.validated === resourceValidation.status.pending ? resourceValidation.message.pendingResourceMessage : farmer?.validated === resourceValidation.status.validated ? resourceValidation.message.validatedResourceMessage : resourceValidation.message.invalidatedResourceMessage}
            </Text>
        </Box>

        <Stack w="100%" direction="column" pt="8" pb="4">
            <Stack w="100%" direction="row">

            <Box w="50%">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Nascimento
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
                        color={farmer?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmer?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                        />
                </TouchableOpacity>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                            
                        }}
                        >
                    Data:</Text>
                </Box>
                <Box w="70%">
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            // paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {new Date(farmer?.birthDate).toLocaleDateString()}{' '}({new Date().getFullYear() - new Date(farmer?.birthDate).getFullYear()} anos)
                    </Text>
                </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                    { farmer?.birthPlace?.province?.includes('Estrangeiro') ? 'País' : 'Província' }
                </Text>  
            </Box>
        <Box>
    {   farmer?.birthPlace?.province &&
                    <Text                         
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        //  paddingLeft: 10,
                        fontFamily: 'JosefinSans-Regular',
                        }} >
                            {farmer?.birthPlace?.province}
                        </Text>
    }
    </Box>
    </Stack>
{
    !farmer?.birthPlace?.province?.includes('Estrangeiro') &&
    <>
    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Distrito
            </Text>  
        </Box>
        <Box>
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                {farmer?.birthPlace?.district ? farmer?.birthPlace?.district : '(Não Aplicável)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Posto Admin.
            </Text>  
        </Box>
        <Box>
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                {farmer?.birthPlace?.adminPost ? farmer?.birthPlace?.adminPost : '(Não Aplicável)' }
            </Text>  
        </Box>
    </Stack>
    </>
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
                    Endereço
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
                        color={farmer?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmer?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                    />
                </TouchableOpacity>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Província
                </Text>  
            </Box>
        <Box>
    {   farmer?.address?.province &&
        <Text                         
            style={{
                color: 'grey',
                fontSize: 14,
                //  paddingLeft: 10,
                fontFamily: 'JosefinSans-Regular',
            }} 
        >
            {farmer?.address?.province}
        </Text>
    }
    </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Distrito
            </Text>  
        </Box>
        <Box>
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                {farmer?.address?.district ? farmer?.address?.district : '(Não Aplicável)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Posto Admin.
            </Text>  
        </Box>
        <Box>
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                {farmer?.address?.adminPost ? farmer?.address?.adminPost : '(Não Aplicável)' }
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Localidade
            </Text>  
        </Box>
        <Box>
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                {farmer?.address?.village ? farmer?.address?.village : '(Não Aplicável)' }
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
                        Contacto
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
                            // name="contacts" 
                            name="edit"
                            size={20} 
                            color={farmer?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmer?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main }
                        />
                    </TouchableOpacity>
                </Box>
            </Stack>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Telefone
                </Text>  
            </Box>
        <Box>

        <Text 
            style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
            }}  
        >
            {!(farmer?.contact?.primaryPhone || farmer?.contact?.secondaryPhone) && '(Nenhum).'}    
        </Text> 
        { farmer?.contact?.primaryPhone !== 0  &&
            <Text 
                style={{
                    color: 'grey',
                    fontSize: 14,
                    // paddingLeft: 10,
                    fontFamily: 'JosefinSans-Regular',
                }}  
            >
                {farmer?.contact?.primaryPhone} (principal)
            </Text>
        }
        {
        farmer?.contact?.secondaryPhone !== 0 &&
            <Text 
                style={{
                    color: 'grey',
                    fontSize: 14,
                    // paddingLeft: 10,
                    fontFamily: 'JosefinSans-Regular',
                }}  
                >
                {farmer?.contact?.secondaryPhone} (alternativo)
            </Text>    
        }
    </Box>
    </Stack>

    </Stack>
   
    <CustomDivider />

    <Stack w="100%" direction="column" py="4">

        <Stack w="100%" direction="row" >
            <Box w="70%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
 
                    }}
                    >
                    Documentos de Identificação
                </Text>
            </Box>
            <Box w="5%"></Box>
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
                        // name="file-present" 
                        name="edit"
                        size={20} 
                        color={farmer?.validated === resourceValidation.status.validated ? COLORS.lightgrey : farmer?.validated === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
                    />
                </TouchableOpacity>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Tipo
                </Text>  
            </Box>
        <Box>

        <Text                         
            style={{
                color: 'grey',
                fontSize: 14,
                //  paddingLeft: 10,
                fontFamily: 'JosefinSans-Regular',
            }} 
        >
            {farmer?.idDocument?.docType !== 'Nenhum' ? farmer?.idDocument?.docType : '(Nenhum)'}
        </Text>
    </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Número
            </Text>  
        </Box>
        <Box>
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                {farmer?.idDocument?.docNumber !== 'Nenhum' ? farmer?.idDocument?.docNumber : '(Nenhum)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                NUIT
            </Text>  
        </Box>
        <Box>
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                {farmer?.idDocument?.nuit !== 0 ? farmer?.idDocument?.nuit : '(Nenhum)' }
            </Text>  
        </Box>
    </Stack>
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
            {new Date(farmer?.createdAt).getDate()}-{new Date(farmer?.createdAt).getMonth()+1}-{new Date(farmer?.createdAt).getFullYear()}
            {' '} por {farmer?.userName === customUserData?.name ? 'mim' : farmer?.userName}
            </Text>
        </Box>
        
    {
    farmer?.validated === resourceValidation.status.invalidated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Invalidado por {farmer?.validatedBy}
            </Text>
        </Box>
    }
    {
    farmer?.validated === resourceValidation.status.validated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Validado por {farmer?.validatedBy}
            </Text>
        </Box>
    }
    </Stack>

{ (customUserData?.role === roles.provincialManager) &&

<Stack direction="row" w="100%" style={{ paddingTop: 5,  }} space={6} >
        <Box w="50%"
            style={{
                alignItems: 'center',
            }}
            >
            <TouchableOpacity
                disabled={farmer?.validated === resourceValidation.status.validated ? true : false}
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
                        color: farmer.validated === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.main,
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
        { farmer?.validated === resourceValidation.status.pending &&
                    <TouchableOpacity
                        disabled={farmer?.validated === resourceValidation.status.validated ? true : false}
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
                                color: farmer?.validated === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.red,
                                fontSize: 16,
                                fontFamily: 'JosefinSans-Bold',
                            }}
                        >
                            Invalidar Registo
                        </Text>
                    </TouchableOpacity>
            }


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
            ownerName={farmer?.names?.otherNames + ' ' + farmer?.names?.surname}
        />
        )
    }
    </CollapseBody>
    </Collapse>  
        </>
    )
}

export default PersonalData;