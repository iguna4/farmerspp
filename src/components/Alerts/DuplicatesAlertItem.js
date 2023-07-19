import React, { useState, useEffect,} from "react";
import { Button,  Box, Center, } from "native-base";
import {  View, Text, Image, Dimensions, TouchableOpacity} from "react-native";
import { Icon, CheckBox, Avatar } from '@rneui/themed';
import Animated, { Layout, LightSpeedInLeft, LightSpeedOutRight, } from 'react-native-reanimated';

import {  
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol } 
      from 'react-native-responsive-screen';

// import { 
//   responsiveFontSize,
//   responsiveScreenFontSize,
//   responsiveHeight,
//   responsiveWidth,
//   responsiveScreenHeight,
//   responsiveScreenWidth,
//   useDimensionsChange,

// } from 'react-native-responsive-dimensions';


// import { getInitials } from "../../helpers/getInitials";
import COLORS from "../../consts/colors";
import { months } from "../../helpers/dates";
import { useNavigation   } from "@react-navigation/native";
import CustomDivider from "../Divider/CustomDivider";
import { Swipeable } from "react-native-gesture-handler";
import CustomActivityIndicator from "../ActivityIndicator/CustomActivityIndicator";


const DuplicatesAlertItem = ({ suspectedDuplicates })=>{
  
  const navigation = useNavigation();
  const [itemIndex, setItemIndex ] = useState(0);
  const [loadingActivitiyIndicator, setLoadingActivityIndicator] = useState(false);


  const setNextItem = ( itemsList )=>{
    if (((itemsList?.length > 0) && (itemIndex === (itemsList?.length -1))) || itemsList?.length === 1 ){
      setItemIndex(0);
    }
    else {
      setItemIndex(prev => prev + 1);
    }
  }
  
  useEffect(()=>{
    
    
  }, [ itemIndex ]);
  
  console.log('itemIndex:', itemIndex);
  console.log('suspec:', suspectedDuplicates?.length);

  if (loadingActivitiyIndicator) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomActivityIndicator
            backgroundColor={COLORS.second}
            indicatorColor={COLORS.ghostwhite}
            loadingActivitiyIndicator={loadingActivitiyIndicator}
            setLoadingActivityIndicator={setLoadingActivityIndicator}
        />
      </View>
  )
  }

  return (

    <Box
      style={{ 
        width: '85%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.ghostwhite,
        borderRadius: 20,

      }}
      >

          <View >

            <Box
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={{

                }}
                onPress={()=>{

                }}
              >
              </TouchableOpacity>

              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.grey,
                  fontFamily: 'JosefinSans-Regular'
                }}
              >
                {(itemIndex + 1)}/{suspectedDuplicates?.length}
              </Text>
                
              <TouchableOpacity
                style={{

                }}
                onPress={()=>{
                  setLoadingActivityIndicator(true);
                  setNextItem(suspectedDuplicates);
                }}
              >
                <Icon name="arrow-forward-ios" size={25} color={COLORS.grey} />
              </TouchableOpacity>

              </Box>

            </Box>

              <Box
                style={{
                  paddingBottom: 20,
                  justifyContent: 'center',
                }}
              >
            { 
            suspectedDuplicates[itemIndex]?.image ?
              <Center >
                  <Image 
                    source={{ uri:suspectedDuplicates[itemIndex].image }}
                    style={{      
                      width: 150,
                      height: 150,
                      marginHorizontal: 3,
                      borderRadius: 120,
                    }}
                  />     
              </Center>

              :

              <Center>
                <Icon 
                    name="account-circle"
                    size={180}
                    color={COLORS.lightgrey}
                    />
              </Center>

            }
              
            </Box>

              <Box
                style={{
                    paddingBottom: 15,
                }}
                >
                  <Text
                      style={{
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: 'JosefinSans-Bold',
                          color: COLORS.black,
                      }}
                      >
                      {suspectedDuplicates[itemIndex]?.names?.otherNames}{' '}{suspectedDuplicates[itemIndex]?.names?.surname}
                  </Text>
                </Box>
                      <Box>

                <CustomDivider thickness={2} my={2}  bg={COLORS.grey} />
                      </Box>

              <Box
                style={{
                  paddingVertical: 20,
                }}
              >


                <Box
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 5,
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    style={{
                      width: '20%',
                    }}
                  >
                    <Icon name="cake" size={25} color={COLORS.grey} />
                  </Box>

                  <Box
                    style={{
                      width: '80%',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.grey,
                        fontFamily: 'JosefinSans-Regular',
                      }}
                    >
                      {new Date(suspectedDuplicates[itemIndex]?.birthDate).getDate()}/{new Date(suspectedDuplicates[itemIndex]?.birthDate).getMonth()+1}/{new Date(suspectedDuplicates[itemIndex]?.birthDate).getFullYear()} ({suspectedDuplicates[itemIndex]?.birthPlace?.province}: {suspectedDuplicates[itemIndex]?.birthPlace?.district})
                    </Text>
                  </Box>
                </Box>

                <Box
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 5,
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    style={{
                      width: '20%',
                      // justifyContent: 'center',
                    }}
                  >
                    <Icon name="location-pin" size={25} color={COLORS.grey} />
                  </Box>

                  <Box
                    style={{
                      width: '80%',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                        style={{
                          fontSize: 15,
                          color: COLORS.grey,
                          fontFamily: 'JosefinSans-Regular',
                        }}
                    >{suspectedDuplicates[itemIndex]?.address?.province} ({suspectedDuplicates[itemIndex]?.address?.district})</Text>
                  </Box>
                </Box>

              </Box>

              <Box>
              <CustomDivider thickness={2} my={2}  bg={COLORS.grey} />
              </Box>
              <Box
                style={{
                  paddingTop: 20,
                }}
              >
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.grey,
                      fontFamily: 'JosefinSans-Regular',
                    }}
                  >
                    Registado por {suspectedDuplicates[itemIndex]?.userName} aos {new Date(suspectedDuplicates[itemIndex]?.createdAt).getDate()}/{new Date(suspectedDuplicates[itemIndex]?.createdAt).getMonth()+1}/{new Date(suspectedDuplicates[itemIndex]?.createdAt).getFullYear()} 
                  </Text>
              </Box>

          </View>
      </Box>
// </Animated.View>

  )}

export default DuplicatesAlertItem;