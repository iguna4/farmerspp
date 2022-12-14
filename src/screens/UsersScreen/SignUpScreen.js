/* eslint-disable prettier/prettier */
import { SafeAreaView, Text, StatusBar, Alert } from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import { Icon, Button } from '@rneui/themed';
import { Box, Center, Stack, ScrollView, FormControl, Select, CheckIcon } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';
import districts from '../../fakedata/districts';

import { AppContext } from '../../models/realm';
import { User } from '../../models/User';
// const { useRealm } = AppContext;


export default function SignUpScreen({ navigation, setIsNewUser }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);

    const [errors, setErrors] = useState({});

    // const appRealm = useRealm();


    const resetState = ()=>{
        setShowPassword(false);
        setShowPasswordConfirm(false);
        setProvince('');
        setDistrict('');
        setSelectedDistricts([]);
        setFullname('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setPrimaryPhone(null);
        setSecondaryPhone(null);
    }



    useEffect(()=>{

        if (province) {
            setSelectedDistricts(districts[province]);

        }


    }, [province, errors]);


    const validateUserData = () => {
        const retrievedFullname = fullname?.trim();
        const retrievedEmail = email?.trim();
        const retrievedPassword = password?.trim();
        const retrievedPasswordConfirm = passwordConfirm?.trim();
        const retrievedPrimaryPhone = primaryPhone?.trim();
        const retrievedSecondaryPhone = secondaryPhone?.trim();
        const retrievedProvince = province?.trim();
        const retrievedDistrict = district?.trim();

        if ((!retrievedFullname) || (retrievedFullname?.split(' ')?.length <= 1)) {
            setErrors({ ...errors,
                fullname: 'Nome n??o completo.'
            });
            return false;
        } 

        if (!retrievedEmail || !retrievedEmail?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrors({ ...errors,
                email: 'Endere??o electr??nico inv??lido.'
            });
            return false;
        }

        if (retrievedPassword !== retrievedPasswordConfirm) {
            setErrors({ ...errors,
                password: 'Senhas n??o iguais.',
                passwordConfirm: 'Senhas n??o iguais.'
            });
            return false;
        }
        else if (retrievedPassword?.length < 6) {
            setErrors({ ...errors,
                password: 'Pelo menos 6 caracteres.',
            });
            return false;
        }

        if (!retrievedPrimaryPhone && !retrievedSecondaryPhone) {
            setErrors({ ...errors,
                primaryPhone: 'Pelo menos um n??mero de telefone.',
            });
            return false;            
        }
        else if (
            !Number.isInteger(parseInt(retrievedPrimaryPhone))  || 
            retrievedPrimaryPhone?.toString().length !== 9       ||
            parseInt(retrievedPrimaryPhone.toString()[0]) !== 8 ||
            [2,3,4,5,6,7].indexOf(parseInt(retrievedPrimaryPhone?.toString()[1])) < 0
            ) {      
            setErrors({ ...errors,
                primaryPhone: 'N??mero de telefone inv??lido.',
            });
            return false;                   
        }

        if (retrievedSecondaryPhone && 
            (
            !Number.isInteger(parseInt(retrievedSecondaryPhone))  || 
            retrievedSecondaryPhone?.toString().length !== 9       ||
            parseInt(retrievedSecondaryPhone?.toString()[0]) !== 8 ||
            [2,3,4,5,6,7].indexOf(parseInt(retrievedSecondaryPhone?.toString()[1])) < 0   
            )
        ){
            setErrors({ ...errors,
                secondaryPhone: 'N??mero de telefone inv??lido.',
            });
            return false;               
        }

        if (!retrievedProvince) {
             setErrors({ ...errors,
                province: 'Indica a prov??ncia',
            });
            return false;                
        }

        if (!retrievedDistrict) {
             setErrors({ ...errors,
                province: 'Indica o distrito',
            });
            return false;                
        }

        return {
            fullname: retrievedFullname,
            email: retrievedEmail,
            password: retrievedPassword,
            primaryPhone: retrievedPrimaryPhone ? parseInt(retrievedPrimaryPhone) : 0,
            secondaryPhone: retrievedSecondaryPhone ? parseInt(retrievedSecondaryPhone) : 0,
            province: retrievedProvince,
            district: retrievedDistrict,
        };
    };



    const addUser = useCallback(()=>{
  
       if (!validateUserData()) {
            return ;
       } 

       const userData = validateUserData();
    
    //    appRealm.write(()=>{
    //         const newUser = appRealm.create('User', 
    //         {
    //             _id: new Realm.BSON.ObjectId(),
    //             fullname: userData.fullname, 
    //             email: userData.email, 
    //             password: userData.password,
    //             primaryPhone: userData?.primaryPhone,
    //             secondaryPhone: userData?.secondaryPhone,
    //             address: {
    //             province: userData.province,
    //             district: userData.district,
    //             },
    //             achievement: {
    //                 registeredFarmers: 0,
    //                 registeredFarmlands: 0,
    //                 targetFarmers: 0,
    //                 targetFarmlands: 0,
    //             },
    //             createdAt: new Date(),
    //         });
    //         // navigation.navigate('')
    //         resetState();
    //         console.log('user:', newUser);
    //     })
        // appRealm.close();
    }, [
            // appRealm,             
            fullname,
            email,
            password,
            passwordConfirm,
            primaryPhone,
            secondaryPhone,
            district,
            province,
        ])


  return (

    <SafeAreaView style={styles.signUpContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#005000" />
        <ScrollView>
        <Box mb="5">
            <Text style={styles.signUpHeaderText}>
                Nova Conta
            </Text>
            <Text style={styles.signUpDescription}>
                Introduza os seus dados
            </Text>
        </Box>
        <Box w="100%" alignItems="center">
            <FormControl isRequired my="3" isInvalid={'fullname' in errors}>
                <FormControl.Label>Nome Completo</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Nome completo"
                    value={fullname}
                    type="text"
                    autoCapitalize="words"
                    // onFocus={}
                    // onChangeText={(text)=>setFullname(text)}
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
                {/* <FormControl.ErrorMessage 
                    _text={{
                        fontSize: 'xs',

                    }}
                >{''}</FormControl.ErrorMessage> */}
            </FormControl>
            <FormControl isRequired my="3" isInvalid={'email' in errors}>
                <FormControl.Label>Endere??o Electr??nico</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Endere??o Electr??nico"
                    keyboardType="email-address"
                    value={email}
                    type="emailAddress"
                    // onChangeText={(text)=>setEmail(text)}
                    onChangeText={(newEmail)=>{
                        setErrors(prev=>({...prev, email: ''}))
                        setEmail(newEmail)}
                    }
                    InputLeftElement={
                        <Icon
                            name="email"
                            color="grey"
                            size={30}
                            type="material"
                        />
                    }
                />
            {
            'email' in errors 
            ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.email}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
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
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'passwordConfirm' in errors}>
                <FormControl.Label>Confirmar Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Confirmar senha"
                    secureTextEntry={!showPasswordConfirm ? true : false}
                    value={passwordConfirm}
                    // onChangeText={(text)=>setPasswordConfirm(text)}
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
                {/* <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage> */}
            </FormControl>
            </Box>
            </Stack>


            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telem??vel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telem??vel"
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
            <Box w="50%" px="1">
            <FormControl my="3" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telem??vel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Telem??vel"
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

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'province' in errors}>
                    <FormControl.Label>Prov??ncia</FormControl.Label>
                    <Select
                        // selectedValue={selectedProvince}
                        selectedValue={province}
                        accessibilityLabel="Escolha sua prov??ncia"
                        placeholder="Escolha sua prov??ncia"
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
                        <Select.Item label="Zamb??zia" value="Zamb??zia" />
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
            <Box w="50%" px="1">
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
        </Box>
        <Center m="6">
            <Button 
                title="Criar conta" 
                onPress={addUser}
            />
        </Center>
        </ScrollView>
    </SafeAreaView>
  );
}
