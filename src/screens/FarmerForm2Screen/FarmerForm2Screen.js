/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';

export default function FarmerForm2Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Farmer Form2 Screen</Text>
      <Button title="Go to Farmers" onPress={()=>navigation.navigate('Farmers')} />
      <Button title="Go to Form 1" onPress={()=>navigation.navigate('FarmerForm1')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
