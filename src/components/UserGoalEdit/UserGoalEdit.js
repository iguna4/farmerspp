
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Overlay, Icon, Button } from "@rneui/base";
import { Box, Center, CheckIcon, FormControl, Select, Stack } from "native-base";
import AwesomeAlert from 'react-native-awesome-alerts';

import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";
import COLORS from "../../consts/colors";
import districts from "../../consts/districts";

import { secrets } from "../../secrets";
import { useUser } from "@realm/react";
import UserItem from "../UserItem/UserItem";
import CustomDivider from "../Divider/CustomDivider";
import { useFocusEffect } from "@react-navigation/native";
import { InteractionManager } from "react-native";
import { errorMessages } from "../../consts/errorMessages";

export default function UserGoalEdit({ isGoalUpdateVisible, setIsGoalUpdateVisible, }){
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [districtalUsers, setDistritalUsers] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    // ------------------------------------------
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmBttom] = useState(false);

    // ---------------------------------------------

    const user = useUser();

    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

    useFocusEffect(
        useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            setLoadingActivityIndicator(true);
          });
          return () => task.cancel();
        }, [])
    );
    
    // if (loadingActivitiyIndicator) {
    //     return <CustomActivityIndicator 
    //         loadingActivitiyIndicator={loadingActivitiyIndicator}
    //         setLoadingActivityIndicator={setLoadingActivityIndicator}
    //     />
    // }
    

    const getUsersByDistrict = async (district)=>{

        const mongo = user.mongoClient(secrets.serviceName);
        const collection = mongo.db(secrets.databaseName).collection(secrets.userCollectionName);
        let users;
        try {
            users = await collection.find({ userDistrict: district });
            setDistritalUsers(users);
        } catch (error) {
            if (error.includes(errorMessages.network.logFlag)){
                // Alert message
                setTitleAlert(errorMessages.network.title);
                setMessageAlert(errorMessages.network.message);
                setShowCancelButton(errorMessages.network.showCancelButton);
                setShowConfirmBttom(errorMessages.network.showCancelButton);
                setConfirmText(errorMessages.network.confirmText);
                setCancelText(errorMessages.network.cancelText);
                setAlert(true);
            }
            else {
                // Alert message
                setTitleAlert(errorMessages.server.title);
                setMessageAlert(errorMessages.server.message);
                setShowCancelButton(errorMessages.server.showCancelButton);
                setShowConfirmBttom(errorMessages.service.showConfirmButton);
                setConfirmText(errorMessages.server.confirmText);
                setCancelText(errorMessages.server.cancelText);
                setAlert(true);
            }
            return ;
        }
        return users;
    }

    useEffect(()=>{

        if (province) {
            setSelectedDistricts(districts[province]);
        }

    }, [ province ]);


    const toggleOverlay = () => {
        setIsGoalUpdateVisible(!isGoalUpdateVisible);
      };

    return (
    <>

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '100%',
            minHeight: '100%',
            // borderRadius: 10,
            // paddingBottom: 50,
        }}
        isVisible={isGoalUpdateVisible} 
        onBackdropPress={toggleOverlay}
    >
        <View
            style={{ 
                flex: 1,
                width: '100%', 
            }}
        >
        <Stack w="100%" py="4" direction="row" 

        >
            <Box w="10%">
                <Icon 
                    name='arrow-back-ios' 
                    color={COLORS.main} 
                    size={30}  
                    onPress={()=>{
                        setIsGoalUpdateVisible(false);
                    }}
                />           
            </Box>
            <Box w="90%">
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.main,
                        fontSize: 20,
                        fontFamily: 'JosefinSans-Bold',
                    }}
                >
                    Actualização de Metas
                </Text>            
            </Box>
        </Stack>
            <Box
                style={{
                    width: '100%',
                    // paddingTop: 3,
                }}
                >
                <Stack
                    w="100%"
                    direction="row"
                    space={1}
                >
                    <Box w="50%">
                    <FormControl isRequired my="3">
                    <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={province}
                        accessibilityLabel="Escolha província"
                        placeholder="Escolha província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={province 
                            ? <Icon name="close" size={25} color="grey" onPress={()=>{
                                setDistrict('');
                                setProvince('')
                            }} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={(newProvince)=>{
                            // setErrors(prev=>({...prev, userProvince: ''}));
                            setDistrict('');
                            setProvince(newProvince);
                        }}
                        >
                        <Select.Item label={"Cabo Delgado"} value="Cabo Delgado" />
                        <Select.Item label="Nampula" value="Nampula" />
                        <Select.Item label="Niassa" value="Niassa" />
                        <Select.Item label="Zambézia" value="Zambézia" />
                    </Select>
                    {/* 
                        <FormControl.HelperText></FormControl.HelperText>
                    */}
                </FormControl>
                </Box>
                <Box w="50%">
                    <FormControl isRequired my="3" >
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={district}
                        accessibilityLabel="Escolha distrito"
                        placeholder="Escolha distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={district 
                            ? <Icon name="close" size={25} color="grey" onPress={()=>setDistrict('')} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={async (newDistrict)=>{
                            setDistrict(newDistrict);
                            // setLoadingActivityIndicator(true);
                            await getUsersByDistrict(newDistrict);
                        }}
                    >{
                        selectedDistricts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                            ))
                        }
                    </Select>
                    <FormControl.HelperText></FormControl.HelperText>
                </FormControl>
                </Box>
            </Stack>
        </Box>

        <Box
            style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
            }}
            >
        { (!district) &&  
            <Text
            style={{
                    textAlign: 'center',
                    fontFamily: 'JosefinSans-Bold',
                    fontSize: 16,
                    color: COLORS.main
                }}
            >
                Selecciona Província e Distrito!
            </Text>
        }        
        {
            (district && districtalUsers.length === 0)  && 
            <Text
                style={{
                    textAlign: 'center',
                    lineHeight: 30,
                    fontFamily: 'JosefinSans-Bold',
                    fontSize: 16,
                    color: COLORS.danger
                }}
            >
                O distrito de {district} não tem usuários registados!
            </Text>
        }
        {
        }
        </Box>

