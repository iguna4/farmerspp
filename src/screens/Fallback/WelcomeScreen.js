import { 
    Pressable, SafeAreaView, Text, View, Image, 
} from 'react-native';
import React, {useEffect, useState, useCallback } from 'react';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center, Select, CheckIcon, ScrollView } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';


import styles from './styles';
import { CustomInput } from '../../components/Inputs/CustomInput';
import validateUserData from '../../helpers/validateUserData';
import districts from '../../consts/districts';
import COLORS from '../../consts/colors';


import { Realm, useApp } from '@realm/react';
import { secrets } from '../../secrets';
import { BSON } from 'realm';


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
    const [errorMessageAlert, setErrorMessageAlert] = useState('');
    const [errorTitleAlert, setErrorTitleAlert] = useState('');
    
    const [errors, setErrors] = useState({});
    
    const [userProvince, setUserProvince] = useState('');
    const [userDistrict, setUserDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    
    const [phone, setPhone] = useState(null);

    const [errorAlert, setErrorAlert] = useState(false);
    const [invalidDataAlert, setInvalidDataAlert] = useState(false);
    // const [userData, setUserData] = useState({});


    const app = useApp();

    const signIn = useCallback(async () => {
        const creds = Realm.Credentials.emailPassword(email, password);
        await app.logIn(creds);
      }, [app, email, password]);
    
      // on user log in
    const onSignIn = useCallback(async () => {
        try {
          await signIn();
        } catch (error) {
            if (error.includes('Network request failed')) {
                setErrorTitleAlert('Conexão Internet');
                setErrorMessageAlert('Para fazer o login, o seu dispositivo deve estar conectado à Internet!');
                setInvalidDataAlert(true);                
            }
            else if (error.includes('Invalid')){
                setErrorAlert(true);
            }
            else {
                console.log('Failed to sign in the user', { cause: error });
            }
        }
    }, [signIn]);

    // on user registration
    const onSignUp = useCallback(async (newName, newEmail, newPassword, newPasswordConfirm, newPhone, newUserDistrict, newUserProvince) => {
        
        // pack user data into an object
        const userData = {
            name: newName,
            email: newEmail,
            password: newPassword,
            passwordConfirm: newPasswordConfirm,
            phone: newPhone,
            userDistrict: newUserDistrict,
            userProvince: newUserProvince,
        }

        // validate user data and return nothing if any error is found
        if (!validateUserData(userData, errors, setErrors)) {
            setInvalidDataAlert(true);
            return ;
        }
        
        // extract validated user data
        const {
            name, email, password, phone, userDistrict, userProvince,
        } = validateUserData(userData, errors, setErrors);

        // try to register new user
        try {
            await app.emailPasswordAuth.registerUser({email, password});

            const creds = Realm.Credentials.emailPassword(email, password);
            const newUser = await app.logIn(creds);
            const mongo = newUser.mongoClient(secrets.serviceName);
            const collection = mongo.db(secrets.databaseName).collection(secrets.userCollectionName);

            // pack the validated user data and save it into the database
            const validatedUserdata = {
                _id: new BSON.ObjectID(),
                userId: newUser.id,
                name,
                email,
                password,
                phone,
                userDistrict,
                userProvince,
                lastLoginAt: new Date(),
                createdAt: new Date(),
            }

            // save custom user data 
            const result = await collection.insertOne(validatedUserdata);
            const customUserData = await newUser.refreshCustomData();

        } catch (error) {
            if (error.includes('Network request failed')) {
                setErrorTitleAlert('Conexão Internet');
                setErrorMessageAlert('Para criar conta de usuário, o seu dispositivo deve estar conectado à Internet!');
                setInvalidDataAlert(true); 
            }
            else if (error.includes('exist')){
                setErrorTitleAlert('Credenciais Inválidas');
                setErrorMessageAlert('Para criar conta de usuário, o seu dispositivo deve estar conectado à Internet!');
                setInvalidDataAlert(true); 
            }
            else {
                console.log('Failed to sign up the user', { cause: error });
            }            
        }
    }, [signIn, app, email, password]);

    // const onSignIn = useCallback(async (newEmail, newPassword)=>{
    //     // const { email, password } = userData;

    //     const creds = Realm.Credentials.emailPassword(newEmail, newPassword);
    //     try {
    //         await app.logIn(creds);
    //     } catch (error) {
    //         await onSignUp(newEmail, newPassword);
    //         // throw new Error('Failed to sign in the user');
    //     }
    // }, [app, email, password]);


    // const onSignUp = useCallback(async (newEmail, newPassword)=>{
    //     const {
    //         name,
    //         email,
    //         password,
    //         phone,
    //         province,
    //         district,
    //     } = userData;

    //     console.log('user credentials:', JSON.stringify({email: newEmail, password: newPassword}));

    //     try {
    //         await app.emailPasswordAuth.registerUser({ newEmail, newPassword });
    //         try {
    //             await onSignIn(newEmail, newPassword);               
    //         } catch (error) {
    //             // console.log('Failed to sign in after registration', { cause: error });
    //             throw new Error('Failed to sign in after user registration', { cause: error });   
    //         }
    //         // save user custom data to the atlas mongodb database
    //         // add name, phone, province and district to custom data

    //     } catch (error) {
    //         // setErrorAlert(true);
    //         throw new Error('Failed to sign up the user');
    //     }
    // }, [app, onSignIn, email, password]);
   



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

        if (userProvince) {
            setSelectedDistricts(districts[userProvince]);
        }

    }, [userProvince, errors, isLoggingIn]);


  return (
    <>
    {/* <StatusBar barStyle="dark-content" backgroundColor="#EBEBE4" /> */}
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
                    color: COLORS.main,
                    fontFamily: 'JosefinSans-Bold',
                    
                }}
                >
                    Novo usuário
                </Text>
            )
            
        }

       </Box>

       <AwesomeAlert 
            show={invalidDataAlert}
            showProgress={false}
            title={errorTitleAlert}
            message={errorMessageAlert}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="   Sim   "
            confirmText="   Ok!   "
            // cancelButtonColor="#DD6B55"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={()=>{
                setInvalidDataAlert(false);
            }}
       />

        <AwesomeAlert
            show={errorAlert}
            showProgress={false}
            title="Dados Inválidos"
            message={isLoggingIn ? "Ainda não tem conta. Pretendes criar uma conta de usuário?" : "Já tens uma conta. Pretendes fazer o login?"}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="   Não   "
            confirmText="   Sim   "
            cancelButtonColor="#DD6B55"
            confirmButtonColor={COLORS.main}
            onCancelPressed={()=>{
                setErrorAlert(false);
            }}
            onConfirmPressed={() => {
                setErrorAlert(false);
                if (isLoggingIn) {
                    setIsLoggingIn(false);
                }
                else {
                    setIsLoggingIn(true);
                }
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
                'name' in errors 
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
                        setErrors((prev)=>({...prev, email: ''}))
                        setEmail(newEmail)
                    }}
                    InputLeftElement={<Icon name="email" color="grey" style={{ paddingLeft: 3 }} />}
                    />
               { 'email' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.email}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
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
                        setErrors(prev=>({...prev, password: ''}))
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
                {
                'password' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.password}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
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
                        setErrors(prev=>({...prev, password: ''}))   
                        setPassword(newPassword)}
                    }
                    InputRightElement={
                        <Icon
                        name={showPassword ?  'visibility-off' : 'visibility'}
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
                        setErrors(prev=>({...prev, passwordConfirm: ''}))
                        setPasswordConfirm(newPasswordConfirm)}
                    }
                    InputRightElement={
                        <Icon
                        name={showPasswordConfirm ?  'visibility-off' : 'visibility' }
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
                <FormControl isRequired my="3" isInvalid={'userProvince' in errors}>
                    <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={userProvince}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={userProvince 
                            ? <Icon name="close" size={25} color="grey" onPress={()=>{
                                setUserDistrict('')
                                setUserProvince('');
                            }} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={(newProvince)=>{
                            setErrors(prev=>({...prev, userProvince: ''}));
                            setUserDistrict('');
                            setUserProvince(newProvince);
                        }}
                    >
                        <Select.Item label="Cabo Delgado" value="Cabo Delgado" />
                        <Select.Item label="Nampula" value="Nampula" />
                        <Select.Item label="Niassa" value="Niassa" />
                        <Select.Item label="Zambézia" value="Zambézia" />
                    </Select>
                    {
                        'userProvince' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.userProvince}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%">
            <FormControl isRequired my="3" isInvalid={'userDistrict' in errors}>
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={userDistrict}
                        accessibilityLabel="Escolha seu distrito"
                        placeholder="Escolha seu distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={userDistrict 
                            ? <Icon name="close" size={25} color="grey" onPress={()=>setUserDistrict('')} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={(newDistrict)=>{
                            setErrors(prev=>({...prev, userDistrict: ''}))
                            setUserDistrict(newDistrict)}
                        }
                    >{
                        selectedDistricts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                            ))
                        }
                    </Select>
                    {
                        'userDistrict' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.userDistrict}</FormControl.ErrorMessage> 
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
            onPress={ ()=> {
                if (isLoggingIn){
                    onSignIn();
                }   
                else {
                    onSignUp(name, email, password, passwordConfirm, phone, userDistrict, userProvince);
                } 
            }} 
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
    </>
  )
};

