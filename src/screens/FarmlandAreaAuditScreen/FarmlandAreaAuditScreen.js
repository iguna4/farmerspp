
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

import { realmContext } from '../../models/realmContext';
import COLORS from "../../consts/colors";
import MapModal from "../../components/Modals/MapModal";
import { useFocusEffect } from "@react-navigation/native";
import { InteractionManager } from "react-native";
import CustomActivityIndicator from "../../components/ActivityIndicator/CustomActivityIndicator";
import { Pressable } from "react-native";
const {useRealm, useObject, useQuery } = realmContext;


const FarmlandAreaAuditScreen = ({ route, navigation })=>{
    
    const realm = useRealm();
    const farmlandId = route.params?.farmlandId;
    const [confirmGeoAlert, setConfirmGeoAlert] = useState(false);
    const [rejectGeoAlert, setRejectGeoAlert] = useState(false);
    const [failedGeoLocationRequest, setFailedGeoLocationRequest] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const [currentCoordinates, setCurrentCoordinates] = useState({
        latitude: -1,
        longitude: -1,
    });

    const [isMapVisible, setIsMapVisible] = useState(false);
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);


    const farmland = useObject('Farmland', farmlandId);

    // request the permission to use the device position coordinates
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, 
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocalização',
                    message: 'Pode o ConnectCaju obter accesso a sua localização?',
                    buttonNeutral: 'Mais tarde',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK'
                }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranted(true)
                    setConfirmGeoAlert(true);
                    subscribeLocation();
                    console.log("You can use the app");
                } else {
                    setPermissionGranted(false)
                    // setRejectGeoAlert(true);
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

    const subscribeLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change

            setCurrentCoordinates({
                latitude: position?.coords.latitude,
                longitude: position?.coords.longitude,
            })

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
     };

    const getCurrentPosition = ()=>{

        if(!permissionGranted) {
            requestLocationPermission();
        }
        else{
            subscribeLocation();
        }
    }

    // get the current coordinates of device position  
    const getGeolocation = async ()=>{
        if (!permissionGranted){
            requestLocationPermission();
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
        setPermissionGranted(false);

    }
    

    useEffect(() => {
        requestLocationPermission();
        return () => {
          Geolocation.clearWatch(watchID);
        };
    }, [ navigation ]);
    

    const navigateBack = ()=>{
        if (farmland.ownerType === 'Group'){
            navigation.navigate('Group', {
                ownerId: farmland?.farmerId,
            });
        }
        else if (farmland.ownerType === 'Single') {
            navigation.navigate('Farmer', {
                ownerId: farmland?.farmerId,
            });
        }
        else if (farmland.ownerType === 'Institution') {
            navigation.navigate('Institution', {
                ownerId: farmland?.farmerId,
            });
        }
    }

    const keyExtractor = (item, index)=>index.toString();


    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            setLoadingActivityIndicator(true);
          });
          return () => task.cancel();
        }, [])
      );
    
      if (loadingActivitiyIndicator) {
        return <CustomActivityIndicator 
            loadingActivitiyIndicator={loadingActivitiyIndicator}
            setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
      }
    

    return (
        <SafeAreaView
            style={{ 
                flex: 1, 
                backgroundColor: COLORS.ghostwhite,
            }}
        >


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
          confirmButtonColor={COLORS.main}
          onConfirmPressed={() => {
            setConfirmGeoAlert(false);
          }}
        />
        
        <AwesomeAlert
          show={rejectGeoAlert}
          showProgress={false}
          title="Geolocalização"
          message="O seu dispositivo rejeitou o pedido do ConnectCaju?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Sim"
          confirmText="Não"
          cancelButtonColor="#DD6B55"
          confirmButtonColor={COLORS.main}
          onCancelPressed={() => {
            setRejectGeoAlert(false);
            setPermissionGranted(true);
          }}
          onConfirmPressed={() => {
            // requestLocationPermission();
            setPermissionGranted(true);
            setRejectGeoAlert(false);
          }}
        />


    <Box
        style={{
            backgroundColor: COLORS.fourth,
            paddingBottom: 15,
        }}
    >
        <Stack
            direction="row" 
            w="100%"
            // pt="3"
            bg="#EBEBE4"

        >
            <Box>
                <Pressable
                    onPress={()=>{

                        navigateBack();

                        // navigation.navigate("Farmers");
                    }} 
                    
                    style={{
                        position: 'absolute',
                        left: 5,
                        top: 4,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon 
                        name='arrow-back-ios' 
                        color={COLORS.main} 
                        size={25}  
                    />
                    <Text
                        style={{
                            color: COLORS.main,
                            fontFamily: 'JosefinSans-Bold',
                            marginLeft: -10,
                        }}
                    >
                        Voltar
                    </Text>
                </Pressable>
            </Box>
            <Center w="100%">
                <Text
                    style={{ 
                        textAlign: 'center', 
                        fontFamily: 'JosefinSans-Bold', 
                        fontSize: 16, 
                        color: COLORS.main,  
                    }}
                >
                    Geolocalização
                </Text>
            </Center>
        </Stack>
        </Box>

        <Box
            // bg="#EBEBE4" 
            w="100%" 
            px="3" 
            
            // style={{
            //     borderBottomRightRadius: 50,
            //     borderBottomLeftRadius: 50,
            //     borderBottomWidth: 2,
            //     borderLeftWidth: 2,
            //     borderRightWidth: 2,
            //     borderColor: '#EBEBE4',
            // }}
        >
            <Stack direction="row"
                py="1"
                px="3"
            >
                <Box  w="50%"
                    style={{
                        // flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'JosefinSans-Bold',
                            fontSize: 18,
                            color: COLORS.black,
                            lineHeight: 25,
                            textAlign: 'center',
                        }}
                    >
                        Pontos extremos da área do pomar
                    </Text>
                </Box>
                <Box  w="30%"
                    style={{
                    }}
                >

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
                        }
                    >
                        <GeoPin />
                    </TouchableOpacity>
            }
                </Box>
            </Stack>
        </Box>
    {    farmland?.extremeCoordinates.length === 0 &&   
        <Center style={{ minHeight: 300, }}>
        <Stack direction="row" space={4}>
            <Box w="15%" alignItems={"center"}>
            </Box>
            <Box
                w="30%" 
            >

            <Stack
                // w="100%"
                direction="column"
            >

            <Box 
                // alignItems={"center"}
                style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                borderWidth: 10,
                borderColor: COLORS.main,
                shadowColor: COLORS.main,
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.5,
                shadowRadius: 1.65,
                elevation: 3,
            }}
            >
                <TouchableOpacity
                    onPress={async ()=> await getGeolocation()}
                    >
                    {/* <GeoPin /> */}
                    <Icon name="location-pin" size={60} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
                <Box w="100%">
                    <Text style={{
                        color: COLORS.grey,
                        fontSize: 15,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'center',
                    }}>
                    Pontos extremos
                    </Text>
                </Box>
            </Stack>
            </Box>
            <Box w="10%" alignItems={"center"}>
            </Box>
            <Box
                w="30%" 
            >
                <Stack direction="column">

            <Box 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    borderWidth: 10,
                    borderColor: COLORS.main,
                    shadowColor: COLORS.main,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 1.65,
                    elevation: 3,
                }}
                >
                <TouchableOpacity
                    onPress={ ()=> {
                        setLoadingActivityIndicator(true);
                        getCurrentPosition();
                        setIsMapVisible(true);
                    }}
                    >
                    <Icon name="map" size={60} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
            <Box w="100%">
                <Text
                style={{
                    color: COLORS.grey,
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Regular',
                    textAlign: 'center',
                }}
                >
                    Parcela no mapa
                </Text>
            </Box>
            </Stack>
            </Box>
            <Box w="15%" alignItems={"center"}>
            </Box>
        </Stack>
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
            paddingVertical: 10,
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
            // alignItems={'center'}
            style={{
                
                borderWidth: 2,
                borderColor: COLORS.main,
                borderRadius: 30,
                width: 300,
                height: 60,
                justifyContent: 'center',
                
            }}
            >
            <Text
                style={{ 
                    fontSize: 24, 
                    fontFamily: 'JosefinSans-Bold', 
                    color: COLORS.main,
                    textAlign: 'center',
                }}
                >
                Calcular Área
            </Text>
        </Box>
        </TouchableOpacity>
    )}    

    </Center>
    <MapModal 
        farmlandId={farmland._id}
        isMapVisible={isMapVisible}
        setIsMapVisible={setIsMapVisible}
        getCurrentPosition={getCurrentPosition}
        currentCoordinates={currentCoordinates}
    />
    </SafeAreaView>
    )
}

export default FarmlandAreaAuditScreen;