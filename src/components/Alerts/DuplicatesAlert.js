import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text, SafeAreaView} from "react-native";
import { Icon, CheckBox } from '@rneui/themed';
import DuplicatesAlertItem from "./DuplicatesAlertItem";
import COLORS from "../../consts/colors";

import { user } from "../../fakedata/user";


const DuplicatesAlert = ({ 
    setDuplicatesAlert, 
    suspectedDuplicates, 
    setFarmerType,
    addFarmer,
    farmerData,
    realm,
   })=> {

    const navigation = useNavigation();

  return (

    <SafeAreaView
      style={{ 
        flex: 1,
        backgroundColor: 'ghostwhite', 
        // width: '100%',
      }}
      >

    {/* <Box 
      w="100%" 
      alignItems="center" 
    > */}
    <ScrollView  
      contentContainerStyle={{
        minHeight: '100%',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box 
        w="100%"
        alignItems={'center'}
        style={{ padding: 25, }}
      >
        <Center
          style={{ 
            // backgroundColor: 'red', 
            width: '100%', 
            borderRadius: 10,
            borderWidth: 2,
            borderColor: COLORS.red,
            padding: 5,
          }}
        >
          <Icon 
            name="warning"
            color={COLORS.red}
            size={40}
          />
          <Text
              style={{
                color: COLORS.red,
                fontSize: 18,
                fontFamily: "JosefinSans-Bold",
              }}
            >
              Tentativa de duplicação de registos? 
          </Text>

          <Text
            style={{
              color: COLORS.red,
              fontSize: 16,
              paddingVertical: 10,
              textAlign: 'justify',
              fontFamily: "JosefinSans-Regular",
              // paddingHorizontal: 1,
            }}
          >
            O produtor que pretendes registar tem 
            dados similares aos seguintes produtores 
            já registados:
          </Text>
        </Center>
    </Box>


    {
      suspectedDuplicates?.map((item)=>(
        <DuplicatesAlertItem 
          key={item._id} 
          item={item} 
        />
      ))
    }

      <Stack 
        direction="row" 
        space={4}
        w="100%"
        >
        <Box w="50%" alignItems={'center'}>
            <Pressable 
              style={{ 
                paddingVertical: 30, 
              }}
              size={"lg"} 
              onPress={() => {
                setDuplicatesAlert(false);
                setFarmerType('')
                navigation.navigate('FarmerForm1', { user, })
              }} 
              mt={8} 
              mx="auto"
              >
              <Text
                  style={{
                      color: COLORS.main,
                      fontSize: 18,
                      fontFamily: 'JosefinSans-Regular',
                      textDecoration: 'underline',
                    }}
                >
                  Cancelar registo
                </Text>
            </Pressable>
          </Box>
          <Box w="50%" alignItems={'center'}>
          <Pressable 
            style={{ 
              paddingVertical: 30,  
            }}
            size={"lg"} 
              onPress={() => {
                setDuplicatesAlert(false);
                addFarmer(farmerData, realm, true);
              }} 
              mt={8} 
              mx="auto"
              >
            <Text
                style={{
                    color: COLORS.red,
                    fontSize: 18,
                    fontFamily: 'JosefinSans-Regular',
                    textDecoration: 'underline',
                }}
                >
                  Validar registo
            </Text>
          </Pressable>
          </Box>
        </Stack>
      </ScrollView>
    {/* </Box> */}
    </SafeAreaView>
)
}


export default DuplicatesAlert;