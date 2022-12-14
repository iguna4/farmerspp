import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
const { useRealm, useQuery, useObject } = realmContext; 

const GroupData = ({ farmer })=>{

    // console.log('fetchedFarmer:', JSON.stringify(farmer));

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
                backgroundColor: '#005040',
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
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',
                        

                    }}
                    >
                    Dados do Grupo
                </Text>
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'right',
                    }}
                >
                    {farmer?.members?.total} membros
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
                    Grupo:</Text>
            </Box>
            <Box w="65%" py="4">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                {farmer?.name} ({farmer?.type})
                </Text>
                <Box>
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.members?.women} (Mulheres)
                </Text>
                </Box>
                <Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}        
                    >
                        {farmer?.members?.total - farmer?.members?.women} (Homens)
                    </Text>
                </Box>
                <Box>
                    <Text 
                    
                    >________</Text>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        {farmer?.members?.total} (Total)
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
                        {
                    farmer?.type?.includes('Grupo') ? 'Cria????o:' : 'Legaliza????o:'
                        }
                </Text>
                </Box>
                <Box w="65%" py="4">
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >

                        {farmer?.affiliationYear} (ano)
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
                    Contacto:
                </Text>
                </Box>
                <Box w="65%" py="4">
                    <Text style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        {farmer?.manager?.fullname} ({farmer?.type?.includes('Grupo') ? 'Representante:' : 'Presidente:'})
                    </Text>
                    <Text style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}>
                        {
                            farmer?.manager?.phone ? 
                            farmer?.manager?.phone + ` (Telefone)` : 
                            'Nenhum (Telefone)' 
                        }
                    </Text>
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
                >Endere??o:</Text>
            </Box>
            <Box w="65%" py="4">
            <Text style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
            }}>
                    {farmer?.address?.province} (Prov??ncia)
                </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}>
                    {farmer?.address?.district} (Distrito)
                </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}>
                    {farmer?.address?.adminPost} (Posto Admin.)
                </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}>
                    {farmer?.address?.village ? farmer?.address?.village (localidade/povoado) : 'Nenhum (Localidade/Povoado)'}
                </Text>
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
                >Documentos:</Text>
            </Box>
            <Box w="65%" py="4">
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.nuit ? farmer?.nuit + ` (NUIT)` : 'Nenhum (NUIT)'} 
                </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.licence ? farmer?.licence + ` (Licen??a/Alvar??)` : 'Nenhum (Licen??a/Alvar??)'} 
                </Text>
            </Box>
        </Stack>
        <CustomDivider />

        </CollapseBody>
    </Collapse>  
        </>
    )
}

export default GroupData;