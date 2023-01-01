import { Pressable, SafeAreaView, Text, View } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center, Select, CheckIcon, ScrollView } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import { useApp } from '@realm/react';

import validateUserData from '../../helpers/validateUserData';
import districts from '../../fakedata/districts';

const Login = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [emailFailMessage, setEmailFailMessage] = useState('');
    const [passwordFailMessage, setPasswordFailMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [fullname, setFullname] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);


    const onLogin = ()=>{
       
        if (isLoggingIn) {
            const userData = {
                email, password,
            }
            if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
                return ;
            }
        }
        else {
            const userData = {
                fullname, 
                email, 
                password, 
                passwordConfirm, 
                primaryPhone, 
                secondaryPhone,
                district,
                province,
            }
            if (!validateUserData(userData, isLoggingIn, errors, setErrors)) {
                return ;
            }
        }
    }

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
                    color="#005000"
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
                            color: '#005000', 
                        }}
                    >
                        Usuário Novo
                    </Text>
                </Box>
                )

            }
            <Stack w="100%" direction="row" my="4">
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
                    <Text 
                        style={{ 
                            fontFamily: 'JosefinSans-Regular',
                        }}
                    >
                        { isLoggingIn ? "Usuário novo?" : "Já tens uma conta?" }
                    </Text>
                    <Pressable onPress={()=>setIsLoggingIn(prevState => !prevState)}>
                        <Text 
                            style={{ 
                                textAlign: 'center',
                                fontSize: 16,
                                color: '#005000',
                                fontFamily: 'JosefinSans-Regular',
                                textDecoration: 'underline',
                            }}
                        >
                            { isLoggingIn ? "Criar conta" : "Entrar" }
                        </Text>
                    </Pressable>
                </Box>
            </Stack>
        </Box>

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
                    InputLeftElement={<Icon name="email" color="grey" />}
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
                        color="grey"
                        size={30}
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
                            color="grey"
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
                            color="grey"
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
                            color="grey"
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
        </Stack>
        <Box alignItems="center">
            <Button 
                title={isLoggingIn ? "Entrar" : "Registar-se" } 
                onPress={onLogin} 
            />
        </Box>
        
        </ScrollView>
    </SafeAreaView>
  )
}

export default Login