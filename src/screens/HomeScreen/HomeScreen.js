
import {
  View, Text, InteractionManager,
  SafeAreaView, Image, TouchableOpacity, ScrollView
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Stack, Center, } from 'native-base';
import { Icon } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';



import COLORS from '../../consts/colors';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { months } from '../../helpers/dates';
import CustomDivider from '../../components/Divider/CustomDivider';
import UserGoalEdit from '../../components/UserGoalEdit/UserGoalEdit';
import { roles } from '../../consts/roles';
import UserProfile from '../../components/UserProfile/UserProfile';
import { getPercentage } from '../../helpers/getPercentage';


import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
const { useRealm, useQuery, useObject } = realmContext; 


const userStats = 'userStats';


export default function HomeScreen() {
  const realm = useRealm();
  const user = useUser();
  const customUserData = user?.customData;

  const [isPerformanceButtonActive, setIsPerformanceButtonActive] = useState(false)
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const [isGoalUpdateVisible, setIsGoalUpdateVisible] = useState(false);
  const [isFieldAgent, setIsFieldAgent] = useState(true);

  const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

 
  
  const provincialUserStats = useQuery('UserStat').filtered(`userProvince == "${customUserData?.userProvince}" && userDistrict != "NA"`);

  // --------------------------------------------------------
  const districts =  Array.from(new Set(provincialUserStats.map((stat)=>stat?.userDistrict)));

  // --------------------------------------------------------
  // get extract stats from whole province
  const tWholeProvince =  provincialUserStats?.map((stat)=>{
    return (
      {
        tFarmers: stat.targetFarmers,
        tFarmlands: stat.targetFarmlands,
      }
    )
  });

  const rWholeProvince =  provincialUserStats?.map((stat)=>{
    return (
      {
        rFarmers: stat.registeredFarmers,
        rFarmlands: stat.registeredFarmlands,
      }
    )
  });

  // the current user provincial stats (Number of farmers and farmlands that have to be registered
  // until the end of the project execution
  // the current user provincial stats (number of farmers and farmlands that have been registered so far)

  const tpFarmers = tWholeProvince.map((stat)=>stat.tFarmers).reduce((ac, cur)=>(ac+cur), 0);
  const rpFarmers = rWholeProvince.map((stat)=>stat.rFarmers).reduce((ac, cur)=>(ac+cur), 0);
  const tpFarmlands = tWholeProvince.map((stat)=>stat.tFarmlands).reduce((ac, cur)=>(ac+cur), 0);
  const rpFarmlands = rWholeProvince.map((stat)=>stat.rFarmlands).reduce((ac, cur)=>(ac+cur), 0);

  // ----------------------------------------------------------------
  //  extract stats from whole district
  const tWholeDistrict = 
    provincialUserStats
      ?.filter((stat)=>stat.userDistrict === customUserData?.userDistrict && stat.userDistrict !== 'NA')
      ?.map((stat)=>{
        return (
          {
            tFarmers: stat.targetFarmers,
            tFarmlands: stat.targetFarmlands,
          }
        )
      });

  const rWholeDistrict = 
    provincialUserStats
      ?.filter((stat)=>stat.userDistrict === customUserData?.userDistrict && stat.userDistrict !== 'NA')
      ?.map((stat)=>{
        return (
          {
            rFarmers: stat.registeredFarmers,
            rFarmlands: stat.registeredFarmlands,
          }
        )
      });


  // the current user district stats in terms of farmers and farmlands that have to be registered
  // within the district and the project execution timeline
  // the current district stats (number of farmers and farmlands that have been registered so far)

  const tdFarmers = tWholeDistrict.map((stat)=>stat.tFarmers).reduce((ac, cur)=>(ac+cur), 0);
  const rdFarmers = rWholeDistrict.map((stat)=>stat.rFarmers).reduce((ac, cur)=>(ac+cur), 0);
  const tdFarmlands = tWholeDistrict.map((stat)=>stat.tFarmlands).reduce((ac, cur)=>(ac+cur), 0);
  const rdFarmlands = rWholeDistrict.map((stat)=>stat.rFarmlands).reduce((ac, cur)=>(ac+cur), 0);

  // ---------------------------------------------------------------
  // extract stats of the current user
  
  const tCurrentUser = 
    provincialUserStats
    ?.filter((stat)=>stat.userId === customUserData?.userId)
    ?.map((stat)=>{
      return (
        {
          tFarmers: stat.targetFarmers,
          tFarmlands: stat.targetFarmlands,
        }
      )
    }); 
    
    const rCurrentUser = 
    provincialUserStats
    ?.filter((stat)=>stat.userId === customUserData?.userId)
    ?.map((stat)=>{
      return (
        {
          rFarmers: stat.registeredFarmers,
          rFarmlands: stat.registeredFarmlands,
        }
      )
    }); 

    // the current user stats (target -- gooal in terms of the number of farmers and farmlands)
    //  they must register throughout the project execution
    //  the current user stats (number of farmers and farmlands registered)

    const tuFarmers = tCurrentUser.map((stat)=>stat.tFarmers).reduce((ac, cur)=>(ac+cur), 0);
    const ruFarmers = rCurrentUser.map((stat)=>stat.rFarmers).reduce((ac, cur)=>(ac+cur), 0);
    const tuFarmlands = tCurrentUser.map((stat)=>stat.tFarmlands).reduce((ac, cur)=>(ac+cur), 0);
    const ruFarmlands = rCurrentUser.map((stat)=>stat.rFarmlands).reduce((ac, cur)=>(ac+cur), 0);
    //---------------------------------------------------------------------- 




    // -----------------------------------------------------------------------------------


  useEffect(() => {

    realm.subscriptions.update(mutableSubs => {
      mutableSubs.removeByName(userStats);
      mutableSubs.add(
        realm.objects('UserStat').filtered(`userProvince == "${user?.customData?.userProvince}"`),
        {name: userStats},
      );
    });

    if (customUserData?.role?.includes(roles.provincialManager)) {
      setIsFieldAgent(false);

    }

  }, [ user, realm, ])


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
          marginBottom: 10,
        
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
                  textAlign: 'center',
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
                setIsUserProfileVisible(prev=>!prev);

              }}
            >
              <Icon name="account-circle" color={COLORS.main} size={50}  />
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.grey,
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 18,
                }}
                >{customUserData?.name?.split(' ')[0]}</Text>
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


