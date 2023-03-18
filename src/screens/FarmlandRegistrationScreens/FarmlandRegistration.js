
import { Text, ScrollView, SafeAreaView, TouchableOpacity, Pressable,  } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Icon, Button, CheckBox } from '@rneui/themed';
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
import validateFarmlandMainData from '../../helpers/validateFarmlandMainData';
import { assetTypes } from '../../consts/assetTypes';

import { v4 as uuidv4 } from 'uuid';

import { categorizeFarmer } from '../../helpers/categorizeFarmer';
import FarmlandBlockRegistration from '../../components/FarmlandBlockRegistration/FarmlandBlockRegistration';
import categories from '../../consts/categories';
import validateBlockData from '../../helpers/validateBlockData';
import CustomDivider from '../../components/Divider/CustomDivider';
import { normalizeBlockList } from '../../helpers/normalizeBlockList';


import { useUser } from '@realm/react';
import { realmContext } from '../../models/realmContext';
import { errorMessages } from '../../consts/errorMessages';
import { resourceValidation } from '../../consts/resourceValidation';
const {useRealm, useQuery, useObject} = realmContext;


const farmlandResourceMessage = 'farmlandResourceMessage';

export default function FarmlandRegistration ({ route, navigation }) {
    
    const realm = useRealm();
    const user = useUser()
    const customUserData = user?.customData;
    const [farmlandId, setFarmlandId] = useState('');
    // const [farmlandMainData, setFarmlandMainData] = useState({ });

    const currentUserStat = useQuery('UserStat').filtered("userId == $0", customUserData?.userId)[0];
    const farmland = realm.objectForPrimaryKey('Farmland', farmlandId);

    // extract farmland owner id, name from the previous screen
    const { ownerId, ownerName, flag } = route.params;
    
    // go back to the previous screen
    // if farmerId is undefined
    if (!ownerId || !flag) {
        navigation.goBack();
        return ;
    }
    

    const [isCoordinatesModalVisible, setIsCoordinatesModalVisible] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    const [consociatedCrops, setConsociatedCrops] = useState([]);
    const [description, setDescription] = useState('');
    const [plantingYear, setPlantingYear] = useState('');
    const [trees, setTrees] = useState('');
    const [blockTrees, setBlockTrees] = useState('');
    
    const [totalArea, setTotalArea] = useState('');
    const [totalTrees, setTotalTrees] = useState('');
    const [usedArea, setUsedArea] = useState('');
    const [densityWidth, setDensityWidth] = useState('');
    const [densityLength, setDensityLength] = useState('');
    const [plantTypes, setPlantTypes] = useState([]);
    const [clones, setClones] = useState([]);
    const [isDensityModeIrregular, setIsDensityModeIrregular] = useState(false);
    const [isDensityModeRegular, setIsDensityModeRegular] = useState(false);
    const [sameTypeTreesList, setSameTypeTreesList] = useState([]);
    
    const [errorAlert, setErrorAlert] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [isDeleteBlockOn, setIsDeleteBlockOn] = useState(false)
    
    // count all blocks associated to the farmland
    const [blockCount, setBlockCount] = useState(0);
    
    
    const [treesFlag, setTreesFlag] = useState(0);
    const [areaFlag, setAreaFlag] = useState(0);

    // const [blocks, setBlocks] = useState([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);


    // loading activity indicator
    const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);

    
    
    // ------------------------------------------
    const [alert, setAlert] = useState(false);

    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    const [logFlag, setLogFlag] = useState('');
    const [invalidationMessage, setInvalidationMessage] = useState('');

    const [errors, setErrors] = useState({});
    
    // // ---------------------------------------------




    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
      };
      
    const visualizeBlockData = ( )=>{

        let blockData = {
            plantingYear, 
            usedArea, 
            densityWidth,
            densityLength,
            blockTrees,
            plantTypes,
            clones,
            isDensityModeIrregular,
            isDensityModeRegular,
            sameTypeTreesList,
        }
        // if any required data is not validated
        // a alert message is sent to the user   
        if (!validateBlockData(blockData, errors, setErrors)) {
            setAlert(true);

            setTitleAlert(errorMessages.farmlandError.title);
            setMessageAlert(errorMessages.farmlandError.message);
            setShowCancelButton(errorMessages.farmlandError.showCancelButton);
            setShowConfirmButton(errorMessages.farmlandError.showConfirmButton);
            setCancelText(errorMessages.farmlandError.cancelText);
            setConfirmText(errorMessages.farmlandError.confirmText);
            return;
        }
        // created the validated data object to be passed to the FarmlandModal component
        let retrievedBlockData = validateBlockData(blockData, errors, setErrors);

        const block = {
            _id: uuidv4(),
            plantingYear: retrievedBlockData?.plantingYear,
            density:  retrievedBlockData?.density,
            trees: retrievedBlockData?.trees,
            usedArea: Number(retrievedBlockData?.usedArea.toFixed(2)),
            sameTypeTrees: retrievedBlockData?.sameTypeTrees,
            plantTypes: retrievedBlockData?.plantTypes,
            userName: customUserData?.name,
            createdAt: new Date(),
            modifiedAt: new Date(),
        }
      
        onAddBlock(block, farmlandId, realm);

        turnOffOverlay();
    }


    const invalidateFarmland = useCallback((farmlandId, invalidationMessage, realm)=>{

        const foundFarmland = realm.objectForPrimaryKey('Farmland', farmlandId);
        
        realm.write(()=>{
            if (foundFarmland){
                foundFarmland.status = resourceValidation.status.invalidated;
                foundFarmland.checkedBy = customUserData?.name;
            }
        });

        try {
            addInvalidationMessage(farmlandId, invalidationMessage,  realm);
        } catch (error) {
            console.log('could not add invalidation message:', { cause: error});
        }


    }, [realm, farmlandId]);

    const addInvalidationMessage = useCallback((farmlandId, message, realm)=>{

        const newMessageObject = {
            position: 0,
            message: message,
            ownerName: customUserData?.name,
            createdAt: new Date(),
        };
        
        realm.write(async ()=>{
            const newResourceMessage = await realm.create('InvalidationMotive', {
                _id: uuidv4(),
                resourceId: farmlandId,
                resourceName: 'Farmland',
                messages: [newMessageObject],  
                createdAt: new Date(),
            });
        });
        
    }, [ realm, farmlandId ]);


    useEffect(()=>{
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.removeByName(farmlandResourceMessage);
            mutableSubs.add(
              realm.objects('InvalidationMotive').filtered(`resourceId == "${farmlandId}"`),
              {name: farmlandResourceMessage},
            );
          });
        
    }, [ realm, farmlandId ]);


    const deleteBlock = useCallback((farmlandId, realm)=>{

        const foundFarmland = realm.objectForPrimaryKey('Farmland', farmlandId);
        
        realm.write(()=>{

            foundFarmland.blocks.pop();

            setRefresh(!refresh);

        });

    }, [realm, farmlandId, farmland]);

    const checkBlockConformity = (farmlandId, realm) =>{

        const farmland = realm.objectForPrimaryKey('Farmland', farmlandId);

        const blocksTrees = farmland?.blocks?.map(block=>parseInt(block?.trees))?.reduce((acc, el)=>acc + el, 0);
        const blocksAreas =  farmland?.blocks?.map(block=>parseFloat(block?.usedArea))?.reduce((acc, el)=>acc + el, 0);
        const totalArea = Number(farmland?.totalArea.toFixed(2));
        const totalTrees = parseInt(farmland?.trees);
        if ((blocksTrees === 0 && totalTrees > 0) && (blocksAreas === 0 && totalArea > 0)) {

            setAlert(true);
            setTitleAlert(errorMessages.farmlandWithNoBlockError.title);
            setMessageAlert(errorMessages.farmlandWithNoBlockError.message);
            setShowCancelButton(errorMessages.farmlandWithNoBlockError.showCancelButton);
            setShowConfirmButton(errorMessages.farmlandWithNoBlockError.showConfirmButton);
            setCancelText(errorMessages.farmlandWithNoBlockError.cancelText);
            setConfirmText(errorMessages.farmlandWithNoBlockError.confirmText);
            setLogFlag(errorMessages.farmlandWithNoBlockError.logFlag)
            setInvalidationMessage(errorMessages.farmlandWithNoBlockError.invalidationMessage)

            return false;            
        }  
        else  if ((blocksTrees > 0) && (blocksTrees !== totalTrees )){
            setAlert(true);
            setTitleAlert(errorMessages.blockTreesConformityError.title);
            setMessageAlert(errorMessages.blockTreesConformityError.message);
            setShowCancelButton(errorMessages.blockTreesConformityError.showCancelButton);
            setShowConfirmButton(errorMessages.blockTreesConformityError.showConfirmButton);
            setCancelText(errorMessages.blockTreesConformityError.cancelText);
            setConfirmText(errorMessages.blockTreesConformityError.confirmText);
            setLogFlag(errorMessages.blockTreesConformityError.logFlag)
            setInvalidationMessage(errorMessages.blockTreesConformityError.invalidationMessage)

            return false;
        }
        if (blocksAreas > totalArea){
            setAlert(true);
            setTitleAlert(errorMessages.blockAreaConformityError.title);
            setMessageAlert(errorMessages.blockAreaConformityError.message);
            setShowCancelButton(errorMessages.blockAreaConformityError.showCancelButton);
            setShowConfirmButton(errorMessages.blockAreaConformityError.showConfirmButton);
            setCancelText(errorMessages.blockAreaConformityError.cancelText);
            setConfirmText(errorMessages.blockAreaConformityError.confirmText);
            setLogFlag(errorMessages.blockAreaConformityError.logFlag);
            setInvalidationMessage(errorMessages.blockAreaConformityError.invalidationMessage)

            return false;
        }
        return true;

    };


    useEffect(()=>{
        if (isDeleteBlockOn) {
            deleteBlock(farmlandId, realm);
            setIsDeleteBlockOn(false);
        }
    }, [ isDeleteBlockOn ])

    const turnOffOverlay = ()=>{

        setPlantingYear('');
        setUsedArea('');
        setBlockTrees('');
        setClones([]);
        setPlantTypes([]);
        setDensityLength('');
        setDensityWidth('');
        setIsDensityModeIrregular(false);
        setIsDensityModeRegular(false);
        
        setIsOverlayVisible(false);
    }

    const onAddBlock = useCallback((block, farmlandId, realm) =>{

        const farmland = realm.objectForPrimaryKey('Farmland', farmlandId);
        realm.write(()=>{
            farmland?.blocks?.push(block);
            if (farmland?.trees === farmland?.blocks?.map(block=>block.trees)?.reduce((acc, el)=>acc + el,0)){
                farmland.status = resourceValidation.status.pending;
            }

            setBlockCount(prev=>prev+1);

        })
        setRefresh(!refresh)
    }, [realm, farmland, farmlandId ]);

    
    const visualizeFarmlandMainData = (  

        )=>{

        let farmlandMainData = {
            description, 
            consociatedCrops, 
            totalArea,
            trees,
        }
        // if any required data is not validated
        // a alert message is sent to the user   
        if (!validateFarmlandMainData(farmlandMainData, errors, setErrors)) {
            setAlert(true)
            setTitleAlert(errorMessages.farmlandError.title);
            setMessageAlert(errorMessages.farmlandError.message);
            setShowCancelButton(errorMessages.farmlandError.showCancelButton);
            setShowConfirmButton(errorMessages.farmlandError.showConfirmButton);
            setCancelText(errorMessages.farmlandError.cancelText);
            setConfirmText(errorMessages.farmlandError.confirmText);

            return;
        }
        // created the validated data object to be passed to the FarmlandModal component
        let retrievedFarmlandMainData = validateFarmlandMainData(farmlandMainData, errors, setErrors);
       
        onAddFarmland(retrievedFarmlandMainData, realm);
    }



    const onAddFarmland = useCallback((farmlandMainData, realm) =>{
        const {
            description,
            consociatedCrops,
            trees,
            totalArea,
        } = farmlandMainData;
    
        if (!ownerId) {
            return {
                status: 'FAILED',
                code: 404,
                message: 'Indica o proprietário desta parcela!',
            };
        }
    
    
        let owner;
        let ownerType;
        if (flag === 'Indivíduo'){
            owner = realm.objectForPrimaryKey('Actor', ownerId);
            ownerType = 'Single';
        }
        else if (flag === 'Grupo') {
            owner = realm.objectForPrimaryKey('Group', ownerId);
            ownerType = 'Group';
        }
        else if (flag === 'Instituição'){
            owner = realm.objectForPrimaryKey('Institution', ownerId);
            ownerType = 'Institution';

        }
    
        if (!owner) {
            return {
                status: 'FAILED',
                code: 404,
                message: 'O proprietário desta parcela ainda não foi registado!',
            };
        }
    
        let newFarmland;
    
        realm.write( async ()=>{
            newFarmland = await realm.create('Farmland', {
                _id: uuidv4(),
                description,
                consociatedCrops,
                trees,
                totalArea: Number(totalArea.toFixed(2)),
                farmerId: owner._id,
                userDistrict: customUserData?.userDistrict,
                userProvince: customUserData?.userProvince,
                userId: customUserData?.userId,
                userName: customUserData?.name,
                status: resourceValidation.status.invalidated,
                ownerType,
            });

            // convert realm object to JS object
            const farmlandObject = {
                ...newFarmland,
            }
    
            // set the farmlandId
            setFarmlandId(newFarmland._id);

            // setFarmland(farmlandObject);
        });
    
        if (flag === 'Indivíduo'){  
            // categorize by 'comercial' | 'familiar' | 'nao-categorizado'
            const ownerFarmlands = realm.objects('Farmland').filtered('farmerId == $0', owner._id)
            const subcategory = categorizeFarmer(ownerFarmlands);
            let farmlandIds = ownerFarmlands?.map((farmland)=>farmland._id);
            
            realm.write(()=>{
                let isAssetUpdated = false;
                for (let i = 0; i < owner?.assets?.length; i++) {
                    if (owner.assets[i].assetType === 'Pomar'){
                        owner.assets[i].subcategory = subcategory;
                        owner.assets[i].assets = farmlandIds;

                        // asset is updated
                        isAssetUpdated = true;
                    }
                }
                // create assets if not found
                if (!isAssetUpdated) {
                    const asset = {
                        assetType: assetTypes.farmland,
                        category: categories.farmer.category,
                        subcategory: subcategory,
                        assets: farmlandIds,
                    }
                    owner.assets = [asset]; // add new asset
                }
            });
        }  
        else if(flag === 'Grupo') {

            const ownerFarmlands = realm.objects('Farmland').filtered('farmerId == $0', owner._id)
            let farmlandIds = ownerFarmlands?.map((farmland)=>farmland._id);
            
            realm.write(()=>{
                let isAssetUpdated = false;
                for (let i = 0; i < owner?.assets?.length; i++) {
                    if (owner.assets[i].assetType === assetTypes.farmland){
                        owner.assets[i].subcategory = categories.group.subcategories.production;
                        owner.assets[i].assets = farmlandIds;

                        // asset is updated
                        isAssetUpdated = true;
                    }
                }
                // create assets if not found
                if (!isAssetUpdated) {
                    const asset = {
                        assetType: assetTypes.farmland,
                        category: categories.group.category,
                        subcategory: categories.group.subcategories.production,
                        assets: farmlandIds,
                    }
                    owner.assets = [asset]; // add new asset
                }
            });

        }   
        else if (flag === 'Instituição') {
            const ownerFarmlands = realm.objects('Farmland').filtered('farmerId == $0', owner._id)
            let farmlandIds = ownerFarmlands?.map((farmland)=>farmland._id);
            
            realm.write(()=>{
                let isAssetUpdated = false;
                for (let i = 0; i < owner?.assets?.length; i++) {
                    if (owner.assets[i].assetType === assetTypes.farmland){
                        owner.assets[i].subcategory = categories.institution.subcategories.production
                        owner.assets[i].assets = farmlandIds;

                        // asset is updated
                        isAssetUpdated = true;
                    }
                }
                // create assets if not found
                if (!isAssetUpdated) {
                    const asset = {
                        assetType: assetTypes.farmland,
                        category: categories.institution.category,
                        subcategory: categories.institution.subcategories.production,
                        assets: farmlandIds,
                    }

                    owner.assets = [asset]; // add new asset
                }
            });
        }  
    
        // update user stat (1 more farmland registered by the user)
        if(currentUserStat) {
            realm.write(()=>{
                currentUserStat.registeredFarmlands = currentUserStat.registeredFarmlands + 1; 
            })
        } 
        else {
            realm.write(()=>{
                const newStat = realm.create('UserStat', {
                    _id: uuidv4(),
                    userName: customUserData.name,
                    userId: customUserData.userId,
                    userDistrict: customUserData.userDistrict,
                    userProvince: customUserData.userProvince,
                    userRole: customUserData.role,
                    registeredFarmlands: 1,
                });
            })
        }    
        
    }, [ realm, farmland ]);

    
    useEffect(()=>{
        
    }, [ ownerId, farmlandId, ]);
    
    
    useEffect(()=>{
        setLoadingActivityIndicator(true);
    }, [navigation]);

   
    return (
    <SafeAreaView 
      style={styles.container}
    >
        <AwesomeAlert
            show={errorAlert}
            showProgress={false}
            title="Dados Obrigatórios"
            message="Os campos obrigatórios devem ser BEM preenchidos!"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="   OK!   "
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
                setErrorAlert(false);
            }}
        />


