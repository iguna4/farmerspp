import {Alert, FlatList, SafeAreaView,  TouchableOpacity, View, Text,} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Icon } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'



import { Box, Center, HStack, Pressable, Avatar, Stack, VStack,  } from 'native-base';
import styles from './styles';
import CustomDivider from '../Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';
import { sumTreesOrAreas } from '../../helpers/sumTreesOrAreas';
import { faTree } from '@fortawesome/free-solid-svg-icons';



const GroupItem2 = ({ item, route, farmerType }) => {

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
      style={{
        padding: 10,
        marginVertical: 10,
        // backgroundColor: '#EBEBE4',
        borderColor: '#005000',
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

        elevation: 3,

      }}
    >
      <TouchableOpacity>
      <Text 
        style={{
          fontSize: 20,
          fontFamily: 'JosefinSans-Bold',
          color: '#005000',
        }}
      >
        {item.type}
      <Text 
        style={{
          fontSize: 14,
          fontFamily: 'JosefinSans-Italic',
          color: '#005000',
          paddingTop: 6,
          
        }}
      >
        {' '}({item.name})
      </Text>
    </Text>

    <Stack direction="column" >
        <Stack direction="row">
          <Box w="80%" style={{ }}>
        <Stack direction="row">
          {/* <Text 
            style={{
            fontSize: 15,
            fontFamily: 'JosefinSans-Italic',
            // paddingTop: 6,
            }}
          >
            Provedor-S-Pulveriza????o: {'  '}
          </Text>
          {
            item.isSprayingAgent ?
            <Icon name="check-circle" color="green" />
            :
            <Icon name="close" color="red" />
          } */}
      </Stack>
      <Stack direction="row">
          <Box w="50%" >
            {/* <Text 
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
            </Text> */}
          </Box>
          <Box w="50%">
            <Stack direction="row">
                  {/* <Text 
                    style={{
                    fontSize: 15,
                    fontFamily: 'JosefinSans-Italic',
                    // paddingTop: 6,
                    }}
                  >
                    Parcelas: {' '}
                  </Text>
                  <Text style={{ fontSize: 15, paddingTop: 2,  }}>{item.farmlands.length}</Text> */}
              </Stack>
            </Box>
      </Stack>

        </Box>
        <Box w="20%" style={{ 
          marginTop: 20,
          
        }}>
          <Pressable
            onPress={()=>navigation.navigate('FarmlandForm1', {
              ownerId: item._id,
              ownerName: item.type + ' ' + item.name,
              flag: 'Grupo',
            })}
            >
            <FontAwesomeIcon icon={faTree} size={30} color="#005000" />
          </Pressable>
        </Box>
        </Stack>
      </Stack>
  </TouchableOpacity>
  
  <Stack direction="row" w="100%" style={{ paddingTop: 10,  }} >
        <Box w="100%">
          <Text 
            style={{ fontFamily: 'JosefinSans-Italic'}}
          >
            Registo: {new Date(item.createdAt).toLocaleDateString()} por {'user'}
          </Text>
        </Box>
      </Stack>
    </View>
  )
}

export default GroupItem2