{/* Province users and districts */}
{
  !isFieldAgent && 

  <ScrollView
    contentContainerStyle={{
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.main,
      // marginVertical: 30,

    }}

  >

    <View
      style={{
        marginBottom: 60,
      }}
    >

      <View 
        style={{ 
          width: '100%',
          backgroundColor: COLORS.main,
          borderWidth: 1,
          borderColor: COLORS.main,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // padding: 5,
          }}
        >
            <Text
              style={{
                fontSize: 22,
                color: COLORS.ghostwhite,
                fontFamily: 'JosefinSans-Bold',
                textAlign: 'center',
                
              }}
            >
              {customUserData?.userProvince}
            </Text>

          <Stack direction="row" w="100%">

            <Box 
              style={{
                width: '40%',
                // height: 100,
               
              }}
              >
              <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                  >
                    Usuários
                  </Text>
                  <Box
                    alignItems={"center"}
                  >

                  <Text
                    style={{
                      width: '50%',
                      fontSize: 30,
                      fontFamily: 'JosefinSans-Regular',
                      textAlign: 'center',
                      color: COLORS.main,
                      borderRadius: 100,
                      borderWidth: 1,
                      backgroundColor: COLORS.ghostwhite,
                      borderColor: COLORS.ghostwhite
              
                    }}
                  >
                    {provincialUserStats?.length}
                  </Text>
                  </Box>
            </Box>

            <Box w="20%">
            </Box>


            <Box 
              style={{
                width: '40%',
                // height: 100,
               
              }}
              >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                  >
                    Distritos
                  </Text>
                  <Box alignItems={"center"}>

                  <Text
                      style={{
                        width: '50%',
                        fontSize: 30,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'center',
                        color: COLORS.main,
                        borderRadius: 100,
                        borderWidth: 1,
                        backgroundColor: COLORS.ghostwhite,
                        borderColor: COLORS.ghostwhite,
                      }}
                      >
                    {districts?.length}
                  </Text>
                  </Box>
            </Box>

          </Stack>
          </Box>
        </View>


    </View>



{/* provincial goals in terms of farmers and farmlands registrations  */}


    <View
    style={{
      padding: 10,
    }}
    >
      <View 
        style={{ 
          width: '100%',
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
            // justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
            <Icon name="update" size={30} color={COLORS.danger} />
            <Box style={{
              paddingLeft: 10,
            }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.danger,
                  fontFamily: 'JosefinSans-Bold',               
                }}
                >
                Meta
              </Text>
            </Box>
        </Box>
      </View>

        <Box
          style={{  
            width: '100%', 
          }}
          >

          <Stack direction="row" w="100%">
          <Box 
              style={{
                width: '15%',
              }}
              >
            </Box>

            <Box 
              style={{
                width: '25%',
                height: 100,                
              }}
              >
              <TouchableOpacity>
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: COLORS.danger,
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: COLORS.danger,
                      borderTopLeftRadius: 100,
                      borderTopRightRadius: 100,
                      borderTopEndRadius: 100,
                      width: '100%',

                    }}
                  >

                  <Icon name="nature-people" size={35} color={COLORS.ghostwhite} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                    >
                    Produtores
                  </Text>
                  </Box>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: 'JosefinSans-Regular',
                      textAlign: 'center',
                      color: COLORS.danger,
                      paddingTop: 5,
                    }}
                  >
                    {tpFarmers}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>

            <Box w="20%">
            </Box>

            <Box 
              style={{
                width: '25%',
                height: 100,               
              }}
              >
              <TouchableOpacity>
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: COLORS.danger,
                  }}
                >

                <Box
                    style={{
                      backgroundColor: COLORS.danger,
                      borderTopLeftRadius: 100,
                      borderTopRightRadius: 100,
                      borderTopEndRadius: 100,
                      width: '100%',
                    }}
                  >
                  <Icon name="nature" size={35} color={COLORS.ghostwhite} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                    >
                    Pomares
                  </Text>
                  </Box>
                  <Text
                      style={{
                        fontSize: 25,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'center',
                        color: COLORS.danger,
                        paddingTop: 5,
                      }}
                      >
                    {tpFarmlands}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box 
              style={{
                width: '15%',
              }}
              >
            </Box>
          </Stack>

        </Box>
    </View>


    {/*  provincial achievments in terms of farmers and farmlands registrations */}

  
    <CustomDivider 
      thickness={1}
      bg={COLORS.main}
    />

      <View 
        style={{ 
          width: '100%',
          paddingVertical: 10,
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
            // justifyContent: 'center',
            flexDirection: 'row',
            paddingLeft: 10,
          }}
        >
            <Icon name="done-outline" size={30} color={COLORS.lightdanger} />
            <Box style={{
              paddingLeft: 10,
            }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.lightdanger,
                  fontFamily: 'JosefinSans-Bold',               
                }}
                >
                Realização
              </Text>
            </Box>
        </Box>
      </View>

        <Box
          style={{  
            width: '100%', 
            paddingVertical: 20,

          }}
          >

          <Stack direction="row" w="100%">
          <Box 
              style={{
                width: '15%',
              }}
              >
            </Box>

            <Box 
              style={{
                width: '25%',
                height: 100,                
              }}
              >
              <TouchableOpacity>
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 2,
                    borderTopColor: COLORS.lightdanger,
                  }}
                >

                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: 'JosefinSans-Regular',
                      textAlign: 'center',
                      color: COLORS.lightdanger,
                      paddingTop: 5,
                    }}
                  >
                    {getPercentage(rpFarmers, tpFarmers)}
                  </Text>

                  <Box
                    style={{
                      backgroundColor: COLORS.lightdanger,
                      borderBottomLeftRadius: 100,
                      borderBottomRightRadius: 100,
                      borderBottomEndRadius: 100,
                      width: '100%',

                    }}
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                    >
                    Produtores
                  </Text>

                  <Icon name="nature-people" size={35} color={COLORS.ghostwhite} />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>

            <Box w="20%">
            </Box>

            <Box 
              style={{
                width: '25%',
                height: 100,               
              }}
              >
              <TouchableOpacity>
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 2,
                    borderTopColor: COLORS.lightdanger,
                  }}
                >

                  <Text
                      style={{
                        fontSize: 25,
                        fontFamily: 'JosefinSans-Regular',
                        textAlign: 'center',
                        color: COLORS.lightdanger,
                        paddingTop: 5,
                      }}
                      >
                      {getPercentage(rpFarmlands, tpFarmlands)}
                  </Text>

                <Box
                    style={{
                      backgroundColor: COLORS.lightdanger,
                      borderBottomLeftRadius: 100,
                      borderBottomRightRadius: 100,
                      borderBottomEndRadius: 100,
                      width: '100%',
                    }}
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      textAlign: 'center',
                      color: COLORS.ghostwhite,
                    }}
                    >
                    Pomares
                  </Text>
                  <Icon name="nature" size={35} color={COLORS.ghostwhite} />
                  </Box>


                </Box>
              </TouchableOpacity>
            </Box>
            <Box 
              style={{
                width: '15%',
              }}
              >
            </Box>
          </Stack>

        </Box>

    
