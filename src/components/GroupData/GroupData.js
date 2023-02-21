import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import CustomDivider from '../../components/Divider/CustomDivider';
import COLORS from '../../consts/colors';
import { TouchableOpacity } from 'react-native';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 

const GroupData = ({ farmer })=>{

    const user = useUser();
    const customUserData = user?.customData;

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
                    Dados de {farmer?.type}
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
            {farmer?.type}
        </Text>        

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                            
                        }}
                        >
                    Nome
                    </Text>
            </Box>
            <Box w="70%">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                {farmer?.name} 
                </Text>
            </Box>
        </Stack>
        </Stack>
        <CustomDivider />


        <Stack w="100%" direction="column" py="4">
        <Stack w="100%" direction="row" >
                <Box w="50%">
                    <Text
                        style={{
                            color: COLORS.black,
                            fontSize: 16,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                        Contacto
                    </Text>
                </Box>
                <Box w="25%"></Box>
                <Box w="25%">
                    <TouchableOpacity
                        style={{
                        }}
                        onPress={
                            ()=>{
                                
                            }
                        }
                    >
                        <Icon 
                            // name="contacts" 
                            name="edit"
                            size={20} 
                            color={COLORS.main} 
                        />
                    </TouchableOpacity>
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
                    {farmer?.type?.includes('Grupo') ? 'Representante:' : 'Presidente:'}
                </Text>
                </Box>
                <Box w="70%" >
                    <Text style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        {farmer?.manager?.fullname}
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
                    Telefone
                </Text>
                </Box>
                <Box w="70%" >
{   !farmer?.manager?.phone &&
                 <Text style={{
                        color: 'grey',
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        (Nenhum)
                    </Text>
}
{ farmer?.manager?.phone &&
                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    // paddingLeft: 10,
                    fontFamily: 'JosefinSans-Regular',
                }}>
                    {farmer?.manager?.phone}
                </Text>
}
                </Box>
            </Stack>
        </Stack>
    <CustomDivider />

    <Stack w="100%" direction="column" py="4">
    <Stack w="100%" direction="row" >
            <Box w="50%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Membros
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            
                        }
                    }
                >
                    <Icon 
                        // name="people" 
                        name="edit"
                        size={20} 
                        color={COLORS.main} 
                    />
                </TouchableOpacity>
            </Box>
        </Stack>
       

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                    Total
                    </Text>
            </Box>
            <Box w="70%">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.members?.total} 
                </Text>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                    Homens
                    </Text>
            </Box>
            <Box w="70%">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.members?.total - farmer?.members?.women} 
                </Text>
            </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                    Mulheres
                    </Text>
            </Box>
            <Box w="70%">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmer?.members?.women} 
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
            {
                farmer?.type?.includes('Grupo') ? 'Ano de Criação:' : 'Ano de Legalização:'
            }
        </Text>        

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                            
                        }}
                        >
                    {/*  */}
                    </Text>
            </Box>
            <Box w="70%">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                {farmer?.affiliationYear} 
                </Text>
            </Box>
        </Stack>
        </Stack>
        <CustomDivider />

        <Stack w="100%" direction="column" py="4">

        <Stack w="100%" direction="row" >
            <Box w="70%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',                        
                    }}
                    >
                    Endereço
                </Text>
            </Box>
            <Box w="5%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            
                        }
                    }
                >
                    <Icon 
                        // name="home" 
                        name="edit"
                        size={20} 
                        color={COLORS.main} 
                    />
                </TouchableOpacity>
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

        <Stack w="100%" direction="row" >
            <Box w="70%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold',                
                    }}
                    >
                    Documentos
                </Text>
            </Box>
            <Box w="5%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{
                            
                        }
                    }
                >
                    <Icon 
                        // name="file-present" 
                        name="edit"
                        size={20} 
                        color={COLORS.main} 
                    />
                </TouchableOpacity>
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
                //  paddingLeft: 10,
                fontFamily: 'JosefinSans-Regular',
            }} 
        >
            {(farmer?.nuit && farmer?.nuit !== 0) ? farmer?.nuit : '(Nenhum)'}
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
                    Alvará/Licença
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
            {(farmer?.licence && farmer?.licence !== 0) ? farmer?.licence : '(Nenhum)'}
        </Text>
    </Box>
    </Stack>
    </Stack>


    <CustomDivider />

    <Stack direction="row" w="100%" style={{ paddingTop: 5,  }} >
        <Box w="100%">
            <Text 
            style={{ 
                textAlign: 'right',
                color: COLORS.grey,
                fontFamily: 'JosefinSans-Italic',
                fontSize: 12,
            }}
            >
            Registo:{' '}                 
            {new Date(farmer?.createdAt).getDate()}-{new Date(farmer?.createdAt).getMonth()+1}-{new Date(farmer?.createdAt).getFullYear()}
            {' '} por {farmer?.userName === customUserData?.name ? 'mim' : farmer?.userName}
            </Text>
        </Box>
    </Stack>
</View>
</CollapseBody>
</Collapse>  
</>
    )
}

export default GroupData;