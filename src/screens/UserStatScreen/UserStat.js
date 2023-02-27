import {
    FlatList,  InteractionManager,  ScrollView, 
    Switch, Image, SafeAreaView, Text, View, PermissionsAndroid, 
    Animated, TouchableOpacity, SectionList, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {ListItem, Avatar, Icon, } from '@rneui/themed';
import { Box, Center, Pressable, Stack } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import { roles } from '../../consts/roles';

import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import COLORS from '../../consts/colors';
import { resourceValidation } from '../../consts/resourceValidation';
import { customizeItem } from '../../helpers/customizeItem';
import GroupItem from '../../components/GroupItem/GroupItem';
import FarmerItem from '../../components/FarmerItem/FarmerItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
import FarmlandItem from '../../components/FarmlandItem/FarmlandItem';
const { useRealm, useQuery } = realmContext; 


const farmersItems = 'farmersItems';
const groupsItems = 'groupsItems';
const institutionsItems = 'institutionsItems';
const farmlandsItems = 'farmlandsItems';
const statsItems = 'statsItems';


export default function UserStat({ route, navigation  }) {

    // const userId = route?.params?.ownerId;
    const { userId, userName} = route.params;

    const realm = useRealm();

    const [refresh, setRefresh] = useState(false);


// ---------------------------------------------------------------
    const [pendingFarmers, setPendingFarmers] = useState(false);
    const [invalidatedFarmers, setInvalidatedFarmers] = useState(false);
    const [pendingFarmlands, setPendingFarmlands] = useState(false);
    const [invalidatedFarmlands, setInvalidatedFarmlands] = useState(false);
//----------------------------------------------------------------- 

    const [farmlandList, setFarmlandList] = useState([]);
    
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

    const farmers = realm.objects('Farmer').filtered("userId == $0", userId);
    const groups = realm.objects('Group').filtered("userId == $0", userId);
    const institutions = realm.objects('Institution').filtered("userId == $0", userId);
    const farmlands = realm.objects('Farmland').filtered("userId == $0", userId);
    const stats = realm.objects('UserStat').filtered("userId == $0", userId);

    const individualsList = customizeItem(farmers, farmlands, {}, 'Indivíduo')
    const groupsList = customizeItem(groups, farmlands, {}, 'Grupo')
    const institutionsList = customizeItem(institutions, farmlands, {}, 'Instituição');
  

      // merge the three arrays of farmers and sort the items by createdAt 
    let farmersList = [];
    // let farmlandsList = [];

    if (individualsList.length > 0){
        farmersList = farmersList.concat(individualsList)
    }
    if (groupsList.length > 0){
        farmersList = farmersList.concat(groupsList);
    }
    if (institutionsList.length > 0){
        farmersList = farmersList.concat(institutionsList);
    }
    if (farmersList.length > 0){
        farmersList = farmersList
            ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    }

    // get the list of all the farmlands
    // farmlandsList = farmlands.map(farmland => farmland);

    // console.log('farmlands: ', farmlands)

    const filteredResources = (list, flag)=>{
      let newResourcesList = [];
      if (flag === 'pendingFarmers') {
        newResourcesList = list?.filter(resource=>resource?.validated === resourceValidation.status.pending);
      }
      else if (flag === 'pendingFarmlands') {
        newResourcesList = list?.filter(resource=>resource?.validated === resourceValidation.status.pending);
      }
      else if (flag === 'invalidatedFarmers') {
        newResourcesList = list?.filter(resource=>resource?.validated === resourceValidation.status.invalidated);
      }
      else if (flag === 'invalidatedFarmlands') {
        newResourcesList = list?.filter(resource=>resource?.validated === resourceValidation.status.invalidated);
      }
      return newResourcesList;
    }

    useEffect(()=>{
      setFarmlandList(farmlands.map(f=>f));
      setLoadingActivityIndicator(true);
    }, [ refresh, invalidatedFarmers, invalidatedFarmlands, pendingFarmers, pendingFarmlands  ]);

    // console.log('farmlandsList: ', farmlandList)

    useEffect(()=>{
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(farmersItems);
        mutableSubs.add(
          realm.objects('Farmer').filtered("userId == $0", userId),
          {name: farmersItems},
        );
      });

      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(groupsItems);
        mutableSubs.add(
          realm.objects('Group').filtered("userId == $0", userId),
          {name: groupsItems},
        );
      });

      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(institutionsItems);
        mutableSubs.add(
          realm.objects('Institution').filtered("userId == $0", userId),
          {name: institutionsItems},
        );
      });

      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(farmlandsItems);
        mutableSubs.add(
          realm.objects('Farmland').filtered("userId == $0", userId),
          {name: farmlandsItems},
        );
      });

      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(statsItems);
        mutableSubs.add(
          realm.objects('UserStat').filtered("userId == $0", userId),
          {name: statsItems},
        );
      });
    }, [realm, userId, refresh, invalidatedFarmers, invalidatedFarmlands, pendingFarmers, pendingFarmlands ]);


    const keyExtractor = (item, index)=>index.toString();


    useFocusEffect(
      React.useCallback(() => {
        const task = InteractionManager.runAfterInteractions(() => {
          setLoadingActivityIndicator(true);
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
        }}
      >
      <View
          style={{
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: 5,
            backgroundColor: '#EBEBE4',
            borderTopWidth: 0,
            borderColor: '#EBEBE4',
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
          }}
      >
        <Stack direction="row" w="100%"  >
          <Center w="15%">
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
            >
                <Icon
                    name="arrow-back-ios" size={35} color={COLORS.main}
                />
            </TouchableOpacity>
          </Center>

          <Box w="70%">
            <Center>
              <Text
                style={{ 
                  fontFamily: 'JosefinSans-Bold', 
                  fontSize: 18, 
                  color: COLORS.main, 
                }}
              >
                {userName}
              </Text>

            </Center>
          </Box>
          <Center 
            w="15%"
          >
            <TouchableOpacity
                onPress={()=>{
                  setRefresh(!refresh);
                  setPendingFarmers(false);
                  setPendingFarmlands(false);
                  setInvalidatedFarmers(false);
                  setInvalidatedFarmlands(false)
                }}
                >
                <Icon
                    name="refresh" size={35} color={COLORS.main}
                    />
            </TouchableOpacity>
          </Center>
        </Stack>
        </View>

        {/* pending and invalidated buttons  */}

        <Box
          w="100%"
          alignItems={"center"}

        >

        <Box
          w="100%"
          alignItems={"center"}
          style={{
            backgroundColor: COLORS.main,
            paddingLeft: 10,
            paddingRight: 15,
          }}
        >
          <Stack w="100%" direction="row" space={2} pt="5" >
                <Box w="50%"
                  style={{
                    alignItems: 'center',
                  }}
                >
                <Box
                  w="100%"
                  style={{
                    alignItems: 'center',
                    borderTopColor: COLORS.ghostwhite,
                    borderLeftColor: COLORS.ghostwhite,
                    borderRightColor: COLORS.ghostwhite,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderTopEndRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                    <Text
                      style={{
                        color: COLORS.ghostwhite,
                        fontSize: 20,
                        fontFamily: 'JosefinSans-Bold',
                      }}
                    >Produtores</Text>

                  <Stack w="100%" direction="row" >
                    
                  <Box w="50%"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                  <TouchableOpacity
                      onPress={()=>{

                        setPendingFarmers(true);
                        setPendingFarmlands(false);
                        setInvalidatedFarmers(false);
                        setInvalidatedFarmlands(false);

                      }}
                      style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                        borderTopEndRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: pendingFarmers ? COLORS.ghostwhite : COLORS.main,
                      }}
                    >
                      <Text style={{
                        textAlign: 'center',
                        color: pendingFarmers ? COLORS.main : COLORS.ghostwhite,
                        fontSize: 14,
                        fontFamily: 'JosefinSans-Bold',
                      }}>
                        Pendentes
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box w="50%"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                        onPress={()=>{
                          setPendingFarmers(false);
                          setPendingFarmlands(false);
                          setInvalidatedFarmers(true);
                          setInvalidatedFarmlands(false);
                        }}
                        style={{
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 5,
                          borderTopEndRadius: 20,
                          borderTopLeftRadius: 20,
                          backgroundColor: invalidatedFarmers ? COLORS.ghostwhite : COLORS.main,
                        }}
                      >
                        <Text style={{
                          textAlign: 'center',
                          color: invalidatedFarmers ? COLORS.main : COLORS.ghostwhite,
                          fontSize: 14,
                          fontFamily: 'JosefinSans-Bold',
                          marginRight: 5,
                        }}>
                          Invalidados
                        </Text>
                      </TouchableOpacity>
                  </Box>
                  </Stack>
              </Box>
              </Box>

    
              <Box w="50%"
                style={{
                  alignItems: 'center',

                }}
              >
                <Box
                  w="100%"
                  style={{
                    alignItems: 'center',
                    borderTopColor: COLORS.ghostwhite,
                    borderLeftColor: COLORS.ghostwhite,
                    borderRightColor: COLORS.ghostwhite,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderTopEndRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >

                 <Text
                  style={{
                    color: COLORS.ghostwhite,
                    fontSize: 20,
                    fontFamily: 'JosefinSans-Bold',
                  }}
                 >Pomares</Text>
                <Stack w="100%" direction="row" >
                  <Box w="50%"
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                    <TouchableOpacity
                      onPress={()=>{
                        setPendingFarmers(false);
                        setPendingFarmlands(true);
                        setInvalidatedFarmers(false);
                        setInvalidatedFarmlands(false);
                      }}
                      style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                        borderTopEndRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: pendingFarmlands ? COLORS.ghostwhite : COLORS.main,

                      }}
                    >
                      <Text 
                        style={{ 
                          textAling: 'center',  
                          color: pendingFarmlands ? COLORS.main : COLORS.ghostwhite, 
                          fontSize: 14,
                          fontFamily: 'JosefinSans-Bold',
                        }}
                        >
                        Pendentes
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box w="50%"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                    }}
                    >
                    <TouchableOpacity
                        onPress={()=>{
                          setPendingFarmers(false);
                          setPendingFarmlands(false);
                          setInvalidatedFarmers(false);
                          setInvalidatedFarmlands(true);
                        }}
                        style={{
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 5,
                          borderTopEndRadius: 20,
                          borderTopLeftRadius: 20,
                          backgroundColor: invalidatedFarmlands ? COLORS.ghostwhite : COLORS.main,

                        }}
                      >
                        <Text style={{
                          textAlign: 'center',
                          color: invalidatedFarmlands ? COLORS.main : COLORS.ghostwhite,
                          fontSize: 14,
                          fontFamily: 'JosefinSans-Bold',
                          marginRight: 4,
                        }}>
                          Invalidados
                        </Text>
                      </TouchableOpacity>
                  </Box>
                </Stack>
              </Box>
           </Box>

            </Stack>

            </Box>      
        </Box>

      <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >
    <Box 
        alignItems="stretch" 
        w="100%" 
        style={{
          marginBottom: 40,
          marginTop: 10,
        }}
    >


{   
  !(pendingFarmers || invalidatedFarmers || pendingFarmlands || invalidatedFarmlands) &&

    <FlatList

          StickyHeaderComponent={()=>(
              <Box style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Text>Hello! Here is the sticky header!</Text> */}
              </Box>
            )}
            stickyHeaderHiddenOnScroll={true}

            data={farmersList}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
            if(item.flag === 'Grupo'){
                return <GroupItem  route={route} item={item} />
            }
            else if (item.flag === 'Indivíduo'){
                return <FarmerItem  route={route} navigation={navigation} item={item} />
            }
            else if (item.flag === 'Instituição'){
                return <InstitutionItem  route={route}  item={item} />
            }
            }
          }
          ListFooterComponent={()=>(
            <Box style={{
              height: 100,
              backgroundColor: COLORS.ghostwhite,
            }}>
            </Box>)
          }
        />
  }

