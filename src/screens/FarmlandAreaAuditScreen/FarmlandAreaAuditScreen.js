
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import { Stack, Box, Center } from "native-base";
import Geolocation from 'react-native-geolocation-service';
import AwesomeAlert from 'react-native-awesome-alerts';


import LottieAddButton from '../../components/Buttons/LottieAddButton';
import { Icon,  } from "@rneui/base";
import CoordinatesItem from "../../components/CoordinatesItem/CoordinatesItem";
import CustomDivider from "../../components/Divider/CustomDivider";
import GeoPin from "../../components/LottieComponents/GeoPin";


import { realmContext } from '../../models/realm';
import { getPosition, updateCoordinates } from "../../helpers/updateCoordinates";
import { Farmland } from "../../models/Farmland";
import { positions } from "../../fakedata/positions";
const {useRealm, useObject, useQuery } = realmContext;



const FarmlandAreaAuditScreen = ({ route, navigation })=>{
    
    const realm = useRealm();
    const farmlandId = route.params?.farmlandId;
    const [point, setPoint] = useState({})
    const [confirmGeoAlert, setConfirmGeoAlert] = useState(false);
    const [rejectGeoAlert, setRejectGeoAlert] = useState(false);
    const [optionsAlert, setOptionsAlert] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [flag, setFlag] = useState(false);

    const farmland = useObject('Farmland', farmlandId);
    const { extremeCoordinates } = farmland;

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, 
                // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Connect Caju App',
                    message: 'Connect Caju App pede a permissão para usar a sua localização',
                    buttonNegative: 'Mais tarde',
                    buttonPositive: 'OK'
                }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranted(true)
                    setConfirmGeoAlert(true);
                    console.log("You can use the app");
                } else {
                    setPermissionGranted(false)
                    setRejectGeoAlert(true);
                    console.log("Location Permission Denied");
                }
            } catch (err) {
                console.log('not granted:', granted);
                console.warn(err);
            }
        };
        
    const addCoordinates = useCallback((realm, farmlandId, point)=>{
        realm.write(()=>{
            let farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
            farmland.extremeCoordinates = [...farmland.extremeCoordinates, point];
        })

    }, [farmlandId, point, realm]);

    // useEffect(()=>{
    //     if (flag) {
    //         setOptionsAlert(false);
    //     }

    // }, [flag])

 

    const keyExtractor = (item, index)=>index.toString();

    return (
        <SafeAreaView
            style={{ 
                flex: 1, 
                backgroundColor: 'ghostwhite',
            }}
        >
        <Stack
            direction="row" 
            w="100%"
            pt="3"
        >
            <Box w="20%">
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("Farmers");
                    }}                            
                >
                <Icon name='arrow-back-ios' color="#005000" size={30}  />
                </TouchableOpacity>
            </Box>
            <Box w="60%">
            </Box>
            <Box w="20%">
            </Box>
        </Stack>
        <AwesomeAlert
          show={confirmGeoAlert}
          showProgress={false}
          title="Geolocalização"
          message="Este dispositivo aprovou o pedido de permissão deste aplicativo!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="   OK!   "
          confirmButtonColor="#005000"
          onConfirmPressed={() => {
            setConfirmGeoAlert(false);
          }}
        />
        
        <AwesomeAlert
          show={rejectGeoAlert}
          showProgress={false}
          title="Geolocalização"
          message="Este dispositivo rejeitou o pedido de permissão deste aplicativo!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Confirmar a rejeição"
          confirmText="Aprovar o pedido"
          cancelButtonColor="#DD6B55"
          confirmButtonColor="#005000"
          onCancelPressed={() => {
            setRejectGeoAlert(false);
          }}
          onConfirmPressed={async () => {
            await requestLocationPermission();
            setRejectGeoAlert(false);
          }}
        />


    <AwesomeAlert
        show={optionsAlert}
        showProgress={false}
        title={`${positions[point?.position]} ponto`}
        message={`Captura do ${positions[point?.position]} ponto das coordenadas!`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Concordar"
        cancelButtonColor="#DD6B55"
        confirmButtonColor="#005000"
        onCancelPressed={() => {
            setOptionsAlert(false);
            // setFlag(true)
        }}
        onConfirmPressed={() => {
            setOptionsAlert(false);
            // setFlag(true);
            addCoordinates(realm, farmlandId, point);
        }}
    />
        <Box
            bg="ghostwhite" 
            w="100%" 
            px="3" 
            
            style={{
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderColor: '#EBEBE4',
            }}
        >
            <Stack direction="row"
                py="5"
                px="3"
            >
                <Box  w="80%">
                    <Text
                        style={{
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 26,
                            color: '#000',
                        }}
                    >
                        Área da Parcela
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'JosefinSans-Regular',
                            fontSize: 16,
                            color: 'grey',
                        }}
                    >
                    Captura os pontos extremos da área com cajueiros
                    </Text>
                </Box>
                <Box w="20%"
                    alignItems={'center'}
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
        {   extremeCoordinates.length > 0 &&
                 <TouchableOpacity
                        onPress={async ()=>{
                            if (!permissionGranted){
                                await requestLocationPermission();
                                // return ;
                            }
                            else { 
                                Geolocation.getCurrentPosition(
                                    (position) => {
                                        // get the exact position to the point
                                        const number = getPosition(extremeCoordinates);
                                        console.log('positionNumber: ', number);
                                        setPoint({
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude,
                                            position: number,
                                        });
                                        
                                        // setOptionsAlert(true);
                                    },
                                    (error) => {
                                    Alert.alert('Falha', 'Tenta novamente!', {
                                        cause: error,
                                    })
                                    },
                                    { 
                                        enableHighAccuracy: true, 
                                        accuracy: 'high',
                                        timeout: 15000, 
                                        maximumAge: 10000, 
                                        distanceFilter: 1,  
                                    }
                                );
                            }
                        }}
                    >
                        <GeoPin />
                    </TouchableOpacity>
            }
                </Box>
            </Stack>
        </Box>
    {    extremeCoordinates.length === 0 &&   
        <Center
            style={{ minHeight: 300, }}
        >
        <TouchableOpacity
            onPress={async ()=>{
                if (!permissionGranted){
                    await requestLocationPermission();
                }
                else {
       
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const number = getPosition(extremeCoordinates);
                            console.log('positionNumber: ', number);
                            setPoint({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                position: number,
                            });
                            // setOptionsAlert(true);
                        },
                        (error) => {
                            Alert.alert('Falha', 'Tenta novamente!', {
                            cause: error,
                            })
                        },
                        { 
                            enableHighAccuracy: true, 
                            accuracy: 'high',
                            timeout: 15000, 
                            maximumAge: 10000, 
                            distanceFilter: 1,  
                        }
                    );
                }
            }}
        >
            <GeoPin />
        </TouchableOpacity>

             <Text 
                style={{ 
                    fontFamily: 'JosefinSans-Regular',
                    fontSize: 24,
                    paddingTop: 30,
                    textAlign: 'center',
                    color: '#000',
                }}
            >
                Adicione o primeiro ponto das coordenadas do pomar!
            </Text>   
        </Center>
    }

    <FlatList
        data={extremeCoordinates}
        keyExtractor={keyExtractor}
        renderItem={({ item })=>{
            return <CoordinatesItem item={item} farmlandId={farmlandId}  />
        }}
    />
    <Center
        style={{
            paddingVertical: 20,
        }}
    >

{        
    extremeCoordinates.length > 2 && 
    (

        <TouchableOpacity
        onPress={()=>{
                navigation.navigate('FarmlandAreaAudit', {
                    farmlandId,
                })
            }}
            >
        <Box
            alignItems={'center'}
            style={{
                
                borderWidth: 2,
                borderColor: '#005000',
                borderRadius: 30,
                width: 300,
                height: 60,
                justifyContent: 'center',
                
            }}
            >
            <Text
                style={{ 
                    fontSize: 30, 
                    fontFamily: 'JosefinSans-Bold', 
                    color: '#005000'
                }}
                >
                Calcular Área
            </Text>
        </Box>
        </TouchableOpacity>
    )}    

    </Center>
    </SafeAreaView>
    )
}

export default FarmlandAreaAuditScreen;