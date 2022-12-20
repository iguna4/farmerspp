
import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './style'


const CustomActivityIndicator = ({ loadingActivitiyIndicator, setLoadingActivityIndicator }) => {
    
    const startLoading = ()=>{
        // setLoadingActivityIndicator(true);
        setTimeout(()=>{
            setLoadingActivityIndicator(false);
        }, 500);
    }

    if (loadingActivitiyIndicator) {
        startLoading();
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