{   
  (pendingFarmers) &&

    <FlatList

          StickyHeaderComponent={()=>(
              <Box style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Text>Hello! Here is the sticky header!</Text> */}
              </Box>
            )}
            stickyHeaderHiddenOnScroll={true}

            data={filteredResources(farmersList, 'pendingFarmers')}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
            if(item.flag === 'Grupo'){
                return <GroupItem  route={route} item={item} />
            }
            else if (item.flag === 'Indivíduo'){
                return <FarmerItem  route={route} navigation={navigation} item={item} />
            }
            else if (item.flag === 'Instituição'){
                return <InstitutionItem  route={route}  item={item} />
            }
            }
          }
          ListFooterComponent={()=>(
            <Box style={{
              height: 100,
              backgroundColor: COLORS.ghostwhite,
            }}>
            </Box>)
          }
        />
  }

{   
  (invalidatedFarmers) &&

    <FlatList

          StickyHeaderComponent={()=>(
              <Box style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Text>Hello! Here is the sticky header!</Text> */}
              </Box>
            )}
            stickyHeaderHiddenOnScroll={true}

            data={filteredResources(farmersList, 'invalidatedFarmers')}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
            if(item.flag === 'Grupo'){
                return <GroupItem  route={route} item={item} />
            }
            else if (item.flag === 'Indivíduo'){
                return <FarmerItem  route={route} navigation={navigation} item={item} />
            }
            else if (item.flag === 'Instituição'){
                return <InstitutionItem  route={route}  item={item} />
            }
            }
          }
          ListFooterComponent={()=>(
            <Box style={{
              height: 100,
              backgroundColor: COLORS.ghostwhite,
            }}>
            </Box>)
          }
        />
  }