<AwesomeAlert
        show={alert}
        
        titleStyle={{
            fontSize: 18,
            // paddingVertical: 5,
            // color: COLORS.ghostwhite,
            fontWeight: 'bold',
            marginBottom: 5,
            // backgroundColor: COLORS.mediumseagreen,
            width: '100%',
            textAlign: 'center',

        }}
        messageStyle={{
            fontSize: 18,
            color: COLORS.grey,
            fontFamily: 'JosefinSans-Regular',
            lineHeight: 25,
            textAlign: 'center',
        }}

        alertContainerStyle	={{
            // width: 300,
            }}

        overlayStyle={{
            // width: 100,

        }}

        contentContainerStyle={{
            // width: '90%',
            minHeight: '30%',
        }}

        contentStyle={{
            // flex: 1,
            // paddingVertical: 1,
        }}

        cancelButtonStyle={{
            // width: 120,
            marginRight: 15,
            }}
    
            cancelButtonTextStyle={{
                fontSize: 18,
                textAlign: 'center',
            //   fontWeight: 'bold',
                fontFamily: 'JosefinSans-Bold',
            }}
    
            confirmButtonStyle={{
            // width: 120,
            marginLeft: 15,
            }}
    
            confirmButtonTextStyle={{
            fontSize: 18,
            textAlign: 'center',
            //   fontWeight: 'bold',
            fontFamily: 'JosefinSans-Bold',
            }}

            showProgress={false}
            title={titleAlert}
            message={messageAlert}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelText={cancelText}
            confirmText={confirmText}
            cancelButtonColor={COLORS.main}
            confirmButtonColor={(logFlag?.includes('inconsistencies') || logFlag?.includes('no blocks') ) ? COLORS.danger : COLORS.danger}
            onCancelPressed={()=>{
                setAlert(false);
            }}
            onConfirmPressed={() => {
                if (logFlag?.includes('inconsistencies') || logFlag?.includes('no blocks')){
                    try {
                        invalidateFarmland(farmlandId, invalidationMessage, realm);
                        
                        navigation.goBack();
                    }
                    catch(error){
                        console.log('could not finish invalidation task: ', { cause: error });
                    }
                }
                setAlert(false);
            }}
        />



      <ScrollView>
          <Box 
                bg="#EBEBE4" 
                w="100%" 
        
                style={{
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomWidth: 2,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderColor: '#EBEBE4',
                    paddingHorizontal: 5,
                    paddingBottom: 15,
                    }}
            >
            <Stack direction="row">
            <Box >

            <Pressable
                        onPress={()=>{
                            if (farmlandId ){
                                if(checkBlockConformity(farmlandId, realm)){
                                    setIsCoordinatesModalVisible(true)
                                }
                            }
                            else {
                                navigation.goBack();
                            }   
                        }}   
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                flexDirection: 'row',
                                // justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                        <Icon 
                            name="arrow-back-ios" 
                            color={COLORS.main}
                            size={25}
                            // onPress={()=>{}}
                        /> 
                        <Text
                            style={{
                                color: COLORS.main,
                                fontFamily: 'JosefinSans-Bold',
                                marginLeft: -10,
                            }}
                        >
                            Voltar
                        </Text>
                        </Pressable>

                    {/* <Icon 
                        onPress={()=>{
                            if (farmlandId ){
                                if(checkBlockConformity(farmlandId, realm)){
                                    setIsCoordinatesModalVisible(true)
                                }
                            }
                            else {
                                navigation.goBack();
                            }   
                        }}
                        name="arrow-back-ios" 
                        color={COLORS.main}
                        size={35}
                    /> */}
                </Box>
                <Box w="100%" alignItems={'center'} >
                    <Text 
                        style={{ 
                            textAlign: 'center', 
                            fontFamily: 'JosefinSans-Bold', 
                            fontSize: 16, 
                            color: COLORS.main,  }}
                    >
                        Pomar
                    </Text>
                </Box>
            </Stack>
            <Stack direction="row" mt="2" >
                <Box w="5%"></Box>
                <Box w="80%" 
                >
                    <Text style={styles.headerText}>
                        Registo
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Regular',
                        color: 'grey',
                    }}>
                        Proprietário: {ownerName}
                    </Text>  
                </Box>
                <Center w="15%">
                    <FontAwesomeIcon icon={faTree} size={35} color="grey" />
                </Center>
                <Box w="5%"></Box>
            </Stack>
          </Box>
{
    loadingActivitiyIndicator && (
        <CustomActivityIndicator 
        loadingActivitiyIndicator={loadingActivitiyIndicator}
        setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
    )
}

