import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../Divider/CustomDivider';
const { useRealm, useQuery, useObject } = realmContext; 


// const image = { uri: "https://reactjs.org/logo-og.png" };


const FarmlandData = ({ farmland })=>{

    return (
        <View
            style={{
                // flex: 1,
                paddingVertical: 10,
                // marginBottom: 10,
            }}
        >
    <Collapse
        style={{
            flex: 1,
            
        }}
    >
        <CollapseHeader
            style={{                     
                minHeight: 100,
                paddingTop: 24,
                backgroundColor: '#005060',
                paddingHorizontal: 10,
                // marginVertical: 5,
                
                
            }}
            >
            <View
                style={{
                    // marginBottom: 100,
                }}
            >
                <Text
                    style={{ 
                        fontSize: 18, 
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Ano de Plantio : {farmland.plantingYear}
                </Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <View
            style={{
                marginBottom: 40,
            }}
        >

        <Stack w="100%" direction="row">
                <Box w="35%" py="4">
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    Descrição:</Text>
                </Box>
                <Box w="65%" py="4">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                    </Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmland.description}
                    </Text>
                </Box>
            </Stack>
            <CustomDivider />
            <Stack w="100%" direction="row">
                <Box w="35%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Cajueiros:
                </Text>
                </Box>
                <Box w="65%" py="4">
                    <Box>
                        <Text                     
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {new Date().getFullYear() - farmland.plantingYear} anos (idade)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmland.trees} (árvores)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            Compasso {farmland.density.mode} {farmland.density.mode === 'Regular' ? (farmland.density?.length + ' x ' + farmland.density?.width) : ''}
                        </Text>
                    </Box>
                </Box>
            </Stack>
            <CustomDivider />

            <Stack w="100%" direction="row">
                <Box w="35%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Área:
                </Text>
                </Box>
                <Box w="65%" py="4">
                    <Box>
                        <Text                     
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {farmland.declaredArea} hectares (área declarada)
                        </Text>
    {     farmland.auditedArea ?
                   <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            { farmland.auditedArea} (área auditada)
                        </Text>
                        :
                        <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        Nenhuma (área auditada)
                    </Text>                        
}
{farmland.extremeCoordinates.length > 0 ?
                        (
                        farmland.extremeCoordinates.map(
                            (point, index)=>(
                        <Box key={point.position + index}>
                            <Text 
                                style={{
                                    color: 'grey',
                                    fontSize: 14,
                                    fontFamily: 'JosefinSans-Regular',
                                }}                        
                                >
                                Posição: {point.position} (lat:{point.latitude + ' | ' + 'long:' + point.longitude})
                            </Text>
                        </Box>)
                        ))                 
                        :
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            Nenhum (coordenadas dos pontos extremos)
                        </Text>
}
                    </Box>
                </Box>
            </Stack>
            <CustomDivider />

            <Stack w="100%" direction="row">
                <Box w="35%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Culturas consociadas:
                </Text>
                </Box>
                <Box w="65%" py="4">
                    <Box>
                        {
                            farmland.consociatedCrops?.map((crop)=>(<Text key={crop}                    
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {crop}
                        </Text>))
                        }
                    </Box>
                </Box>
            </Stack>

            </View>
        </CollapseBody>
    </Collapse>  
        </View>
    )
}

export default FarmlandData;