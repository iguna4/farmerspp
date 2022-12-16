import { Pressable, SafeAreaView, Text } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import { Button, Icon } from '@rneui/themed';
import { Box, Stack, FormControl, Center } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';

import { useApp } from '@realm/react';

import validateData from '../../helpers/validateData';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
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

    useEffect(()=>{

    }, [isLogin])

  return (
    <SafeAreaView style={styles.signInContainer}>
    { 
    isLogin 
    ?
       ( <SignInComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            setErrors={setErrors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setIsLogin={setIsLogin}
        />
        )
        : 
        (
        <SignUpComponent 
            isLogin={isLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            emailFailMessage={emailFailMessage}
            setEmailFailMessage={setEmailFailMessage}
            passwordFailMessage={passwordFailMessage}
            setPasswordFailMessage={setPasswordFailMessage}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            setErrors={setErrors}
            showPasswordConfirm={showPasswordConfirm}
            setShowPasswordConfirm={setShowPasswordConfirm}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            selectedDistricts={selectedDistricts}
            setSelectedDistricts={setSelectedDistricts}
            fullname={fullname}
            setFullname={setFullname}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            primaryPhone={primaryPhone}
            setPrimaryPhone={setPrimaryPhone}
            secondaryPhone={secondaryPhone}
            setSecondaryPhone={setSecondaryPhone}
        />
        )
    }
    </SafeAreaView>
  )
}

export default Login