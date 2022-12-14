/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { Icon } from '@rneui/themed';
import { Input, Box, Stack } from 'native-base';


import styles from './styles';

export function CustomInput({
    placeholder,
    InputLeftElement,
    InputRightElement,
    Icon,
    type,
    label,
    error,
    value,
    secureTextEntry,
    onChangeText,
    autoCapitalize,
    keyboardType,
    onFocus,
     ...props
}) {
    return (
        <Input
            size="lg"
            placeholder={placeholder}
            w={props?.width}
            Icon={Icon}
            // type={type}
            textContentType={type}
            secureTextEntry={ secureTextEntry ? true : false}
            InputLeftElement={InputLeftElement}
            InputRightElement={InputRightElement}
            borderColor="#005000"
            color="#2c2c2c"
            fontFamily="JosefinSans-Regular"
            fontSize={20}
            value={value}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={onChangeText}
            onFocus={onFocus}
            // props={...props}
        />
    );
}



