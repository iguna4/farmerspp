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
import { roles } from '../../consts/roles';
import { errorMessages } from '../../consts/errorMessages';


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

    // ------------------------------------------
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [errorFlag, seterrorFlag] = useState(null);

    // ---------------------------------------------
    
    const [errors, setErrors] = useState({});
    
    const [role, setRole] = useState(roles.fieldAgent);
    const [userProvince, setUserProvince] = useState('');
    const [userDistrict, setUserDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    
    const [phone, setPhone] = useState(null);

    const [invalidDataAlert, setInvalidDataAlert] = useState(false);
    // const [userData, setUserData] = useState({});

    useEffect(()=>{
        console.log('errorFlag:', errorFlag);
        if (alert && (errorFlag?.toString()?.includes(errorMessages.signIn.logUsernameFlag) || errorFlag?.toString()?.includes(errorMessages.signIn.logPasswordFlag))) {
            setTitleAlert(errorMessages.signIn.title);
            setMessageAlert(errorMessages.signIn.message);
            setShowCancelButton(errorMessages.signIn.showCancelButton);
            setShowConfirmButton(errorMessages.signIn.showConfirmButton);
            setConfirmText(errorMessages.signIn.confirmText);
            setCancelText(errorMessages.signIn.cancelText);
        }
        else  if (alert && (errorFlag?.toString()?.includes(errorMessages.network.logFlag))) {
            setTitleAlert(errorMessages.network.title);
            setMessageAlert(errorMessages.network.message);
            setShowCancelButton(errorMessages.network.showCancelButton);
            setShowConfirmButton(errorMessages.network.showConfirmButton);
            setConfirmText(errorMessages.network.confirmText);
            setCancelText(errorMessages.network.cancelText);
        }
        else if (alert && errorFlag?.toString()?.includes(errorMessages.signUp.logFlag)){
            // Alert message
            setTitleAlert(errorMessages.signUp.title);
            setMessageAlert(errorMessages.signUp.message);
            setShowCancelButton(errorMessages.signUp.showCancelButton);
            setShowConfirmButton(errorMessages.signUp.showConfirmButton);
            setConfirmText(errorMessages.signUp.confirmText);
            setCancelText(errorMessages.signUp.cancelText);
        }
        else if (alert) {
            setTitleAlert(errorMessages.server.title);
            setMessageAlert(errorMessages.server.message);
            setShowCancelButton(errorMessages.server.showCancelButton);
            setShowConfirmButton(errorMessages.server.showConfirmButton);
            setConfirmText(errorMessages.server.confirmText);
            setCancelText(errorMessages.server.cancelText);
        }

    }, [errorFlag, alert]);


    const app = useApp();

    const signIn = useCallback(async () => {

        // remove any current user
        
        const creds = Realm.Credentials.emailPassword(email, password);
        app?.currentUser?.logOut();
        try {
            await app?.logIn(creds);
        } catch (error) {
            if (error.includes('username')){
                console.log('yes')
            }
            console.log('login Error1:', { cause: error })
            if (error.includes(errorMessages.network.logFlag)) {
                // Alert message
                setTitleAlert(errorMessages.network.title);
                setMessageAlert(errorMessages.network.message);
                setShowCancelButton(errorMessages.network.showCancelButton);
                setShowConfirmButton(errorMessages.network.showConfirmButton);
                setConfirmText(errorMessages.network.confirmText);
                setCancelText(errorMessages.network.cancelText);
                setAlert(true);                
            }
            else if (error.includes(errorMessages.signIn.logUsernameFlag) || error.includes(errorMessages.signIn.logPasswordFlag)){
                // complete this 
                setTitleAlert(errorMessages.signIn.title);
                setMessageAlert(errorMessages.signIn.message);
                setShowCancelButton(errorMessages.signIn.showCancelButton);
                setShowConfirmButton(errorMessages.signIn.showConfirmButton);
                setConfirmText(errorMessages.signIn.confirmText);
                setCancelText(errorMessages.signIn.cancelText);
                setAlert(true);
            }
            else {
                // Alert message
                setTitleAlert(errorMessages.server.title);
                setMessageAlert(errorMessages.server.message);
                setShowCancelButton(errorMessages.server.showCancelButton);
                setShowConfirmButton(errorMessages.server.showConfirmButton);
                setConfirmText(errorMessages.server.confirmText);
                setCancelText(errorMessages.server.cancelText);
                setAlert(true);
            }
            return ;            
        }
      }, [app, email, password]);
    
      // on user log in
    // const onSignIn = useCallback(async () => {
    //     try {
    //       await signIn();
    //     } catch (error) {
    //         console.log('login Error2:', { cause: error })

    //         if (error.includes(errorMessages.network.logFlag)) {
    //             // Alert message
    //             setTitleAlert(errorMessages.network.title);
    //             setMessageAlert(errorMessages.network.message);
    //             setShowCancelButton(errorMessages.network.showCancelButton);
    //             setShowConfirmButton(errorMessages.network.showConfirmButton);
    //             setConfirmText(errorMessages.network.confirmText);
    //             setCancelText(errorMessages.network.cancelText);
    //             setAlert(true);                
    //         }
    //         else if (error.includes(errorMessages.signIn.logFlag)){
    //             // complete this 
    //             setTitleAlert(errorMessages.signIn.title);
    //             setMessageAlert(errorMessages.signIn.message);
    //             setShowCancelButton(errorMessages.signIn.showCancelButton);
    //             setShowConfirmButton(errorMessages.signIn.showConfirmButton);
    //             setConfirmText(errorMessages.signIn.confirmText);
    //             setCancelText(errorMessages.signIn.cancelText);
    //             setAlert(true);
    //         }
    //         else {
    //             // Alert message
    //             setTitleAlert(errorMessages.server.title);
    //             setMessageAlert(errorMessages.server.message);
    //             setShowCancelButton(errorMessages.server.showCancelButton);
    //             setShowConfirmButton(errorMessages.server.showConfirmButton);
    //             setConfirmText(errorMessages.server.confirmText);
    //             setCancelText(errorMessages.server.cancelText);
    //             setAlert(true);
    //         }
    //         return ;
    //     }
    // }, [signIn]);

    // on user registration
    const onSignUp = useCallback(async (newName, newEmail, newPassword, newPasswordConfirm, newPhone, newRole, newUserDistrict, newUserProvince) => {
        
        // pack user data into an object
        const userData = {
            name: newName,
            email: newEmail,
            password: newPassword,
            passwordConfirm: newPasswordConfirm,
            phone: newPhone,
            role: newRole,
            userDistrict: newUserDistrict,
            userProvince: newUserProvince,
        }

        // validate user data and return nothing if any error is found
        if (!validateUserData(userData, errors, setErrors)) {
            // setInvalidDataAlert(true);
            return ;
        }
        
        // extract validated user data
        const {
            name, email, password, phone, role, userDistrict, userProvince,
        } = validateUserData(userData, errors, setErrors);

        // try to register new user
        try {
            // remove any current user
            app?.currentUser?.logOut();

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
                role,
                userDistrict,
                userProvince,
                image: '',
                lastLoginAt: new Date(),
                createdAt: new Date(),
            }

            // save custom user data 
            const result = await collection.insertOne(validatedUserdata);
            const customUserData = await newUser.refreshCustomData();

        } catch (error) {
            setAlert(true);
            seterrorFlag(error);
            // if (error.includes(errorMessages.network.logFlag)){
            //     // Alert message
            //     setTitleAlert(errorMessages.network.title);
            //     setMessageAlert(errorMessages.network.message);
            //     setShowCancelButton(errorMessages.network.showCancelButton);
            //     setShowConfirmButton(errorMessages.network.showConfirmButton);
            //     setConfirmText(errorMessages.network.confirmText);
            //     setCancelText(errorMessages.network.cancelText);
            //     setAlert(true);
            // }
            // else if (error.includes(errorMessages.signUp.logFlag)){
            //     // Alert message
            //     setTitleAlert(errorMessages.signUp.title);
            //     setMessageAlert(errorMessages.signUp.message);
            //     setShowCancelButton(errorMessages.signUp.showCancelButton);
            //     setShowConfirmButton(errorMessages.signUp.showConfirmButton);
            //     setConfirmText(errorMessages.signUp.confirmText);
            //     setCancelText(errorMessages.signUp.cancelText);
            //     setAlert(true);
            // }
            // else {
            //     // Alert message
            //     setTitleAlert(errorMessages.server.title);
            //     setMessageAlert(errorMessages.server.message);
            //     setShowCancelButton(errorMessages.server.showCancelButton);
            //     setShowConfirmButton(errorMessages.service.showConfirmButton);
            //     setConfirmText(errorMessages.server.confirmText);
            //     setCancelText(errorMessages.server.cancelText);
            //     setAlert(true);
            // }
            return ;
        }
    }, [app, email, password]);





    // const onSubmitUserData = useCallback(async ()=>{

    //     if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
    //         setErrorAlert(true);
    //         return ;
    //     }

    //     setUserData(validateUserData(userData, isLoggingIn, errors, setErrors));

    //     try {
    //         if (isLoggingIn) {
    //             await onSignIn(userData);
    //         }
    //         else {
    //             await onSignUp(userData);
    //         }
    //     } catch (error) {
    //         throw new Error('Failed to process user request!');
    //     }

    //     setEmail('');
    //     setPassword('');
    // }, []);

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
            show={alert}
            showProgress={false}
            title={titleAlert}
            message={messageAlert}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelText={cancelText}
            confirmText={confirmText}
            cancelButtonColor="#DD6B55"
            confirmButtonColor={COLORS.main}
            onCancelPressed={()=>{
                setAlert(false);
                seterrorFlag(null);
            }}
            onConfirmPressed={() => {
                setAlert(false);
                if (isLoggingIn) {
                    // setIsLoggingIn(false);
                }
                else {
                    setIsLoggingIn(true);
                    setEmail('');
                    setPassword('');
                }
                seterrorFlag(null);
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
        <>

            <Stack direction="row" w="100%">
            <Box w="100%">
                <FormControl isRequired my="3" isInvalid={'role' in errors}>
                    <FormControl.Label>Perfil</FormControl.Label>
                    <Select
                        selectedValue={role}
                        accessibilityLabel="Escolha seu perfil"
                        placeholder="Escolha seu perfil"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={role 
                            ? <Icon name="close" size={25} color="grey" onPress={()=>{
                                setRole('');
                            }} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={(newRole)=>{
                            setErrors(prev=>({...prev, role: ''}));
                            setRole(newRole);
                        }}
                    >
                        <Select.Item label={roles.fieldAgent} value={roles.fieldAgent} />
                        <Select.Item label={roles.districtalManager} value={roles.districtalManager} />
                        <Select.Item label={roles.provincialManager} value={roles.provincialManager} />
                    </Select>
                    {
                        'role' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.role}</FormControl.ErrorMessage> 
                    : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" w="100%" space={role.includes(roles.provincialManager) ? 0 : 1}>
            <Box w={role.includes(roles.provincialManager) ? "100%" : "50%"}>
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
                                if (!role.includes(roles.provincialManager)){
                                    setUserDistrict('')
                                }
                                setUserProvince('');
                            }} /> 
                            : <Icon size={25} name="arrow-drop-down" color="#005000" />
                        }
                        mt={1}
                        onValueChange={(newProvince)=>{
                            setErrors(prev=>({...prev, userProvince: ''}));
                            if (!role.includes(roles.provincialManager)){
                                setUserDistrict('')
                            }
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
{   !role.includes(roles.provincialManager) &&
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
    }
            </Stack>
        </>
            )
        }
        <Center w="100%"
            py="2"
            >
        <Button 
            title={isLoggingIn ? " Entrar" : "Registar-se"} 
            onPress={ async ()=> {
                
                if (isLoggingIn){
                    app?.currentUser?.logOut();
                    try{
                        // await signIn();
                        const creds = Realm.Credentials.emailPassword(email, password);
                        await app?.logIn(creds);
                    }
                    catch(error){
                        console.log('SignIn or SignUp Error: ', { cause: error });
                        setAlert(true);
                        seterrorFlag(error);
                        return ;
                    }   
                }   
                else {
                    await onSignUp(name, email, password, passwordConfirm, phone, role, userDistrict, userProvince);
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

