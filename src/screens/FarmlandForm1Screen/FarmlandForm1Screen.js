
// import {  } from 'react-native-safe-area-context';
import { View, Text, ScrollView, SafeAreaView,   } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Button, CheckBox } from '@rneui/themed';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio, Alert  } from 'native-base';
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';


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
const { useRealm, useQuery } = realmContext; 

// const { useRealm, useObject } = AppContext;

const FarmlandForm1Screen = ({ route, navigation }) => {
    // handle modal view
    const [modalVisible, setModalVisible] = useState(false);

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
    const [alert, setAlert] = useState(false);


    const [farmlandData, setFarmlandData] = useState({});

    const farmerId = route.params?.farmerId;

    const realm = useRealm();

    // get user from realm
    const farmer = realm.objectForPrimaryKey('Farmer', farmerId);
 
    // loading activity indicator
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);


    
    // function called onSubmitting form data
    const addFarmland = ()=>{
        
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
            farmer,
           }
        if (!validateFarmlandData(farmlandData, errors, setErrors)) {
            setAlert(true)
            return;
        }
        let retrievedFarmlandData = validateFarmlandData(farmlandData, errors, setErrors);
           
       
        setFarmlandData(retrievedFarmlandData);
        setModalVisible(true);
        // setFarmerType('');
    }
    
    useEffect(()=>{
        
    }, [alert])
    
    
    useEffect(()=>{
        
        
    }, [
        // appRealm, 
        farmerId
    ]
    )
    
    useEffect(()=>{
        setLoadingActivityIndicator(true);
    }, [navigation])
    
    
    if (loadingActivitiyIndicator) {
        return <CustomActivityIndicator 
        loadingActivitiyIndicator={loadingActivitiyIndicator}
        setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
    }
    
    
    if (alert) {
        return (
            <Center flex={1} px="3">
                <ErrorAlert alert={alert} setAlert={setAlert} />
            </Center>
        )
    }
    
    
    
    return (
    <SafeAreaView 
      style={styles.container}
    >
      <ScrollView>
        <Box>
          <Box bg="#005000" w="100%" px="3">
              <Text style={styles.headerText}>
                  Registo de Parcela
              </Text>          
              <Text style={styles.description}>
                Produtor: {farmer?.names?.otherNames + ' ' + farmer?.names?.surname}
              </Text>  
          </Box>
        </Box>
        
    {/* { alert && (<ErrorAlert alert={alert} setAlert={setAlert} />)} */}
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
                                _selectedItem={{
                                    bg: 'teal.600',
                                    fontSize: 'lg',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                dropdownCloseIcon={plantingYear 
                                        ? <Icon 
                                            name="close" 
                                            size={25} 
                                            color="red" 
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
                  // onSelect={()=>alert(selectedCrops)}
                  // fontFamily='JosefinSans-Regular'
                  label="Culturas"
                  boxStyle={{
                    borderRadius: 10,
                  }}
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

<FormControl isRequired my="2" 
    isInvalid={'densityMode' in errors}
    >
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
                  boxStyle={{
                    borderRadius: 10,
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


{   plantTypes.some((el)=>el.includes('mudas')) 
    && (

        <FormControl isRequired my="1" isInvalid={'clones' in errors}>
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
                  boxStyle={{
                    borderRadius: 10,
                  }}
                />
                {
                'clones' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.clones}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
    )        
    }

    </Box> 
    <Box w="100%" py="4"> 
        <Button
            title="Pré-visualizar dados"
            onPress={addFarmland}
        />
    </Box>
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
        
        />
      </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FarmlandForm1Screen