{ 

(!farmland) &&

 <Box px="3" my="6">
        <Box w="100%" alignItems="center">
            <FormControl isRequired my="1" isInvalid={'description' in errors}>
                <FormControl.Label>Localização do Pomar</FormControl.Label>
                <CustomInput
                    width="100%"
                    type="text"
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
                        size={45} 
                        name="arrow-drop-down" 
                        color={COLORS.main} 
                        />
                    }
                    closeicon={
                        <Icon 
                        name="close" 
                        size={20} 
                        color={COLORS.grey}
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

            }}
        >
        <Stack direction="row" w="100%" space={2}>
            <Box w="48%">
            <FormControl isRequired my="2" isInvalid={'totalArea' in errors}>
                <FormControl.Label>Área Total Declarada</FormControl.Label>
                <CustomInput
                    width="100%"
                    keyboardType="numeric"
                    textAlign="center"
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

        <Box w="48%"
            style={{
                justifyContent: 'flex-end'
            }}
        >
        <FormControl isRequired my="2" isInvalid={'trees' in errors}>
            <FormControl.Label>N° Total de Cajueiros</FormControl.Label>
            <CustomInput
                width="100%"
                keyboardType="numeric"
                textAlign="center"
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
        </Box>
    </Box>
    </Box>
</Box>
}


