import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box,  FormControl, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Avatar, Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { v4 as uuidv4 } from 'uuid';

import CustomDivider from '../Divider/CustomDivider';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';

import AwesomeAlert from 'react-native-awesome-alerts';
import { resourceValidation } from '../../consts/resourceValidation';
import EditData from '../EditData/EditData';
import { roles } from '../../consts/roles';
import { errorMessages } from '../../consts/errorMessages';
import validateInvalidationMessage from '../../helpers/validateInvalidationMessage';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 

const farmlandResourceMessage = 'farmlandResourceMessage';


const FarmlandData = ({ farmland })=>{

    const realm = useRealm();
    const user = useUser();
    const customUserData = user?.customData;
    const invalidationMotives = realm.objects('InvalidationMotive').filtered(`resourceId == "${farmland?._id}"`);

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [isCollapseOn, setIsCallapseOne] = useState(false);

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
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // ---------------------------------------------

    const validationAction = (realm, resourceId, flag)=>{
        realm.write(()=>{
            const foundFarmland = realm.objectForPrimaryKey('Farmland', `${resourceId}`);
            if (flag === 'validate'){
                foundFarmland.status = resourceValidation.status.validated;
                foundFarmland.checkedBy = customUserData?.name;
            }
            else if (flag === 'invalidate') {
                foundFarmland.status = resourceValidation.status.invalidated;
                foundFarmland.checkedBy = customUserData?.name;
            }
        });
    };

    const addMessage = useCallback((realm, newResourceId, newMessage)=>{

        if (!validateInvalidationMessage(newMessage, errors, setErrors)){
            return ;
        } 

        const validatedMessage = validateInvalidationMessage(newMessage, errors, setErrors);

        const invalidationMotive = realm.objects('InvalidationMotive').filtered(`resourceId == "${newResourceId}"`);
        const newMessageObject = {
            position: (invalidationMotive[0] && invalidationMotive[0]?.messages?.length > 0) ? invalidationMotive[0]?.messages?.length + 1 : 0,
            message: validatedMessage,
            ownerName: customUserData?.name,
            createdAt: new Date(),
        };
        
        if (invalidationMotive?.length > 0){
           realm.write(()=>{
                invalidationMotive[0].messages.push(newMessageObject);
            });
        }
        else {

            realm.write(async ()=>{
                const newResourceMessage = await realm.create('InvalidationMotive', {
                    _id: uuidv4(),
                    resourceId: farmland?._id,
                    resourceName: 'Farmland',
                    messages: [newMessageObject],  
                    createdAt: new Date(),
                });
            });
        }
    }, [ realm, user, message ]);


    useEffect(()=>{
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(farmlandResourceMessage);
            mutableSubs.add(
              realm.objects('InvalidationMotive').filtered(`resourceId == "${farmland._id}"`),
              {name: farmlandResourceMessage},
            );
          });

        const interval = setInterval(()=>{
            setAutoRefresh(!autoRefresh);
        }, 2000);

        clearInterval(interval);
        
    }, [ realm, user, message, invalidationMotives, autoRefresh, isCollapseOn ]);



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
            onToggle={(isOn)=>{
                setIsCallapseOne(isOn)
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
                    Ano de Plantio : {farmland?.plantingYear}
                </Text>
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: COLORS.ghostwhite,
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'right',
                    }}
                    >
                    {(new Date().getFullYear() - farmland?.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
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
            borderColor: farmland?.status === resourceValidation.status.pending ? COLORS.danger : farmland?.status === resourceValidation.status.validated ? COLORS.main : COLORS.red,
            borderWidth: 2,
            borderRadius: 10,
            }}
        >
            <Icon 
                name={farmland?.status === resourceValidation.status.pending ? 'pending-actions' : farmland?.status === resourceValidation.status.validated ? 'check-circle' : 'dangerous'}
                size={25}
                color={farmland?.status === resourceValidation.status.pending ? COLORS.danger : farmland?.status === resourceValidation.status.validated ? COLORS.main : COLORS.red}
            />
            <Text
                style={{
                    color: farmland?.status === resourceValidation.status.pending ? COLORS.danger : farmland?.status === resourceValidation.status.validated ? COLORS.main : COLORS.red,
                }}
            >
            {farmland?.status === resourceValidation.status.pending ? resourceValidation.message.pendingResourceMessage : farmland?.status === resourceValidation.status.validated ? resourceValidation.message.validatedResourceMessage : resourceValidation.message.invalidatedResourceMessage}
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
                        {(new Date().getFullYear() - farmland?.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmland?.description}
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
                    disabled={farmland?.status === resourceValidation.status.validated ? true : false}
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
                    color={farmland?.status === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.status === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
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
                        {farmland?.trees}
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
                        {new Date().getFullYear() - farmland?.plantingYear} anos
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
                        {farmland?.density?.mode} {farmland?.density?.mode === 'Regular' ? ( '( ' + farmland?.density?.length + ' x ' + farmland?.density?.width + ' )' ) : ''}
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
                    farmland?.plantTypes?.plantType.length > 0 &&
                    
                    farmland?.plantTypes?.plantType?.map(plant=>{
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
                            farmland?.plantTypes?.plantType.length === 0 &&
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
        farmland?.plantTypes?.plantType?.some(el=>el.includes('enxer')) &&

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
            farmland?.plantTypes?.clones?.map(c=>
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
                    disabled={farmland?.status === resourceValidation.status.validated ? true : false}
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
                    color={farmland?.status === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.status === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
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
                    farmland?.consociatedCrops?.length === 0
                    ||
                    farmland?.consociatedCrops?.some((crop)=>crop === 'Nenhuma')   
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
        farmland?.consociatedCrops?.length > 0
  
    ) && 
    farmland?.consociatedCrops?.map(c=>
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
                    disabled={farmland?.status === resourceValidation.status.validated ? true : false}
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
                    color={farmland?.status === resourceValidation.status.validated ? COLORS.lightgrey : farmland?.status === resourceValidation.status.invalidated ? COLORS.red : COLORS.main } 
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
                    {farmland?.totalArea} hectares
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
                    {farmland?.usedArea} hectares
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
                    {farmland?.auditedArea ? `${farmland?.auditedArea} hectares` : '(Desconhecida)'}
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
                    // disabled={farmland?.validated === resourceValidation.status.validated ? true : false}
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
    farmland?.extremeCoordinates.length > 0 &&
    farmland?.extremeCoordinates?.map((coords)=>{
        return (
           <Stack key={coords?.position} w="100%" direction="row">
                <Box w="30%">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Ponto {coords?.position} 
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
                        Latitude: {coords?.latitude}
                    </Text>
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Longitude: {coords?.longitude}
                    </Text>
                </Box>
            </Stack>
        )
    })
}
{
    farmland?.extremeCoordinates.length === 0 &&
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
          {new Date(farmland?.createdAt).getDate()}-{new Date(farmland?.createdAt).getMonth()+1}-{new Date(farmland?.createdAt).getFullYear()}
          {' '} por {farmland?.userName === customUserData?.name ? 'mim' : farmland?.userName}
        </Text>
      </Box>
      {
    farmland?.status === resourceValidation.status.invalidated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Invalidado por {farmland?.checkedBy}
            </Text>
        </Box>
    }
    {
    farmland?.status === resourceValidation.status.validated &&
        <Box w="100%">
            <Text
                style={{ 
                    textAlign: 'right',
                    color: COLORS.grey,
                    fontFamily: 'JosefinSans-Italic',
                    fontSize: 12,
                }}
            >
                Validado por {farmland?.checkedBy}
            </Text>
        </Box>
    }

</Stack>


{
    farmland?.status === resourceValidation.status.invalidated && 
    <>
{ customUserData?.role !== roles.provincialManager &&
    <Text style={{
        textAlign: 'left',
        color: COLORS.red,
        fontSize: 16,
        fontFamily: 'JosefinSans-Bold',
    }}>
        Motivo da invalidação
    </Text>
}
    {/* <Box 
        // w="100%"
        style={{
            // alignItems: 'center',
            paddingTop: 5,
        }}
    > */}
        {
        (invalidationMotives?.length > 0 && invalidationMotives[0]?.messages?.length > 0) && 
            invalidationMotives[0]?.messages?.map((motive, index)=>(
                <Box 
                    key={index}
                    style={{
                        flexGrow: 1,
                        backgroundColor: COLORS.fourth,
                        borderRadius: 20,
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        marginVertical: 5,
                        marginHorizontal: 5,
                        alignItems: 'flex-end',
                    }}
                >
                    {/* <Box> */}
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Italic',
                                color: COLORS.black,
                                textAlign: 'left',
                            }}
                        >
                             {motive.message ? motive.message : ''}
                        </Text>
            
                        <Text 
                            style={{ 
                                textAlign: 'right', 
                                fontSize: 12, 
                                color: COLORS.black, 
                                paddingTop: 5,
                            }}
                        >
                            {motive?.ownerName} ({new Date(motive?.createdAt).getDate()}-{new Date(motive?.createdAt).getMonth()+1}-{new Date(motive?.createdAt).getFullYear()})
                        </Text>
                    {/* </Box> */}
                </Box>
            ))
        }


    {/* </Box> */}
    </>
}


{ (farmland?.status === resourceValidation.status.invalidated && customUserData?.role === roles.provincialManager) &&
        <>
        <Stack 
        direction="row" 
        w="100%" 
        space={1}
    >
        <Box w="85%">
        <FormControl isRequired isInvalid={'invalidationMessage' in errors}>
            <FormControl.Label>Motivo da invalidação</FormControl.Label>
                <TextInput 
                    style={{
                        borderWidth: 2,
                        borderColor: COLORS.main,
                        borderRadius: 20,
                        padding: 10,
                        fontSize: 16,
                        backgroundColor: '#efefef',
                    }}
                    placeholder="Mensagem para o usuário"
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={2}
                    maxLength={120}
                    value={message}
                    onChangeText={newMessage=>{
                        setErrors({
                            invalidationMessage: '',
                        })
                    setMessage(newMessage)
                }}
                />
            {
                'invalidationMessage' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.invalidationMessage}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box
            style={{
                width: '15%',
                alignItems: 'baseline',
                justifyContent: 'center',
            }}
        >
            <Box
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    padding: 5,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: COLORS.main,
                    backgroundColor: COLORS.main,
                }}
            >
            <TouchableOpacity
                onPress={()=>{
                    try{
                        addMessage(realm, farmland?._id, message);
                    }
                    catch(error) {
                        console.log('Failed to add invalidation message');
                        return ;
                    }
                    finally{
                        setMessage('');
                    }
                }}
            >
                <Icon 
                name="send" 
                size={35} 
                color={COLORS.ghostwhite} 
                />
            </TouchableOpacity>

            </Box>
        </Box>
        <Box w="0%">

        </Box>

    </Stack>


    </>
}




{ (customUserData?.role === roles.provincialManager) && (farmland?.status === resourceValidation.status.pending ) &&
<Stack direction="row" w="100%" style={{ paddingTop: 5,  }} space={6} >
        <Box w="50%"
            style={{
                alignItems: 'center',
            }}
            >
            <TouchableOpacity
                disabled={farmland?.status === resourceValidation.status.validated ? true : false}
                onPress={()=>{
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
                        color: farmland.status === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.main,
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
                disabled={farmland?.status === resourceValidation.status.validated ? true : false}
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
                        color: farmland?.status === resourceValidation.status.validated ? COLORS.lightgrey : COLORS.red,
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