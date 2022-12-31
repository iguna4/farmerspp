import {Alert, FlatList, SafeAreaView,  TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Icon } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'



import { Box, Center, HStack, Pressable, Avatar, Stack, VStack,  } from 'native-base';
import styles from './styles';
import CustomDivider from '../../components/Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';
import { sumTreesOrAreas } from '../../helpers/sumTreesOrAreas';
import { faTree } from '@fortawesome/free-solid-svg-icons';



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
    <View
      // borderTopWidth="1"
      // elevation={4}
      // borderToRadius={30}
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
        backgroundColor: '#EBEBE4',
        // borderColor: '#005000',
        minHeight: 100,
        width: '100%',
        flex: 1,
        // alignItems: 'center',
        shadowColor: "#005000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

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
                  <Text style={{ fontSize: 15, paddingTop: 2, }}>{sumTreesOrAreas(item?.farmlands, 'trees')}</Text>
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
                    Parcelas: {' '}
                  </Text>
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>{item.farmlands.length}</Text>
              </Stack>
                {/* </Box>
                <Box w="30%">
                </Box> */}
            </Box>
        </Stack>

        </Box>
        <Box w="20%" style={{ 
          marginTop: 20,

        }}>
          <Pressable
            onPress={()=>navigation.navigate('FarmlandForm1', {
              ownerId: item._id,
              ownerName: item.names?.otherNames + ' ' + item.names?.surname,
              flag: 'Indivíduo',
            })}
          >
            {/* <Icon name="add-alert" size={40} color="#555" /> */}
            <FontAwesomeIcon icon={faTree} size={30} color="#005000" />
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
    </View>
  )
}

export default FarmerItem