
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
    const [point, setPoint] = useState({
        position: 0,
        latitude: 0,
        longitude: 0,
    })
    const [confirmGeoAlert, setConfirmGeoAlert] = useState(false);
    const [rejectGeoAlert, setRejectGeoAlert] = useState(false);
    const [optionsAlert, setOptionsAlert] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [coordinates, setCoordinates] = useState([]);

    const farmland = useObject('Farmland', farmlandId);
    // setCoordinates(farmland.extremeCoordinates);
    const { extremeCoordinates } = farmland;

    // console.log('farmland:', JSON.stringify(farmland));

    // useEffect(()=>{
    // }, [farmland])
    

    

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


    // const fetchCoordinates = useCallback((farmlandId)=>{
    //     let extremeCoordinates = [];

    //     realm.write(()=>{
    //         let farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
    //         // setCoordinates(farmland.extremeCoordinates);
    //         extremeCoordinates = [...farmland.extremeCoordinates];
    //         // const newCoordinates = 
    //         // updateCoordinates(farmland.extremeCoordinates, point, position, flag);
    //         // farmland.extremeCoordinates = [...newCoordinates];
    //         // [...farmland.extremeCoordinates, point];
    //         // setCoordinates(newCoordinates);
    //         // console.log('updatedFarmland:', JSON.stringify(farmland));
    //     })

    //     return extremeCoordinates;
        
    // }, [realm, farmlandId]);

    // fetched coordinates

    // const extremeCoordinates = fetchCoordinates(farmlandId);
    // setCoordinates(extremeCoordinates);



    const addCoordinates = useCallback((realm, farmlandId, point)=>{
        realm.write(()=>{
            let farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
            // setCoordinates(farmland.extremeCoordinates);
            farmland.extremeCoordinates = [...farmland.extremeCoordinates, point];

            // const newCoordinates = 
            // updateCoordinates(farmland.extremeCoordinates, point, position, flag);
            // farmland.extremeCoordinates = [...newCoordinates];
            // [...farmland.extremeCoordinates, point];
            // setCoordinates(newCoordinates);
            // console.log('updatedFarmland:', JSON.stringify(farmland));
        })

    }, [farmlandId, point, realm])

    




    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, 
                // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Connect Caju App',
                    message: 'Connect Caju App pede a permiss??o para usar a sua localiza????o',
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
          title="Geolocaliza????o"
          message="Este dispositivo aprovou o pedido de permiss??o deste aplicativo!"
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
          title="Geolocaliza????o"
          message="Este dispositivo rejeitou o pedido de permiss??o deste aplicativo!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Confirmar a rejei????o"
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
            // setPoint({});
        }}
        onConfirmPressed={async () => {
        // await requestLocationPermission();
            addCoordinates(realm, farmlandId, point);
            setOptionsAlert(false);
            // setPoint({});
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
                        ??rea da Parcela
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'JosefinSans-Regular',
                            fontSize: 16,
                            color: 'grey',
                        }}
                    >
                    Captura os pontos extremos da ??rea com cajueiros
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
                                    setOptionsAlert(true);
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
    {    extremeCoordinates.length === 0 &&   
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
                            // const number = coordinates.length + 1;
                            const number = getPosition(extremeCoordinates);
                            console.log('positionNumber: ', number);
                            setPoint({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                position: number,
                            });
                            setOptionsAlert(true);
                            // setCoordinates(prev=>([...prev, {
                            //     latitude: position.coords.latitude,
                            //     longitude: position.coords.longitude,
                            //     position: number,
                            // }]));
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
                Calcular ??rea
            </Text>
        </Box>
        </TouchableOpacity>
    )}    

    </Center>
    </SafeAreaView>
    )
}

export default FarmlandAreaAuditScreen;