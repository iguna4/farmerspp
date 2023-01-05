
import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Stack, Box, Center } from "native-base";
import { Icon,  } from "@rneui/base";
import AwesomeAlert from 'react-native-awesome-alerts';

import CustomDivider from "../Divider/CustomDivider";

import { realmContext } from '../../models/realm';
import { updateCoordinates } from "../../helpers/updateCoordinates";
const {useRealm, useObject, useQuery } = realmContext;



const CoordinatesItem = ({ point, farmlandId }) =>{

    const realm = useRealm();
    // const farmlandId = route.params?.farmlandId;
    // const [point, setPoint] = useState({
    //     position: 0,
    //     latitude: 0,
    //     longitude: 0,
    // })

    const [onPressed, setOnPressed] = useState(false);
    const [optionsAlert, setOptionsAlert] = useState(false);

    const addLocationPoint = useCallback((farmlandId, point, realm, position=-1)=>{
        let farmland;

        realm.write(()=>{
            farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
            farmland.extremeCoordinates = updateCoordinates(farmland.extremeCoordinates, point)
            // [...farmland.extremeCoordinates, point];
            console.log('updatedFarmland:', JSON.stringify(farmland));
        })
        
    }, [realm, point, farmlandId]);


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
          message="Apagar ou capturar novamente as coordenadas deste ponto!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Apagar coordenadas"
          confirmText="Capturar novamente"
          cancelButtonColor="#DD6B55"
          confirmButtonColor="#005000"
          onCancelPressed={() => {
            setOptionsAlert(false);
          }}
          onConfirmPressed={async () => {
            addLocationPoint(farmlandId, point, realm, point.position)
            setOptionsAlert(false);
          }}
        />

    <Pressable
        onPress={()=>{
            // console.log('point:', point)
            if (!onPressed){
                addLocationPoint(farmlandId, point, realm);
                setOnPressed(true);
            }
        }}
        onLongPress={()=>{
            setOptionsAlert(true);
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
                    P{point?.position}
                </Text>
            </Box>
            <Box w="60%">
                <Stack direction="row">
                    <Box>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>Latitude:{'  '}</Text>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>Longitude:{'  '}</Text>
                    </Box>
                    <Box>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>{point?.latitude}</Text>
                        <Text style={{ color: '#000', fontFamily: 'JosefinSans-Regular'}}>{point?.longitude}</Text>
                    </Box>
                </Stack>
            </Box>
            <Box w="20%" alignItems={'center'}>
            <Box w="50%" 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                <Pressable
                    onPress={()=>{
                        // console.log('point:', point)
                        if (!onPressed){
                            addLocationPoint(farmlandId, point, realm);
                            setOnPressed(true);
                        }
                    }}
                    >
                    <Icon 
                        name="add-location" 
                        size={40} 
                        color="#005000" 
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