{
   (farmland) && 
    <>
    <Box
        style={{
            // padding: 10,
            margin: 10,
            borderBottomWidth: 2,
            borderBottomColor: COLORS.main,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginBottom: 40,

        }}    
    >


<Box w="100%"
        style={{
            backgroundColor: COLORS.main,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            position: 'relative',
            top: -5,
            left: 0,
        }}
    >

        <Text
            style={{
                color: COLORS.ghostwhite,
                fontSize: 18,
                fontFamily: 'JosefinSans-Bold',
                textAlign: 'center',
                
            }}
        >{ownerName}</Text>

        <Box
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                borderWidth: 1,
                borderColor: COLORS.ghostwhite,
                borderRadius: 100,
                backgroundColor: COLORS.ghostwhite,
                // padding: 5,
            }}
        >
            <Icon name="approval" size={40} color={COLORS.main} />
        </Box>
    </Box>


    <Box w="100%" alignItems={"center"}
        style={{
            paddingBottom: 10,
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 2,
        }}
    >


        <Stack w="100%" direction="row" space={2} mb="1">
            <Box w="35%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold'

                    }}            
                >Área Total</Text>
            </Box>
            <Box w="60%">
                <Text 
                    style={{
                        color: COLORS.grey,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmland?.totalArea} hectares
                </Text>
            </Box>
        </Stack>
        <CustomDivider thickness={2} bg={COLORS.lightgrey} />
        <Stack w="100%" direction="row" space={2} mb="1">
            <Box w="35%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold'
                    }}                
                >Cajueiros</Text>
            </Box>
            <Box w="60%">
                <Text 
                    style={{
                        color: COLORS.grey,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                    {farmland?.trees} árvores
                </Text>
            </Box>
        </Stack>
        <CustomDivider thickness={2} bg={COLORS.lightgrey} />

        <Stack w="100%" direction="row" space={2}>
            <Box w="35%">
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Bold'

                    }}
                >Consociação</Text>
            </Box>
            <Box 
                style={{
                    width: '60%',
                }}
            >
                <Text
                    style={{
                        color: COLORS.grey,
                        fontSize: 16,
                        fontFamily: 'JosefinSans-Regular',
                    }}
                >
                {
                    farmland?.consociatedCrops?.map((crop, index)=>(
                        `${crop}; `
                    ))
                } 
                </Text>
            </Box>
        </Stack>
    </Box>
    <CustomDivider thickness={2} bg={COLORS.lightgrey} />
    <Box w="100%"
        style={{
            padding: 10,
        }}
    >

        <Text
            style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: 'JosefinSans-Regular',                
            }}
        >
            {farmland?.description}
        </Text>
    </Box>
    </Box>

    {
        farmland?.blocks?.length > 0 && normalizeBlockList(farmland?.blocks)?.map((block, index)=>{
          
            return (
            <Box key={index}
                style={{
                    flex: 1,
                    margin: 10,

                }}
            >
                <Box
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: COLORS.mediumseagreen,
                    }}
                >
                    <Box w="100%"
                        style={{
                            backgroundColor: COLORS.mediumseagreen,
                            padding: 10,
                            flexDirection: 'row',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <Box w="70%"
                            style={{
                                paddingLeft: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.ghostwhite,
                                    fontFamily: 'JosefinSans-Bold',
                                    fontSize: 18,
                                }}
                            >Ano de Plantio: {block?.plantingYear}</Text>
                        </Box>
                        <Box w="15%">
                        </Box>
                        <Box w="10%">
                            <TouchableOpacity
                                disabled={block?.position === (farmland?.blocks?.length - 1) ? false : true}
                                onPress={()=>{
                                    setAreaFlag(prev=>prev - parseFloat(block?.usedArea));
                                    setTreesFlag(prev =>prev - parseInt(block?.trees));

                                    setIsDeleteBlockOn(true);

                                }}
                            >
                                <Icon 
                                    name={block?.position === (farmland?.blocks?.length - 1) ? 'delete-forever' : 'check-circle'} 
                                    size={35} 
                                    color={block?.position === (farmland?.blocks?.length - 1) ? COLORS.danger : COLORS.main} 
                                />
                            </TouchableOpacity>
                        </Box>
                        <Box w="5%">
                        </Box>
                    </Box>
                    <Box
                        w="100%"
                        style={{

                        }}
                    >
                        <Stack direction="row" w="100%" space={1} my="3">
                            <Box w="50%"
                                alignItems={"center"}
                            >
                                <Text
                                    style={{ color: COLORS.black, fontFamily: 'JosefinSans-Bold', fontSize: 16, }}
                                >Área (hectares)</Text>
                                <Text>({block?.usedArea.toFixed(2)})</Text>
                            </Box>
                            <Box w="50%"
                             alignItems={"center"}
                            >
                                <Text
                                 style={{ color: COLORS.black, fontFamily: 'JosefinSans-Bold',  fontSize: 16, }}
                                >Cajueiros (árvores)</Text>
                                <Text>({block?.trees})</Text>
                            </Box>
                        </Stack>
                    </Box>

                    <Box
                        w="100%"
                        style={{
                            
                        }}
                    >
                        <Stack direction="row" w="100%" space={1} my="3">
                            <Box w="50%"
                                alignItems={"center"}
                            >
                                <Text
                                style={{ color: COLORS.black, fontFamily: 'JosefinSans-Bold',  fontSize: 16, }}
                                >Compasso (metros)</Text>
                                <Text>{block?.density?.mode === 'Regular' ? `(${block?.density?.mode}: ${block?.density?.length}x${block?.density?.width})` : `(${block?.density?.mode})`}</Text>
                            </Box>
                            <Box w="50%"
                             alignItems={"center"}
                            >
                                <Text
                                style={{ color: COLORS.black, fontFamily: 'JosefinSans-Bold',  fontSize: 16, }}
                                >
                                    Tipo de plantas
                                </Text>
                                <Text
                                    style={{ textAlign: 'center', }}

                                >({block?.plantTypes?.plantType?.join("; ") })</Text>
                                <Text
                                    style={{ textAlign: 'center', }}
                                >{block?.plantTypes?.plantType?.some(plant=>plant?.includes('enxert')) ? `(clones: ${block?.plantTypes?.clones?.join("; ")})` : ''}</Text>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        )})
        }