{   
  (pendingFarmlands) &&

    <FlatList

          StickyHeaderComponent={()=>(
              <Box style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Text>Hello! Here is the sticky header!</Text> */}
              </Box>
            )}
            stickyHeaderHiddenOnScroll={true}

            data={filteredResources(farmlandList, 'pendingFarmlands')}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
                return <FarmlandItem  route={route} item={item} />
            }
          }
          ListFooterComponent={()=>(
            <Box style={{
              height: 100,
              backgroundColor: COLORS.ghostwhite,
            }}>
            </Box>)
          }
        />
  }


{   
  (invalidatedFarmlands) &&

    <FlatList

          StickyHeaderComponent={()=>(
              <Box style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Text>Hello! Here is the sticky header!</Text> */}
              </Box>
            )}
            stickyHeaderHiddenOnScroll={true}

            data={filteredResources(farmlandList, 'invalidatedFarmlands')}
            keyExtractor={keyExtractor}
            renderItem={({ item })=>{
                return <FarmlandItem  route={route} item={item} />
            }
          }
          ListFooterComponent={()=>(
            <Box style={{
              height: 100,
              backgroundColor: COLORS.ghostwhite,
            }}>
            </Box>)
          }
        />
  }


{ (pendingFarmers && filteredResources(farmersList, 'pendingFarmers').length === 0) && 
    <Box
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'JosefinSans-Regular',
            textAlign: 'center',
            lineHeight: 30,
            color: COLORS.black,
          }}
        >
          Nenhum registo de produtor aguarda validação !</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Regular',
              textAlign: 'center',
              lineHeight: 30,
              color: COLORS.grey,
            }}
          >
            (Usuário: {userName})
          </Text>
      </Box>
  }


