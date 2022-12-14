/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { Icon, Button, CheckBox } from '@rneui/themed';
import { Datepicker  } from '@ui-kitten/components';
import AwesomeAlert from 'react-native-awesome-alerts';

import { CustomInput } from '../../components/Inputs/CustomInput';
import administrativePosts from '../../fakedata/administrativePosts';
import provinces from '../../fakedata/provinces';
import districts from '../../fakedata/districts';
import villages from '../../fakedata/villages';
import CustomDivider from '../../components/Divider/CustomDivider';
import styles from './styles';
import IndividualModal from '../../components/Modals/IndividualModal'
// import FarmerDataConfirmModal from '../../components/Modals/FarmerDataConfirmModal';
// import FarmerAddDataModal from '../../components/Modals/FarmerAddDataModal';
import { fullYears, getFullYears, localeDateService, useDatepickerState } from '../../helpers/dates';
// import validateFarmerData from '../../helpers/validateFarmerData';
import countries from '../../fakedata/countries';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { groups, institutions } from '../../fakedata/farmerTypes';
import validateIndividualFarmerData from '../../helpers/validateIndividualFarmerData';
import validateInstitutionFarmerData from '../../helpers/validateInstitutionFarmerData';
import validateGroupFarmerData from '../../helpers/validateGroupFarmerData';
import TickComponent from '../../components/LottieComponents/TickComponent';
import GroupModal from '../../components/Modals/GroupModal';
import InstitutionModal from '../../components/Modals/InstitutionModal';
import ErrorAlert from '../../components/Alerts/ErrorAlert';


import { generateUFID } from '../../helpers/generateUFID';
import DuplicatesAlert from '../../components/Alerts/DuplicatesAlert';
import { detectDuplicates } from '../../helpers/detectDuplicates';
import FarmerTypeRadioButtons from '../../components/RadioButton/FarmerTypeRadioButtons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';


import { realmContext } from '../../models/realm';
const {useRealm} = realmContext;

