import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
import COLORS from '../../consts/colors';
const { useRealm, useQuery, useObject } = realmContext; 

const InstitutionData = ({ farmer })=>{

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
                backgroundColor: COLORS.main,
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
                    Dados da Instituição
                </Text>
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'right',
                    }}
                >
                    {farmer?.isPrivate ? 'Privada' : 'Pública'}
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
                    Instituição:</Text>
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
                        {farmer?.manager?.fullname} (Gerente)
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
                >Endereço:</Text>
            </Box>
            <Box w="65%" py="4">
            <Text style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
            }}>
                    {farmer?.address?.province} (Província)
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
                    {farmer?.licence ? farmer?.licence + ` (Alvará/Licença)` : 'Nenhum (Alvará/Licença)'} 
                </Text>
            </Box>
        </Stack>
        <CustomDivider />

        </CollapseBody>
    </Collapse>  
        </>
    )
}

export default InstitutionData;