
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, } from 'react-native';
import { Overlay, Icon, Button } from "@rneui/base";
import COLORS from "../../consts/colors";

const EditData = ({  
    isOverlayVisible, 
    setIsOverlayVisible,
    ownerName,
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
        }}
        isVisible={isOverlayVisible} 
        onBackdropPress={toggleOverlay}
    >
        <View
            style={{ 
                width: '100%', 
                // height: 40, 
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
        <Text style={styles.textPrimary}>Ainda Nao Implementado</Text>
        <Text style={styles.textSecondary}>
            Desenvolvimento em curso... Tente mais tarde!
        </Text>
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

    
export default EditData;