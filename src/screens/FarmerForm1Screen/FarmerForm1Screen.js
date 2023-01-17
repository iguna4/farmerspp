/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio,  } from 'native-base';
import { Icon, Button, CheckBox } from '@rneui/themed';
import AwesomeAlert from 'react-native-awesome-alerts';

import administrativePosts from '../../fakedata/administrativePosts';
import styles from './styles';
import IndividualModal from '../../components/Modals/IndividualModal'
import { fullYears, getFullYears, localeDateService, useDatepickerState } from '../../helpers/dates';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import validateIndividualFarmerData from '../../helpers/validateIndividualFarmerData';
import validateInstitutionFarmerData from '../../helpers/validateInstitutionFarmerData';
import validateGroupFarmerData from '../../helpers/validateGroupFarmerData';
import TickComponent from '../../components/LottieComponents/TickComponent';
import GroupModal from '../../components/Modals/GroupModal';
import InstitutionModal from '../../components/Modals/InstitutionModal';

import { generateUFID } from '../../helpers/generateUFID';
import DuplicatesAlert from '../../components/Alerts/DuplicatesAlert';
import { detectDuplicates } from '../../helpers/detectDuplicates';
import FarmerTypeRadioButtons from '../../components/RadioButton/FarmerTypeRadioButtons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';


import IndividualFarmerForm from './IndividualFarmerForm';
import InstitutionFarmerForm from './InstitutionFarmerForm';
import GroupFarmerForm from './GroupFarmerForm';
import COLORS from '../../consts/colors';


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
    const [institutionLicence, setInstitutionLicence] = useState('');


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

        if (farmerType === "Indivíduo"){
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
               addressProvince : user.province,
               addressDistrict: user.district,
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
        else if (farmerType === "Instituição"){
            farmerData = {
                institutionType,
                institutionName,
                institutionAdminPost,
                institutionProvince : user.province,
                institutionDistrict: user.district,
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
                groupProvince : user.province,
                groupDistrict: user.district,
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
        bg="#EBEBE4" 
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
                title="Dados Obrigatórios"
                message="Os campos obrigatórios devem ser BEM preenchidos!"
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
                            color={COLORS.main}
                            size={35}
                            onPress={()=>navigation.goBack()}
                        />
                    </Box>
                    <Box w="80%" alignItems={'center'} pt="1">
                        <Text 
                            style={{ 
                                textAlign: 'center', 
                                fontFamily: 'JosefinSans-Bold', 
                                fontSize: 18, 
                                color: COLORS.main,  
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
    farmerType === "Indivíduo" && (
        <IndividualFarmerForm 
            gender={gender}
            setGender={setGender}
            familySize={familySize}
            setFamilySize={setFamilySize}
            selectedAddressAdminPosts={selectedAddressAdminPosts}
            setSelectedAddressAdminPosts={setSelectedAddressAdminPosts}
            addressVillage={addressVillage}
            setAddressVillage={setAddressVillage}
            addressAdminPost={addressAdminPost}
            setAddressAdminPost={setAddressAdminPost}
            birthProvince={birthProvince}
            setBirthProvince={setBirthProvince}
            birthDistrict={birthDistrict}
            setBirthDistrict={setBirthDistrict}
            birthAdminPost={birthAdminPost}
            setBirthAdminPost={setBirthAdminPost}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            errorAlert={errorAlert}
            setErrorAlert={setErrorAlert}
            setModalVisible={setModalVisible}
            setDuplicatesAlert={setDuplicatesAlert}
            docType={docType}
            setDocType={setDocType}
            docNumber={docNumber}
            setDocNumber={setDocNumber}
            isSprayingAgent={isSprayingAgent}
            setIsSprayingAgent={setIsSprayingAgent}
            surname={surname}
            setSurname={setSurname}
            otherNames={otherNames}
            setOtherNames={setOtherNames}
            primaryPhone={primaryPhone}
            setPrimaryPhone={setPrimaryPhone}
            secondaryPhone={secondaryPhone}
            setSecondaryPhone={setSecondaryPhone}
            nuit={nuit}
            setNuit={setNuit}
            errors={errors}
            setErrors={setErrors} 
        />
)}

{/* Group data collecting form */}

{
farmerType === "Instituição" && (
    <InstitutionFarmerForm 
        institutionType={institutionType}
        setInstitutionType={setInstitutionType}
        institutionName={institutionName}
        setInstitutionName={setInstitutionName}
        institutionManagerName={institutionManagerName}
        setInstitutionManagerName={setInstitutionManagerName}
        institutionManagerPhone={institutionManagerPhone}
        setInstitutionManagerPhone={setInstitutionManagerPhone}
        institutionAdminPost={institutionAdminPost}
        setInstitutionAdminPost={setInstitutionAdminPost}
        institutionVillage={institutionVillage}
        setInstitutionVillage={setInstitutionVillage}
        institutionNuit={institutionNuit}
        setInstitutionNuit={setInstitutionNuit}
        isPrivateInstitution={isPrivateInstitution}
        setIsPrivateInstitution={setIsPrivateInstitution}
        institutionLicence={institutionLicence}
        setInstitutionLicence={setInstitutionLicence}
        errors={errors}
        setErrors={setErrors}
        // setAddressAdminPosts={setAddressAdminPosts}
        addressAdminPost={addressAdminPost}
        selectedAddressAdminPosts={selectedAddressAdminPosts}
        setSelectedAddressAdminPosts={setSelectedAddressAdminPosts}

    />
)}


{
    farmerType === "Grupo" && (
    <GroupFarmerForm 
        groupType={groupType}
        setGroupType={setGroupType}
        groupName={groupName}
        setGroupName={setGroupName}
        groupAdminPost={groupAdminPost}
        setGroupAdminPost={setGroupAdminPost}
        groupVillage={groupVillage}
        setGroupVillage={setGroupVillage}
        groupManagerName={groupManagerName}
        setGroupManagerName={setGroupManagerName}
        groupManagerPhone={groupManagerPhone}
        setGroupManagerPhone={setGroupManagerPhone}
        groupOperatingLicence={groupOperatingLicence}
        setGroupOperatingLicence={setGroupOperatingLicence}
        groupNuit={groupNuit}
        setGroupNuit={setGroupNuit}
        groupAffiliationYear={groupAffiliationYear}
        setGroupAffiliationYear={setGroupAffiliationYear}
        groupMembersNumber={groupMembersNumber}
        setGroupMembersNumber={setGroupMembersNumber}
        groupWomenNumber={groupWomenNumber}
        setGroupWomenNumber={setGroupWomenNumber}
        errors={errors}
        setErrors={setErrors}
        selectedAddressAdminPosts={selectedAddressAdminPosts}
        setSelectedAddressAdminPosts={setSelectedAddressAdminPosts}
        addressAdminPost={addressAdminPost}
    />
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
                title="Pré-visualizar dados"
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
