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
import { customizeItem } from '../../helpers/customizeItem';
import GroupItem from '../../components/GroupItem/GroupItem';
import FarmerItem from '../../components/FarmerItem/FarmerItem';
import InstitutionItem from '../../components/InstitutionItem/InstitutionItem';
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
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

    const farmers = realm.objects('Farmer').filtered("userId == $0", userId);
    const groups = realm.objects('Group').filtered("userId == $0", userId);
    const institutions = realm.objects('Institution').filtered("userId == $0", userId);
    const farmlands = realm.objects('Farmland').filtered("userId == $0", userId);
    const stats = realm.objects('UserStat').filtered("userId == $0", userId);

    const individualsList = customizeItem(farmers, {}, 'Indivíduo')
    const groupsList = customizeItem(groups, {}, 'Grupo')
    const institutionsList = customizeItem(institutions, {}, 'Instituição');
  

      // merge the three arrays of farmers and sort the items by createdAt 
    let farmersList = [];

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
    }, [realm, userId, refresh ]);

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            setLoadingActivityIndicator(true);
          });
          return () => task.cancel();
        }, [])
      );

    const keyExtractor = (item, index)=>index.toString();

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

              <Stack direction="row" space={2} my="1">
                <Center>
                  <Text
                    style={{ 
                      fontFamily: 'JosefinSans-Regular', 
                      fonSize: 14, 
                    }}
                  >[{'Produtores:'}{' '}{farmersList?.length}]</Text>
                </Center>
                <Center>
                  <Text
                    style={{ fontFamily: 'JosefinSans-Regular', fonSize: 14, }}
                  >[{'Pomares:'}{' '}{farmlands?.length}]</Text>
                </Center>
              </Stack>
            </Center>
          </Box>
          <Center 
            w="15%"
          >
            <TouchableOpacity
                onPress={()=>setRefresh(!refresh)}
            >
                <Icon
                    name="refresh" size={35} color={COLORS.main}
                />
            </TouchableOpacity>
          </Center>
        </Stack>
      </View>

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
    </Box>
</View>




    </SafeAreaView>
    )
}