

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { LightSpeedOutRight } from 'react-native-reanimated';
import COLORS from '../../consts/colors';
import { faRing, faUserTie } from '@fortawesome/free-solid-svg-icons';




export function FarmerTypeCard({ route, item }) {

 const navigation = useNavigation();


 return (

   <View
   style={{
     alignItems: 'center',
     justifyContent: 'center',
   }}
   >

     <TouchableOpacity
      onPress={()=>{
       navigation.navigate('FarmersList', { farmerType: item?.farmerType  });
      }}
     >
       <View
        style={{
         width: '95%',
         flexDirection: 'row',
         // backgroundColor: item?.backgroundColor,
         borderColor: item.color,
         borderWidth: 2,
         marginVertical: 20,
        }}
       >
 {/* { 
  item.image &&
 <ImageBackground
          source={{ uri: item.image }}
          style={{
           width: '100%',
           height: '100%',
          }}
          resizeMode="cover"
         >

         </ImageBackground>
    } */}

    {
   <View
     style={{
      flexDirection: 'row',
      padding: 10,
      width: '100%',
     }}
   >
      <View
       style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: "30%",  
          borderRadius: 100,
          borderWidth: 2,
          borderColor: item?.color,
          marginHorizontal: 5,
          // padding: 10,
  
       }}
      >
       <View
        style={{
         position: 'absolute',
         right: -10,
         top: 0,
        }}
       >
        <Text
         style={{
          fontSize: 16,
          fontFamily: 'JosefinSans-Bold',
          textAlign: 'right',
          letterSpacing: 3,
          color: COLORS.red,
         }}
         // numberOfLines={2}
         // ellipsizeMode={'tail'}
        >
         {item?.total}
        </Text>
       </View>
         <FontAwesomeIcon icon={item?.icon} size={60} color={item?.color} />
      </View>

     <View
     style={{
      padding: 5,
      width: '70%',
      flexDirection: 'column'
     }}
    >
     <View
      style={{
       width: '100%',
       flexDirection: 'row',
       paddingRight: 5,
      }}
     >
      <View 
       style={{
        width: '20%'
       }}
      >
       </View>

       <View 
       style={{
        width: '80%',
       }}
      >

       <Text
        style={{
         fontSize: 24,
         fontFamily: 'JosefinSans-Bold',
         textAlign: 'right',
         color: item?.color,
        }}
        numberOfLines={2}
        ellipsizeMode={'tail'}
       >
        {item.title}
       </Text>
      </View>
     </View>
     <View>
      <Text
         style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          // textAlign: 'right',
          
         }}
         numberOfLines={2}
         ellipsizeMode={'tail'}
      >
       {item?.description}</Text>
     </View>
     </View>
   </View>
    }
    </View>
    {/* <View
    style={{
     height: '30%',
     width: '100%',
     borderTopWidth: 0,
     borderBottomWidth: 1,
     borderLeftWidth: 1,
     borderRightWidth: 1,
     borderColor: COLORS.lightgrey,
     paddingHorizontal: 5,
    }}
    >

     <Text
        style={{
         fontSize: 10,
         color: COLORS.black,
         fontFamily: 'JosefinSans-Italic',
       }}
       numberOfLines={1}
       ellipsizeMode={'tail'}
     >
        "item.names.otherNames"
     </Text>

     <Text
        style={{
         fontSize: 10,
         color: COLORS.grey,
         fontFamily: 'JosefinSans-Regular',
         textAlign: 'right',
        }}
        >
       date
     </Text>
    </View> */}

     </TouchableOpacity>
   </View>
   
   // </Animated.View>
 )
}


export default FarmerTypeCard;

