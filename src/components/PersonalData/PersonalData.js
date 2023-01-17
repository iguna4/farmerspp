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
            }}
        >

        <Stack w="100%" direction="row" py="4">
                <Box w="30%">
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 14,
                            fontFamily: 'JosefinSans-Bold',
                            
                        }}
                        >
                    Nascimento:</Text>
                </Box>
                <Box w="70%">
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                        Data
                    </Text>
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {new Date(farmer.birthDate).toLocaleDateString()}{' '}({new Date().getFullYear() - new Date(farmer.birthDate).getFullYear()} anos)
                    </Text>
                <Box>
                <Text
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            fontFamily: 'JosefinSans-Regular',
                        }}                    
                        >
                    Lugar
                </Text>  

        <Box>
{   farmer?.birthPlace?.province &&
                 <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.province}
                    </Text>
}
{   farmer?.birthPlace?.district &&                 
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        {farmer?.birthPlace?.district}
                    </Text>
}
{   farmer?.birthPlace?.adminPost &&                 
                    <Text                         
                        style={{
                            color: 'grey',
                            fontSize: 14,
                            paddingLeft: 10,
                            fontFamily: 'JosefinSans-Regular',
                        }} >
                        { farmer?.birthPlace?.adminPost}
                    </Text>
}
                </Box>
            </Box>
                </Box>
            </Stack>
            <CustomDivider />
            <Stack w="100%" direction="row" py="4">
                <Box w="30%" >
                <Text
                    style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >
                    Endereço:
                </Text>
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

            <Stack w="100%" direction="row" py="4">
            <Box w="30%" >
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
                <Box w="70%">

                <Text 
                    style={{
                        color: 'grey',
                        fontSize: 13,
                        fontFamily: 'JosefinSans-Regular',
                    }}  
                >
                    Telefone {!(farmer?.contact?.primaryPhone || farmer?.contact?.secondaryPhone) && '(nenhum).'}    
                </Text>            
{ farmer?.contact?.primaryPhone !== 0  &&
                   <Text 
                        style={{
                            color: 'grey',
                            fontSize: 13,
                            paddingLeft: 10,
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
          fontSize: 13,
          paddingLeft: 10,
          fontFamily: 'JosefinSans-Regular',
      }}  
      >
      {farmer?.contact?.secondaryPhone} (alternativo)
  </Text>    
}

                </Box>
        </Stack>
        <CustomDivider />
        <Stack direction="row" w="100%" py="4">
            <Box w="30%" >
                <Text 
                    style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                        
                    }}
                    >Doc. Identificação:</Text>
            </Box>
            <Box w="70%">
{
   farmer?.idDocument?.docType !== 'Nenhum' && 
        <Text 
                style={{
                    color: 'grey',
                    fontSize: 13,
                    fontFamily: 'JosefinSans-Regular',
                }}
            >
                {farmer?.idDocument?.docType} ({farmer?.idDocument?.docNumber })
            </Text>
}
{
   farmer?.idDocument?.nuit !== 0 && 
        <Text 
                style={{
                    color: 'grey',
                    fontSize: 13,
                    fontFamily: 'JosefinSans-Regular',
                }}
            >
                NUIT ({farmer?.idDocument?.nuit })
            </Text>
}
{
       !(farmer?.idDocument?.docType && farmer?.idDocument?.nuit) && 
       <Text 
               style={{
                   color: 'grey',
                   fontSize: 13,
                   fontFamily: 'JosefinSans-Regular',
               }}
           >
               Nenhum
           </Text>
}

            </Box>
        </Stack>
        <CustomDivider />

        </View>
        </CollapseBody>
    </Collapse>  
        </>
    )
}

export default PersonalData;