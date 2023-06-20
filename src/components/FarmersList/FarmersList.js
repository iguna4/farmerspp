
import React from 'react';
import { View, Text } from 'react-native';

const FarmersList = ({ route, navigation}) => {

 const farmerType = route.params?.farmerType;

 console.log('farmerType: ', farmerType)


  return (
    <View>
      <Text>FarmersList</Text>
    </View>
  );
}

export default FarmersList;

