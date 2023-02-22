import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text, SafeAreaView} from "react-native";
import { Icon, CheckBox, Overlay } from '@rneui/themed';
import DuplicatesAlertItem from "./DuplicatesAlertItem";
import COLORS from "../../consts/colors";

import { user } from "../../consts/user";


const DuplicatesAlert = ({ 
    setDuplicatesAlert, 
    suspectedDuplicates, 
    setFarmerType,
    addFarmer,
    farmerData,
    realm,
    customUserData,
    setModalVisible
   })=> {

    const navigation = useNavigation();

  return (

    <SafeAreaView
      style={{ 
        flex: 1,
        backgroundColor: 'ghostwhite', 
        
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box 
        w="100%"
        alignItems={'center'}
        style={{ paddingVertical: 25, }}
      >
        <Box
          style={{ 
            // backgroundColor: 'red', 
            // width: '100%', 
            flexDirection: 'row',
            paddingHorizontal: 15,
            // borderRadius: 10,
            borderWidth: 2,
            borderColor: COLORS.red,
            // backgroundColor: COLORS.danger,
            padding: 5,
          }}
        >
          <Icon 
            name="dangerous"
            color={COLORS.red}
            size={35}
          />
          {/* <Text
              style={{
                textAlign: 'center',
                color: COLORS.red,
                fontSize: 18,
                fontFamily: "JosefinSans-Bold",
              }}
            >
              Tentativa de duplicação de registos? 
          </Text> */}

          <Text
            style={{
              color: COLORS.red,
              fontSize: 16,
              paddingHorizontal: 10,
              textAlign: 'justify',
              fontFamily: "JosefinSans-Regular",
              // paddingHorizontal: 1,
            }}
          >
            O produtor que pretendes registar tem 
            dados similares aos seguintes produtores 
            já registados:
          </Text>
        </Box>
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
        // space={1}
        w="100%"
        style={{ paddingTop: 20, }}
        >
        <Box w="8%">

        </Box>
        <Box w="38%" alignItems={'center'}>
            <Pressable 
              style={{ 
                // paddingVertical: 30, 
              }}
              // size={"lg"} 
              onPress={() => {
                setDuplicatesAlert(false);
                setFarmerType('')
                navigation.navigate('FarmerForm1', { customUserData, })
              }} 
              // mt={8} 
              // mx="auto"
              >
              <Text
                  style={{
                      color: COLORS.main,
                      fontSize: 18,
                      fontFamily: 'JosefinSans-Bold',
                      textDecoration: 'underline',
                      textAlign: 'center',
                    }}
                >
                  Cancelar registo
                </Text>
            </Pressable>
          </Box>
          <Box w="10%">

          </Box>
          <Box 
            w="38%" 
            alignItems={'center'}
            style={{ 
              // borderWidth: 1, 
              // borderColor: COLORS.main, 
              // borderRadius: 50, 
              justifyContent: 'center',
            }}
          >
          <Pressable 
            style={{ 
              // paddingVertical: 30,  
            }}
            // size={"lg"} 
              onPress={() => {
                setDuplicatesAlert(false);
                setModalVisible(true);
                // addFarmer(farmerData, realm, true);
              }} 
              // mt={8} 
              // mx="auto"
              >
            <Text
                style={{
                    color: COLORS.red,
                    fontSize: 18,
                    fontFamily: 'JosefinSans-Bold',
                    textDecoration: 'underline',
                }}
                >
                  Validar registo
            </Text>
          </Pressable>
          </Box>
          <Box w="8%">

          </Box>
        </Stack>
      </ScrollView>
    {/* </Box> */}
    </SafeAreaView>
)
}


export default DuplicatesAlert;