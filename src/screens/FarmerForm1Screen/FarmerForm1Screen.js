/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center  } from 'native-base';
import { Icon, Button } from '@rneui/themed';
import { Datepicker  } from '@ui-kitten/components';

import { CustomInput } from '../../components/Inputs/CustomInput';
import administrativePosts from '../../fakedata/administrativePosts';
import provinces from '../../fakedata/provinces';
import districts from '../../fakedata/districts';
import villages from '../../fakedata/villages';
import CustomDivider from '../../components/Divider/CustomDivider';
import styles from './styles';
import FarmerDataConfirmModal from '../../components/Modals/FarmerDataConfirmModal';
import FarmerAddDataModal from '../../components/Modals/FarmerAddDataModal';
import { localeDateService, useDatepickerState } from '../../helpers/dates';
import validateFarmerData from '../../helpers/validateFarmerData';



export default function FarmerForm1Screen({ route, navigation }) {
    const [gender, setGender] = useState('');

    // address
    const [selectedAddressAdminPosts, setSelectedAddressAdminPosts] = useState([]);
    const [addressAdminPost, setAddressAdminPost] = useState('');
    const [addressVillage, setAddressVillage] = useState('');

    // birth place
    const [birthProvince, setBirthProvince] = useState('');
    const [birthDistrict, setBirthDistrict] = useState('');
    const [birthAdminPost, setBirthAdminPost] = useState('');

    // birth village
    const [birthVillage, setBirthVillage] = useState('');

    // handle modal view
    const [modalVisible, setModalVisible] = useState(false);
    const [addDataModalVisible, setAddDataModalVisible] = useState(false);


    // const dateFormatPickerState = useDatepickerState();
    const localePickerState = useDatepickerState();
    const [birthDate, setBirthDate] = useState(null);

    const [docType, setDocType] = useState('');
    const [docNumber, setDocNumber] = useState('');

    // console.log('date:', new Date(date)?.toLocaleDateString())

    const [surname, setSurname] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);
    const [nuit, setNuit] = useState(null);

    const [errors, setErrors] = useState({});
    const [farmerData, setFarmerData] = useState({});


    const user = route.params.user;

    const addFarmer = ()=>{
        const farmerData = {
            surname,   
            otherNames, 
            birthDate, 
            gender,
            birthProvince,
            birthDistrict,
            birthAdminPost,
            birthVillage,
            // addressProvince,
            // addressDistrict,
            addressAdminPost,
            addressVillage,
            primaryPhone, 
            secondaryPhone,
            docType, 
            docNumber, 
            nuit
        }

        if (!validateFarmerData(farmerData, errors, setErrors)) {
            return ;
        }
        const retrievedFarmerData = validateFarmerData(farmerData, errors, setErrors);
        setFarmerData(retrievedFarmerData);
        setModalVisible(true);
    }


    useEffect(()=>{

        if (user && user.district) {
            const { district } = user;
            setSelectedAddressAdminPosts(administrativePosts[district]);
        }
        if (!birthProvince) {
            setBirthDistrict('');
            setBirthAdminPost('');
        }
        if (!birthDistrict) {
            setBirthAdminPost('');
        }

    }, [user, birthProvince, birthDistrict, birthAdminPost]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Box mb="5">
            <Text style={styles.headerText}>
                Registo
            </Text>
            <Text style={styles.description}>
                Registo de um novo produtor de caju
            </Text>
        </Box>
        <Box w="100%" alignItems="center">
            <FormControl isRequired my="3" isInvalid={'surname' in errors}>
                <FormControl.Label>Apelido</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo"
                    value={surname}
                    onChangeText={newSurname=>{
                        setErrors(prev=>({...prev, surname: ''}))
                        setSurname(newSurname)
                    }}
                />
                {
                'surname' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.surname}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            <FormControl isRequired my="3" isInvalid={'otherNames' in errors}>
                <FormControl.Label>Outros Nomes</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo"
                    value={otherNames}
                    onChangeText={newNames=>{
                        setErrors(prev=>({...prev, otherNames: ''}))
                        setOtherNames(newNames)
                    }}
                />
                {
                'otherNames' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.otherNames}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'gender' in errors}>
                <FormControl.Label>Sexo</FormControl.Label>
                  <Select
                      selectedValue={gender}
                      accessibilityLabel="Género"
                      placeholder="Género"
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={newGender => {
                        setErrors((prev)=>({...prev, gender: ''}));
                        setGender(newGender)
                    }}
                  >
                    <Select.Item label="Homem" value="Homen" />
                    <Select.Item label="Mulher" value="Mulher" />
                    <Select.Item label="Outro" value="Outro" />
                  </Select>
                {
                'gender' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.gender}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>

            <Box w="50%" px="1" pt="4">
                {/* <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Data de Nascimento<Text style={{color: 'red'}}>*</Text></Text> */}
            <FormControl isRequired isInvalid={'birthDate' in errors}>
                <FormControl.Label>Data de Nascimento</FormControl.Label>
                <Datepicker
                    placeholder="Nascimento"
                    min={new Date(1900, 0, 0)}
                    max={new Date(2010, 0, 0)}
                    size="large"
                    placement="top end"
                    style={styles.datepicker}
                    date={birthDate}

                    // dateService={formatDateService}
                    // {...dateFormatPickerState}
                    dateService={localeDateService}
                    // {...localePickerState}
                    accessoryRight={<Icon name="date-range" />}
                    onSelect={nextDate => {
                        setErrors(prev=>({...prev, birthDate: null }))
                        setBirthDate(nextDate)
                    }}
                />
                {
                'birthDate' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthDate}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            <CustomDivider
                marginVertical="2"
                thickness={2}
                bg="#005000"
            />

            <Center>
                <Text style={styles.description}>Endereço e Contacto</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'addressAdminPost' in errors}>
                    <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={addressAdminPost}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newAdminPost => {
                            setErrors((prev)=>({...prev, addressAdminPost: ''}));
                            setAddressAdminPost(newAdminPost);
                        }}
                    >{
                        selectedAddressAdminPosts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                        ))
                    }
                    </Select>
                {
                'addressAdminPost' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.addressAdminPost}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="3">
                <FormControl.Label>Localidade</FormControl.Label>
                    <Select
                        selectedValue={addressVillage}
                        accessibilityLabel="Escolha uma localidade"
                        placeholder="Escolha uma localidade"
                        // defaultValue="Primeiro, Escolha uma localidade"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newVillage => setAddressVillage(newVillage)}
                    >
                    {
                        villages[addressAdminPost]?.map((village, index)=>(
                            <Select.Item key={index} label={village} value={village} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl my="3" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telemóvel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telemóvel"
                    keyboardType="numeric"
                    value={primaryPhone}
                    onChangeText={newPhone=>{
                        setErrors((prev)=>({...prev, primaryPhone: ''}))                        
                        setPrimaryPhone(newPhone);
                    }}
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={30}
                            type="material"
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
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl my="3" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telemóvel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telemóvel"
                    keyboardType="numeric"
                    value={secondaryPhone}
                    onChangeText={(newPhone=>{
                        setErrors((prev)=>({...prev, secondaryPhone: ''}))
                        setSecondaryPhone(newPhone)
                    })
                    }
                    InputLeftElement={
                        <Icon
                            name="phone"
                            color="grey"
                            size={30}
                            type="material"
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
            </FormControl>
            </Box>
            </Stack>

            <CustomDivider
                marginVertical="2"
                thickness={2}
                bg="#005000"
            />

            <Center>
                <Text style={styles.description}>Local de Nascimento</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'birthProvince' in errors}>
                <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={birthProvince}
                        accessibilityLabel="Escolha uma província"
                        placeholder="Escolha uma província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newProvince => {
                            setErrors((prev)=>({...prev, birthProvince: ''}))
                            setBirthProvince(newProvince)
                        }}
                    >{
                        provinces?.map((province, index)=>(
                            <Select.Item key={index} label={province} value={province} />
                        ))
                    }
                    </Select>
                {
                'birthProvince' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthProvince}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'birthDistrict' in errors}>
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={birthDistrict}
                        accessibilityLabel="Escolha um distrito"
                        placeholder="Escolha um distrito"
                        // defaultValue="Primeiro, Escolha um distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newDistrict => {
                            setErrors((prev)=>({...prev, birthDistrict: ''}));
                            setBirthDistrict(newDistrict);
                        }}
                    >
                    {
                        districts[birthProvince]?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                        ))
                    }
                    </Select>
                {
                'birthDistrict' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthDistrict}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>


            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="3" isInvalid={'birthAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={birthAdminPost}
                        accessibilityLabel="Escolha um posto administrativo"
                        placeholder="Escolha um posto administrativo"
                        // defaultValue="Primeiro, Escolha um posto administrativo"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newAdminPost=> {
                             setErrors((prev)=>({...prev, birthAdminPost: ''}));
                            setBirthAdminPost(newAdminPost);
                        }}
                    >
                    {
                        administrativePosts[birthDistrict]?.map((adminPost, index)=>(
                            <Select.Item key={index} label={adminPost} value={adminPost} />
                        ))
                    }
                    </Select>
                {
                'birthAdminPost' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.birthAdminPost}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid my="3" >
                <FormControl.Label>Localidade</FormControl.Label>
                    <Select
                        selectedValue={birthVillage}
                        accessibilityLabel="Escolha uma localidade"
                        placeholder="Escolha uma localidade"
                        // defaultValue="Primeiro, Escolha uma localidade"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={newVillage => setBirthVillage(newVillage)}
                    >
                    {
                        villages[birthAdminPost]?.map((village, index)=>(
                            <Select.Item key={index} label={village} value={village} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>

            <CustomDivider
                marginVertical="2"
                thickness={2}
                bg="#005000"
            />

            <Center>
                <Text style={styles.description}>Documentos de Identificação</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl my="2" isInvalid={'docType' in errors}>
                <FormControl.Label>Tipo de documento</FormControl.Label>
                  <Select
                      selectedValue={docType}
                      accessibilityLabel="Tipo de doc."
                      placeholder="Tipo de documento"
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={newDocType => {
                        setErrors((prev)=>({...prev, docType: ''}));
                        setDocType(newDocType)
                      }}
                  >
                    <Select.Item label="Bilhete de Identidade (BI)" value="Bilhete de Identidade" />
                    <Select.Item label="Passaporte" value="Passaporte" />
                    <Select.Item label="Carta de Condução" value="Carta de Condução" />
                    <Select.Item label="Cédula" value="Cédula" />
                    <Select.Item label="Cartão de Eleitor" value="Cartão de Eleitor" />
                    <Select.Item label="DIRE" value="DIRE" />
                    <Select.Item label="Cartão de Refugiado" value="Cartão de Refugiado" />
                  </Select>
                {
                'docType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.docType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl my="3" isInvalid={'docNumber' in errors}>
                <FormControl.Label>Número do Documento</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    value={docNumber}
                    placeholder="Número do Documento"
                    onChangeText={newDocNumber=>{
                        setErrors((prev)=>({...prev, docNumber: ''}));
                        setDocNumber(newDocNumber)
                    }}
                />
                {
                'docNumber' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.docNumber}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid={'nuit' in errors}>
                <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                    value={nuit}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, nuit: ''}));
                        setNuit(newNuit)
                    }}
                />
                {
                'nuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.nuit}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            </Box>
            </Stack>

        </Box>
        <Center m="6">
           <Button
                title="Pré-Visualizar Dados"
                onPress={()=>{
                    addFarmer()
                }}
           />
        </Center>
        <Center flex={1} px="3">
            <FarmerDataConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
                farmerData={farmerData}

            />
        </Center>
        <Center flex={1} px="3">
            <FarmerAddDataModal
                addDataModalVisible={addDataModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
            />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
}
