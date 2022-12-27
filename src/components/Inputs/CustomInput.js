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
    isDisabled,
    textAlign,
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
            isDisabled={isDisabled ? isDisabled : false }
            borderColor="#005000"
            color="#555555"
            fontFamily="JosefinSans-Regular"
            fontSize={18}
            value={value}
            textAlign={textAlign}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={onChangeText}
            onFocus={onFocus}
        />
    );
}