</ScrollView>
}








{    isFieldAgent &&
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
              <Box w="50%"   alignItems={'center'}   >
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
                Provincial ({customUserData?.userProvince})
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
                }}             
                >
                {getPercentage(rpFarmers, tpFarmers)}
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
                }}             
                >
                {tpFarmers}
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
                Distrital ({customUserData?.userDistrict})
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
                }}              
                >
                {getPercentage(rdFarmers,tdFarmers)}
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
                }}             
                >
                {tdFarmers}
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
                Individual ({customUserData?.name})
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

                }}              
                >
                {getPercentage(ruFarmers, tuFarmers)}
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
                {tuFarmers}
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
            Provincial ({customUserData?.userProvince})
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
           {getPercentage(rpFarmlands, tpFarmlands)}
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
            {tpFarmlands}
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
            Distrital ({customUserData?.userDistrict})
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
            {getPercentage(rdFarmlands, tdFarmlands)}
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
            {tdFarmlands}
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
            Individual ({customUserData?.name})
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
            {getPercentage(ruFarmlands, tuFarmlands)}
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
            {tuFarmlands}
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
  
    <UserProfile 
      user={user}
      setIsGoalUpdateVisible={setIsGoalUpdateVisible}
      isUserProfileVisible={isUserProfileVisible}
      setIsUserProfileVisible={setIsUserProfileVisible}
    />
    <UserGoalEdit 
      isGoalUpdateVisible={isGoalUpdateVisible}
      setIsGoalUpdateVisible={setIsGoalUpdateVisible}
    />
    </SafeAreaView>
  )
}
