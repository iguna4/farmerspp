
import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'


const AlertModal = ({ visible, setVisible }) => {

   
  return (
    <View>
     <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
     >
            <Text>Modal View</Text>
     </Modal>
    </View>
  )
}

export default AlertModal