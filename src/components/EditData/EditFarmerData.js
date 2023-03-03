
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, } from 'react-native';
import { Overlay, Icon, Button } from "@rneui/base";
import COLORS from "../../consts/colors";
import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";

const EditFarmerData = ({  
    isOverlayVisible, 
    setIsOverlayVisible,
    ownerName,
    resourceId,
})=>{

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
      };

    return (

    <Overlay 
        overlayStyle={{ 
            backgroundColor: 'ghostwhite', 
            width: '90%',
            borderRadius: 10,
            paddingBottom: 50,
        }}
        isVisible={isOverlayVisible} 
        onBackdropPress={toggleOverlay}
    >
        <View
            style={{ 
                width: '100%', 
                backgroundColor: COLORS.main, 
            }}
        >
            <Text
                style={{ 
                    textAlign: 'center',
                    color: COLORS.ghostwhite,
                    fontSize: 18,
                    paddingVertical: 5,
                    fontFamily: 'JosefinSans-Bold',

                }}
            >{ownerName}</Text>
        </View>
        <View
            style={{
                minHeight: '70%',
                justifyContent: 'center',
            }}
        >



    </View>
        <Button
            title="Salvar"
            titleStyle={{
                color: COLORS.ghostwhite,
                fontFamily: 'JosefinSans-Bold',
            }}
            iconPosition="right"
            icon={
            <Icon
                name="save"
                type="font-awesome"
                color="white"
                size={25}
                iconStyle={{ 
                    marginRight: 10,
                    // color: COLORS.ghostwhite,
                    paddingHorizontal: 10,
                 }}
            />
            }
            containerStyle={{
                backgroundColor: COLORS.second,
                borderRadius: 10,
                // color: COLORS.ghostwhite,
            }}
            type="outline"
            onPress={toggleOverlay}
        />
    </Overlay>

    )
}

const styles = StyleSheet.create({
    button: {
      margin: 10,
    },
    textPrimary: {
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20,
    },
    textSecondary: {
      marginBottom: 10,
      textAlign: 'center',
    //   color: 'ghostwhite',
      fontSize: 17,
    },
    });

    
export default EditFarmerData;