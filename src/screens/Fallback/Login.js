import { Pressable, SafeAreaView, Text, View } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center, Select, CheckIcon, ScrollView } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import Realm from 'realm';
import { useApp, useUser } from '@realm/react';

import validateUserData from '../../helpers/validateUserData';
import districts from '../../fakedata/districts';
import AwesomeAlert from 'react-native-awesome-alerts';

import { realmContext } from '../../models/realm';
import COLORS from '../../consts/colors';
const {useRealm} = realmContext;

const Login = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    // const [emailFailMessage, setEmailFailMessage] = useState('');
    // const [passwordFailMessage, setPasswordFailMessage] = useState('');
    
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    
    const [errors, setErrors] = useState({});
    
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);

    const [userData, setUserData] = useState({});
    const [errorAlert, setErrorAlert] = useState(false);
    const [signInErrorAlert, setSignInErrorAlert] = useState(false);
    const [signUpErrorAlert, setSignUpErrorAlert] = useState(false);

    const [loginData, setLoginData] = useState({});
    

    const app = useApp();

    // const realm = useRealm();

    const signIn = useCallback(async ()=>{

        // const userData = {
        //     email, password,
        // }
    
        // if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
        //     setErrorAlert(true);
        //     return ;
        // }
        // setUserData(validateUserData(userData, isLoggingIn, errors, setErrors));

        // setEmail('');
        // setPassword('');

        const creds = Realm.Credentials.emailPassword(email, password);
        console.log('credentials:', creds);
        await app.login(creds);
    }, [app, email, password]);

    const onPressSignIn = useCallback(async ()=>{

        try {
            await signIn();
        } catch (error) {
            console.log('could not sign in!', { cause: error });
            setSignInErrorAlert(true);
        }
    }, [signIn]);

    const onPressSignUp = useCallback(async ()=>{
        try {
            await app.emailPasswordAuth.registerUser({ email, password});
            await signIn();
        } catch (error) {
            setSignUpErrorAlert(true);
        }
    }, [app, signIn, email, password]);

    const addUser = useCallback(
        (
        userData, 
        // realm
        )=>{

        const {
            fullname,
            email,
            password,
            primaryPhone,
            secondaryPhone,
            province,
            district,
        } = userData;
      
    }, [
        // realm, 
        userData
    ]);

    



    const onLogin = useCallback(async ()=>{
       
        // if (isLoggingIn) {
            // const userData = {
            //     email, password,
            // }
            if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
                setErrorAlert(true);
                return ;
            }
            setUserData(validateUserData(userData, isLoggingIn, errors, setErrors));
            try {
                await signIn();
            } catch (error) {
            setSignInErrorAlert(true);
            }


            setEmail('');
            setPassword('');

            // save the new user
            // addUser(
            //     userData, 
            //     // realm
            //     );
        // }
        // else {
        //     const userData = {
        //         fullname, 
        //         email, 
        //         password, 
        //         passwordConfirm, 
        //         primaryPhone, 
        //         secondaryPhone,
        //         district,
        //         province,
        //     }
        //     if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
        //         setErrorAlert(true);
        //         return ;
        //     }
        //     setUserData(validateUserData(userData, isLoggingIn, errors, setErrors));
        //     setFullname('');
        //     setEmail('');
        //     setPassword('');
        //     setPasswordConfirm('');
        //     setPrimaryPhone(null);
        //     setSecondaryPhone(null);
        //     setProvince('');
        //     setDistrict('')
        // }
    }, []);

    console.log('userData:', JSON.stringify(userData));

    useEffect(()=>{

        if (province) {
            setSelectedDistricts(districts[province]);

        }

    }, [province, errors, isLoggingIn]);


  return (
    <SafeAreaView style={styles.loginContainer}>
        <ScrollView>
        { isLoggingIn &&        
            <Center mt={isLoggingIn ? '1/4' : '3'}>
                <Text style={styles.signInTitle}>Connect Caju - 2023</Text>
            </Center>
        }
        <Box my="5" alignItems="center">
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
                    <Box 
                    bg="ghostwhite" 
                    w="100%" 
                    p="10" 
            
                    style={{
                        borderBottomRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderBottomWidth: 2,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderColor: '#EBEBE4',
                        }}
                >                
                    <Text 
                        style={{ 
                            marginHorizontal: 10, 
                            textAlign: 'center',
                            fontFamily: 'JosefinSans-BoldItalic', 
                            fontSize: 18, 
                            color: COLORS.main, 
                        }}
                    >
                        Usuário Novo
                    </Text>
                </Box>
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
                // cancelText="No, cancel"
                confirmText="   OK!   "
                confirmButtonColor="#DD6B55"
                // onCancelPressed={() => {
                //     setErrorAlert(false);
                // }}
                onConfirmPressed={() => {
                    setErrorAlert(false);
                }}
            />


        <Stack space={1} w="90%" mx="auto">
            {
            !isLoggingIn &&  (
                <FormControl isRequired my="3" isInvalid={'fullname' in errors}>
                    <FormControl.Label>Nome Completo</FormControl.Label>
                    <CustomInput
                        width="100%"
                        placeholder="Nome completo"
                        value={fullname}
                        type="text"
                        autoCapitalize="words"
                        onChangeText={(newFullname)=>{
                            setErrors(prev=>({...prev, fullname: ''}))
                            setFullname(newFullname)}
                        }
                    />
                {
                'fullname' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.fullname}</FormControl.ErrorMessage> 
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
                    // onChangeText={(text)=>setPassword(text)}
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
            <Box w="50%" >
            <FormControl isRequired my="3" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telemóvel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telemóvel"
                    keyboardType="numeric"
                    value={primaryPhone}
                    // onChangeText={(newPrimaryPhone)=>setPrimaryPhone(newPrimaryPhone)}
                    onChangeText={(newPrimaryPhone)=>{
                        setErrors(prev=>({...prev, primaryPhone: ''}))
                        setPrimaryPhone(newPrimaryPhone)}
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
            'primaryPhone' in errors 
            ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.primaryPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>
            </Box>
            <Box w="50%" >
            <FormControl my="3" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telemóvel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Telemóvel"
                    keyboardType="numeric"
                    value={secondaryPhone}
                    // onChangeText={(newSecondaryPhone)=>setSecondaryPhone(newSecondaryPhone)}
                    onChangeText={(newSecondaryPhone)=>{
                        setErrors(prev=>({...prev, secondaryPhone: ''}))
                        setSecondaryPhone(newSecondaryPhone)}
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
            'secondaryPhone' in errors 
            ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.secondaryPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>
            </Box>
            </Stack>

            )
        }
        {
            !isLoggingIn && (
            <Stack direction="row" w="100%">
            <Box w="50%">
                <FormControl isRequired my="3" isInvalid={'province' in errors}>
                    <FormControl.Label>Província</FormControl.Label>
                    <Select
                        // selectedValue={selectedProvince}
                        selectedValue={province}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        // onValueChange={itemValue => setSelectedProvince(itemValue)}
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
                    {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
                </FormControl>
            </Box>
            <Box w="50%">
            <FormControl isRequired my="3" isInvalid={'district' in errors}>
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        // selectedValue={selectedDistrict}
                        selectedValue={district}
                        accessibilityLabel="Escolha seu distrito"
                        placeholder="Escolha seu distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        // onValueChange={itemValue => setSelectedDistrict(itemValue)}
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
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>
            </Box>
            </Stack>

            )
        }
        <Center w="100%"
            py="2"
        >
{ isLoggingIn &&
          <Button 
                title={"Entrar"} 
                onPress={onPressSignIn} 
                type="outline"
                containerStyle={{
                    width: '100%',
                }}
            />
            
}

{ !isLoggingIn &&
          <Button 
                title={"Registar-se"} 
                onPress={onLogin} 
                type="outline"
                containerStyle={{
                    width: '100%',
                }}
            />
            
}


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
                {/* <Text 
                    style={{ 
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    { isLoggingIn ? "Usuário novo?" : "Já tens uma conta?" }
                </Text> */}
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
        
        </ScrollView>
    </SafeAreaView>
  )
}

export default Login