export default function FarmerForm1Screen({ route, navigation }) {
    const [gender, setGender] = useState('');
    const [familySize, setFamilySize] = useState('');

    // address
    const [selectedAddressAdminPosts, setSelectedAddressAdminPosts] = useState([]);
    const [addressAdminPost, setAddressAdminPost] = useState('');
    const [addressVillage, setAddressVillage] = useState('');

    // birth place
    const [birthProvince, setBirthProvince] = useState('');
    const [birthDistrict, setBirthDistrict] = useState('');
    const [birthAdminPost, setBirthAdminPost] = useState('');

    // handle modal view
    const [modalVisible, setModalVisible] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [duplicatesAlert, setDuplicatesAlert] = useState(false);

    const localePickerState = useDatepickerState();
    const [birthDate, setBirthDate] = useState(null);

    const [docType, setDocType] = useState('');
    const [docNumber, setDocNumber] = useState('');

    const [isSprayingAgent, setIsSprayingAgent] = useState(false);
    const [surname, setSurname] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);
    const [nuit, setNuit] = useState(null);

    const [errors, setErrors] = useState({});
    const [farmerData, setFarmerData] = useState({});

    const [farmerType, setFarmerType] = useState('')

    // Group states
    const [groupType, setGroupType] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupAdminPost, setGroupAdminPost] = useState('');
    const [groupVillage, setGroupVillage] = useState('');
    const [groupManagerName, setGroupManagerName] = useState('');
    const [groupManagerPhone, setGroupManagerPhone] = useState('');
    const [groupOperatingLicence, setGroupOperatingLicence] = useState('');
    const [groupNuit, setGroupNuit] = useState('');
    const [groupAffiliationYear, setGroupAffiliationYear] = useState('');
    const [groupMembersNumber, setGroupMembersNumber] = useState('');
    const [groupWomenNumber, setGroupWomenNumber] = useState('');


    // Instution states
    const [institutionType, setInstitutionType] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionManagerName, setInstitutionManagerName] = useState('');
    const [institutionManagerPhone, setInstitutionManagerPhone] = useState('');
    const [institutionAdminPost, setInstitutionAdminPost] = useState('');
    const [institutionVillage, setInstitutionVillage] = useState('');
    const [institutionNuit, setInstitutionNuit] = useState('')
    const [isPrivateInstitution, setIsPrivateInstitution] = useState(false);


    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
    const [loadinButton, setLoadingButton] = useState(false);
    const [isCoordinatesModalVisible, setIsCoordinatesModalVisible] = useState(false);


    // farmers suspected duplicates
    const [suspectedDuplicates, setSuspectedDuplicates] = useState([]);

    const [farmerItem, setFarmerItem] = useState({});

    const user = route.params.user;

    const realm = useRealm();

    const addFarmer = (farmerType, realm, isAllowed=false)=>{
        let farmerData;
        let retrievedFarmerData;

        if (farmerType === "Indiv??duo"){
            farmerData = {
               isSprayingAgent,
               surname,   
               otherNames, 
               gender,
               familySize,
               birthDate, 
               birthProvince,
               birthDistrict,
               birthAdminPost,
               addressAdminPost,
               addressVillage,
               primaryPhone, 
               secondaryPhone,
               docType, 
               docNumber, 
               nuit
           }
            if (!validateIndividualFarmerData(farmerData, errors, setErrors)) {
                setErrorAlert(true)
                return ;
            }
            retrievedFarmerData = validateIndividualFarmerData(farmerData, errors, setErrors);
            
            setFarmerData(retrievedFarmerData);
            
            // not allowed if the user decided to proceed
            // on with registration after the alert on suspecious duplicates
            if (!isAllowed){

                const ufidData = {
                    names: retrievedFarmerData.names,
                    birthDate: retrievedFarmerData.birthDate,
                    birthPlace: retrievedFarmerData.birthPlace,
                }
                
                const ufid = generateUFID(ufidData);
                let suspected = realm.objects('Farmer').filtered(`ufid == $0`, ufid);
                
                // get more evidence on the duplication attempt
                suspected = detectDuplicates(retrievedFarmerData, suspected);
                if (suspected.length > 0) {
                    setSuspectedDuplicates(suspected);
                    setDuplicatesAlert(true);
                    return ;
                }
            }

        }
        else if (farmerType === "Institui????o"){
            farmerData = {
                institutionType,
                institutionName,
                institutionAdminPost,
                institutionVillage,
                institutionManagerName,
                institutionManagerPhone,
                institutionNuit,
                isPrivateInstitution,
            }
            if (!validateInstitutionFarmerData(farmerData, errors, setErrors)) {
                setErrorAlert(true)
                return ;
            }
            retrievedFarmerData = validateInstitutionFarmerData(farmerData, errors, setErrors);

            setFarmerData(retrievedFarmerData)
        }
        else if (farmerType === "Grupo") {
            farmerData = {
                groupType,
                groupName,
                groupMembersNumber,
                groupWomenNumber,
                groupAffiliationYear,
                groupOperatingLicence,
                groupNuit,
                groupAdminPost,
                groupVillage,
                groupManagerName,
                groupManagerPhone,
            }
            if (!validateGroupFarmerData(farmerData, errors, setErrors, farmerType)) {
                setErrorAlert(true)
                return ;
            }
            retrievedFarmerData = validateGroupFarmerData(farmerData, errors, setErrors, farmerType);
            setFarmerData(retrievedFarmerData)

        }
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

    useEffect(()=>{
        setLoadingActivityIndicator(true);

    }, [navigation, farmerType])
 

    // if (errorAlert) {
    //     return (
    //         <Center flex={1} px="3">
    //             <ErrorAlert errorAlert={errorAlert} setErrorAlert={setErrorAlert} />
    //         </Center>
    //     )
    // }

    if (duplicatesAlert) {
        return (
            <Center flex={1} px="3">
                <DuplicatesAlert 
                    setDuplicatesAlert={setDuplicatesAlert}
                    suspectedDuplicates={suspectedDuplicates}
                    setFarmerType={setFarmerType}
                    setModalVisible={setModalVisible}
                    addFarmer={addFarmer}
                    farmerData={farmerData}
                    realm={realm}
                    
                />
            </Center>
        )
    }
        
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        decelerationRate={'normal'}
        fadingEdgeLength={2}
      >
        {/* Data collecting form description */}
     <Box 
        // alignItems={"center"}
     >
        <Box 
        bg="ghostwhite" 
        w="100%" 
        p="3" 

        style={{
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: '#EBEBE4',
            }}
            >
            <Stack>
                
            </Stack>

            <AwesomeAlert
                show={errorAlert}
                showProgress={false}
                title="Dados Obrigat??rios"
                message="Os campos obrigat??rios devem ser BEM preenchidos!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText="   OK!   "
                confirmButtonColor="#DD6B55"
                // onCancelPressed={() => {
                //     setErrorAlert(false);
                // }}
                onConfirmPressed={() => {
                    setErrorAlert(false);
                }}
            />

            <Box mb="2">
                <Stack direction="row">
                    <Box w="10%">
                        <Icon 
                            name="arrow-back-ios" 
                            color="#005000"
                            size={35}
                            onPress={()=>navigation.goBack()}
                        />
                    </Box>
                    <Box w="80%" alignItems={'center'} pt="1">
                        <Text 
                            style={{ 
                                textAlign: 'center', 
                                fontFamily: 'JosefinSans-Bold', 
                                fontSize: 24, 
                                color: '#005000',  
                            }}
                        >
                            Produtor
                        </Text>
                    </Box>
                    <Box w="10%">

                    </Box>
                </Stack>
                <Stack direction="row">
                    <Box w="80%">
                        <Text style={styles.headerText}>
                            Registo
                        </Text>
                    </Box>
                    <Center w="20%">
                        <Icon name="person-add" size={40} color="grey" />
                    </Center>
                </Stack>
                <Text style={styles.description}>
                    Seleccione o tipo de produtor que pretendes registar
                </Text>
            </Box>

            {/* Radio Buttons allowing to choose the farmerType */}
            <FarmerTypeRadioButtons
                farmerType={farmerType}
                setFarmerType={setFarmerType}
            />
        </Box>
</Box>      
        {/* Data collecting form  */}
{
    loadingActivitiyIndicator  && (
        <CustomActivityIndicator 
            loadingActivitiyIndicator={loadingActivitiyIndicator}
            setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
    )
}

{/* {
   !loadingActivitiyIndicator && ( */}
<Box
    alignItems={'center'}
>

{
    farmerType === "Indiv??duo" && (

        <Box px="3" my="6">
        <Stack  direction="row" mx="3" w="100%">
            <Box w="20%" px="1">

            </Box>
            <Box w="80%" px="1">
                <CheckBox
                    center
                    fontFamily = 'JosefinSans-Italic'
                    containerStyle={{
                        backgroundColor: 'ghostwhite',
                    }}
                    textStyle={{
                        
                        fontWeight: '100',
                        color: '#005000',
                    }}
                    title="?? Provedor de Servi??os de Pulveriza????o?"
                    checked={isSprayingAgent}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => setIsSprayingAgent(!isSprayingAgent)}
                />
            </Box>
        </Stack>
        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'surname' in errors}>
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
            <FormControl isRequired my="1" isInvalid={'otherNames' in errors}>
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
            <FormControl isRequired my="1" isInvalid={'gender' in errors}>
                <FormControl.Label>Sexo</FormControl.Label>
                  <Select
                      selectedValue={gender}
                      accessibilityLabel="G??nero"
                      placeholder="G??nero"
                      minHeight={55}
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                     dropdownCloseIcon={gender 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setGender('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                      onValueChange={newGender => {
                        setErrors((prev)=>({...prev, gender: ''}));
                        setGender(newGender)
                    }}
                  >
                    <Select.Item label="Masculino" value="Masculino" />
                    <Select.Item label="Feminino" value="Feminino" />
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

            <Box w="50%" px="1" pt="2">
            <FormControl isRequired isInvalid={'familySize' in errors}>
                <FormControl.Label>Agregado Familiar</FormControl.Label>
                    <CustomInput
                        width="100%"
                        type="number"
                        textAlign="center"
                        placeholder="Agregado familiar"
                        value={familySize}
                        keyboardType="numeric"
                        onChangeText={newSize=>{
                            setErrors((prev)=>({...prev, familySize: ''}));
                            setFamilySize(newSize)
                        }}
                    />
                {
                'familySize' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.familySize}</FormControl.ErrorMessage> 
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
                <Text style={styles.formSectionDescription}>Endere??o e Contacto</Text>
            </Center>

            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'addressAdminPost' in errors}>
                    <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={addressAdminPost}
                        accessibilityLabel="Escolha sua prov??ncia"
                        placeholder="Escolha sua prov??ncia"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={addressAdminPost 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setAddressAdminPost('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                        mt={1}
                        onValueChange={newAdminPost => {
                            setErrors((prev)=>({...prev, addressAdminPost: ''}));
                            setAddressAdminPost(newAdminPost);
                        }}
                    >{
                        selectedAddressAdminPosts?.map((adminPost, index)=>(
                            <Select.Item key={index} label={adminPost} value={adminPost} />
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
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={addressVillage 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setAddressVillage('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
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
            <FormControl my="1" isInvalid={'primaryPhone' in errors}>
                <FormControl.Label>Telem??vel</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telem??vel"
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
            <FormControl my="1" isInvalid={'secondaryPhone' in errors}>
                <FormControl.Label>Telem??vel Alternativo</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="telephoneNumber"
                    placeholder="Telem??vel"
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
                <Text style={styles.formSectionDescription}>Dados de Nascimento</Text>
            </Center>

    <Stack direction="row" mx="3" my="2" w="100%">
        <Box w="50%" px="1" pt="1" >
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
                        dateService={localeDateService}
                        // {...localePickerState}
                        accessoryRight={
                            birthDate 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setBirthDate(null)} /> 
                                    : <Icon name="date-range" color="#005000" />
                        }
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


        <Box w="50%" px="1">
            <FormControl isRequired isInvalid={'birthProvince' in errors}>
                <FormControl.Label>Prov??ncia</FormControl.Label>
                    <Select
                        selectedValue={birthProvince}
                        accessibilityLabel="Escolha uma prov??ncia"
                        placeholder="Escolha uma prov??ncia"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={birthProvince 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setBirthProvince('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
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
            </Stack>

{ !birthProvince?.includes('Cidade') && (

        <Stack direction="row" mx="3" my="2" w="100%">
            <Box w="50%" px="1">
            <FormControl isRequired my="1" isInvalid={'birthDistrict' in errors}>
                <FormControl.Label>{birthProvince === "Pa??s Estrangeiro" ? 'Pa??s' : 'Distrito'}</FormControl.Label>
                    <Select
                        selectedValue={birthDistrict}
                        accessibilityLabel="Escolha um distrito"
                        placeholder={birthProvince?.includes('Estrangeiro') ? "Escolha um pa??s" : "Escolha um distrito"}
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={birthDistrict 
                        ? <Icon name="close" size={25} color="red" onPress={()=>setBirthDistrict('')} /> 
                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                    }
                    mt={1}
                    onValueChange={newDistrict => {
                        setErrors((prev)=>({...prev, birthDistrict: ''}));
                        setBirthDistrict(newDistrict);
                        }}
                    >
                    {   birthProvince === "Pa??s Estrangeiro" 
                        ? countries?.map((country, index)=>(
                            <Select.Item key={index} label={country} value={country} />
                        ))
                        :
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
            <Box w="50%" px="1">
        
        {
            (
                !birthProvince?.includes('Estrangeiro') && 
                !birthDistrict?.includes('Cidade') &&
                !birthProvince?.includes('Maputo')
                
            ) 
            && 
            (
                
                <FormControl isRequired my="1" isInvalid={'birthAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                    <Select
                        selectedValue={birthProvince ? birthAdminPost: ''}
                        accessibilityLabel="Escolha um posto administrativo"
                        placeholder="Escolha um posto administrativo"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        dropdownCloseIcon={birthAdminPost 
                            ? <Icon name="close" size={25} color="red" onPress={()=>setBirthAdminPost('')} /> 
                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                        }
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
        
        )
    }
        </Box>
    </Stack>
)}


        <CustomDivider
            marginVertical="2"
            thickness={2}
            bg="#005000"
        />
            
        <Center>
            <Text 
                style={styles.formSectionDescription}
            >
                Documentos de Identifica????o
            </Text>
        </Center>

        <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
            <FormControl my="2" isInvalid={'docType' in errors}>
                <FormControl.Label>Tipo de documento</FormControl.Label>
                  <Select
                      selectedValue={docType}
                      accessibilityLabel="Tipo de doc."
                      placeholder="Tipo de documento"
                      minHeight={55}
                      _selectedItem={{
                          bg: 'teal.600',
                          fontSize: 'lg',
                          endIcon: <CheckIcon size="5" />,
                      }}
                      dropdownCloseIcon={docType 
                                        ? <Icon name="close" size={25} color="red" onPress={()=>setDocType('')} /> 
                                        : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                    }
                      mt={1}
                      onValueChange={newDocType => {
                        setErrors((prev)=>({...prev, docType: ''}));
                        setDocType(newDocType);
                      }}
                  >
                    <Select.Item label="Bilhete de Identidade (BI)" value="Bilhete de Identidade" />
                    <Select.Item label="Passaporte" value="Passaporte" />
                    <Select.Item label="Carta de Condu????o" value="Carta de Condu????o" />
                    <Select.Item label="C??dula" value="C??dula" />
                    <Select.Item label="Cart??o de Eleitor" value="Cart??o de Eleitor" />
                    <Select.Item label="DIRE" value="DIRE" />
                    <Select.Item label="Cart??o de Refugiado" value="Cart??o de Refugiado" />
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
                <FormControl.Label>N??mero do Documento</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    isDisabled={docType === '' ? true : false }
                    value={docNumber}
                    placeholder="N??mero do Documento"
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

    </Box>
)}

{/* Group data collecting form */}

{
farmerType === "Institui????o" && (
 <Box px="3" my="6">
        <Stack  direction="row" mx="3" w="100%">
            <Box w="20%" px="1">

            </Box>
            <Box w="80%" px="1">
                <CheckBox
                    center
                    fontFamily = 'JosefinSans-Italic'
                    containerStyle={{
                        backgroundColor: 'ghostwhite',
                    }}
                    textStyle={{
                        
                        fontWeight: '100',
                        color: '#005000',
                    }}
                    title="?? uma institui????o privada?"
                    checked={isPrivateInstitution}
                    checkedIcon={
                        <Icon
                            name="check-box"
                            // type="material"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            // type="material"
                            color="#005000"
                            size={30}
                            iconStyle={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => setIsPrivateInstitution(!isPrivateInstitution)}
                />
            </Box>
        </Stack>

    <Box w="100%" alignItems="center">
            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'institutionType' in errors}>
                    <FormControl.Label>Tipo de Institui????o</FormControl.Label>
                    <Select
                        selectedValue={institutionType}
                        accessibilityLabel="Tipo de Institui????o"
                        placeholder="Escolha uma institui????o"
                        minHeight={55}
                        dropdownCloseIcon={institutionType 
                                            ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionType('')} /> 
                                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                        }
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />
                        }}
                        mt={1}
                        onValueChange={newInstitutionType => {
                            setErrors((prev)=>({...prev, institutionType: ''}));
                            setInstitutionType(newInstitutionType);
                        }}
                    >
                    {
                        institutions?.map((institution, index)=>(
                            <Select.Item key={index} label={institution} value={institution} />
                        ))
                    }
                    </Select>
                {
                'institutionType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.institutionType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="4">
                <FormControl.Label>Nome da Institui????o</FormControl.Label>
                    <CustomInput
                        width="100%"
                        isDisabled={institutionType === '' ? true : false}
                        autoCapitalize="words"
                        placeholder="Nome da Institui????o"
                        value={institutionName}
                        onChangeText={newInstitutionName=>{
                            setErrors(prev=>({...prev, institutionName: ''}))
                            setInstitutionName(newInstitutionName)
                        }}
                    />
                <FormControl.ErrorMessage>{''}</FormControl.ErrorMessage>
            </FormControl>
            </Box>
        </Stack>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1">
            <FormControl isRequired my="2" isInvalid={'institutionAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                <Select
                    selectedValue={institutionAdminPost}
                    accessibilityLabel="posto administrativo"
                    placeholder="Escolha posto administrativo"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={institutionAdminPost 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionAdminPost('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newAdminPost => {
                        setErrors((prev)=>({...prev, institutiondminPost: ''}));
                        setInstitutionAdminPost(newAdminPost);
                    }}
                >{
                    selectedAddressAdminPosts?.map((adminPost, index)=>(
                        <Select.Item key={index} label={adminPost} value={adminPost} />
                    ))
                }
                </Select>
            {
            'institutionAdminPost' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionAdminPost}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
        </Box>
        <Box w="50%" px="1">
        <FormControl isRequired my="2">
            <FormControl.Label>Localidade</FormControl.Label>
                <Select
                    selectedValue={institutionVillage}
                    accessibilityLabel="Escolha uma localidade"
                    placeholder="Escolha uma localidade"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={institutionVillage 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setInstitutionVillage('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newVillage => setInstitutionVillage(newVillage)}
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

        <FormControl isRequired my="1" isInvalid={'institutionManagerName' in errors}>
            <FormControl.Label>Nome Completo do Gerente</FormControl.Label>
            <CustomInput
                width="100%"
                type="text"
                autoCapitalize="words"
                placeholder="Nome completo do gerente"
                value={institutionManagerName}
                onChangeText={newManagerName=>{
                    setErrors(prev=>({...prev, institutionManagerName: ''}))
                    setInstitutionManagerName(newManagerName)
                }}
            />
            {
            'institutionManagerName' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionManagerName}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'institutionManagerPhone' in errors}>
            <FormControl.Label>Telem??vel do Gerente</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder="Telem??vel"
                keyboardType="numeric"
                value={institutionManagerPhone}
                onChangeText={newManagerPhone=>{
                    setErrors((prev)=>({...prev, institutionManagerPhone: ''}))                        
                    setInstitutionManagerPhone(newManagerPhone);
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
            'institutionManagerPhone' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.institutionManagerPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'institutionNuit' in errors}>
                <FormControl.Label>NUIT da Institui????o</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="NUIT"
                    value={institutionNuit}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, institutionNuit: ''}));
                        setInstitutionNuit(newNuit)
                    }}
                />
                {
                'institutionNuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.institutionNuit}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        </Stack>
    </Box>
 </Box>
)}


{
    farmerType === "Grupo" && (
    <Box px="3" my="6">
        <Box w="100%" alignItems="center">
            <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="3" isInvalid={'groupType' in errors}>
                    <FormControl.Label>Tipo de grupo</FormControl.Label>
                    <Select
                        selectedValue={groupType}
                        accessibilityLabel="Grupo"
                        placeholder="Tipo de grupo "
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        dropdownCloseIcon={groupType 
                                            ? <Icon name="close" size={25} color="red" onPress={()=>setGroupType('')} /> 
                                            : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                        }
                        onValueChange={newGroupType => {
                            setErrors((prev)=>({...prev, groupType: ''}));
                            setGroupType(newGroupType)
                        }}
                    >
                        {
                            groups?.map((group, index)=>(
                            <Select.Item key={index} label={group} value={group} />
                        ))  
                        }
                    </Select>
                {
                'groupType' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupType}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">
            <FormControl isRequired my="4" isInvalid={'groupName' in errors}>
                <FormControl.Label>Designa????o do grupo</FormControl.Label>
                    <CustomInput
                        width="100%"
                        isDisabled={groupType === '' ? true : false}
                        autoCapitalize="words"
                        placeholder="Designa????o do grupo"
                        value={groupName}
                        onChangeText={newGroupName=>{
                            setErrors(prev=>({...prev, groupName: ''}))
                            setGroupName(newGroupName)
                        }}
                    />
                {
                'groupName' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupName}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>
        </Stack>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupMembersNumber' in errors} isRequired>
            <FormControl.Label>Total de membros</FormControl.Label>
            <CustomInput
                width="100%"
                type="number"
                placeholder="N??mero de membros"
                textAlign={'center'}
                keyboardType="numeric"
                value={groupMembersNumber}
                onChangeText={groupMembers=>{
                    setErrors((prev)=>({...prev, groupMembersNumber: ''}))                        
                    setGroupMembersNumber(groupMembers);
                }}
            />
            {
            'groupMembersNumber' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupMembersNumber}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'groupWomenNumber' in errors} isRequired>
                <FormControl.Label>Total de mulheres</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder="N??mero de mulheres"
                    textAlign={'center'}
                    isDisabled={groupMembersNumber === '' ? true : false}
                    value={groupWomenNumber}
                    keyboardType="numeric"
                    onChangeText={womenNumber=>{
                        setErrors((prev)=>({...prev, groupWomenNumber: ''}));
                        setGroupWomenNumber(womenNumber)
                    }}
                />
                {
                'groupWomenNumber' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupWomenNumber}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        </Stack>


        <Stack direction="row" mx="3" w="100%">
            <Box w="50%" px="1">
                <FormControl isRequired my="1" isInvalid={'groupAffiliationYear' in errors}>
                    <FormControl.Label>Ano de afilia????o</FormControl.Label>
                    <Select
                        selectedValue={groupAffiliationYear}
                        accessibilityLabel="Escolha o ano"
                        placeholder="Escolha o ano"
                        minHeight={55}
                        _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                        }}
                      dropdownCloseIcon={groupAffiliationYear 
                                        ? <Icon 
                                            name="close" 
                                            size={25} 
                                            color="red" 
                                            onPress={()=>setGroupAffiliationYear('')} 
                                        /> 
                                        : <Icon 
                                            size={40} 
                                            name="arrow-drop-down" 
                                            color="#005000" 
                                        />
                                    }
                        mt={1}
                        onValueChange={newYear => {
                            setErrors((prev)=>({...prev, groupAffiliationYear: ''}));
                            setGroupAffiliationYear(newYear);
                        }}
                    >
                    {
                        getFullYears()?.map((year, index)=>(
                            <Select.Item key={index} label={`${year}`} value={year} />
                        ))
                    }
                    </Select>
                {
                'groupAffiliationYear' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupAffiliationYear}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
                </FormControl>
            </Box>
            <Box w="50%" px="1">

            </Box>
        </Stack>

    <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupOperatingLicence' in errors}>
            <FormControl.Label>Alvar?? {groupType ? `da  ${groupType}` : 'do Grupo'}</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder={groupType ? `Alvar?? da ${groupType}` : `Alvar?? do grupo`}
                keyboardType="numeric"
                isDisabled={groupType === '' ? true : false}
                value={groupOperatingLicence}
                onChangeText={newOperatingLicence=>{
                    setErrors((prev)=>({...prev, groupOperatingLicence: ''}))                        
                    setGroupOperatingLicence(newOperatingLicence);
                }}
            />
            {
            'groupOperatingLicence' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupOperatingLicence}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
            <FormControl isInvalid={'groupNuit' in errors}>
                <FormControl.Label>NUIT {groupType ? `da  ${groupType}` : 'do Grupo'}</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="number"
                    placeholder={groupType ? `NUIT da ${groupType}` : `NUIT do grupo`}
                    value={groupNuit}
                    isDisabled={groupType === '' ? true : false}
                    keyboardType="numeric"
                    onChangeText={newNuit=>{
                        setErrors((prev)=>({...prev, groupNuit: ''}));
                        setGroupNuit(newNuit)
                    }}
                />
                {
                'groupNuit' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupNuit}</FormControl.ErrorMessage> 
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
            <Text 
                style={styles.formSectionDescription}
            >
                Endere??o e Contacto
            </Text>
        </Center>

        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1">
            <FormControl isRequired my="2" isInvalid={'groupAdminPost' in errors}>
                <FormControl.Label>Posto Administrativo</FormControl.Label>
                <Select
                    selectedValue={groupAdminPost}
                    accessibilityLabel="posto administrativo"
                    placeholder="Escolha posto administrativo"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />,
                    }}
                    dropdownCloseIcon={groupAdminPost 
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setGroupAdminPost('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newAdminPost => {
                        setErrors((prev)=>({...prev, groupAdminPost: ''}));
                        setGroupAdminPost(newAdminPost);
                    }}
                >
                {
                    selectedAddressAdminPosts?.map((adminPost, index)=>(
                        <Select.Item key={index} label={adminPost} value={adminPost} />
                    ))
                }
                </Select>
            {
            'groupAdminPost' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupAdminPost}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
        </Box>
        <Box w="50%" px="1">
        <FormControl isRequired my="2">
            <FormControl.Label>Localidade</FormControl.Label>
                <Select
                    selectedValue={groupVillage}
                    accessibilityLabel="Escolha uma localidade"
                    placeholder="Escolha uma localidade"
                    minHeight={55}
                    _selectedItem={{
                        bg: 'teal.600',
                        fontSize: 'lg',
                        endIcon: <CheckIcon size="5" />
                    }}
                    dropdownCloseIcon={groupVillage
                                    ? <Icon name="close" size={25} color="red" onPress={()=>setGroupVillage('')} /> 
                                    : <Icon size={40} name="arrow-drop-down" color="#005000" />
                                }
                    mt={1}
                    onValueChange={newVillage => setGroupVillage(newVillage)}
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

        </Box>

        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'groupManagerName' in errors}>
                <FormControl.Label>Nome Completo do Gerente</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    autoCapitalize="words"
                    placeholder="Nome completo do Gerente"
                    value={groupManagerName}
                    onChangeText={newName=>{
                        setErrors(prev=>({...prev, groupManagerName: ''}))
                        setGroupManagerName(newName)
                    }}
                />
                {
                'groupManagerName' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.groupManagerName}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
 
        <Stack direction="row" mx="3" w="100%">
        <Box w="50%" px="1" my="2">
        <FormControl  isInvalid={'groupManagerPhone' in errors}>
            <FormControl.Label>Telem??vel do Gerente</FormControl.Label>
            <CustomInput
                width="100%"
                type="telephoneNumber"
                placeholder="Telem??vel"
                keyboardType="numeric"
                value={groupManagerPhone}
                onChangeText={newManagerPhone=>{
                    setErrors((prev)=>({...prev, groupManagerPhone: ''}))                        
                    setGroupManagerPhone(newManagerPhone);
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
            'groupManagerPhone' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.groupManagerPhone}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl>
        </Box>
        <Box w="50%" px="1" my="2">
        </Box>
    </Stack>



    </Box>
    </Box>
)}


    <Center mb="15" w="94%" 
    // style={{ backgroundColor: 'red'}}
    >
        { farmerType !== '' ? 
            (
            <Button
                loading={loadinButton ? true : false}
                type="outline"
                containerStyle={{
                    width: '100%',
                }}
                title="Pr??-visualizar dados"
                onPress={()=>addFarmer(farmerType, realm)}
            />
            )
            :
            <Box >
                <Center>
                    <TickComponent />
                </Center>
            </Box>
        }
    </Center>

    <Center flex={1} px="3">
    { 
    farmerType?.includes('Indiv') && (
        <IndividualModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            farmerData={farmerData}
            farmerType={farmerType}
            setFarmerType={setFarmerType}

            setSurname={setSurname}
            setOtherNames={setOtherNames}
            setIsSprayingAgent={setIsSprayingAgent}
            setGender={setGender}
            setFamilySize={setFamilySize}
            setAddressVillage={setAddressVillage}
            setAddressAdminPost={setAddressAdminPost}
            setPrimaryPhone={setPrimaryPhone}
            setSecondaryPhone={setSecondaryPhone}
            setBirthProvince={setBirthProvince}
            setBirthDistrict={setBirthDistrict} 
            setBirthAdminPost={setBirthAdminPost}
            setBirthDate={setBirthDate}
            setDocType={setDocType}
            setDocNumber={setDocNumber}
            setNuit={setNuit}

            setFarmerItem={setFarmerItem}
            setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}            
        />
    )
    }
    {
        farmerType?.includes('Grup') && (
            <GroupModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                farmerData={farmerData}
                farmerType={farmerType}
                setFarmerType={setFarmerType}

                setGroupType={setGroupType}
                setGroupName={setGroupName}
                setGroupAffiliationYear={setGroupAffiliationYear} 
                setGroupAdminPost={setGroupAdminPost}
                setGroupVillage={setGroupVillage}
                setGroupManagerName={setGroupManagerName}
                setGroupManagerPhone={setGroupManagerPhone}
                setGroupOperatingLicence={setGroupOperatingLicence}
                setGroupNuit={setGroupNuit}
                setGroupMembersNumber={setGroupMembersNumber}
                setGroupWomenNumber={setGroupWomenNumber}

                setFarmerItem={setFarmerItem}
                setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}                
            />
        )
    }
    {
        farmerType?.includes('Instit') && (
            <InstitutionModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                farmerData={farmerData}
                farmerType={farmerType}
                setFarmerType={setFarmerType}
                
                setInstitutionType={setInstitutionType} 
                setInstitutionName={setInstitutionName}
                setInstitutionAdminPost={setInstitutionAdminPost}
                setInstitutionVillage={setInstitutionVillage}
                setInstitutionManagerName={setInstitutionManagerName}
                setInstitutionManagerPhone={setInstitutionManagerPhone}
                setInstitutionNuit={setInstitutionNuit}
                setIsPrivateInstitution={setIsPrivateInstitution}  

                setFarmerItem={setFarmerItem}
                farmerItem={farmerItem}
                setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}                
             />
        )
    }
    </Center>
    <Box>
        <SuccessAlert
            isCoordinatesModalVisible={isCoordinatesModalVisible}
            setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}
            farmerItem={farmerItem}
            flag={'farmer'}
            
        />
      </Box>
    </Box>
    </ScrollView>
    </SafeAreaView>
  );
}