{ (district && districtalUsers.length > 0) &&
        <Box
            style={{
                flex: 1,
                width: '100%',
            }}
            >
            <Stack w="100%" direction="row" mb="2" space={1}
                style={{
                    backgroundColor: COLORS.main,
                    padding: 10,

                }}
            >
                <Box w="40%"
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                        // textAlign: 'center',
                        fontFamily: 'JosefinSans-Bold',
                        fontSize: 16,
                        color: COLORS.ghostwhite,
                    }}     
                    >Usuário</Text>
                </Box>
                <Box w="20%">
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 16,
                            color: COLORS.ghostwhite,
                        }}
                    >
                        Meta
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 12,
                            color: COLORS.ghostwhite,
                        }}
                    >
                        (Produtores)
                    </Text>
                </Box>
                <Box w="20%">
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 16,
                            color: COLORS.ghostwhite,
                        }}
                    >Meta</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 12,
                            color: COLORS.ghostwhite,
                        }}
                    >(Parcelas)</Text>
                </Box>

                <Box w="20%"
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 16,
                            color: COLORS.ghostwhite,
                        }}
                    >
                        Acção
                    </Text>
                    {/* <Icon 
                        name="save"
                        size={45}
                        color={COLORS.second}
                    /> */}
                </Box>
            </Stack>
            {/* <CustomDivider thickness={1} my={2}  bg={COLORS.main} /> */}
            <ScrollView>

            {
                districtalUsers?.map((userItem)=>{
                    return (
                        <UserItem key={userItem.userId} userItem={userItem} />
                    )
                })
            }



{
//  (district && districtalUsers.length > 0) &&
//     <Center 
//         w="100%"
//         mt="4"
//     >

//         <Button
//         title="Actualizar"
//             titleStyle={{
//                 color: COLORS.ghostwhite,
//                 fontFamily: 'JosefinSans-Bold',
//                 width: '100%',
//             }}
//             // iconPosition="right"
//             // icon={
//             // <Icon
//             // name="update"
//             //     color="white"
//             //     size={25}
//             //     iconStyle={{ 
//             //         // marginLeft: 20,
//             //         // color: COLORS.ghostwhite,
//             //         // paddingHorizontal: 10,
//             //     }}
//             //     />
//             // }
//             containerStyle={{
//                 backgroundColor: COLORS.second,
//                 borderRadius: 10,
//                 // color: COLORS.ghostwhite,
//             }}
//             type="outline"
//             onPress={toggleOverlay}
//             />
//         </Center>
        }
        </ScrollView>

    </Box>
}
        </View>
    </Overlay>
    <AwesomeAlert
            show={alert}
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
            }}
            onConfirmPressed={() => {
                setAlert(false);
            }}
        />

    </>
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

    
