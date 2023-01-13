
// import {  } from 'react-native-safe-area-context';
import { View, Text, ScrollView, SafeAreaView,   } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Button, CheckBox } from '@rneui/themed';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio, Alert  } from 'native-base';
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';
import AwesomeAlert from 'react-native-awesome-alerts';


import Realm from 'realm';
// import { AppContext } from '../../models/realm';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import styles from '../FarmerForm1Screen/styles';
import { CustomInput } from '../../components/Inputs/CustomInput';
import { crops } from '../../fakedata/crops';
import cloneList from '../../fakedata/clones';
import { fullYears, getFullYears } from '../../helpers/dates';
import { plantingTypes } from '../../fakedata/plantingTypes';
import FarmlandModal from '../../components/Modals/FarmlandModal'
import validateFarmlandData from '../../helpers/validateFarmlandData';
import ErrorAlert from '../../components/Alerts/ErrorAlert';

import { realmContext } from '../../models/realm';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import TreeComponent from '../../components/LottieComponents/TreeComponent';
import SuccessFarmlandModal from '../../components/Modals/SuccessFarmlandModal';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
const { useRealm, useQuery } = realmContext; 

// const { useRealm, useObject } = AppContext;

const FarmlandForm1Screen = ({ route, navigation }) => {
    // handle modal view
    const [modalVisible, setModalVisible] = useState(false);
    const [isCoordinatesModalVisible, setIsCoordinatesModalVisible] = useState(false);
    const [loadinButton, setLoadingButton] = useState(false);

    const [errors, setErrors] = useState({});
    // const [selectedCrop, setSelectedCrop] = useState('');
    const [consociatedCrops, setConsociatedCrops] = useState([]);
    const [description, setDescription] = useState('');
    const [plantingYear, setPlantingYear] = useState('');
    const [trees, setTrees] = useState('');
    const [declaredArea, setDeclaredArea] = useState('')
    const [densityWidth, setDensityWidth] = useState('');
    const [densityLength, setDensityLength] = useState('');
    const [plantTypes, setPlantTypes] = useState([]);
    const [clones, setClones] = useState([]);
    const [densityMode, setDensityMode] = useState('')
    
    const [errorAlert, setErrorAlert] = useState(false);

    
    const [farmlandData, setFarmlandData] = useState({});
    const [farmlandId, setFarmlandId] = useState('');


    // extract farmland owner id, name from the previous screen
    const { ownerId, ownerName, flag } = route.params;

    // go back to the previous screen
    // if farmerId is undefined
    if (!ownerId) {
        navigation.goBack();
        return ;
    }
 
    // loading activity indicator
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
    
    // function called onSubmitting form data
    const visualizeFarmland = ()=>{

        let farmlandData = {
            plantingYear, 
            description, 
            consociatedCrops, 
            trees,
            declaredArea,
            densityMode,
            densityLength,
            densityWidth,
            plantTypes,
            clones,
            // farmerId,
        }
        // if any required data is not validated
        // a alert message is sent to the user   
        if (!validateFarmlandData(farmlandData, errors, setErrors)) {
            setErrorAlert(true)
            return;
        }
        // created the validated data object to be passed to the FarmlandModal component
        let retrievedFarmlandData = validateFarmlandData(farmlandData, errors, setErrors);
        // add farmerId property to the object
        // as it's being passed to FarmlandModal component
        retrievedFarmlandData['ownerId'] = ownerId;
        retrievedFarmlandData['flag'] = flag;
       
        setFarmlandData(retrievedFarmlandData);
        
        setModalVisible(true);
        // setFarmerType('');
    }
    
    useEffect(()=>{
        
    }, [alert])
    
    
    useEffect(()=>{
        
        
    }, [
        // appRealm, 
        ownerId
    ]
    )
    
    useEffect(()=>{
        setLoadingActivityIndicator(true);
    }, [navigation])
    
    
    // if (errorAlert) {
    //     return (
    //         <Center flex={1} px="3">
    //             <ErrorAlert errorAlert={errorAlert} setErrorAlert={setErrorAlert} />
    //         </Center>
    //     )
    // }
    
    return (
    <SafeAreaView 
      style={styles.container}
    >
      <ScrollView>
        <Box>
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
                title="Dados Obrigatórios"
                message="Os campos obrigatórios devem ser preenchidos!"
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
                            color: '#005000',  }}
                    >
                        Parcela
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
                    <FontAwesomeIcon icon={faTree} size={40} color="grey" />
                </Center>
            </Stack>
            <Text style={{
                fontSize: 16,
                fontFamily: 'JosefinSans-Regular',
                color: 'grey',
            }}>
                Proprietário: {ownerName}
            </Text>  
            </Box>
          </Box>
        </Box>
{
    loadingActivitiyIndicator && (
        <CustomActivityIndicator 
        loadingActivitiyIndicator={loadingActivitiyIndicator}
        setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
    )
}

    <Box px="3" my="6">
        <Box w="100%" alignItems="center">
            <Stack direction="row" mx="3" w="100%">
                <Box w="45%" px="1">

                </Box>
                <Box w="10%">
                    
                </Box>
                <Box w="45%" px="1">
                    <FormControl isRequired my="1" isInvalid={'plantingYear' in errors}>
                        <FormControl.Label>Ano de plantio</FormControl.Label>
                            <Select
                                selectedValue={plantingYear}
                                accessibilityLabel="Ano de plantio"
                                placeholder="Escolha o ano"
                                minHeight={55}
                                _selectedItem={{
                                    bg: 'teal.600',
                                    fontSize: 'lg',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                dropdownCloseIcon={plantingYear 
                                        ? <Icon 
                                            name="close" 
                                            size={25} 
                                            color="grey" 
                                            onPress={()=>setPlantingYear('')} 
                                        /> 
                                        : <Icon 
                                            size={40} 
                                            name="arrow-drop-down" 
                                            color="#005000" 
                                        />
                                    }
                                mt={1}
                                onValueChange={newYear => {
                                    setErrors((prev)=>({...prev, plantingYear: ''}));
                                    setPlantingYear(newYear);
                                }}
                            >
                                {
                                    getFullYears(100)?.map((year, index)=>(
                                        <Select.Item key={index} label={`${year}`} value={year} />
                                    ))
                                }
                            </Select>
                        {
                            'plantingYear' in errors 
                        ? <FormControl.ErrorMessage 
                        leftIcon={<Icon name="error-outline" size={16} color="red" />}
                        _text={{ fontSize: 'xs'}}>{errors?.plantingYear}</FormControl.ErrorMessage> 
                        : <FormControl.HelperText></FormControl.HelperText>
                        }
                    </FormControl>
                </Box>          
            </Stack>            


            <FormControl isRequired my="1" isInvalid={'description' in errors}>
                <FormControl.Label>Localização do Pomar</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
                    // autoCapitalize="words"
                    placeholder="Descrição da localização"
                    value={description}
                    onChangeText={newDescription=>{
                        setErrors(prev=>({...prev, description: ''}))
                        setDescription(newDescription)
                    }}
                    />
                {
                'description' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.description}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>

        {/* <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'description' in errors}>
                <FormControl.Label> Culturas consociadas</FormControl.Label>
                <SelectList
                  setSelected={(crop)=>setSelectedCrop(crop)}
                  data={crops}
                  save="value"
                />
                {
                    'description' in errors 
                    ? <FormControl.ErrorMessage 
                    leftIcon={<Icon name="error-outline" size={16} color="red" />}
                    _text={{ fontSize: 'xs'}}>{errors?.description}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
        </Box>  */}

        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'consociatedCrops' in errors}>
                <FormControl.Label>Culturas consociadas</FormControl.Label>
                <MultipleSelectList
                    setSelected={(crop)=>setConsociatedCrops(crop)}
                    data={crops}
                    save="value"
                    arrowicon={
                        <Icon 
                        size={40} 
                        name="arrow-drop-down" 
                        color="#005000" 
                        />
                    }
                    closeicon={
                        <Icon 
                        name="close" 
                        size={25} 
                        color="red" 
                        />
                    }
                    fontFamily='JosefinSans-Regular'
                    dropdownTextStyles={{
                        fontSize: 18,
                    }}
                    inputStyles={{
                        fontSize: 16,
                        color: '#A8A8A8',
                    }}
                    boxStyles={{
                        borderRadius: 4,
                        minHeight: 55,
                    }}
                    label="Culturas"
                    placeholder="Culturas consociadas"
                />
                {
                'consociatedCrops' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.consociatedCrops}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

        <Stack direction="row" mx="3" w="100%">
            <Box w="45%" px="1">
            <FormControl isRequired my="2" isInvalid={'trees' in errors}>
                <FormControl.Label>Cajueiros</FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    keyboardType="numeric"
                    textAlign="center"
                    // autoCapitalize="words"
                    placeholder="Número de cajueiros"
                    value={trees}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({...prev, trees: ''}))
                        setTrees(newNumber)
                    }}
                />
                    
                {
                    'trees' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.trees}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>

        <Box w="10%">

        </Box>
        <Box w="45%" px="1">
            <FormControl isRequired my="2" isInvalid={'declaredArea' in errors}>
                <FormControl.Label>Área declarada</FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    textAlign="center"
                    keyboardType="numeric"
                    // autoCapitalize="words"
                    placeholder="Área declarada"
                    value={declaredArea}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({...prev, declaredArea: ''}))
                        setDeclaredArea(newNumber)
                    }}
                />
                    
                {
                'declaredArea' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.declaredArea}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
            }
            </FormControl>
          </Box>
        </Stack>  

        <FormControl isRequired my="2" isInvalid={'densityMode' in errors}  >
            <FormControl.Label>Compasso</FormControl.Label>
                <Radio.Group
                    name="Density"
                    value={densityMode}
                    // defaultValue=""
                    onChange={(nextValue) => {
                        // setLoadingActivityIndicator(true) // trigger ActivityIndicator
                        setErrors(prev=>({...prev, densityMode: ''}))
                        setDensityMode(nextValue);
                    }}
                >
                <Stack 
                    direction={{
                        base: "row",
                        md: "row"
                    }} 
                    alignItems={{
                        base: "flex-start",
                        md: "flex-start"
                    }} 
                    space={10} 
                    w="100%" 
                    >
                    <Radio 
                        _text={{
                            fontFamily: 'JosefinSans-Bold',
                            color: 'grey'
                        }}
                        value="Regular" my="1" mx="1" colorScheme="emerald" size="sm">
                        Regular
                    </Radio>
                    <Box w="10%">
                
                    </Box>
                    <Radio 
                        _text={{
                            fontFamily: 'JosefinSans-Bold',
                            color: 'Irregular'
                        }}
                        value="Irregular" my="1" mx="1" colorScheme="emerald" size="sm">
                        Irregular
                    </Radio>
                </Stack>
            </Radio.Group>
                {
                    'densityMode' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.densityMode}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }    
            </FormControl> 


    { densityMode === "Regular" && (
    
    <Stack direction="row" mx="3" w="100%">
        <Box w="45%" px="1">
            <FormControl my="1">
                <FormControl.Label>Comprimento</FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    textAlign="center"
                    keyboardType="numeric"
                    // autoCapitalize="words"
                    placeholder="Comprimento"
                    value={densityLength}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({...prev, densityMode: ''}))
                        setDensityLength(newNumber)
                    }}
                    />
                    
                {
                    'densityLength' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.densityLength}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
        </Box>
        <Box w="10%" 
            style={{
                justifyContent: 'center', 
                alignItems: 'center',
                paddingTop: 30,
            }}
            >
            <Text 
                style={{ 
                    fontSize: 20,
                }}
            >
                X
            </Text>
        </Box>
        <Box w="45%" px="1">
        <FormControl my="1">
            <FormControl.Label>Largura</FormControl.Label>
            <CustomInput
                width="100%"
                // type="text"
                keyboardType="numeric"
                textAlign="center"
                // autoCapitalize="words"
                placeholder="Largura"
                value={densityWidth}
                onChangeText={newNumber=>{
                    setErrors(prev=>({...prev, densityMode: ''}))
                    setDensityWidth(newNumber)
                }}
            />
                
            {
                'densityWidth' in errors 
            ? <FormControl.ErrorMessage 
            leftIcon={<Icon name="error-outline" size={16} color="red" />}
            _text={{ fontSize: 'xs'}}>{errors?.densityWidth}</FormControl.ErrorMessage> 
            : <FormControl.HelperText></FormControl.HelperText>
            }
        </FormControl> 
        </Box>
    </Stack>            
)}
            <FormControl isRequired my="1" isInvalid={'plantTypes' in errors}>
                <FormControl.Label>Tipo de plantas</FormControl.Label>
                <MultipleSelectList
                  setSelected={(type)=>{
                      setErrors(prev=>({...prev, plantTypes: ''}))
                      setPlantTypes(type)}
                    }
                  data={plantingTypes}
                  placeholder="Tipo de plantas"
                  save="value"
                  label="Tipo de plantas"
                    arrowicon={
                        <Icon 
                            size={40} 
                            name="arrow-drop-down" 
                            color="#005000" 
                            />
                        }
                        closeicon={
                            <Icon 
                            name="close" 
                            size={25} 
                            color="red" 
                            />
                    }
                    fontFamily='JosefinSans-Regular'
                    dropdownTextStyles={{
                        fontSize: 18,
                    }}
                    inputStyles={{
                        fontSize: 16,
                        color: '#A8A8A8',
                    }}
                    boxStyles={{
                        borderRadius: 4,
                        minHeight: 55,
                    }}
                    />
                {
                    'plantTypes' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.plantTypes}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>


