/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center  } from 'native-base';
import { Icon, Button } from '@rneui/themed';
import { Datepicker, Layout, NativeDateService  } from '@ui-kitten/components';

import { CustomInput } from '../../components/Inputs/CustomInput';
import administrativePosts from '../../fakedata/administrativePosts';
import provinces from '../../fakedata/provinces';
import districts from '../../fakedata/districts';
import villages from '../../fakedata/villages';
import CustomDivider from '../../components/Divider/CustomDivider';
import styles from './styles';
import FarmerDataConfirmModal from '../../components/Modals/FarmerDataConfirmModal';
import FarmerAddDataModal from '../../components/Modals/FarmerAddDataModal';


const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};


const i18n = {
  dayNames: {
    short: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    long: ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'],
  },
  monthNames: {
    short: ['Jan', 'Fev', 'Març', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  },
};

const localeDateService = new NativeDateService('pt', { i18n, startDayOfWeek: 1 });
// const formatDateService = new NativeDateService('en', { format: 'DD.MM.YYYY' });




export default function FarmerForm1Screen({ route, navigation }) {
    const [selectedGender, setSelectedGender] = useState('');

    // address
    const [selectedAddressAdminPosts, setSelectedAddressAdminPosts] = useState([]);
    const [selectedAddressAdminPost, setSelectedAddressAdminPost] = useState('');
    const [selectedAddressVillage, setSelectedAddressVillage] = useState('');

    // birth place
    const [selectedBirthProvince, setSelectedBirthProvince] = useState('');
    const [selectedBirthDistrict, setSelectedBirthDistrict] = useState('');
    const [selectedBirthAdminPost, setSelectedBirthAdminPost] = useState('');

    // birth village
    const [selectedBirthVillage, setSelectedBirthVillage] = useState('');

    // handle modal view
    const [modalVisible, setModalVisible] = useState(false);
    const [addDataModalVisible, setAddDataModalVisible] = useState(false);


    // const dateFormatPickerState = useDatepickerState();
    const localePickerState = useDatepickerState();

    const user = route.params.user;

    useEffect(()=>{

        if (user && user.district) {
            const { district } = user;
            setSelectedAddressAdminPosts(administrativePosts[district]);
        }
        if (!selectedBirthProvince) {
            setSelectedBirthDistrict('');
            setSelectedBirthAdminPost('');
        }
        if (!selectedBirthDistrict) {
            setSelectedBirthAdminPost('');
        }

    }, [user, selectedBirthProvince, selectedBirthDistrict, selectedBirthAdminPost]);


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
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Apelido</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Nome completo"
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Outros Nomes</FormControl.Label>
                <CustomInput
                    width="100%"
                    placeholder="Nome completo"
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Sexo</FormControl.Label>
                  <Select
                      selectedValue={selectedGender}
                      accessibilityLabel="Género"
                      placeholder="Género"
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => setSelectedGender(itemValue)}
                  >
                    <Select.Item label="Homem" value="Homen" />
                    <Select.Item label="Mulher" value="Mulher" />
                    <Select.Item label="Outro" value="Outro" />
                  </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1" pt="5">
                <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Data de Nascimento<Text style={{color: 'red'}}>*</Text></Text>
                <Datepicker
                    placeholder="Nascimento"
                    min={new Date(1900, 0, 0)}
                    max={new Date(2010, 0, 0)}
                    size="large"
                    placement="top end"
                    style={styles.datepicker}
                    // date={date}
                    // dateService={formatDateService}
                    // {...dateFormatPickerState}
                    dateService={localeDateService}
                    {...localePickerState}
                    accessoryRight={<Icon name="date-range" />}
                    // onSelect={nextDate => setDate(nextDate)}
                />
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
                <FormControl isRequired my="3">
                    <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={selectedAddressAdminPost}
                        accessibilityLabel="Escolha sua província"
                        placeholder="Escolha sua província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedAddressAdminPost(itemValue)}
                    >{
                        selectedAddressAdminPosts?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                        ))
                    }
                    </Select>
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3" >
                <FormControl.Label>Localidade</FormControl.Label>
                    <Select
                        selectedValue={selectedAddressVillage}
                        accessibilityLabel="Escolha uma localidade"
                        placeholder="Escolha uma localidade"
                        // defaultValue="Primeiro, Escolha uma localidade"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedAddressVillage(itemValue)}
                    >
                    {
                        villages[selectedAddressAdminPost]?.map((village, index)=>(
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
            <FormControl isInvalid my="3">
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
                        />
                    }
                />
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
                <Text style={styles.description}>Local de Nascimento</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Província</FormControl.Label>
                    <Select
                        selectedValue={selectedBirthProvince}
                        accessibilityLabel="Escolha uma província"
                        placeholder="Escolha uma província"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedBirthProvince(itemValue)}
                    >{
                        provinces?.map((province, index)=>(
                            <Select.Item key={index} label={province} value={province} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3" >
                <FormControl.Label>Distrito</FormControl.Label>
                    <Select
                        selectedValue={selectedBirthDistrict}
                        accessibilityLabel="Escolha um distrito"
                        placeholder="Escolha um distrito"
                        // defaultValue="Primeiro, Escolha um distrito"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedBirthDistrict(itemValue)}
                    >
                    {
                        districts[selectedBirthProvince]?.map((district, index)=>(
                            <Select.Item key={index} label={district} value={district} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>


            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid isRequired my="3">
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={selectedBirthAdminPost}
                        accessibilityLabel="Escolha um posto administrativo"
                        placeholder="Escolha um posto administrativo"
                        // defaultValue="Primeiro, Escolha um posto administrativo"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedBirthAdminPost(itemValue)}
                    >
                    {
                        administrativePosts[selectedBirthDistrict]?.map((adminPost, index)=>(
                            <Select.Item key={index} label={adminPost} value={adminPost} />
                        ))
                    }
                    </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid my="3" >
                <FormControl.Label>Localidade</FormControl.Label>
                    <Select
                        selectedValue={selectedBirthVillage}
                        accessibilityLabel="Escolha uma localidade"
                        placeholder="Escolha uma localidade"
                        // defaultValue="Primeiro, Escolha uma localidade"
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => setSelectedBirthVillage(itemValue)}
                    >
                    {
                        villages[selectedBirthAdminPost]?.map((village, index)=>(
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
            <FormControl isInvalid my="3">
                <FormControl.Label>Tipo de documento</FormControl.Label>
                  <Select
                      selectedValue={selectedGender}
                      accessibilityLabel="Tipo de doc."
                      placeholder="Tipo de documento"
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => setSelectedGender(itemValue)}
                  >
                    <Select.Item label="Bilhete de Identidade (BI)" value="Bilhete de Identidade" />
                    <Select.Item label="Passaporte" value="Passaporte" />
                    <Select.Item label="Carta de Condução" value="Carta de Condução" />
                    <Select.Item label="Cédula" value="Cédula" />
                    <Select.Item label="Cartão de Eleitor" value="Cartão de Eleitor" />
                    <Select.Item label="DIRE" value="DIRE" />
                    <Select.Item label="Cartão de Refugiado" value="Cartão de Refugiado" />
                  </Select>
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isInvalid my="3" >
                <FormControl.Label>Número do Documento</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="Número do Documento"
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            </Stack>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl isInvalid my="3">
                <FormControl.Label>NUIT</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
            <Box w="50%" px="1">
            {/* <FormControl isInvalid my="3" >
                <FormControl.Label>Número do Documento</FormControl.Label>

                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl> */}
            </Box>
            </Stack>

        </Box>
        <Center m="6">
           <Button
                title="Pré-Visualizar Dados"
                onPress={()=>{
                    setModalVisible(true);
                }}
           />
        </Center>
        <Center flex={1} px="3">
            <FarmerDataConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setAddDataModalVisible={setAddDataModalVisible}
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