</>
}
    <Box
        style={{
            alignItems: 'flex-end',
            padding: 20,
            flexDirection: 'row-reverse',
        }}
    >

        <Box>
            <TouchableOpacity
                onPress={()=>{
                    if (farmland){

                        // make the block data form visible
                        setIsOverlayVisible(true);
                    }
                    else {
                        setLoadingButton(true);
                        
                        // save the farmland main data
                        visualizeFarmlandMainData();
                    }
                }}
            >
                <Box 
                    style={{
                        borderRadius: 100,
                        backgroundColor: farmland ? COLORS.mediumseagreen : COLORS.pantone,
                    }}
                >
                    <Icon name="add" size={45} color={COLORS.ghostwhite} />
                </Box>
            </TouchableOpacity>
        </Box>
{ farmland &&
       <Box>
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: 'JosefinSans-Regular',
                    color: COLORS.mediumseagreen,
                    textAlign: 'right',
                    padding: 10,
                }}
            >
                Adiciona bloco {farmland?.blocks?.length + 1}
         </Text>    
        </Box>
    }
    </Box>


    <Box w="100%" mt="1">
        <Stack w="100%" direction="row" >
        <Box w="5%"></Box>
        {  farmland?.blocks?.length > 0 ?          
                <TouchableOpacity   
                    onPress={()=>{
                        if(checkBlockConformity(farmlandId, realm)){
                            setIsCoordinatesModalVisible(true)
                        }
                    }}  
                >
                    <Box 
                        style={{ 
                            borderWidth: 2, 
                            borderColor: COLORS.red, 
                            borderRadius: 100, 
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 4,
                        }}
                    >
                    <Text
                        style={{ fontSize: 18, color: COLORS.red, fontFamily: 'JosefinSans-Bold', }}
                    >
                        Concluir Registo
                    </Text>
                </Box>
            </TouchableOpacity> 

            :

            <Box w="45%" >

            </Box>
        }               
            <Box w="30%"></Box>

            <Box w="5%"></Box>
        </Stack>
    </Box>

    <FarmlandBlockRegistration 
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
        customUserData={customUserData}
        errors={errors}
        setErrors={setErrors}
        alert={alert}
        setAlert={setAlert}
        plantingYear={plantingYear}
        setPlantingYear={setPlantingYear}
        blockTrees={blockTrees}
        setBlockTrees={setBlockTrees}
        usedArea={usedArea}
        setUsedArea={setUsedArea}
        plantTypes={plantTypes}
        setPlantTypes={setPlantTypes}
        clones={clones}
        setClones={setClones}
        densityLength={densityLength}
        setDensityLength={setDensityLength}
        setDensityWidth={setDensityWidth}
        densityWidth={densityWidth}
        isDensityModeIrregular={isDensityModeIrregular}
        isDensityModeRegular={isDensityModeRegular}
        setIsDensityModeIrregular={setIsDensityModeIrregular}
        setIsDensityModeRegular={setIsDensityModeRegular}
        visualizeBlockData={visualizeBlockData}
        farmlandId={farmlandId}

        totalArea={totalArea}
        setTotalArea={setTotalArea}
        totalTrees={trees}
        setTotalTrees={setTrees}
        sameTypeTreesList={sameTypeTreesList}
        setSameTypeTreesList={setSameTypeTreesList}

        treesFlag={treesFlag}
        setTreesFlag={setTreesFlag}
        areaFlag={areaFlag}
        setAreaFlag={setAreaFlag}

        turnOffOverlay={turnOffOverlay}

        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
        titleAlert={titleAlert}
        setTitleAlert={setTitleAlert}
        cancelText={cancelText}
        setCancelText={setCancelText}
        confirmText={confirmText}
        setConfirmText={setConfirmText}
        showCancelButton={showCancelButton}
        setShowCancelButton={setShowCancelButton}
        showConfirmButton={showConfirmButton}
        setShowConfirmButton={setShowConfirmButton}

    />

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
