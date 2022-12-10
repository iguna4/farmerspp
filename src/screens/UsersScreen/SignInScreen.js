/* eslint-disable prettier/prettier */
import { SafeAreaView, Text } from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';


export default function SignInScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [emailFailMessage, setEmailFailMessage] = useState('');
    const [passwordFailMessage, setPasswordFailMessage] = useState('');
  return (

    <SafeAreaView style={styles.signInContainer}>
        <Box mb="4">
            <Text style={styles.signInTitle}>Connect Caju - 2023</Text>
        </Box>
        <Box my="4">
            <Text style={styles.signInSubTitle}>Entrar</Text>
        </Box>
        <Stack space={8} w="90%" mx="auto">
            <FormControl isRequired isInvalid>
                <FormControl.Label>Endereço Electrónico</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Endereço Electrónico"
                    type="email"
                    InputLeftElement={<Icon name="email" color="grey" />}
                    />
                <FormControl.ErrorMessage
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                >
                    {emailFailMessage && 'Error message'}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid>
                <FormControl.Label>Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Senha"
                    type={showPassword ? 'text' : 'password' }
                    InputRightElement={
                        <Icon
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            color="grey"
                            size={30}
                            type="material"
                            onPress={()=>setShowPassword(prev=>!prev)}
                        />
                    }
                />
                <FormControl.ErrorMessage
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                >
                    {passwordFailMessage && 'Error message'}
                </FormControl.ErrorMessage>
            </FormControl>
            <Box alignItems="center">
                <Button title="Entrar" />
            </Box>
        </Stack>
        <Stack direction="row" space={4} mt="8" >
            <Box w="50%" alignItems="center">
                <Text
                    disabled
                >Recuperar Senha</Text>
            </Box>
            <Box w="50%" alignItems="center">
                <Text
                    style={styles.signInLink}
                    onPress={()=>navigation.navigate('SignUp')}
                >
                    Criar Conta
                </Text>
            </Box>
        </Stack>
    </SafeAreaView>
  );
}
