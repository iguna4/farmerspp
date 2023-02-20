
import { Text, ScrollView, SafeAreaView,   } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Button } from '@rneui/themed';
import { Box, FormControl, Stack, Select, CheckIcon, Center, Radio  } from 'native-base';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import AwesomeAlert from 'react-native-awesome-alerts';

import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import styles from './styles';
import { CustomInput } from '../../components/Inputs/CustomInput';
import { crops } from '../../consts/crops';
import cloneList from '../../consts/clones';
import { getFullYears } from '../../helpers/dates';
import { plantingTypes } from '../../consts/plantingTypes';
import FarmlandModal from '../../components/Modals/FarmlandModal'
import validateFarmlandData from '../../helpers/validateFarmlandData';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import COLORS from '../../consts/colors';


export default function FarmlandRegistration ({ route, navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isCoordinatesModalVisible, setIsCoordinatesModalVisible] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    const [errors, setErrors] = useState({});
    const [consociatedCrops, setConsociatedCrops] = useState([]);
    const [description, setDescription] = useState('');
    const [plantingYear, setPlantingYear] = useState('');
    const [trees, setTrees] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [usedArea, setUsedArea] = useState('');
    const [densityWidth, setDensityWidth] = useState('');
    const [densityLength, setDensityLength] = useState('');
    const [plantTypes, setPlantTypes] = useState([]);
    const [clones, setClones] = useState([]);
    const [densityMode, setDensityMode] = useState('');
    
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
            totalArea,
            usedArea,
            trees,
            densityMode,
            densityLength,
            densityWidth,
            plantTypes,
            clones,
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
    }
    
    useEffect(()=>{
        
    }, [alert, ownerId])
    
    
    useEffect(()=>{
        setLoadingActivityIndicator(true);
    }, [navigation])
    
    
    return (
    <SafeAreaView 
      style={styles.container}
    >
      <ScrollView>
        <Box>
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
                confirmText="   OK!   "
                confirmButtonColor="#DD6B55"
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
                            color: COLORS.main,  }}
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
                                            color={COLORS.main} 
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

        <Box w="100%" alignItems="center">
            <FormControl my="1" isRequired isInvalid={'consociatedCrops' in errors}>
                <FormControl.Label>Culturas consociadas</FormControl.Label>
                <MultipleSelectList
                    setSelected={(crop)=>{
                        setErrors(prev=>({...prev, consociatedCrops: ''}));
                        setConsociatedCrops(crop);
                    }}
                    data={crops}
                    save="value"
                    arrowicon={
                        <Icon 
                        size={40} 
                        name="arrow-drop-down" 
                        color={COLORS.main} 
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
                leftIcon={<Icon name="error-outline" size={14} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.consociatedCrops}</FormControl.ErrorMessage> 
                : 
                <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>

            <Box
                style={{
                    // alignItems: 'left',
                }}
            >
                <Text style={{
                    textAlign: 'left',
                    fontSize: 16,
                    fontFamily: 'JosefinSans-Bold',
                    color: COLORS.main,
                }}>
                    Área Declarada
                </Text>
            </Box>

            <Stack direction="row" mx="3" w="100%">
            <Box w="32%" px="1">
            <FormControl isRequired my="2" isInvalid={'totalArea' in errors}>
                <FormControl.Label>Total (ha)</FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    keyboardType="numeric"
                    textAlign="center"
                    // autoCapitalize="words"
                    placeholder="Hectares"
                    value={totalArea}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({...prev, totalArea: ''}))
                        setTotalArea(newNumber)
                    }}
                />
                    
                {
                    'totalArea' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.totalArea}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>


            <Box w="2%" px="1">

            </Box>

            <Box w="32%" px="1">
            <FormControl isRequired my="2" isInvalid={'usedArea' in errors}>
                <FormControl.Label>Aproveitada (ha) </FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    keyboardType="numeric"
                    textAlign="center"
                    // autoCapitalize="words"
                    placeholder="Hectares"
                    value={usedArea}
                    onChangeText={newNumber=>{
                        setErrors(prev=>({...prev, usedArea: ''}))
                        setUsedArea(newNumber)
                    }}
                />
                    
                {
                    'usedArea' in errors 
                ? <FormControl.ErrorMessage 
                leftIcon={<Icon name="error-outline" size={16} color="red" />}
                _text={{ fontSize: 'xs'}}>{errors?.usedArea}</FormControl.ErrorMessage> 
                : <FormControl.HelperText></FormControl.HelperText>
                }
            </FormControl>
            </Box>


            <Box w="2%" px="1">

            </Box>

            <Box w="32%" px="1">
            <FormControl isRequired my="2" isInvalid={'trees' in errors}>
                <FormControl.Label>N° de Cajueiros</FormControl.Label>
                <CustomInput
                    width="100%"
                    // type="text"
                    keyboardType="numeric"
                    textAlign="center"
                    // autoCapitalize="words"
                    placeholder="Cajueiros"
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
                            color={COLORS.main} 
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

        <FormControl my="1" isRequired isInvalid={'clones' in errors} >
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
                            color={COLORS.main} 
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
    <Center w="100%" py="4"> 
        <Button
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
            // setDeclaredArea={setDeclaredArea}
            setUsedArea={setUsedArea}
            setTotalArea={setTotalArea}

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
