/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { StatusBar, View, Text, } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Icon, } from '@rneui/themed';
import COLORS from '../consts/colors';

  // toastConfig customized the toast messages
  export const toastConfig = {
  
  addedFarmerToGroup: ({ text1, props})=>(
    <View style={{ 
      minHeight: 60, 
      width: '100%', 
      backgroundColor:  COLORS.lightGreen,
      paddingHorizontal: 5,
     flexDirection: 'row',
     borderRadius: 10,
    }}>
        <View
         style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
         }}
        >
          <Icon 
          name="check-circle-outline" 
          color={COLORS.darkyGreen} 
          size={40} 
        />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'JosefinSans-Bold',
              color: COLORS.darkyGreen,
              paddingHorizontal: 5,
            }}
          >{text1}</Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'JosefinSans-Regular',
              color: COLORS.darkyGreen,
              paddingRight: 5,
            }}
          >{props.message}</Text>
        </View>
    </View>
  ),

  removedFarmerFromGroup: ({ text1, props})=>(
   <View style={{ 
     minHeight: 60, 
     width: '100%', 
     backgroundColor: COLORS.lightSalmon,
     paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: 10,
   }}>
       <View
        style={{
         justifyContent: 'center',
         alignItems: 'center',
         padding: 5,
        }}
       >
         <Icon name="warning" color={COLORS.marron} size={40} />
       </View>
       <View>
         <Text
           style={{
             fontSize: 16,
             fontFamily: 'JosefinSans-Bold',
             color: COLORS.marron,
             paddingRight: 5,
           }}
         >{text1}</Text>
         <Text
           style={{
             fontSize: 15,
             fontFamily: 'JosefinSans-Regular',
             color: COLORS.marron,
             paddingHorizontal: 5,
           }}
         >{props.message}</Text>
       </View>
   </View>
 ),

 addedGroupManager: ({ text1, props})=>(
  <View style={{ 
    minHeight: 60, 
    width: '100%', 
    backgroundColor:  COLORS.lightGreen,
    paddingHorizontal: 5,
   flexDirection: 'row',
   borderRadius: 10,
  }}>
      <View
       style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
       }}
      >
        <Icon 
        name="check-circle-outline" 
        color={COLORS.darkyGreen} 
        size={40} 
      />
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'JosefinSans-Bold',
            color: COLORS.darkyGreen,
            paddingHorizontal: 5,
          }}
        >{text1}</Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'JosefinSans-Regular',
            color: COLORS.darkyGreen,
            paddingRight: 5,
          }}
        >{props.message}</Text>
      </View>
  </View>
)


}
