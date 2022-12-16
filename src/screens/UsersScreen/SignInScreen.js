/* eslint-disable prettier/prettier */
import { Pressable, SafeAreaView, Text } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import { useApp } from '@realm/react';
import { AppContext } from '../../models/realm';
import { User } from '../../models/User';
// const { useRealm, useQuery } = AppContext;


export default function SignInScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [emailFailMessage, setEmailFailMessage] = useState('');
    const [passwordFailMessage, setPasswordFailMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // const appRealm = useRealm();
    // const users = useQuery('User')

    const login = useCallback(async ()=>{

        if (!validateCredentials()) {
            return ;
        }

        const {email, password } = validateCredentials();


        // console.log('credentials:--------------- ')
        // const credentials = Realm.Credentials.emailPassword(email, password);
        // try {
        // // sign in
        // await appRealm.logIn(credentials);
        // } catch (error) {
        // // sign un
        // try {
        //     await appRealm.emailPasswordAuth.registerUser({
        //     email,
        //     password,
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        // await realmApp.logIn(credentials);
        // }
    }, [
        // realmApp
    ])





    useEffect(()=>{

    }, [navigation])

    // console.log('users', users);

    
    const validateCredentials = () => {
        const retrievedEmail = email.trim();
        const retrievedPassword = password.trim();
        
        if (!retrievedEmail || !retrievedEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrors({ ...errors,
                errorMessage: 'Credenciais inválidas!',
            });
            return false;
        }
        else if ('savedPassword' && 'savedPassword' !== retrievedPassword) { // compare the provided pass with the saved one
            setErrors({ ...errors,
                errorMessage: 'Credenciais inválidas!',
            });
            return false;
        }
        
        return {
            email: retrievedEmail,
            password: retrievedPassword,
        };
    };
    
    // const login = ()=>{
    //     if (!validateCredentials()) {
    //         return ;
    //     }
        // const {email, password } = validateCredentials();
       
        // appRealm.write(()=>{
            // appRealm.
        // })

    // }

  return (
    <SafeAreaView style={styles.signInContainer}>
        <Box mb="4">
            <Text style={styles.signInTitle}>Connect Caju - 2023</Text>
        </Box>
        <Box my="4">
            { ('errorMessage' in errors && errors.errorMessage) ?
                <Box backgroundColor='error.100'  w="80" height="10">
                    <Text style={styles.signInErrorMessage}>{errors.errorMessage}</Text>
                </Box>
                :
                <Text style={styles.signInSubTitle}>Entrar</Text>
            }
        </Box>

        <Stack space={3} w="90%" mx="auto">
            <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label>Endereço Electrónico</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Endereço Electrónico"
                    type="emailAddress"
                    value={email}
                    onChangeText={(newEmail)=>{
                        setErrors((prev)=>({...prev, errorMessage: undefined}))
                        setEmail(newEmail)
                    }}
                    InputLeftElement={<Icon name="email" color="grey" />}
                    />
                <FormControl.HelperText></FormControl.HelperText>
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label>Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Senha"
                    secureTextEntry={!showPassword ? true : false }
                    value={password}
                    onChangeText={(newPassword)=>{
                        setErrors(prev=>({...prev, errorMessage: undefined}))
                        setPassword(newPassword)
                    }}
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
                <FormControl.HelperText></FormControl.HelperText>
            </FormControl>
            <Box alignItems="center">
                <Button title="Entrar" onPress={login} />
            </Box>
        </Stack>
        <Stack direction="row" space={4} mt="8" >
            <Box w="50%" alignItems="center">
                <Text
                    disabled
                >Recuperar Senha</Text>
            </Box>
            <Box w="50%" alignItems="center">
                <Pressable 
                onPress={()=>{}
                    // setIsNewUser(true)
                    // ()=>navigation.navigate('SignUp')
                }
                >
                    <Text style={styles.signInLink}>
                        Criar Conta
                    </Text>
                </Pressable>
            </Box>
        </Stack>
    </SafeAreaView>
  );
}
