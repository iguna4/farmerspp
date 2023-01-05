
import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Stack, Box, Center } from "native-base";
import { Icon,  } from "@rneui/base";
import AwesomeAlert from 'react-native-awesome-alerts';

import CustomDivider from "../Divider/CustomDivider";

import { realmContext } from '../../models/realm';
import { updateCoordinates } from "../../helpers/updateCoordinates";
const {useRealm, useObject, useQuery } = realmContext;



const CoordinatesItem = ({ item, farmlandId }) =>{

    const realm = useRealm();
    // const farmlandId = route.params?.farmlandId;
    // const [point, setPoint] = useState({
    //     position: 0,
    //     latitude: 0,
    //     longitude: 0,
    // })

    const [onPressed, setOnPressed] = useState(false);
    const [optionsAlert, setOptionsAlert] = useState(false);

    // const addLocationPoint = useCallback((farmlandId, point, realm, position=-1, flag)=>{
    //     let farmland;

    //     realm.write(()=>{
    //         farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
    //         const newCoordinates = updateCoordinates(farmland.extremeCoordinates, point, position, flag);
    //         farmland.extremeCoordinates = [...newCoordinates];
    //         // [...farmland.extremeCoordinates, point];
    //         // setCoordinates(newCoordinates);
    //         console.log('updatedFarmland:', JSON.stringify(farmland));
    //     })
        
    // }, [realm, point, farmlandId]);


    return (
    <Center>

    <View 
        // disabled={true}
        style={{
            // flex: 1,
            padding: 10,
            marginVertical: 10,
            marginHorizontal: 10,
            // backgroundColor: '#EBEBE4',
            borderColor: '#005000',
            // minHeight: 100,
            width: '98%',
            flex: 1,
            // alignItems: 'center',
            shadowColor: "#005000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
    
            elevation: 3,
            opacity: onPressed ? 0.7 : 1,
        }}
        >
        <AwesomeAlert
          show={optionsAlert}
          showProgress={false}
          title="Actualização das coordenadas"
          message="Capturar novamente as coordenadas neste ponto!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
        //   cancelText="Apagar coordenadas"
          confirmText="Capturar novamente"
        //   cancelButtonColor="#DD6B55"
          confirmButtonColor="#005000"
        //   onCancelPressed={() => {
        //     addLocationPoint(farmlandId, point, realm, point.position, 'delete');
        //     setOptionsAlert(false);
        //   }}
          onConfirmPressed={async () => {
            // console.log('point.position:', item.position);
            // addLocationPoint(farmlandId, item, realm, item.position)
            // setOptionsAlert(false);
          }}
        />

    <Pressable
        onPress={()=>{
            // console.log('point:', point)
            if (!onPressed){
                // addLocationPoint(farmlandId, point, realm);
                // setOnPressed(true);
            }
        }}
        onLongPress={()=>{
            if (onPressed){
                // setOptionsAlert(true);
            }
        }}

    >
        <Stack direction="row" w="100%" >
            <Box w="20%" 
                style={{ 
                    // backgroundColor: '#005000', 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
                >
                <Text style={{ 
                    color: '#000', 
                    fontFamily: 'JosefinSans-Bold',
                    fontSize: 20,
                }}
                >
                    P{item?.position}
                </Text>
            </Box>
            <Box w="60%">
                <Stack direction="row">
                    <Box>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>Latitude:{'  '}</Text>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>Longitude:{'  '}</Text>
                    </Box>
                    <Box>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>{item?.latitude}</Text>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>{item?.longitude}</Text>
                    </Box>
                </Stack>
            </Box>
            <Box w="20%" alignItems={'center'}>
            <Box w="50%" 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                <Pressable
                    onPress={()=>{
                        // addLocationPoint(farmlandId, point, realm, position=-1, 'delete');
                        // setOnPressed(true);
                    }}
                    >
                    <Icon 
                        name="delete-forever" 
                        size={35} 
                        color="red" 
                        />
                </Pressable>
            </Box>
        </Box>
    </Stack>
    </Pressable>
    </View>
    </Center>
    )
}

export default CoordinatesItem;