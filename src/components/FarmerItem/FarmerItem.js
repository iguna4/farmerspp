import {Alert, FlatList, SafeAreaView,  TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Icon } from '@rneui/themed';

import { Box, Center, HStack, Pressable, Avatar, Stack, VStack,  } from 'native-base';
import styles from './styles';
import CustomDivider from '../../components/Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';



const FarmerItem = ({ item, route, farmerType }) => {

   const [visible, setVisible] = useState(false);
   const navigation = useNavigation();

  // const handleItem = ()=>{
  //  return <AlertModal
  //   visible={visible}
  //   setVisible={setVisible}
  //  />
  // }

  return (
    <Box 
      borderBottomWidth="1"
      borderBottomRadius={10}
      // borderColor="muted.800"
      // _dark={{
      //   borderColor: 'muted.50'
      // }}
      // pl={["2", "2"]} 
      // pr={["2", "2"]} 
      // py="4"
      style={{
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',

      }}
    >
      {/* <Box
        style={{ width: '100%', }}
      >
       */}
      
        {/* <Box 
          // direction="row" 
          // space={2}
          style={{ backgroundColor: '#005000', width: '100%'}}
        > */}
          <Text 
            style={{
              fontSize: 20,
              fontFamily: 'JosefinSans-Bold',
              color: '#005000',
            }}
          >
            {item.names.otherNames}{' '}{item.names.surname}
          <Text 
            style={{
              fontSize: 14,
              fontFamily: 'JosefinSans-Italic',
              color: '#005000',
              paddingTop: 6,
              
            }}
            >
            {' '}({item.category})
            {/* ({new Date().getFullYear() - new Date(item.birthDate).getFullYear()} anos) */}
            </Text>
          </Text>
        {/* </Box> */}

    <Stack direction="column" >
        <Stack direction="row">
          <Box w="80%" style={{ }}>
        <Stack direction="row">
            {/* <Box w="80%" > */}
              <Text 
                style={{
                fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                // paddingTop: 6,
                }}
              >
                Provedor-S-Pulverização: {'  '}
              </Text>
              {
                  item.isSprayingAgent ?
                  <Icon name="check-circle" color="green" />
                  :
                  <Icon name="close" color="red" />
              }
        </Stack>
            {/* </Box>
            <Box w="20%">
              
            </Box> */}
        <Stack direction="row">
            <Box w="80%" >
              <Text 
                style={{
                fontSize: 15,
                fontFamily: 'JosefinSans-Italic',
                // paddingTop: 6,
                }}
              >
                Tel: {
                item.contact.primaryPhone ? item.contact.primaryPhone
                : item.contact.secondaryPhone ? item.contact.secondaryPhone : 'Nenhum'
              }
              </Text>
            </Box>
        </Stack>
        <Stack direction="row" space={4}>
            <Box w="50%" >
                {/* <Box w="70%"> */}
              <Stack direction="row">
                  <Text 
                    style={{
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                    // paddingTop: 6,
                    }}
                  >
                    Cajueiros: {' '}
                  </Text> 
                  <Text style={{ fontSize: 15, paddingTop: 2, }}>{item.farmlands.length}</Text>
              </Stack>
            </Box>
                {/* <Box w="30%">
                </Box>
            </Box> */}
            
            <Box w="50%">
                {/* <Box w="70%"> */}
              <Stack direction="row">
                  <Text 
                    style={{
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                    // paddingTop: 6,
                    }}
                  >
                    Pomares: {' '}
                  </Text>
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>{item.farmlands.length}</Text>
              </Stack>
                {/* </Box>
                <Box w="30%">
                </Box> */}
            </Box>
        </Stack>

        </Box>
        <Box w="20%" style={{ }}>
          <Pressable
            onPress={()=>navigation.navigate('FarmlandForm1', {
              farmerId: item._id
            })}
          >
            <Icon name="arrow-right" size={80} color="#005000" />
          </Pressable>
        </Box>
        </Stack>
      </Stack>
      {/* </Box> */}
      <Stack direction="row" w="100%" style={{  }} >
        <Box w="25%"><Text style={{ fontFamily: 'JosefinSans-Italic'}}>{'user'}</Text></Box>
         <Box w="25%"></Box>
        <Box w="25%"></Box>
        <Box w="25%"><Text style={{ fontFamily: 'JosefinSans-Italic', textAlign: 'right'}}>{new Date(item.createdAt).toLocaleDateString()}</Text></Box>
      </Stack>
    </Box>
    // <View style={{ 
    //   flex: 1, 
    //   width: '100%',
    //   paddingHorizontal: 5,         
    //   justifyContent: 'center',
    //   alignItems: 'center', 
    //   backgroundColor: 'white', 
    //   marginVertical: 10,
    //   // borderRadius: 10,
    //   }}
    // >
    // <Stack direction="row">
    // <View
    //   style={{ 
    //     width: '80%', 
    //     minHeight: 120, 
    //     marginVertical: 10, 
    //     marginHorizontal: 10,
    //     padding: 5,
    //     borderRadius: 10,
    //     }}
    // >
    // <TouchableOpacity
    //   onPress={()=>{
    //     setVisible(true)
    //   }}
    // >
    //   <Text 
    //     style={{ 
    //       fontFamily: 'JosefinSans-BoldItalic', 
    //       color: '#005000',
    //       fontSize: 18,
    //     }}
    //   >
    //     {item?.names.otherNames} {item?.names.surname} 
    //     <Text style={{fontSize: 14, color: 'grey', }}>
    //       {' '}({new Date().getFullYear() - new Date(item?.birthDate).getFullYear()} anos)
    //     </Text>
    //   </Text>
    //   <Stack direction="row" space={3}>
    //     <Avatar 
    //       size={50}
    //       rounded={true}
    //       title={getInitials(item?.names.otherNames, item?.names.surname)}
    //       containerStyle={{ 
    //         backgroundColor: randomRBG(), 
    //         marginVertical: 8, 
    //       }}
    //     />
    //     <Box>
    //       <Stack direction="column">
    //           <Text style={styles.farmerInfo}>
    //             Produtor {item?.category}
    //             {' '}
    //           </Text>
    //           <Stack direction="row" space={1}>
    //             <Box w="50%">
    //               <Text selectable={true} 
    //                 style={styles.farmerInfo}
    //               >
    //                   Tel: {
    //                 item?.contact?.primaryPhone ? 
    //                 item?.contact?.primaryPhone :
    //                 item?.contact?.secondaryPhone ?
    //                 item?.contact?.secondaryPhone :
    //                 'Nenhum'
    //                 }
    //               </Text>
    //             </Box>
    //             <Box w="50%">
    //               <Text style={styles.farmerInfo}>
    //                 PSP: {item?.isSprayingAgent ? 'Sim': 'Não'}
    //               </Text> 
    //             </Box>
    //           </Stack>
    //           <Stack direction="row" space={1}>
    //             <Box w="50%">
    //               <Text style={styles.farmerInfo}>
    //                 Pomares: {item?.farmlands ? item?.farmlands?.length : 0 }
    //               </Text>
    //             </Box>
    //             <Box w="50%">
    //               <Text style={styles.farmerInfo}>
    //                 Cajueiros: {item?.farmlands ? item?.farmlands?.length : 0 }
    //               </Text>
    //             </Box>
    //           </Stack>

    //       </Stack>
    //     </Box>
    //   </Stack>
    //   </TouchableOpacity>
    //   <CustomDivider
    //       // marginVertical="2"
    //       thickness={1}
    //       bg="grey"
    //   />
    //   <Text style={{textAlign: 'right', fontSize: 12, fontFamily: 'JosefinSans-Italic'}}>Registo aos {new Date(item.createdAt).toLocaleDateString()} por user</Text>
    //   </View>
    //   <View
    //     style={{
    //       flex: 1, 
    //       justifyContent: 'center', 
    //       alignItems: 'center', 
    //       backgroundColor: randomRBG(),
    //     }}
    //   >
    //     <TouchableOpacity
    //       onPress={()=>{
    //         navigation.navigate('FarmlandForm1', {
    //           farmerId: JSON.stringify(item?._id)
    //         })
    //       }}
    //     >
    //       <Icon 
    //         name="add"
    //         color="#ffffff"
    //         size={40}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   </Stack>
    // </View>
  )
}

export default FarmerItem