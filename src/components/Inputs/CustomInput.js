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
     ...props
}) {
    return (
        <Input
            size="lg"
            placeholder={placeholder}
            w={props?.width}
            Icon={Icon}
            type={type}
            InputLeftElement={InputLeftElement}
            InputRightElement={InputRightElement}
            borderColor="#005000"
        />
    );
}



