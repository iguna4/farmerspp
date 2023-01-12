/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Text,  Stack, Box, Center, Divider } from 'native-base';
import { Button, Icon } from '@rneui/themed';
import { Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CustomDivider from '../Divider/CustomDivider';
import styles from './styles';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Realm from 'realm';

import FarmerAddDataModal from './SuccessModal';

import { useNavigation, useIsFocused } from '@react-navigation/native';


import { realmContext } from '../../models/realm';
import { categorizeFarmer } from '../../helpers/categorizeFarmer';
import { Camera, useCameraDevices, useIsAppForeGround } from 'react-native-vision-camera';
import CustomActivityIndicator from '../ActivityIndicator/CustomActivityIndicator';

const {useRealm} = realmContext;

const CameraDeviceModal = (
    {   cameraModal, 
        setCameraModal, 
        // device, isActive, 
}
) => {
    const [indicator, setIndicator] = useState(true)
      // useCameraDevice
    const devices = useCameraDevices();
    const device = devices.back;
    const [isCameraActive, setIsCamerActive] = useState(true);
    const isFocused = useIsFocused();
    const camera = useRef(null);

    const takePhoto = useCallback(async ()=>{
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'on',
        enableAutoRedEyeReduction: true,
      }, [camera]);
      console.log('photo:', JSON.stringify(photo));

    })

    if (device == null) 
        return (
            <CustomActivityIndicator 
                loadingActivitiyIndicator={true}
                setLoadingActivityIndicator={setIndicator}
            />)


  return (
    // <Modal
    //     visible={cameraModal}
    //     onRequestClose={() => setCameraModal(false)}
    //     animationType="slide"
    // >

    // </Modal>
    <Camera 
      ref={camera}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      photo={true}
    />
  )
}

export default CameraDeviceModal;