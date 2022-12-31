
import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './style'


const CustomActivityIndicator = ({ loadingActivitiyIndicator, setLoadingActivityIndicator }) => {
    
    // const startLoading = ()=>{
        // setLoadingActivityIndicator(true);
    // }
    
    if (loadingActivitiyIndicator) {
        // startLoading();
        setTimeout(()=>{
            setLoadingActivityIndicator(false);
        }, 0);
    }
    
    return (
    <View style={styles.container}>
        <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loadingActivitiyIndicator}
            //Text with the Spinner
            textContent={'Connect Caju...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
            size="large"
            color="#005000"
          />
    </View>
  )
}

export default CustomActivityIndicator