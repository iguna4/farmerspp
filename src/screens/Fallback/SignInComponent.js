import { Pressable, SafeAreaView, Text } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import { useApp } from '@realm/react';

const SignInComponent = ({ 
    email, 
    setEmail, 
    password, 
    setPassword, 
    errors, 
    setErrors,
    showPassword,
    setShowPassword,
    setIsLogin,

}) => {
  return (
      <>
      {/* <SafeAreaView style={styles.signInContainer}> */}
        <Box mb="4">
            <Text style={styles.signInTitle}>Connect Caju - 2023</Text>
        </Box>
        <Box my="4">
            { ('errorMessage' in errors && errors?.errorMessage) ?
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
                <Button title="Entrar" onPress={
                    // login
                    ()=>{}
                } />
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
                onPress={
                setIsLogin(false)
                // ()=>navigation.navigate('SignUp')
            }
            >
                    <Text style={styles.signInLink}>
                        Criar Conta
                    </Text>
                </Pressable>
            </Box>
        </Stack>
    </>
  )
}

export default SignInComponent