
import React, { useEffect, useState, useRef, useCallback, } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, ActivityIndicator, Image, } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Divider, Icon, Avatar, BottomSheet, Box } from '@rneui/base';
import COLORS from '../../consts/colors';
import { useIsFocused } from '@react-navigation/native';
import { realmContext } from '../../models/realmContext';
import { useUser } from '@realm/react';
import CustomActivityIndicator from '../../components/ActivityIndicator/CustomActivityIndicator';
import { launchImageLibrary } from 'react-native-image-picker';
const { useRealm, useQuery, useObject } = realmContext; 



export default function CameraScreen({ route , navigation }) {


const realm = useRealm();
const user = useUser();
const customUserData = user?.customData;

 const camera = useRef(null);
 const devices = useCameraDevices();
 const device = devices.back;
 const [showCamera, setShowCamera] = useState(false);
 const [imageSource, setImageSource] = useState('');
 const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);
const isFocused = useIsFocused();

const ownerType = route.params?.ownerType;
const ownerId = route.params?.ownerId;
const farmersIDs = route.params?.farmersIDs;
let photoOwner;
if (ownerType === 'Grupo') {
  photoOwner = realm.objectForPrimaryKey('Group', ownerId);
} 
else if (ownerType === 'Indivíduo') {
  photoOwner = realm.objectForPrimaryKey('Actor', ownerId);
} 
else if (ownerType === 'Instituição') {
  photoOwner = realm.objectForPrimaryKey('Institution', ownerId);

}
// const [isImageTestVisible, setIsImageTestVisible] = useState(false);

 useEffect(()=>{
  if (photoOwner?.image === ''){
    async function getPhonePermission(){
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);
        if (permission === 'denied') await Linking.openSettings();
        if(permission === 'authorized'){
         setShowCamera(true);
        }
    }
  
    getPhonePermission();
  }
  else {
    setImageSource(photoOwner?.image);
  }

}, [ ]);

const capturePhoto = async ()=>{
 if (camera.current !== null) {
   try{
     const snapPhoto = await camera.current.takeSnapshot({
      quality: 85,
      skipMetadata: true,
     });

    //  const photo = await camera.current.takePhoto({

    //  })
     const imagePath = `file://'${snapPhoto.path}`
     setImageSource(imagePath);
    //  setIsImageTestVisible(true);
     setShowCamera(false);
     console.log('photo:', snapPhoto);

    //  navigation.goBack();
   }
   catch(error){
    // console.log('Could not take picture');
    throw new Error('Could not take picture:', { cause: error })
   }
 }
 else{
  console.log('device is null')
 }
}

const savePhoto = useCallback((realm, photoOwner, imageSource) =>{
  realm.write(()=>{
    photoOwner.image = imageSource;
  });

  navigateBack();
}, [ realm, imageSource, ownerId ]);

const deletePhoto = useCallback((photoOwner, realm)=>{
  realm.write(()=>{
    photoOwner.image = '';
  })
  
  setShowCamera(true);

}, [ photoOwner ]);


const navigateBack = ()=>{
  if (ownerType === 'Grupo') {
    // photoOwner = realm.objectForPrimaryKey('Group', ownerId);
    navigation.navigate('Group', {
      ownerId,
      farmersIDs,
    })
  
  } 
  else if (ownerType === 'Indivíduo') {
    navigation.navigate('Farmer', {
      ownerId,
      farmersIDs,
    })  
  } 
  else if (ownerType === 'Instituição') {
    navigation.navigate('Institution', {
      ownerId,
      farmersIDs,
    })  
  } 
}

  // picker a picture from gallery
  const launchNativeImageLibrary = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };

        // realm.write(()=>{
        //   photoOwner.image = 'data:image/jpeg;base64,' + response.assets[0].base64;
        // })
        const imageString = 'data:image/jpeg;base64,' + response.assets[0].base64;

        realm.write(()=>{
            // photoOwner.image = 'data:image/jpeg;base64,' + response.assets[0].base64;
            photoOwner.image = imageString;
        });
        setLoadingActivityIndicator(true);


        // setIsPhotoModalVisible(false);
        // if (photoOwnerType === 'Grupo') {
        //     navigation.navigate('Group', {
        //         ownerId: photoOwner?._id,
        //     })
        // } 
        // else if (photoOwnerType === 'Indivíduo') {
        //     navigation.navigate('Farmer', {
        //         ownerId: photoOwner?._id,
        //     })
        // } 
        // else if (photoOwnerType === 'Instituição') {
        //     navigation.navigate('Institution', {
        //         ownerId: photoOwner?._id,
        //     })
        // }
        // else if (photoOwnerType === 'Usuário') {
        //     // taking user photo
        //     // navigation.goBack();
        // }
      }
    });

  } 



 if (device === null) {
  // loadingActivitiyIndicator ?
    return  <ActivityIndicator size={20} color={'red'} />
 }


