import { 
    Pressable, SafeAreaView, Text, View, Image, 
} from 'react-native';
import React, {useEffect, useState, useCallback } from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center, Select, CheckIcon, ScrollView } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import Realm from 'realm';
import { useApp } from '@realm/react';

import validateUserData from '../../helpers/validateUserData';
import districts from '../../consts/districts';
import AwesomeAlert from 'react-native-awesome-alerts';


import COLORS from '../../consts/colors';


export default function WelcomeScreen () {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    // const [emailFailMessage, setEmailFailMessage] = useState('');
    // const [passwordFailMessage, setPasswordFailMessage] = useState('');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    
    const [errors, setErrors] = useState({});
    
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    
    const [phone, setPhone] = useState(null);

    const [errorAlert, setErrorAlert] = useState(false);
    const [userData, setUserData] = useState({});


    const app = useApp();

    const onSignIn = useCallback(async (userData)=>{

        const creds = Realm.Credentials.emailPassword(newEmail, newPassword);
        try {
            await app.logIn(creds);
        } catch (error) {
            setErrorAlert(true);
            throw new Error('Failed to sign in the user');
        }
    }, [app, email, password]);


    const onSignUp = useCallback(async (userData)=>{
        const {
            name,
            email,
            password,
            phone,
            province,
            district,
        } = userData;

        try {
            await app.emailPasswordAuth.registerUser({ email, password});
            await onSignIn(email, password);

            // save user custom data to the atlas mongodb database
            // add name, phone, province and district to custom data

        } catch (error) {
            setErrorAlert(true);
            throw new Error('Failed to sign up the user');
        }
    }, [app, onSignIn, email, password]);
   



    const onSubmitUserData = useCallback(async ()=>{

            if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
                setErrorAlert(true);
                return ;
            }

            setUserData(validateUserData(userData, isLoggingIn, errors, setErrors));

            try {
                if (isLoggingIn) {
                    await onSignIn(userData);
                }
                else {
                    await onSignUp(userData);
                }
            } catch (error) {
                throw new Error('Failed to process user request!');
            }

            setEmail('');
            setPassword('');
    }, []);

    useEffect(()=>{

        if (province) {
            setSelectedDistricts(districts[province]);

        }

    }, [province, errors, isLoggingIn]);


  return (
    <SafeAreaView style={styles.loginContainer}>

<View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: '#EBEBE4',
          backgroundColor: '#EBEBE4',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          shadowColor: COLORS.main,
          shadowOffset: {

            },       
        }}
      >
        <Box>
            <Center w="100%" py="3">
              <Image
                style={{ width: 60, height: 60, borderRadius: 100,  }}
                source={require('../../../assets/images/iamLogo2.png')}
              />
              <Text
                style={{
                  color: COLORS.main,
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Bold',
                  paddingTop: 6,
                }}
              >
                Instituto de Amêndoas de Moçambique, IP
              </Text>
              <Text
                style={{
                  color: COLORS.main,
                  fontSize: 18,
                  fontFamily: 'JosefinSans-Bold',
                }}
              >
                IAM, IP
              </Text>
            </Center>
          </Box>
      </View>


        <ScrollView
            contentContainerStyle={{

                alignItems: 'center',
            }}
        >
        { isLoggingIn &&        
            <Center mt={'3'}>
                <Text style={styles.signInTitle}>ConnectCaju - 2023</Text>
            </Center>
        }
        <Box my="5" pl="4">
            { ('errorMessage' in errors && errors?.errorMessage && isLoggingIn) ?
                <Box backgroundColor='error.100'  w="80" height="10">
                    <Text style={styles.signInErrorMessage}>{errors.errorMessage}</Text>
                </Box>
                : isLoggingIn ?
                <Icon 
                    name='lock-open'
                    size={40}
                    color={COLORS.main}
                />
                :
                (
                    <Text
                    style={{
                        textAlign: 'left',
                        fontSize: 18,
                        color: COLORS.black,
                        fontFamily: 'JosefinSans-Bold',

                    }}
                    >
                        Novo usuário
                    </Text>
                )

            }

       </Box>

        <AwesomeAlert
                show={errorAlert}
                showProgress={false}
                title="Dados Inválidos"
                message="Os dados inválidos devem ser corrigidos!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="   OK!   "
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setErrorAlert(false);
                }}
            />

        <View
            style={{
                width: '95%',
                marginBottom: 20,
                paddingTop: 30,
            }}
        >

        <Stack space={1} w="90%" mx="auto">
            {
                !isLoggingIn &&  (
                <FormControl isRequired my="3" isInvalid={'name' in errors}>
                    <FormControl.Label>Nome Completo</FormControl.Label>
                    <CustomInput
                        width="100%"
                        placeholder="Nome completo"
                        value={name}
                        type="text"
                        autoCapitalize="words"
                        onChangeText={(newName)=>{
                            setErrors(prev=>({...prev, name: ''}))
                            setName(newName)}
                        }
                    />
                {
                'fullname' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.name}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        )}

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
                    InputLeftElement={<Icon name="email" color="grey" style={{ paddingLeft: 3 }} />}
                    />
                <FormControl.HelperText></FormControl.HelperText>
            </FormControl>
            {
                isLoggingIn &&

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
                        color={COLORS.grey}
                        size={30}
                        style={{ paddingRight: 3, }}
                        type="material"
                        onPress={()=>setShowPassword(prev=>!prev)}
                        />
                    }
                    />
                <FormControl.HelperText></FormControl.HelperText>
            </FormControl>
            }
            {
            !isLoggingIn &&  (
            <Stack direction="row" w="100%" space={1}>
            <Box w="50%">
            <FormControl isRequired my="3" isInvalid={'password' in errors}>
                <FormControl.Label>Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Senha"
                    secureTextEntry={!showPassword ? true : false}
                    value={password}
                    onChangeText={(newPassword)=>{
                        setErrors(prev=>({...prev, password: '', passwordConfirm: ''}))   
                        setPassword(newPassword)}
                    }
                    InputRightElement={
                        <Icon
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            color="grey"
                            size={30}
                            style={{ paddingRight: 3, }}
                            type="material"
                            onPress={()=>setShowPassword(prev=>!prev)}
                        />
                    }
                />
            {
            'password' in errors 
            ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.password}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
            </Box>


            <Box w="50%" >
            <FormControl isRequired my="3" isInvalid={'passwordConfirm' in errors}>
                <FormControl.Label>Confirmar Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Confirmar senha"
                    secureTextEntry={!showPasswordConfirm ? true : false}
                    value={passwordConfirm}
                    onChangeText={(newPasswordConfirm)=>{
                        setErrors(prev=>({...prev, passsword: '', passwordConfirm: ''}))
                        setPasswordConfirm(newPasswordConfirm)}
                    }
                    InputRightElement={
                        <Icon
                        name={showPasswordConfirm ? 'visibility' : 'visibility-off'}
                        color={COLORS.grey}
                        size={30}
                        type="material"
                        onPress={()=>setShowPasswordConfirm(prev=>!prev)}
                        />
                    }
                />
            {
                'passwordConfirm' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.passwordConfirm}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
            </Box>
        </Stack>
        )}
        {
            !isLoggingIn && (
        <Stack direction="row" w="100%" space={1}>
            <Box w="100%" >
            <FormControl isRequired my="3" isInvalid={'phone' in errors}>
                <FormControl.Label>Telemóvel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telemóvel"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(newPhone)=>{
                        setErrors(prev=>({...prev, phone: ''}))
                        setPhone(newPhone)}
                    }
                    InputLeftElement={
                        <Icon
                        name="phone"
                        color={COLORS.grey}
                        size={30}
                            type="material"
                            onPress={()=>setShowPasswordConfirm(prev=>!prev)}
                            />
                        }
                        />
            {
                'phone' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.phone}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
            </Box>
            </Stack>

            )
        }
        {
            !isLoggingIn && (
                <Stack direction="row" w="100%" space={1}>
            <Box w="50%">
                <FormControl isRequired my="3" isInvalid={'province' in errors}>
                    <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={province}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(newProvince)=>{
                            setErrors(prev=>({...prev, province: ''}));
                            setDistrict('');
                            setProvince(newProvince);
                        }}
                    >
                        <Select.Item label="Cabo Delgado" value="Cabo Delgado" />
                        <Select.Item label="Nampula" value="Nampula" />
                        <Select.Item label="Niassa" value="Niassa" />
                        <Select.Item label="Zambézia" value="Zambézia" />
                    </Select>
                    {
                    'province' in errors 
                    ? <FormControl.ErrorMessage 
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                    _text={{ fontSize: 'xs'}}>{errors?.province}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%">
            <FormControl isRequired my="3" isInvalid={'district' in errors}>
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={district}
                        accessibilityLabel="Escolha seu distrito"
                        placeholder="Escolha seu distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(newDistrict)=>{
                            setErrors(prev=>({...prev, district: ''}))
                            setDistrict(newDistrict)}
                        }
                    >{
                        selectedDistricts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                            ))
                        }
                    </Select>
                    {
                        'district' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.district}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            )
        }
        <Center w="100%"
            py="2"
            >
          <Button 
          title={isLoggingIn ? " Entrar" : "Registar-se"} 
          onPress={onSubmitUserData} 
          type="outline"
                containerStyle={{
                    width: '100%',
                }}
                />
                
        </Center>
        </Stack>

        <Stack w="100%" direction="row" pb="8">
            <Box 
                w="50%" 
                alignItems="center"
                >

            </Box>
            <Box 
                pr={5} 
                w="50%" 
                alignItems="center"
            >

{    isLoggingIn &&
            <Pressable onPress={()=>setIsLoggingIn(prevState => !prevState)}>
                <Text 
                    style={{ 
                        textAlign: 'center',
                        fontSize: 16,
                        color: COLORS.main,
                        fontFamily: 'JosefinSans-Regular',
                        textDecoration: 'underline',
                    }}
                >
                    Criar conta
                </Text>
            </Pressable>
}

{    !isLoggingIn &&
            <Pressable onPress={()=>setIsLoggingIn(prevState => !prevState)}>
                <Text 
                    style={{ 
                        textAlign: 'center',
                        fontSize: 16,
                        color: COLORS.main,
                        fontFamily: 'JosefinSans-Regular',
                        textDecoration: 'underline',
                    }}
                >
                    Fazer Login
                </Text>
            </Pressable>
}        


            </Box>
            </Stack>
        
        </View>
        </ScrollView>
    </SafeAreaView>
  )
};

