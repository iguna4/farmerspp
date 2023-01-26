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
                paddingLeft: 20,
            }}
        >

        <Stack w="100%" direction="column" py="4">
            <Text
                style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Bold',
                    
                }}
            >
                Descrição
            </Text>

        <Stack w="100%" direction="row">
                <Box w="30%" >
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    {/* Descrição: */}
                </Text>
                </Box>
                <Box w="70%">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {(new Date().getFullYear() - farmland.plantingYear) < 3 ? 'Parcela Nova' : 'Parcela Estabelecida'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        {farmland.description}
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
                    Cajueiros
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                    }}
                    onPress={
                        ()=>{}
                    }
                >
                    <Icon name="checkroom" size={30} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
        </Stack>

            <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Árvores
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {farmland.trees}
                    </Text>
                </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Idade
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {new Date().getFullYear() - farmland.plantingYear} anos
                    </Text>
                </Box>
        </Stack>

        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Compasso
                </Text>
                </Box>
                <Box w="70%">
                    <Text 
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        {farmland.density.mode} {farmland.density.mode === 'Regular' ? ( '( ' + farmland.density?.length + ' x ' + farmland.density?.width + ' )' ) : ''}
                    </Text>
                </Box>
        </Stack>


        <Stack w="100%" direction="row">
                <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                        
                    }}
                    >
                    Tipo de plantas
                </Text>
                </Box>
                <Box w="70%">

                { 
                (
                    farmland.plantTypes?.plantType.length > 0 &&
                    
                    farmland.plantTypes?.plantType?.map(plant=>{
                        return (
                            <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                            key={plant}>
                                - {plant}
                            </Text>
                        )
                    })
                    )
                    }
                    {
                        (
                            farmland.plantTypes?.plantType.length === 0 &&
                            <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}>
                                (Desconhecido)
                            </Text>
                        )
                    }
                </Box>
        </Stack>
    {
        farmland.plantTypes?.plantType?.some(el=>el.includes('enxer')) &&

        <Stack w="100%" direction="row">
        <Box w="30%">
        <Text
            style={{
                color: COLORS.grey,
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
                
            }}
            >
            Clones
        </Text>
        </Box>
        <Box w="70%">
            {
            farmland.plantTypes?.clones?.map(c=>
                (<Text key={c}                
                    style={{
                        color: COLORS.grey,
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                        // paddingLeft: 10,
                    }}>
                    {c === 'Desconhecido' ? '(Desconhecido)' : `- ${c}`}
                </Text>))
            }
        </Box>
        </Stack>

    }
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
                    Culturas consociadas
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
                    <Icon name="add-circle-outline" size={30} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
        </Stack>


        <Stack w="100%" direction="row">
            <Box w="30%" >
            <Text
                style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                    
                }}
                >
                {/* Culturas consociadas: */}
            </Text>
            </Box>
            <Box w="70%">
            {          
                (
                    farmland.consociatedCrops.length === 0
                    ||
                    farmland.consociatedCrops.some((crop)=>crop === 'Nenhuma')   
                ) &&      
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 13,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >
                            (Nenhuma)
                        </Text>
            }

{
    (
        farmland.consociatedCrops.length > 0
  
    ) && 
    farmland.consociatedCrops?.map(c=>
        (<Text key={c}                             
            style={{
                color: COLORS.grey,
                fontSize: 14,
                fontFamily: 'JosefinSans-Regular',
                // paddingLeft: 10,
            }}>
            - {c}
        </Text>))
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
                    Área
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
                    <Icon name="edit-road" size={30} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
        </Stack>

       <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Total declarada
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.totalArea} hectares
                </Text>
            </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Aproveitada declarada
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.usedArea} hectares
                </Text>
            </Box>
        </Stack>
        <Stack w="100%" direction="row">
            <Box w="30%">
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    Auditada
                </Text>
            </Box>
            <Box w="70%">
                <Text                     
                    style={{
                        color: COLORS.grey,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                    >
                    {farmland.auditedArea ? `${farmland.auditedArea} hectares` : '(Desconhecida)'}
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
                    Coordenadas
                </Text>
            </Box>
            <Box w="25%"></Box>
            <Box w="25%">
                <TouchableOpacity
                    style={{
                        // flexDirection: 'row',
                        // padding: 1,
                    }}
                    onPress={
                        ()=>navigation.navigate('FarmlandAreaAudit', {
                            farmlandId: farmland._id,
                        })
                    }
                >
                    <Icon name="add-location-alt" size={30} color={COLORS.main} />
                </TouchableOpacity>
            </Box>
        </Stack>
{
    farmland.extremeCoordinates.length > 0 &&
    farmland.extremeCoordinates?.map((coords)=>{
        return (
           <Stack key={coords.position} w="100%" direction="row">
                <Box w="30%">
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Ponto {coords.position} 
                    </Text>
                </Box>
                <Box w="70%">
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Latitude: {coords.latitude}
                    </Text>
                    <Text                     
                        style={{
                            color: COLORS.grey,
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        >
                        Longitude: {coords.longitude}
                    </Text>
                </Box>
            </Stack>
        )
    })
}
{
    farmland.extremeCoordinates.length === 0 &&
    (
        <Stack  w="100%" direction="row">
        <Box w="30%">
            <Text
                style={{
                    color: COLORS.grey,
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
                    color: COLORS.grey,
                    fontSize: 14,
                    fontFamily: 'JosefinSans-Regular',
                }}
                >
                (Nenhumas)
            </Text>
        </Box>
    </Stack>
    )

}

</Stack>
</View>
</CollapseBody>
    </Collapse>  
        </View>
    )
}

export default FarmlandData;