useEffect(()=>{
  if(!isFocused) {
    setShowCamera(false);
  }
}, [ isFocused ])


 return (
  <View
  style={{
      flex: 1,
  }}
  >
  {(device && showCamera) ?
    <>
      <Camera 
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={showCamera}
        photo={true}
      />
    <View 
        style={{
            position: 'absolute',
            top: 15,
            left: 10,
            zIndex: 1,
        }}
      >
        <TouchableOpacity
        style={{ flexDirection: 'row' }}
            onPress={()=>{
                // setShowCamera(true);
                navigateBack();
            }}                            
        >
          <Icon name='close' color={COLORS.ghostwhite} size={30}  />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
          onPress={()=>{
          capturePhoto()
          }}
          style={{
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              // height: 40,
              padding: 5,
              borderWidth: 2,
              borderColor: COLORS.grey,
              borderRadius: 30,
          }}
      >
      <Icon name="photo-camera" size={35} color={COLORS.grey} />
      </TouchableOpacity>
    </>
    : 
    (!device && showCamera) ?
    (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: COLORS.ghostwhite,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomActivityIndicator 
          loadingActivitiyIndicator={loadingActivitiyIndicator} 
          setLoadingActivityIndicator={setLoadingActivityIndicator} 
        />
      </View>
    )
    :
    <View
      style={{
        backgroundColor: COLORS.black,
        flex: 1,
      }}
      >
      <View 
        style={{
            position: 'absolute',
            top: 15,
            left: 10,
            zIndex: 1,
        }}
      >
        <TouchableOpacity
        style={{ flexDirection: 'row' }}
            onPress={()=>{
                // setShowCamera(true);
                navigateBack();
            }}                            
        >
          <Icon name='close' color={COLORS.ghostwhite} size={30}  />
        </TouchableOpacity>
      </View>

    {
      imageSource !== '' &&
      (
        <Image 
        source={{ uri: imageSource }}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: 9 / 16,
        }}
        />
      )

    }
    <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
        }}    
    >
      <View
        style={{
          // justifyContent: ' space-between',
          flexDirection: 'row'
        }}      
      >

{ imageSource &&
     <TouchableOpacity
        onPress={()=>{
          // savePhoto(realm, photoOwner, imageSource);
          deletePhoto(photoOwner, realm);
        }}
        style={{
          marginHorizontal: 15,
        }}
      >
        <Icon name="delete" size={30} color={COLORS.ghostwhite} />
      </TouchableOpacity>
  }

    <TouchableOpacity
        onPress={()=>{
          // savePhoto(realm, photoOwner, imageSource);
          setShowCamera(true);
        }}
        style={{
          marginHorizontal: 15,
        }}
      >
        <Icon name="photo-camera" size={30} color={COLORS.ghostwhite} />
    </TouchableOpacity>

    {/* <TouchableOpacity
        onPress={()=>{
          launchNativeImageLibrary();
          // savePhoto(realm, photoOwner, imageSource);
        }}
        style={{
          marginHorizontal: 15,
        }}
      >
        <Icon name="photo-library" size={30} color={COLORS.ghostwhite} />
    </TouchableOpacity> */}

{ imageSource &&
     <TouchableOpacity
        onPress={()=>{
          savePhoto(realm, photoOwner, imageSource);
        }}
        style={{
          marginHorizontal: 15,
          borderWidth: 2,
          borderColor: COLORS.main,
          backgroundColor: COLORS.main,
          borderRadius: 30,
        }}
      >
        <Icon name="check" size={30} color={COLORS.ghostwhite} />
      </TouchableOpacity>
  }

      </View>
    </View>
    </View>
  }
  </View>
 )
}