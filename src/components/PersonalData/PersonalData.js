import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../../components/Divider/CustomDivider';
import COLORS from '../../consts/colors';
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
                    Dados Pessoais
                </Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <View
            style={{
                marginBottom: 40,
                padding: 10,
                borderColor: COLORS.main,
                shadowColor: COLORS.main,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 3,
                paddingLeft: 20,
            }}
        >

        <Stack w="100%" direction="column" py="4">
            <Text
                style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Bold',
                    
                }}
            >
                Nascimento
            </Text>
        <Stack w="100%" direction="row">
                <Box w="30%">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                            
                        }}
                        >
                    Data:</Text>
                </Box>
                <Box w="70%">
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            // paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {new Date(farmer.birthDate).toLocaleDateString()}{' '}({new Date().getFullYear() - new Date(farmer.birthDate).getFullYear()} anos)
                    </Text>
                </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                    { farmer?.birthPlace?.province?.includes('Estrangeiro') ? 'País' : 'Província' }
                </Text>  
            </Box>
        <Box>
    {   farmer?.birthPlace?.province &&
                    <Text                         
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        //  paddingLeft: 10,
                        fontFamily: 'JosefinSans-Regular',
                        }} >
                            {farmer?.birthPlace?.province}
                        </Text>
    }
    </Box>
    </Stack>
{
    !farmer?.birthPlace?.province?.includes('Estrangeiro') &&
    <>
    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Distrito
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
                {farmer?.birthPlace?.district ? farmer?.birthPlace?.district : '(Não Aplicável)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Posto Admin.
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
                {farmer?.birthPlace?.adminPost ? farmer?.birthPlace?.adminPost : '(Não Aplicável)' }
            </Text>  
        </Box>
    </Stack>
    </>
}

    </Stack>
    <CustomDivider />

    <Stack w="100%" direction="column" py="4">
        <Text
            style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'JosefinSans-Bold',
                
            }}
        >
            Endereço
        </Text>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Província
                </Text>  
            </Box>
        <Box>
    {   farmer?.address?.province &&
        <Text                         
            style={{
                color: 'grey',
                fontSize: 14,
                //  paddingLeft: 10,
                fontFamily: 'JosefinSans-Regular',
            }} 
        >
            {farmer?.address?.province}
        </Text>
    }
    </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Distrito
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
                {farmer?.address?.district ? farmer?.address?.district : '(Não Aplicável)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                Posto Admin.
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
                {farmer?.address?.adminPost ? farmer?.address?.adminPost : '(Não Aplicável)' }
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Localidade
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
                {farmer?.address?.village ? farmer?.address?.village : '(Não Aplicável)' }
            </Text>  
        </Box>
    </Stack>

    </Stack>

    <CustomDivider />

    <Stack w="100%" direction="column" py="4">
        <Text
            style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'JosefinSans-Bold',
                
            }}
        >
            Contacto
        </Text>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Telefone
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
            {!(farmer?.contact?.primaryPhone || farmer?.contact?.secondaryPhone) && '(Nenhum).'}    
        </Text> 
        { farmer?.contact?.primaryPhone !== 0  &&
            <Text 
                style={{
                    color: 'grey',
                    fontSize: 14,
                    // paddingLeft: 10,
                    fontFamily: 'JosefinSans-Regular',
                }}  
            >
                {farmer?.contact?.primaryPhone} (principal)
            </Text>
        }
        {
        farmer?.contact?.secondaryPhone !== 0 &&
            <Text 
                style={{
                    color: 'grey',
                    fontSize: 14,
                    // paddingLeft: 10,
                    fontFamily: 'JosefinSans-Regular',
                }}  
                >
                {farmer?.contact?.secondaryPhone} (alternativo)
            </Text>    
        }
    </Box>
    </Stack>

    </Stack>
   
    <CustomDivider />

    <Stack w="100%" direction="column" py="4">
        <Text
            style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'JosefinSans-Bold',
                
            }}
        >
            Documentos de Identificação:
        </Text>

        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                >
                    Tipo
                </Text>  
            </Box>
        <Box>

        <Text                         
            style={{
                color: 'grey',
                fontSize: 14,
                //  paddingLeft: 10,
                fontFamily: 'JosefinSans-Regular',
            }} 
        >
            {farmer?.idDocument?.docType !== 'Nenhum' ? farmer?.idDocument?.docType : '(Nenhum)'}
        </Text>
    </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}                    
            >
                Número
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
                {farmer?.idDocument?.docNumber !== 'Nenhum' ? farmer?.idDocument?.docNumber : '(Nenhum)'}
            </Text>  
        </Box>
    </Stack>

    <Stack w="100%" direction="row">
        <Box w="30%">
            <Text
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}                    
                    >
                NUIT
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
                {farmer?.idDocument?.nuit !== 0 ? farmer?.idDocument?.nuit : '(Nenhum)' }
            </Text>  
        </Box>
    </Stack>
    </Stack>
    </View>
    </CollapseBody>
    </Collapse>  
        </>
    )
}

export default PersonalData;