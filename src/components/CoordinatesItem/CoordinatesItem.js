
import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, Box, Center } from "native-base";
import { Icon,  } from "@rneui/base";
import CustomDivider from "../Divider/CustomDivider";

const CoordinatesItem = ({ coordinates }) =>{


    return (
    <Center>

    <View 
        style={{
            // flex: 1,
            padding: 10,
            marginVertical: 10,
            marginHorizontal: 10,
            // backgroundColor: '#EBEBE4',
            borderColor: '#005000',
            // minHeight: 100,
            width: '98%',
            flex: 1,
            // alignItems: 'center',
            shadowColor: "#005000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
    
            elevation: 3,
        }}
        >
        <Stack direction="row" w="100%" >
            <Box w="10%">

            </Box>
            <Box w="20%">
                <Text>X{coordinates}:</Text>
                <Text>Y{coordinates}:</Text>
            </Box>
            <Box w="40%">
                <Text>Latitude:</Text>
                <Text>Longitude:</Text>
            </Box>
            <Box w="20%">
                <Icon 
                    name="add-location-alt" 
                    size={40} 
                    color="#005000" 
                    />
            </Box>
            <Box w="10%">

            </Box>
            {/* <Text>Item {coordinates}</Text> */}
        </Stack>
        {/* <CustomDivider 
            marginVertical={2}
            thickness={2}
            bg={'#005000'}
            orientation={'horizontal'}
        /> */}
    </View>
    </Center>
    )
}

export default CoordinatesItem;