{ (invalidatedFarmers && filteredResources(farmersList, 'invalidatedFarmers').length === 0) && 
    <Box
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'JosefinSans-Regular',
            textAlign: 'center',
            lineHeight: 30,
            color: COLORS.black,
          }}
        >
          Nenhum registo de produtor encontra-se invalidado !</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Regular',
              textAlign: 'center',
              lineHeight: 30,
              color: COLORS.grey,
            }}
          >
            (Usuário: {userName})
          </Text>
      </Box>
  }


{ (invalidatedFarmlands && filteredResources(farmlandList, 'invalidatedFarmlands').length === 0) && 
    <Box
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'JosefinSans-Regular',
            textAlign: 'center',
            lineHeight: 30,
            color: COLORS.black,
          }}
        >
          Nenhum registo de pomar encontra-se invalidado !</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Regular',
              textAlign: 'center',
              lineHeight: 30,
              color: COLORS.grey,
            }}
          >
            (Usuário: {userName})
          </Text>
      </Box>
  }


{ (pendingFarmlands && filteredResources(farmlandList, 'pendingFarmlands').length === 0) && 
    <Box
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'JosefinSans-Regular',
            textAlign: 'center',
            lineHeight: 30,
            color: COLORS.black,
          }}
        >
          Nenhum registo de pomar aguarda validação !</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Regular',
              textAlign: 'center',
              lineHeight: 30,
              color: COLORS.grey,
            }}
          >
            (Usuário: {userName})
          </Text>
      </Box>
  }


    </Box>
</View>




    </SafeAreaView>
    )
}