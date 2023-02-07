
import { 
  View, Text, InteractionManager, 
  SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState} from 'react'
import { Box, Stack, Center,  } from 'native-base';
import COLORS from '../../consts/colors';

import {Icon } from '@rneui/themed';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { useFocusEffect } from '@react-navigation/native';
import { months } from '../../helpers/dates';
import CustomDivider from '../../components/Divider/CustomDivider'
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
 } from "react-native-popup-menu";
import { user } from '../../consts/user';


import { realmContext } from '../../models/realmContext';
const { useRealm } = realmContext; 


export default function HomeScreen() {
  const realm = useRealm();
  const [isPerformanceButtonActive, setIsPerformanceButtonActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

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
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: '#EBEBE4',
          backgroundColor: '#EBEBE4',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginBottom: 50,
        
          shadowColor: COLORS.main,       
        }}
      >
        <Box
          style={{
            paddingHorizontal: 15,
          }}
        >
        <Stack direction="row" w="100%" pb="4">
        <Box w="40%" alignItems={'center'}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 100, }}
                source={require('../../../assets/images/iamLogo2.png')}
              />
              <Text
                style={{
                  color: COLORS.main,
                  fontSize: 18,
                  fontFamily: 'JosefinSans-Bold',
                }}
              >IAM, IP</Text>
          </Box>
          <Box w="20%"  >
          </Box>
          <Box w="40%" alignItems={'center'}>
            <TouchableOpacity
              onPress={()=>{
                setIsOpen(prev=>!prev);
              }}
            >
              <Icon name="account-circle" color={COLORS.main} size={50}  />
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 18,
                }}
                >{user.name?.split(' ')[0]}</Text>
            </TouchableOpacity>
          </Box>
        </Stack>

          <Stack direction="row" w="100%">
            <Center w="30%">
            </Center>
            <Box w="70%">
              </Box>
          </Stack>
          </Box>
      </View>

