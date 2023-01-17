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
                        fontSize: 14, 
                        color: 'ghostwhite',
                        fontFamily: 'JosefinSans-Bold',
                        

                    }}
                >
                    Dados da Instituição
                </Text>
                <Text
                    style={{ 
                        fontSize: 13, 
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
            }}
        >

        <Stack w="100%" direction="row">
                <Box w="30%" py="4">
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    Instituição:</Text>
            </Box>
            <Box w="70%" py="4">
                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                {farmer?.name} ({farmer?.type})
                </Text>

            </Box>
        </Stack>
        <CustomDivider />

            <Stack w="100%" direction="row">
            <Box w="30%" py="4">
                <Text
                    style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Contacto:
                </Text>
                </Box>
                <Box w="70%" py="4">
                    <Text style={{
                        color: 'grey',
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        Responsável
                    </Text>
                    <Text style={{
                        color: 'grey',
                        fontSize: 13,
                        paddingLeft: 10,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        {farmer?.manager?.fullname}
                    </Text>
                    <Text style={{
                        color: 'grey',
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                        Telefone {!farmer?.manager?.phone && '(nenhum)'   }
                    </Text>
{    farmer?.manager?.phone &&
                <Text style={{
                        color: 'grey',
                        fontSize: 13,
                        paddingLeft: 10,
                        fontFamily: 'JosefinSans-Regular',
                    }}>
                        {
                            farmer?.manager?.phone 
                        }
                    </Text>
}
                </Box>
        </Stack>
        <CustomDivider />
        <Stack direction="row" w="100%" >
            <Box w="30%" py="4">
                <Text 
                    style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >Endereço:</Text>
            </Box>
            <Box w="70%" >
                    {/* <Box> */}
{   farmer?.address?.province &&
                      <Text                     
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            {farmer?.address?.province} 
                        </Text>
    }
{   farmer?.address?.district &&
                     <Text 
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmer?.address?.district}
                        </Text>
}
{   farmer?.address?.adminPost &&
                     <Text 
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmer?.address?.adminPost}
                        </Text>
}
{   farmer?.address?.village &&
                     <Text 
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                        >
                            {farmer?.address?.village}
                        </Text>
}
                    {/* </Box> */}
                </Box>
        </Stack>
        <CustomDivider />

        <Stack direction="row" w="100%" >
            <Box w="30%" py="4">
                <Text 
                    style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                >Documentos:</Text>
            </Box>
            <Box w="70%" py="4">
                <Text style={{
                    color: 'grey',
                    fontSize: 13,
                    fontFamily: 'JosefinSans-Regular',
                }}
                >
                    NUIT ({farmer?.nuit ? farmer?.nuit : 'nenhum'})
                </Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 13,
                    fontFamily: 'JosefinSans-Regular',
                }}
                >
                    Alvará/Licença ({farmer?.licence ? farmer?.licence : 'nenhum'}) 
                </Text>
            </Box>
        </Stack>
        <CustomDivider />

        </View>
        </CollapseBody>
    </Collapse>  
        </>
    )
}

export default InstitutionData;