{   plantTypes.some((el)=>el.includes('enxert')) 
    && (

        <FormControl my="1" >
                <FormControl.Label>Clones</FormControl.Label>
                <MultipleSelectList
                  setSelected={(type)=>{
                      setErrors(prev=>({...prev, clones: ''}))
                      setClones(type)}
                    }
                  data={cloneList}
                  placeholder="clones"
                  save="value"
                  label="Clones"
                    arrowicon={
                        <Icon 
                            size={40} 
                            name="arrow-drop-down" 
                            color="#005000" 
                        />
                    }
                    closeicon={
                        <Icon 
                        name="close" 
                        size={25} 
                            color="red" 
                            />
                        }
                        fontFamily='JosefinSans-Regular'
                    dropdownTextStyles={{
                        fontSize: 18,
                    }}
                    inputStyles={{
                        fontSize: 16,
                        color: '#A8A8A8',
                    }}
                    boxStyles={{
                        borderRadius: 4,
                        minHeight: 55,
                    }}
                    />
                
                    {/* 'clones' in errors  */}
                {/* ? <FormControl.ErrorMessage  */}
                 {/* leftIcon={<Icon name="error-outline" size={16} color="red" />}
                 _text={{ fontSize: 'xs'}}>
                     {errors?.clones}
                     </FormControl.ErrorMessage>  */}
                <FormControl.HelperText></FormControl.HelperText>
                
            </FormControl>
    )        
    }

    </Box> 
    <Center w="100%" py="4"> 
        <Button
            // loading={loadinButton ? true : false}
            type="outline"
            title="Pré-visualizar dados"
            containerStyle={{
                width: '100%',
            }}
            onPress={()=>{
                setLoadingButton(true);
                visualizeFarmland();
            }}
        />
    </Center>
        <FarmlandModal 
            farmlandData={farmlandData}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            
            setClones={setClones}
            setDescription={setDescription}
            setDensityMode={setDensityMode}
            setDensityWidth={setDensityWidth}
            setDensityLength={setDensityLength}
            setConsociatedCrops={setConsociatedCrops}
            setPlantTypes={setPlantTypes}
            setPlantingYear={setPlantingYear}
            setTrees={setTrees}
            setDeclaredArea={setDeclaredArea}

            setFarmlandId={setFarmlandId}
            setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}
            
            />
      </Box>
      <Box>
        <SuccessAlert
            isCoordinatesModalVisible={isCoordinatesModalVisible}
            setIsCoordinatesModalVisible={setIsCoordinatesModalVisible}
            farmlandId={farmlandId}
            flag={'farmland'}
            
        />
      </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FarmlandForm1Screen