/* eslint-disable prettier/prettier */
import { SafeAreaView, Text, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import { Icon, Button } from '@rneui/themed';
import { Input, Box, Center, Stack, ScrollView, FormControl, Select, CheckIcon } from 'native-base';

import { CustomInput } from '../../components/Inputs/CustomInput';
import districts from '../../fakedata/districts';


export default function SignUpScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    useEffect(()=>{

        if (selectedProvince) {
            setSelectedDistricts(districts[selectedProvince]);
        }

    }, [selectedProvince]);
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
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Nome Completo</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Nome completo"
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Endereço Electrónico</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Endereço Electrónico"
                    InputLeftElement={
                        <Icon
                            name="email"
                            color="grey"
                            size={30}
                            type="material"
                        />
                    }
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
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
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3" >
                <FormControl.Label>Confirmar Senha</FormControl.Label>
                <CustomInput
                    width="100%"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="Confirmar senha"
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
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>


            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Telemóvel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Telemóvel"
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
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid my="3" >
                <FormControl.Label>Telemóvel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Telemóvel"
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
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3">
                    <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={selectedProvince}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedProvince(itemValue)}
                    >
                        <Select.Item label="Cabo Delgado" value="Cabo Delgado" />
                        <Select.Item label="Nampula" value="Nampula" />
                        <Select.Item label="Niassa" value="Niassa" />
                        <Select.Item label="Zambézia" value="Zambézia" />
                    </Select>
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3" >
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={selectedDistrict}
                        accessibilityLabel="Escolha seu distrito"
                        placeholder="Escolha seu distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedDistrict(itemValue)}
                    >{
                        selectedDistricts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>
        </Box>
        <Center m="6">
            <Button title="Criar conta" />
        </Center>
        </ScrollView>
    </SafeAreaView>
  );
}
