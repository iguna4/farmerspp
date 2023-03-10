import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text, SafeAreaView, TouchableOpacity} from "react-native";
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
          <Box
            style={{ 
              paddingVertical: 10,
              paddingHorizontal: 1,
              justifyContent: 'center',
              backgroundColor: COLORS.danger,
            }}
          >
            <Icon 
              name="warning"
              color={COLORS.ghostwhite}
              size={45}
            />
 
            <Text
              style={{
                color: COLORS.ghostwhite,
                fontSize: 20,
                padding: 2,
                lineHeight: 30,
                textAlign: 'center',
                fontFamily: "JosefinSans-Regular",
              }}
            >
              O produtor que pretendes registar tem 
              dados similares aos seguintes produtores 
              já registados:
            </Text>
          </Box>

    <ScrollView  
      contentContainerStyle={{
        minHeight: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >


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
        w="100%"
        style={{ paddingTop: 40, }}
        >
        <Box w="8%">

        </Box>
        <Box w="38%" alignItems={'center'}       
          style={{
            borderRadius: 100,
            borderWidth: 2,
            borderColor: COLORS.main,
            padding: 5,
          }}
        >
            <TouchableOpacity 
              style={{ 
              }}
              onPress={() => {
                setDuplicatesAlert(false);
                setFarmerType('')
                navigation.navigate('FarmerForm1', { customUserData, })
              }} 
            >
              <Text
                  style={{
                      color: COLORS.main,
                      fontSize: 16,
                      fontFamily: 'JosefinSans-Bold',
                      textDecoration: 'underline',
                      textAlign: 'center',
                    }}
                >
                  Cancelar registo
                </Text>
            </TouchableOpacity>
          </Box>
          <Box w="10%">

          </Box>
          <Box 
            w="38%" 
            alignItems={'center'}
            style={{
              borderRadius: 100,
              borderWidth: 2,
              borderColor: COLORS.red,
              padding: 5,
            }}
          >
          <TouchableOpacity 
            style={{ 
            }}
              onPress={() => {
                setDuplicatesAlert(false);
                setModalVisible(true);
              }} 
            >
            <Text
                style={{
                    color: COLORS.red,
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Bold',
                    textDecoration: 'underline',
                }}
                >
                  Validar registo
            </Text>
          </TouchableOpacity>
          </Box>
          <Box w="8%">

          </Box>
        </Stack>
      </ScrollView>
    </SafeAreaView>
)
}


export default DuplicatesAlert;