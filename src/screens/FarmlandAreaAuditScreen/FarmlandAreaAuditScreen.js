
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
import { updateCoordinates } from "../../helpers/updateCoordinates";
const {useRealm, useObject, useQuery } = realmContext;



const FarmlandAreaAuditScreen = ({ route, navigation })=>{
    
    const realm = useRealm();
    const farmlandId = route.params?.farmlandId;
    const [point, setPoint] = useState({
        position: 0,
        latitude: 0,
        longitude: 0,
    })
    const [confirmGeoAlert, setConfirmGeoAlert] = useState(false);
    const [rejectGeoAlert, setRejectGeoAlert] = useState(false);
    

    // const addLocationPoint = useCallback((farmlandId, point, realm)=>{
    //     let farmland;

    //     realm.write(()=>{
    //         farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
    //         farmland.extremeCoordinates = updateCoordinates(farmland.extremeCoordinates, point)
    //         console.log('updatedFarmland:', farmland);     
    //     })
        
    // }, [realm, point, farmlandId]);

    // const  { farmlandId } = route.params;
    // const farmland = useObject('Farmland', farmlandId);
    // const farmer = useObject('Farmer', farmland?.farmer);
    
    // console.log('farmland:', JSON.stringify(farmland));
    // console.log('farmer:', JSON.stringify(farmer));
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [coordinates, setCoordinates] = useState([]);


    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, 
                // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Connect Caju App',
                    message: 'Connect Caju App pede a permissão para usar a sua localização',
                    buttonNegative: 'Mais tarde',
                    // buttonNegative: 'Cancelar',
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


    const keyExtractor = (item, index)=>index.toString();

    // console.log('coordinates:', JSON.stringify(coordinates))

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
                        // setModalVisible(false);
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
        //   cancelText="No, cancel"
          confirmText="   OK!   "
          confirmButtonColor="#005000"
        //   onCancelPressed={() => {
        //     setGeoAlert(false);
        //   }}
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
{   coordinates.length > 0 &&
                 <TouchableOpacity
                        onPress={async ()=>{
                            if (!permissionGranted){
                                await requestLocationPermission();
                                // return ;
                            }
                            else {

                                
                            Geolocation.getCurrentPosition(
                                (position) => {
                                    const number = coordinates.length + 1;
                                    setPoint({
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                        position: number,
                                    });
                                    setCoordinates(prev=>([...prev, {
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                        position: number,
                                    }]));
                                    // addLocationPoint(farmlandId, point, realm);
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

                            // setLocationInfo({});
                        }}
                    >
                        <GeoPin />
                    </TouchableOpacity>
            }
                </Box>
            </Stack>
        </Box>
        {     coordinates.length === 0 &&   
        <Center
            style={{ minHeight: 300, }}
        >
                                <TouchableOpacity
                        onPress={async ()=>{
                            if (!permissionGranted){
                                await requestLocationPermission();
                                // return ;
                            }
                            else {

                                
                            Geolocation.getCurrentPosition(
                                (position) => {
                                    const number = coordinates.length + 1;
                                    setPoint({
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                        position: number,
                                    });
                                    setCoordinates(prev=>([...prev, {
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                        position: number,
                                    }]));
                                    // addLocationPoint(farmlandId, point, realm);
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

                            // setLocationInfo({});
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
            data={coordinates}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
                return <CoordinatesItem point={item} farmlandId={farmlandId} />
            }}
        />
    <Center
        style={{
            paddingVertical: 20,
        }}
    >

{        
    coordinates.length > 2 && 
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