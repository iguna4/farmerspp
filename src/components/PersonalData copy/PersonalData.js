import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../Divider/CustomDivider';
const { useRealm, useQuery, useObject } = realmContext; 

const PersonalData = ({ farmer })=>{

    return (
        <>
    <Collapse
        style={{
            flex: 1,
            
        }}
    >
        <CollapseHeader
            style={{                     
                minHeight: 100,
                paddingTop: 24,
                backgroundColor: 'lightgrey',
                paddingHorizontal: 10,
                marginVertical: 10,
                
                
            }}
            >
            <View
                style={{
                    
                }}
                >
                <Text
                    style={{ 
                        fontSize: 18, 
                        color: '#005000',
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Dados Pessoais
                </Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <Stack w="100%" direction="row">
                <Box w="35%" py="4">
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 18,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    Nascimento:</Text>
                </Box>
                <Box w="65%" py="4">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {new Date(farmer.birthDate).toLocaleDateString()}{' '}({new Date().getFullYear() - new Date(farmer.birthDate).getFullYear()} anos)
                    </Text>
                    <CustomDivider />
{
            !farmer?.birthPlace?.province?.includes('Estrangeiro') ?
            (
                <Box>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.province + " (província)" }
                    </Text>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.district + " (distrito)" }
                    </Text>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        { farmer?.birthPlace?.adminPost + " (posto admin.)" }
                    </Text>
                </Box>

            )
            : 
            (
                
            <Box>
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.birthPlace?.district + " (País Estrangeiro)" }
                </Text>
            </Box>
            )
}
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
                    Endereço:
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
                            {farmer?.address?.province} (província)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmer?.address?.district} (distrito)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmer?.address?.adminPost} (posto admin.)
                        </Text>
                        <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.village ? farmer?.birthPlace?.village (localidade/povoado) : 'Nenhum (localidade/povoado)'}
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
                    Contacto:
                </Text>
                </Box>
                <Box w="65%" py="4">
                { farmer?.contact?.primaryPhone && farmer?.contact?.secondaryPhone ?
                (
                    <Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}  
                    >
                        {farmer?.contact?.primaryPhone} (principal)
                    </Text>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        {farmer?.contact?.secondaryPhone} (alternativo)
                    </Text>
                </Box>
                )
                :
                farmer?.contact?.primaryPhone ?
                (
                <Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        {farmer?.contact?.primaryPhone} (principal)
                    </Text>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        Nenhum (alternativo)
                    </Text>
                </Box>
                )
                :
                farmer?.contact?.secondaryPhone ?
                (
                    <Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        Nenhum (principal)
                    </Text>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmer?.contact?.secondaryPhone} (alternativo)
                    </Text>
                </Box>
                )
                :
                (
                    <Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        Nenhum (principal)
                    </Text>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                    >
                        Nenhum (alternativo)
                    </Text>
                </Box>
                )
            }
                </Box>
        </Stack>
        <CustomDivider />
        <Stack direction="row" w="100%" >
            <Box w="35%" py="4">
                <Text 
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                >Doc. Identificação:</Text>
            </Box>
            <Box w="65%" py="4">
            { farmer?.idDocument?.docNumber ?
                (<Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.idDocument?.docNumber} ({farmer?.idDocument?.docType})</Text>)
                :
                (<Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}    
                >Nenhum (Nenhum)</Text>)
            }

            { farmer?.idDocument?.nuit ?
                (<Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >{farmer?.idDocument?.nuit} (NUIT)</Text>)
                :
                (<Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >Nenhum (NUIT)</Text>)
            }
            </Box>
        </Stack>
        <CustomDivider />


        </CollapseBody>
    </Collapse>  
        </>
    )
}

export default PersonalData;