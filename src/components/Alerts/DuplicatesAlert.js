import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View } from "react-native";

const Item = ({ alert, setAlert, item })=>(

        <Alert max="100%" status="info" my={2}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  {item.names.otherNames}{' '}{item.names.surname}
                </Text>
              </HStack>
              {/* <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} onPress={() => setAlert(false)} /> */}
            </HStack>
            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text fontSize="sm" fontWeight="small" _dark={{
              color: "coolGray.600"
              }}>
                Nascimento: 
              </Text>
              </Box>
              <Box w="70%">
              <Text fontSize="sm" fontWeight="small" _dark={{
              color: "coolGray.600"
            }}>
                {new Date(item.birthDate).toLocaleDateString()} ({item.birthPlace?.adminPost ? item.birthPlace?.adminPost : item.birthPlace?.district ? item.birthPlace?.district : item.birthPlace?.province ? item.birthPlace?.province : 'local desconhecido'})
              </Text>
              </Box>
            </HStack>
            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text fontSize="sm" fontWeight="small" _dark={{
              color: "coolGray.600"
              }}>
                Registo: 
              </Text>
              </Box>
              <Box w="70%">
              <Text fontSize="sm" fontWeight="small" _dark={{
                color: "coolGray.600"
               }}>
                {new Date(item.createdAt).toLocaleDateString()} ({item?.user ? item?.user  : 'usuario'})
              </Text>
              </Box>
            </HStack>
            <Box pl="6" _dark={{
            _text: {
              color: "coolGray.600",
              fontSize: 18,
            }
          }}>
              {/* {item.}. */}
            </Box>
          </VStack>
        </Alert>
)



const DuplicatesAlert = ({ duplicatesAlert, setDuplicatesAlert, duplicates })=> {


  return (
    <Box w="100%" alignItems="center" py={0} my={0}
    style={{ 
      flex: 1,
      backgroundColor: 'ghostwhite', 
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ScrollView style={{ width: '100%', }}>
      <Box py={4} my={4}>

        <Alert max="100%" status="danger" my={2}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center" ph="6">
                {/* <Alert.Icon /> */}
                <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  Tentativa de duplicação de registos? 
                </Text>
              </HStack>
              {/* <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} onPress={() => setAlert(false)} /> */}
            </HStack>
            <Box ph="6" _dark={{
            _text: {
              color: "coolGray.600",
              fontSize: 18,
            }
          }}>
              O produtor que pretendes registar tem 
              dados similares aos seguintes produtores 
              já registados:
            </Box>
          </VStack>
        </Alert>


        {/* <Text 
          style={{ 
            fontSize: 18, 
            // color: 'grey', 
            textAlign: 'center',
            fontFamily: 'JosefinSans-Bold',
            paddingVertical: 20,
            marginVertical: 10,
          }}
        >

        </Text> */}
    {
      duplicates?.map((item)=>(
        <Item 
          alert={duplicatesAlert}
          setAlert={setDuplicatesAlert}
          key={item._id} 
          item={item} 
        />
      ))
    }

      {/* <Collapse isOpen={duplicatesAlert}> */}
        {/* <ScrollView> */}
          {/* <FlatList
            data={duplicates}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item._id}
          /> */}
        {/* </ScrollView> */}
      {/* </Collapse> */}
      <Stack direction="row" space={4}>
        <Box w="50%" alignItems={'center'}>
            <Pressable 
              style={{ 
                paddingVertical: 30, 
              }}
              size={"lg"} 
              onPress={() => setDuplicatesAlert(false)} 
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
              onPress={() => setDuplicatesAlert(false)} 
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