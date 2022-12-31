import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text} from "react-native";
import { Icon, CheckBox } from '@rneui/themed';
import DuplicatesAlertItem from "./DuplicatesAlertItem";


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
    <Box 
      w="100%" 
      alignItems="center" 

      style={{ 
        backgroundColor: 'ghostwhite', 
      }}
    >
    <ScrollView  
      contentContainerStyle={{
        minHeight: '100%',
        justifyContent: 'center',
      }}
    >
      <Box py={4} my={4}>
      <Box 
        w="100%"
        alignItems={'center'}
        style={{ paddingVertical: 25, }}
      >
        <Center>
          <Icon 
            name="warning"
            color='red'
            size={40}
          />
        </Center>
        <Center>
          <Text
              style={{
                color: "red",
                fontSize: 18,
                fontFamily: "JosefinSans-Bold",
              }}
            >
              Tentativa de duplicação de registos? 
          </Text>
        </Center>
        <Center>
          <Text
            style={{
              color: "grey",
              fontSize: 17,
              fontFamily: "JosefinSans-Regular",
              paddingHorizontal: 1,
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
                // reset all inserted and not yet persisted data
                // reset farmerType flag
                setFarmerType('')
                navigation.navigate('FarmerForm1', {
                  user: {
                    name: 'evariste musekwa',
                    district: 'Mogovolas',
                    province: 'Nampula',
                  }
                })
              }} 
              mt={8} 
              mx="auto"
              >
              <Text
                  style={{
                      color: '#005000',
                      fontSize: 18,
                      fontFamily: 'JosefinSans-Regular',
                      textDecoration: 'underline',
                  }}
              
                  >Cancelar registo</Text>
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

                // setting true allows the registration of the
                // farmer...
                addFarmer(farmerData, realm, true);
              }} 
              mt={8} 
              mx="auto"
            >
            <Text
                style={{
                    color: 'red',
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
        </Box>
      </ScrollView>
    </Box>
)
}


export default DuplicatesAlert;