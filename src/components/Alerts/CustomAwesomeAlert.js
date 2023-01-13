import React from "react";
import { View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";


const CustomAwesomeAlert = ({ 
    show, 
    showProgress, 
    title,
    message,
    closeOnTouchOutside,
    closeOnHardwareBackPress,
    confirmText,
    showCancelButton,
    showConfirmButton,
    onConfirmPressed,
 })=>{

    return (
        <AwesomeAlert
        show={confirmGeoAlert}
        showProgress={false}
        title="Geolocalização"
        message="Este dispositivo aprovou o pedido de permissão deste aplicativo!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="   OK!   "
        confirmButtonColor="#005000"
        onConfirmPressed={() => {
          setConfirmGeoAlert(false);
        }}
      />
    )
}