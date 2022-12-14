import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { Box, Stack, Center, Separator, Thumbnail, List, ListItem } from 'native-base';
import { Avatar, Divider, Icon } from '@rneui/base';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import { realmContext } from '../../models/realm';
import CustomDivider from '../Divider/CustomDivider';
import { useNavigation } from '@react-navigation/native';
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
                <Text
                    style={{ 
                        fontSize: 14, 
                        color: 'ghostwhite',
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
                    Descri????o:</Text>
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
                            {farmland.trees} (??rvores)
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
                    <Box>
                    <Box>
                        {farmland.plantTypes?.plantTypes?.map(p=>
                        (<Text key={p}                             style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}>
                            {p}
                        </Text>))}
                    </Box>
                    <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        [ {  
                        farmland.plantTypes?.plantTypes?.some(el=>el.includes('enxer')) 
                        ? farmland.plantTypes?.clones?.join('; ') + ` (clones) ]`
                        : 'Clones desconhecidos ]'} 
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
                    ??rea:
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
                            {farmland.declaredArea} hectares (??rea declarada)
                        </Text>
    {     farmland.auditedArea ?
                   <Text 
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}                        
                            >
                            { farmland.auditedArea} (??rea auditada)
                        </Text>
                        :
                        <Text 
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Regular',
                        }}                        
                        >
                        Nenhuma (??rea auditada)
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
                                Posi????o: {point.position} (lat:{point.latitude + ' | ' + 'long:' + point.longitude})
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
                        <Stack w="80%" direction="row">
                            <Box mx="3" w="50%" >

                            </Box>
                            <Box mx="3" w="50%"
                                style={{
                                    // backgroundColor: '#005000',
                                    // borderWidth: 2,
                                    // borderRadius: 100,
                                    // borderColor: '#005000',
                                }}                    
                            >
                                <TouchableOpacity
                                    disabled={farmland?.auditedArea ? true : false}
                                    onPress={
                                        ()=>navigation.navigate('FarmlandAreaAudit', {
                                            farmlandId: farmland._id,
                                        })
                                    }
                                >
                                    <Box
                                        style={{
                                            flexDirection: 'row',
                                        }}
                                    >
                                    <Avatar 
                                        size={24}

                                        icon={{ 
                                            name: "pencil", 
                                            type: "font-awesome", 
                                            color: farmland?.auditedArea ? 'grey': 'red', 
                                        }}
                                    />
                                    <Text
                                        style={{ 
                                            textAlign: 'center',
                                            color: farmland?.auditedArea ? 'grey': 'red',
                                            padding: 4,
                                            
                                        }}
                                        >Auditar ??rea
                                    </Text>

                                    </Box>
                                </TouchableOpacity>
                            </Box>
                        </Stack>
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
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 14,
                                fontFamily: 'JosefinSans-Regular',
                            }}
                        >[ {' '}
                        {
                            [farmland.consociatedCrops?.join('; ')]
                        }{' '}]
                        </Text>
                        {
                        //     farmland.consociatedCrops?.map((crop)=>(<Text key={crop}                    
                        //     style={{
                        //         color: 'grey',
                        //         fontSize: 14,
                        //         fontFamily: 'JosefinSans-Regular',
                        //     }}
                        //     >
                        //     {crop}
                        // </Text>))
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