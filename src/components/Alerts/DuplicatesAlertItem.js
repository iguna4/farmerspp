import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Center, NativeBaseProvider, Stack } from "native-base";
import { FlatList, Pressable, ScrollView, View, Text} from "react-native";
import { Icon, CheckBox } from '@rneui/themed';

const DuplicatesAlertItem = ({ item })=>(

        <Alert max="100%" status="info" my={2}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text 
                style={{
                  fontSize: 20,
                  fontFamily: 'JosefinSans-Bold',
                }}
                >
                  {item.names.otherNames}{' '}{item.names.surname}
                </Text>
              </HStack>
            </HStack>
            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Nascimento: 
              </Text>
              </Box>
              <Box w="70%">
              <Text  
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                {new Date(item.birthDate).toLocaleDateString()} ({item.birthPlace?.adminPost ? item.birthPlace?.adminPost : item.birthPlace?.district ? item.birthPlace?.district : item.birthPlace?.province ? item.birthPlace?.province : 'local desconhecido'})
              </Text>
              </Box>
            </HStack>

            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Residência: 
              </Text>
              </Box>
              <Box w="70%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
               >
                {item.address.adminPost}(post. admin){'|'}{item.address.district}(distrito)
              </Text>
              </Box>
            </HStack>

            <HStack flexShrink={1} space={1} alignItems="center">
              <Box w="30%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
              >
                Registo: 
              </Text>
              </Box>
              <Box w="70%">
              <Text 
                style={{
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                }}
               >
                {new Date(item.createdAt).toLocaleDateString()} ({item?.user ? item?.user  : 'usuario'})
              </Text>
              </Box>
            </HStack>
          </VStack>
        </Alert>
)

export default DuplicatesAlertItem;