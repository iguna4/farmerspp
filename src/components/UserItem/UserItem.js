
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Overlay, Icon, Button } from "@rneui/base";
import { Box, CheckIcon, FormControl, Select, Stack } from "native-base";
import { v4 as uuidv4 } from 'uuid';


import { CustomInput } from "../Inputs/CustomInput";
import COLORS from "../../consts/colors";
import CustomDivider from "../Divider/CustomDivider";

import { realmContext } from '../../models/realmContext';
import { TouchableOpacity } from "react-native";
const { useRealm, useQuery, useObject } = realmContext;


export default function UserItem({ userItem }){

    const [targetFarmers, setTargetFarmers] = useState('');
    const [targetFarmlands, setTargetFarmlands] = useState('');
    const [userStats, setUserStats] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const realm = useRealm();

    const userStat = useQuery('UserStat').filtered("userId == $0", userItem?.userId)[0];
    // console.log('provincialStats:', JSON.stringify(provincialStats));

    // updating user goal
    const updateUserGoal = useCallback((newTargetFarmers, newTargetFarmlands)=>{
        const tFarmers = parseInt(newTargetFarmers);
        const tFarmlands = parseInt(newTargetFarmlands);
        // find the user's stats 
        // const targetStats = userStats?.find((stat)=>stat?.userId === userItem?.userId);
        
        // keep the other users' stats apart
        const otherStats = provincialStats.userStats?.filter((stat)=>stat?.userId !== userItem?.userId);
        console.log('otherStats:', JSON.stringify(otherStats));
        console.log('----------------------------------------------');
        // update
        realm.write(()=>{
            // if the user has already had an assigend target, update the target
            // if (targetStats) {
            //     targetStats.targetFarmers = newTargetFarmers;
            //     targetStats.targetFarmlands = newTargetFarmlands;
            //     provincialStats.userStats = [...otherStats, targetStats];
            // }
            // else {
            // else create and assign new target
            
                const newTargetStats = {
                    userName: userItem.name,
                    userId: userItem.userId,
                    district: userItem.userDistrict,
                    province: userItem.userProvince,
                    targetFarmers: tFarmers,
                    targetFarmlands: tFarmlands,
                };
                provincialStats.userStats = [...otherStats, newTargetStats];
                console.log('updatedProvincial: ', JSON.stringify(provincialStats.userStats))
                console.log('----------------------------------------------');
                setIsUpdated(true);
            // }
        });


    }, [ realm, provincialStats, userItem, ])

    // console.log('userStats:', userStats)

    useEffect(()=>{

        // create provincial stats if it does not exist
        if (!provincialStats) {
            realm.write(async ()=>{
                await realm.create('ProvincialStats', {
                    _id: uuidv4(),
                    name: userItem.userProvince,
                })
            })
            console.log('Created provincialStats')
        }
        else if (provincialStats.userStats.find(stat=>stat?.userId === userItem?.userId)) {
            console.log('Found this user stats already created')
            const stat = provincialStats.userStats.find(stat=>stat?.userId === userItem?.userId);
            setTargetFarmers(stat?.targetFarmers);
            setTargetFarmlands(stat?.targetFarmlands);
        }
        else{

            // else find the user stats if it exists.
            // const stats = [...provincialStats?.userStats];
            // if (stats?.length > 0 && stats?.find(stat=>stat?.userId === userItem?.userId)){
            //     setUserStats(stats.find(stat=>stat.userId === userItem.userId));
            // }

            console.log('stats are 0');

            setTargetFarmers(0);
            setTargetFarmlands(0);

        }
    }, [ ]);


    return (
    <Box
        style={{
            flex: 1,
            backgroundColor: COLORS.ghostwhite,
            marginVertical: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderColor: '#005000',
            shadowColor: "#005000",
            shadowOffset: {
              width: 2,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 3,
            opacity: 1,
        }}
    >
    <Stack key={userItem?.userId} w="100%" direction="row" space={1} >
        <Box w="40%"
            style={{
                justifyContent: 'center',
            }}
        >
            <Text
                    style={{
                    fontFamily: 'JosefinSans-Bold',
                    fontSize: 16,
                    color: COLORS.grey
                }}     
                >
                {userItem?.name}
            </Text>
        </Box>
        <Box w="20%"
            style={{
                alignItems: 'center',
            }}
        >
            <CustomInput
                width="90%"
                keyboardType="numeric"
                textAlign="center"
                isDisabled={isUpdated}
                placeholder={`${targetFarmers}`}
                value={targetFarmers}
                onChangeText={newNumber=>{
                    setTargetFarmers(newNumber);
                }}
            />
        </Box>
        <Box w="20%"
            style={{
                alignItems: 'center',
            }}
        >
            <CustomInput
                width="90%"
                keyboardType="numeric"
                textAlign="center"
                isDisabled={isUpdated}
                placeholder={`${targetFarmlands}`}
                value={targetFarmlands}
                onChangeText={newNumber=>{
                    setTargetFarmlands(newNumber);
                }}
            />
        </Box>

        <Box w="20%"
            style={{
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={()=>{
                    if (isUpdated){
                        setIsUpdated(false);
                    }
                    else  {
                        updateUserGoal(targetFarmers, targetFarmlands);
                    }
                }}
            >
                <Icon 
                    name={isUpdated ? "check-circle" : "save"}
                    size={35}
                    color={COLORS.main}
                    
                    />
            </TouchableOpacity>
        </Box>
    </Stack>   
    </Box>
    )
}