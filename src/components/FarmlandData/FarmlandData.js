import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Avatar, Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../Divider/CustomDivider';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
const { useRealm, useQuery, useObject } = realmContext; 


// const image = { uri: "https://reactjs.org/logo-og.png" };


const FarmlandData = ({ farmland })=>{

    const navigation = useNavigation();
    
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
                backgroundColor: COLORS.second,
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
                        color: COLORS.ghostwhite,
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                    Ano de Plantio : {farmland.plantingYear}
                </Text>
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: COLORS.ghostwhite,
                        fontFamily: 'JosefinSans-Bold',
                        textAlign: 'right',
                    }}
                    >
                    {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
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
                            color: COLORS.black,
                            fontSize: 15,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    Descrição:
                </Text>
                </Box>
                <Box w="70%" py="4">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmland.description}
                    </Text>
                </Box>
            </Stack>


            <CustomDivider />
            <Stack w="100%" direction="row">
                <Box w="30%" py="4">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Cajueiros:
                </Text>
                </Box>
                <Box w="70%" py="4">
                    <Box>
                        <Text 
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            {farmland.trees} árvores.
                        </Text>
                        <Text                     
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {new Date().getFullYear() - farmland.plantingYear} anos de idade.
                        </Text>
                        <Text 
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            Compasso {farmland.density.mode} {farmland.density.mode === 'Regular' ? (farmland.density?.length + ' x ' + farmland.density?.width) : ''}
                        </Text>
                        {
                            farmland.plantTypes?.plantTypes?.map(plant=>{
                                return (
                                    <Text key={plant}>
                                        {plant}
                                    </Text>
                                )
                            })
                        }
                    </Box>
                    <Box>
                    <Box>
                        <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            Tipo de planta {farmland.plantTypes?.plantType.length == 0 && '(desconhecido)'}
                        </Text> 
                        {
                        farmland.plantTypes?.plantType.length > 0 
                        && farmland.plantTypes?.plantType?.map(p=>
                        (<Text key={p}                             
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                                paddingLeft: 10,
                            }}>
                            - {p}
                        </Text>))
                    }
                    </Box>
{   farmland.plantTypes?.plantType?.some(el=>el.includes('enxer')) &&
                <Box>

                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        clones {farmland.plantTypes?.clones.length === 0 && '(desconhecido)'}
                    </Text>
                    {
                        farmland.plantTypes?.clones.length > 0 
                        && farmland.plantTypes?.clones?.map(c=>
                            (<Text key={c}                
                                style={{
                                    color: COLORS.grey,
                                    fontSize: 13,
                                    fontFamily: 'JosefinSans-Regular',
                                    paddingLeft: 10,
                                }}>
                                - {c}
                            </Text>))
                    }
                    </Box>
}                
                </Box>
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
                    Culturas consociadas:
                </Text>
                </Box>
                <Box w="70%" py="4">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        Outras culturas {farmland.consociatedCrops.length === 0 && '(nenhuma consociação).'}
                    </Text>
                    <Box>
                    {
                        farmland.consociatedCrops?.length > 0 
                        && farmland.consociatedCrops?.map(c=>
                        (<Text key={c}                             
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                                paddingLeft: 10,
                            }}>
                            - {c}
                        </Text>))
                    }
                    </Box>
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        
                    </Text> 
                </Box>
            </Stack>



            <CustomDivider />

            <Stack w="100%" direction="row">
                <Box w="30%" py="4">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Área:
                </Text>
                </Box>
                <Box w="70%" py="4">
                    <Box>
                        <Text                     
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {farmland.declaredArea} hectares declarados.
                        </Text>
                        <Text                     
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            {farmland.auditedArea ? `${farmland.auditedArea} hectares auditados.` : 'Área ainda não auditada.'}
                        </Text>
                        <Text                     
                            style={{
                                color: COLORS.grey,
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            >
                            Coordenadas {farmland.extremeCoordinates.length === 0 && 'ainda não capturadas.'}
                        </Text>
                        <Box>
                        {
                        farmland.extremeCoordinates?.length > 0 
                        && farmland.extremeCoordinates?.map(c=>
                            (<Text key={c.position}                
                                style={{
                                    color: COLORS.grey,
                                    fontSize: 13,
                                    fontFamily: 'JosefinSans-Regular',
                                    paddingLeft: 10,
                                }}>
                                - Ponto{`${c.position} [ ${c.latitude} | ${c.longitude} ]`}
                            </Text>))
                        }    
                        </Box>

                        <Stack w="80%" direction="row" mt="3">
                            {/* <Center mt="3" w="100%"> */}
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: 40,
                                        // padding: 4,
                                        // margin: 4,
                                        // width: 100,
                                        flexDirection: 'row',
                                        borderColor: COLORS.danger,
                                        backgroundColor: COLORS.danger,
                                        padding: 1,
                                    }}
                                    disabled={farmland?.auditedArea ? true : false}
                                    onPress={
                                        ()=>navigation.navigate('FarmlandAreaAudit', {
                                            farmlandId: farmland._id,
                                        })
                                    }
                                >
                                    <Icon name="add-location-alt" size={20} color={farmland?.auditedArea ? COLORS.grey: COLORS.ghostwhite} />
                                    <Text
                                        style={{ 
                                            textAlign: 'center',
                                            color: farmland?.auditedArea ? COLORS.grey: COLORS.ghostwhite,
                                            // padding: 4,
                                            fontSize: 12,
                                            
                                        }}
                                        >Auditar Área
                                    </Text>
                                </TouchableOpacity>
                            {/* </Center> */}
                        </Stack>
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