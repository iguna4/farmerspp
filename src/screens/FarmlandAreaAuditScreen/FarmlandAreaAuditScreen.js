
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


import { getPosition, sortCoordinatesByPositions, updateCoordinates } from "../../helpers/updateCoordinates";
import { Farmland } from "../../models/Farmland";
import { positions } from "../../fakedata/positions";

import { realmContext } from '../../models/realm';
const {useRealm, useObject, useQuery } = realmContext;


const FarmlandAreaAuditScreen = ({ route, navigation })=>{
    
    const realm = useRealm();
    const farmlandId = route.params?.farmlandId;
    const [confirmGeoAlert, setConfirmGeoAlert] = useState(false);
    const [rejectGeoAlert, setRejectGeoAlert] = useState(false);
    const [failedGeoLocationRequest, setFailedGeoLocationRequest] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const farmland = useObject('Farmland', farmlandId);
    // let owner;
    // if (!owner) {
    //     owner = useObject('Farmer', farmlandId?.farmer);
    // }
    // else if (!owner) {
    //     owner = useObject('Group', farmlandId?.farmer);
    // }
    // else if(!owner) {
    //     owner = useObject('Farmer', farmlandId?.farmer);
    // }

    // request the permission to use the device position coordinates
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, 
                // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'ConnectCaju',
                    message: 'ConnectCaju pede a permissão para usar a sua localização',
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
                setFailedGeoLocationRequest(true);
            }
        };
        
    // persist the acquired coordinates
    const saveCoordinates = (farmland, point)=>{
        realm.write(()=>{
            farmland.extremeCoordinates?.push(point);        
        })
    };

    // get the current coordinates of device position  
    const getGeolocation = async ()=>{
        if (!permissionGranted){
            await requestLocationPermission();
        }
        else { 
            Geolocation.getCurrentPosition(
                (position) => {
                    // get the exact position to the point
                    const number = getPosition(farmland?.extremeCoordinates);

                    saveCoordinates(farmland, {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        position: number,
                    });
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
                    distanceFilter: 100,  
                }
            );
        }
    }

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
            bg="#EBEBE4"

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
            <Center w="60%">
                <Text
                    style={{ 
                        textAlign: 'center', 
                        fontFamily: 'JosefinSans-Bold', 
                        fontSize: 24, 
                        color: '#005000',  
                    }}
                >
                    Geolocalização
                </Text>
            </Center>
            <Box w="20%">
            </Box>
        </Stack>

        <AwesomeAlert
          show={failedGeoLocationRequest}
          showProgress={false}
          title="Geolocalização"
          message="Não foi possível processar o pedido de acesso à localização do dispositivo. Tente mais tarde!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="   OK!   "
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setFailedGeoLocationRequest(false);
          }}
        />


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

        <Box
            bg="#EBEBE4" 
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
        {   farmland?.extremeCoordinates.length > 0 &&
                 <TouchableOpacity
                        onPress={async ()=> await getGeolocation()
                            // async ()=>{
                            //     if (!permissionGranted){
                            //         await requestLocationPermission();
                            //         // return ;
                            //     }
                            //     else { 
                            //         Geolocation.getCurrentPosition(
                            //             (position) => {
                            //                 // get the exact position to the point
                            //                 const number = getPosition(farmland?.extremeCoordinates);

                            //                 // console.log('extremeCoordinates:', JSON.stringify(newCoordinates));
                            //                 saveCoordinates(farmland, {
                            //                     latitude: position.coords.latitude,
                            //                     longitude: position.coords.longitude,
                            //                     position: number,
                            //                 });
                            //             },
                            //             (error) => {
                            //             Alert.alert('Falha', 'Tenta novamente!', {
                            //                 cause: error,
                            //             })
                            //             },
                            //             { 
                            //                 enableHighAccuracy: true, 
                            //                 accuracy: 'high',
                            //                 timeout: 15000, 
                            //                 maximumAge: 10000, 
                            //                 distanceFilter: 1,  
                            //             }
                            //         );
                            //     }
                            // }
                        }
                    >
                        <GeoPin />
                    </TouchableOpacity>
            }
                </Box>
            </Stack>
        </Box>
    {    farmland?.extremeCoordinates.length === 0 &&   
        <Center
            style={{ minHeight: 300, }}
        >
        <TouchableOpacity
            onPress={ async ()=> await getGeolocation()
                // async ()=>{
                //     if (!permissionGranted){
                //         await requestLocationPermission();
                //     }
                //     else {
       
                //         Geolocation.getCurrentPosition(
                //             (position) => {
                //                 const number = getPosition(farmland?.extremeCoordinates);
                //                 // console.log('extremeCoordinates:', JSON.stringify(newCoordinates));

                //                 saveCoordinates(farmland, {
                //                     latitude: position.coords.latitude,
                //                     longitude: position.coords.longitude,
                //                     position: number,
                //                 });
                //             },
                //             (error) => {
                //                 Alert.alert('Falha', 'Tenta novamente!', {
                //                 cause: error,
                //                 })
                //             },
                //             { 
                //                 enableHighAccuracy: true, 
                //                 accuracy: 'high',
                //                 timeout: 15000, 
                //                 maximumAge: 10000, 
                //                 distanceFilter: 1,  
                //             }
                //         );
                //     }
                // }
            }
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
                }
            }
            >
                Adicione o primeiro ponto das coordenadas da parcela!
            </Text>   
        </Center>
    }

    <FlatList
        data={sortCoordinatesByPositions(farmland?.extremeCoordinates)}
        keyExtractor={keyExtractor}
        renderItem={({ item })=>{
            return <CoordinatesItem item={item} farmland={farmland}  />
        }}
    />
    <Center
        style={{
            paddingVertical: 20,
        }}
    >

{        
    farmland?.extremeCoordinates.length > 2 && 
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