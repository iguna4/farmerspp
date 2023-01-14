/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { 
  View, Text, InteractionManager, StyleSheet, 
  ImageBackground, SafeAreaView, Image, Animated, Easing, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState, useRef} from 'react'
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import FastImage from 'react-native-fast-image';
import COLORS from '../../consts/colors';

import {Button, ListItem, Avatar, FAB, Icon } from '@rneui/themed';
import Realm from 'realm';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';
import ImageSliderBox from '../../components/ImageSliderBox/ImageSliderBox';
import { months } from '../../helpers/dates';
import CustomDivider from '../../components/Divider/CustomDivider'


import { realmContext } from '../../models/realm';
const { useRealm, useQuery } = realmContext; 


export default function HomeScreen({ navigation }) {
  const realm = useRealm();
  const [isPerformanceButtonActive, setIsPerformanceButtonActive] = useState(false)

  realm.write(()=>{

  })

  const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setLoadingActivityIndicator(true);
      // Expensive task
    });

    return () => task.cancel();
  }, [])
);


  if (loadingActivitiyIndicator) {
    return <CustomActivityIndicator 
        loadingActivitiyIndicator={loadingActivitiyIndicator}
        setLoadingActivityIndicator={setLoadingActivityIndicator}
    />
  }
  


  return (
    <SafeAreaView
      style={{ 
        flex: 1,  
        backgroundColor: 'ghostwhite', 
        // alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          height: "23%",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: '#EBEBE4',
          backgroundColor: '#EBEBE4',
          // justifyContent: 'center',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginBottom: 20,
        
          shadowColor: COLORS.main,
          shadowOffset: {
              // width: 1,
              // height: 1,
            },
          // shadowOpacity: 1,
          // shadowRadius: 0.65,
          
          // elevation: 1,          
        }}
      >
        <Box
          style={{
            padding: 15,
          }}
        >
          <Stack direction="row" w="100%">
            <Center w="30%">
              <Image
                style={{ width: 70, height: 70, borderRadius: 100, }}
                source={require('../../../assets/images/iamLogo2.png')}
                // resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={{
                  color: COLORS.main,
                  fontSize: 24,
                  fontFamily: 'JosefinSans-Bold',
                }}
              >IAM, IP</Text>
            </Center>
            <Box w="70%" style={{
              // flexDirection:'row',
              // width: '70%',
            }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'JosefinSans-Bold',
                  color: COLORS.main,
                  textAlign: 'right',
                  
                }}
                >
                  ConnectCaju
                </Text>
                <Text
                  style={{
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      color: COLORS.main,
                      textAlign: 'right',
                    }}
                >Ancuabe</Text>
              </Box>
          </Stack>
          </Box>
      </View>

      <View
        style={{
          // height: '7%',
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'right',
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Bold',
            fontSize: 18,
            paddingBottom: 15,
          }}
        >
          Carlos Eduardo Langa
        </Text>


        <View 
          style={{ 
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          
            shadowColor: COLORS.main,
            shadowOffset: {
                width: 1,
                height: 1,
              },
            shadowOpacity: 1,
            shadowRadius: 0.65,
            
            elevation: 2,
          
          }}
          >
          
          <Box
            style={{
              backgroundColor: COLORS.main,
              width: '100%',
              paddingHorizontal: 10,
              justifyContent: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
              <Box pb="2">
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                  }}
                  >
                    Desempenho
                  </Text>
              </Box>

            <Stack direction="row">
              <Box w="50%"
                style={{

                }}
              >
                <TouchableOpacity   
                  onPress={()=>{
                    setIsPerformanceButtonActive(prev=>!prev);
                  }}                
                  style={{
                    backgroundColor: isPerformanceButtonActive ? COLORS.main : COLORS.ghostwhite,
                    width: '50%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: COLORS.ghostwhite,
                    paddingTop: 5,
                  }}
                  >

                <Text
                    style={{
                      color: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.main,
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      paddingBottom: 5,
                      textAlign: 'center',
                    }}
                    >
                      Produtores
                  </Text>                
                  </TouchableOpacity>
              </Box>
              <Box w="50%"
                style={{
                  alignItems: 'flex-end',
                }}
                >
                <TouchableOpacity  
                  onPress={()=>{
                    setIsPerformanceButtonActive(prev=>!prev);
                  }}            
                  style={{
                    backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.main,
                    width: '50%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: COLORS.ghostwhite,
                    paddingTop: 5,
                  }}
                  >

                <Text
                    style={{
                      color: isPerformanceButtonActive ? COLORS.main : COLORS.ghostwhite,
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      paddingBottom: 5,
                      textAlign: 'center',
                    }}
                    >
                    Pomares
                  </Text> 
                  </TouchableOpacity>
                </Box>
            </Stack>
          </Box>
      {
        !isPerformanceButtonActive && (

          <Stack direction="column" w="100%" pt="4">
            <Stack direction="row">
              <Box w="50%">
              <Text style={{
                textAlign: 'center',
                color: COLORS.black,
                fontFamily: 'JosefinSans-Bold',
              }}
              >
                Realização
              </Text>
              <Text
              style={{
                textAlign: 'center',
                color: COLORS.grey,
                fontFamily: 'JosefinSans-Bold',
              }}
              >
                Até {months[new Date().getMonth()]} {new Date().getFullYear()}  
              </Text>            
              </Box>
              <Box w="50%">
                <Text style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontFamily: 'JosefinSans-Bold',
                }}
                >
                  Meta
                </Text>            
                <Text
              style={{
                textAlign: 'center',
                color: COLORS.grey,
                fontFamily: 'JosefinSans-Bold',
              }}
              >
                Até Dezembro {new Date().getFullYear()}  
              </Text>                
              </Box>
            </Stack>
            <CustomDivider />
            <Text style={{
              textAlign: 'center',
              color: COLORS.main,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Provincial (Cabo Delgado)
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                20%
              </Text>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                12000
              </Text>
            </Center>
            </Box>
          </Stack>


          <CustomDivider />
            <Text style={{
              textAlign: 'center',
              color: COLORS.main,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Distrital (Ancuabe)
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                20%
              </Text>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                12000
              </Text>
            </Center>
            </Box>
          </Stack>

          <CustomDivider />
            <Text style={{
              textAlign: 'center',
              color: COLORS.main,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Individual (Carlos Eduardo Langa)
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                20%
              </Text>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: COLORS.grey,
                }}              
                >
                12000
              </Text>
            </Center>
            </Box>
          </Stack>
        </Stack>
        )
      }

    {
      isPerformanceButtonActive && (
        <Stack direction="column" w="100%" pt="4">
        <Stack direction="row">
          <Box w="50%">
          <Text style={{
            textAlign: 'center',
            color: COLORS.black,
            fontFamily: 'JosefinSans-Bold',
          }}
          >
            Realização
          </Text>
          <Text
          style={{
            textAlign: 'center',
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Bold',
          }}
          >
            Até {months[new Date().getMonth()]} {new Date().getFullYear()}  
          </Text>            
          </Box>
          <Box w="50%">
            <Text style={{
              textAlign: 'center',
              color: COLORS.black,
              fontFamily: 'JosefinSans-Bold',
            }}
            >
              Meta
            </Text>            
            <Text
          style={{
            textAlign: 'center',
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Bold',
          }}
          >
            Até Dezembro {new Date().getFullYear()}  
          </Text>                
          </Box>
        </Stack>
        <CustomDivider />
        <Text style={{
          textAlign: 'center',
          color: COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Provincial (Cabo Delgado)
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            20%
          </Text>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            12000
          </Text>
        </Center>
        </Box>
      </Stack>


      <CustomDivider />
        <Text style={{
          textAlign: 'center',
          color: COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Distrital (Ancuabe)
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            20%
          </Text>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            12000
          </Text>
        </Center>
        </Box>
      </Stack>

      <CustomDivider />
        <Text style={{
          textAlign: 'center',
          color: COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Individual (Carlos Eduardo Langa)
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            20%
          </Text>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center>
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.grey,
            }}              
            >
            12000
          </Text>
        </Center>
        </Box>
      </Stack>
    </Stack>
        )
      }
       </View>

      </View>

    </SafeAreaView>
  )
}
