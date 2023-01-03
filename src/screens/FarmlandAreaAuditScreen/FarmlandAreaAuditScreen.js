
import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, Box, Center } from "native-base";
import LottieAddButton from '../../components/Buttons/LottieAddButton';


import { realmContext } from '../../models/realm';
import { Icon,  } from "@rneui/base";
import CoordinatesItem from "../../components/CoordinatesItem/CoordinatesItem";
import CustomDivider from "../../components/Divider/CustomDivider";

const {useRealm, useObject, useQuery } = realmContext;


const FarmlandAreaAuditScreen = ({ route, navigation })=>{
    
    // const  { farmlandId } = route.params;
    // const farmland = useObject('Farmland', farmlandId);
    // const farmer = useObject('Farmer', farmland?.farmer);
    
    // console.log('farmland:', JSON.stringify(farmland));
    // console.log('farmer:', JSON.stringify(farmer));

    const [coordinates, setCoordinates] = useState([])
    const keyExtractor = (item, index)=>index.toString();



    console.log('coordinates:', JSON.stringify(coordinates))

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
                        navigation.navigate("FarmersStack");
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
                <Box
                    py="5"
                    px="3"
                    w="100%"
                    >
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
                </Box>
        {/* <Box 
            w="100%"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
            }}
        > */}

        <FlatList
            data={coordinates}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
                return <CoordinatesItem key={item} coordinates={item} />
            }
        }
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
        <LottieAddButton
            styles={{ 
                zIndex: 7, 
                width: 100, 
                height: 100, 
                position: 'absolute', 
                left: 10,
                top: 400, 
                
            }}
            onPress={()=>{
                setCoordinates(prev=>[...prev, prev.length + 1])
            }}
            />
    </SafeAreaView>
    )
}

export default FarmlandAreaAuditScreen;