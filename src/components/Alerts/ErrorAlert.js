import React from "react";
import { Alert, Collapse, Button, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider } from "native-base";
import { Pressable } from "react-native";

const ErrorAlert = ({ alert, setAlert })=> {
//   const [show, setShow] = React.useState(true);
  return <Box w="100%" alignItems="center">
      <Collapse isOpen={alert}>
        <Alert maxW="400" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  Alguns dados são obrigatórios!
                </Text>
              </HStack>
              <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} onPress={() => setAlert(false)} />
            </HStack>
            <Box pl="6" _dark={{
            _text: {
              color: "coolGray.600",
              fontSize: 18,
            }
          }}>
              Preencha corretamente todos os dados obrigatórios.
            </Box>
          </VStack>
        </Alert>
      </Collapse>
      <Pressable 
        style={{ 
            paddingVertical: 30, 
        
        }}
        size={"lg"} 
        onPress={() => setAlert(false)} 
        mt={8} 
        mx="auto"
    >
        <Text
            style={{
                color: '#005000',
                fontSize: 18,
                fontFamily: 'JosefinSans-Bold',
                textDecoration: 'underline',
            }}
        
        >Voltar</Text>
      </Pressable>
    </Box>;
}


export default ErrorAlert;