{    !isOpen &&
  <View
        style={{
          padding: 10,
        }}
      >

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
              paddingHorizontal: 5,
              alignItems: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
              <Box pb="2"
                alignItems={'center'}
              >
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

            <Stack direction="row" w="90%" space={4}>
              <Box w="50%" alignItems={'center'}
                style={{

                }}
              >
                <TouchableOpacity   
                  onPress={()=>{
                    setIsPerformanceButtonActive(prev=>!prev);
                  }}                
                  style={{
                    backgroundColor: isPerformanceButtonActive ? COLORS.second : COLORS.ghostwhite,
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: COLORS.ghostwhite,
                    paddingTop: 5,
                    position: 'relative',
                    bottom: isPerformanceButtonActive ? -2 : -2,
                  }}
                  >
                <Text
                    style={{
                      color: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                      fontSize: 14,
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
                alignItems={'center'}
                style={{
                  // alignItems: 'flex-end',
                }}
                >
                <TouchableOpacity  
                  onPress={()=>{
                    setIsPerformanceButtonActive(prev=>!prev);
                  }}            
                  style={{
                    backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.second,
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,

                    borderColor: COLORS.ghostwhite,
                    paddingTop: 5,
                    position: 'relative',
                    bottom: isPerformanceButtonActive ? -2 : -2,


                  }}
                  >

                <Text
                    style={{
                      color: isPerformanceButtonActive ? COLORS.danger : COLORS.ghostwhite,
                      fontSize: 14,
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
              color: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Provincial ({user.province})
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >

              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                }}             
                >
                27.11 %
              </Text>
              </Center>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 30,
                  // backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                }}             
                >
                32744
              </Text>
            </Center>
            </Center>
            </Box>
          </Stack>


          <CustomDivider />
            <Text style={{
              textAlign: 'center',
              color: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Distrital ({user.district})
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 30,
                  // backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                }}              
                >
                15.56 %
              </Text>
            </Center>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 30,
                  // backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                }}             
                >
                9800
              </Text>
            </Center>
            </Center>
            </Box>
          </Stack>

          <CustomDivider />
            <Text style={{
              textAlign: 'center',
              color: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
              fontFamily: 'JosefinSans-Bold',
              paddingTop: 10,
            }}>
                Individual ({user.name})
            </Text>            
          
          <Stack w="100%" direction="row" space={4} py="2">
            <Box w="50%" alignItems={'center'} >
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 30,
                  // backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                }}              
                >
                29.90 %
              </Text>
              </Center>
            </Center>
            </Box>

            <Box w="50%" alignItems={'center'}>
            <Center w="100%">
              <Center w="50%"
                style={{
                  backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                  borderRadius: 30,
                  paddingVertical: 5,

                }}
              >
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  color: isPerformanceButtonActive ? COLORS.lightdanger : COLORS.ghostwhite,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 30,
                  // backgroundColor: isPerformanceButtonActive ? COLORS.ghostwhite : COLORS.lightdanger,
                }}              
                >
                850
              </Text>
            </Center>
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
          color: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Provincial ({user.province})
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,

            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}              
            >
            19.35 %
          </Text>
          </Center>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,

            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}
            >
            42000
          </Text>
        </Center>
        </Center>
        </Box>
      </Stack>


      <CustomDivider />
        <Text style={{
          textAlign: 'center',
          color: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Distrital ({user.district})
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,

            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}
            >
            20.78 %
          </Text>
          </Center>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,

            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}
            >
            9170
          </Text>
        </Center>
        </Center>
        </Box>
      </Stack>

      <CustomDivider />
        <Text style={{
          textAlign: 'center',
          color: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
          fontFamily: 'JosefinSans-Bold',
          paddingTop: 10,
        }}>
            Individual ({user.name})
        </Text>            
      
      <Stack w="100%" direction="row" space={4} py="2">
        <Box w="50%" alignItems={'center'} >
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,

            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}
            >
            5.89 %
          </Text>
        </Center>
        </Center>
        </Box>

        <Box w="50%" alignItems={'center'}>
        <Center w="100%">
          <Center w="50%"
            style={{
              backgroundColor: isPerformanceButtonActive ? COLORS.danger : COLORS.main,
              borderRadius: 30,
              paddingVertical: 5,
            }}
          >
          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.ghostwhite,
            }}
            >
            230
          </Text>
        </Center>
        </Center>
        </Box>
      </Stack>
    </Stack>
        )
      }
       </View>

      </View>
      
    }
  


      <MenuProvider
        style={{
          position: 'absolute',
          top: 40,
          left: 30,
          zIndex: 4,
        }}
      >
        <Menu
        renderer={renderers.SlideInMenu}
          opened={isOpen}
          onBackdropPress={() =>{}}
          onSelect={()=>{}}
        >
          <MenuTrigger
            
            customStyles={{
              triggerWrapper: {
                position: 'absolute', 
                top: -30, 
                left: -20,
                zIndex: 6,
              },
            }}
          >
             {/* <Icon
              onPress={()=>setIsOpen(true)}
             name="add-circle" color="#005000" size={80} /> */}
          </MenuTrigger>
          <MenuOptions>
          <View 
            style={{
              flex: 1,
              backgroundColor: 'ghostwhite',
              height: "80%",
              width: '100%',
              paddingBottom: 30,
              zIndex: 4,
            }}
            >
            <Stack direction="row" w="100%">
              <Box w="80%">


              </Box>
              <Box w="20%" style={{
                marginTop: 20,
                paddingRight: 20,
              }}>

                <Icon 
                  onPress={()=>{
                    setIsOpen(false)}
                  }
                  name="close" size={35} color={COLORS.main} />
              </Box>
              </Stack>

              <Center style={{
                width: "80%",
                marginLeft: 35,
                marginVertical: 6,
              }}>
                <CustomDivider thickness={1} my={2}  bg={COLORS.main} />
              </Center>

              <MenuOption 
              customStyles={{
                optionWrapper: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 45,
                },
              }}
              onSelect={() => {
                console.log('perfil do Usuário!')
              }} 
              >
            <Box
              style={{
                paddingVertical: 5,
              }}
             >
              <Stack direction="row" space={4}  ml="7">
                <Icon name="account-circle" size={30} color={COLORS.grey} />
                <Text 
                  style={{
                    color: COLORS.grey, 
                    fontSize: 18, 
                    fontFamily: 'JosefinSans-Bold'
                  }}
                  >
                    Perfil do Usuário
                  </Text>
              </Stack>
            </Box>            
            </MenuOption>
            

            <Center style={{
              width: "80%",
              marginLeft: 35,
              marginVertical: 6,
            }}>
              <CustomDivider thickness={1} my={2}  bg={COLORS.main} />
            </Center>

            <MenuOption 
              customStyles={{
                optionWrapper: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 45,
                },
              }}
              onSelect={() => {
                console.log('sessao terminada!')
              }} 
              >
            <Box
              style={{
                paddingVertical: 5,
              }}
             >
              <Stack direction="row" space={4}  ml="7">
                <Icon name="logout" size={30} color={COLORS.grey} />
                <Text 
                  style={{
                    color: COLORS.grey, 
                    fontSize: 18, 
                    fontFamily: 'JosefinSans-Bold'
                  }}
                  >
                    Terminar Sessão
                  </Text>
              </Stack>
            </Box>            
            </MenuOption>

            <Center style={{
              width: "80%",
              marginLeft: 35,
              marginVertical: 6,
            }}>
              <CustomDivider thickness={1} my={2}  bg={COLORS.main} />
            </Center>
            </View>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </SafeAreaView>
  )
}
