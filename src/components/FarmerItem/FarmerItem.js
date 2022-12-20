import {Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {ListItem, Avatar, Icon } from '@rneui/themed';

import { Box, Center, Pressable, Stack } from 'native-base';
import styles from './styles';
import CustomDivider from '../../components/Divider/CustomDivider';
import { randomRBG } from '../../helpers/randomRgB';
import { getInitials } from '../../helpers/getInitials';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';



const FarmerItem = ({ item, route }) => {

   const [visible, setVisible] = useState(false);
   const navigation = useNavigation();

  // const handleItem = ()=>{
  //  return <AlertModal
  //   visible={visible}
  //   setVisible={setVisible}
  //  />
  // }

  return (
    <View style={{ 
      flex: 1, 
      width: '100%',
      paddingHorizontal: 5,         
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: 'white', 
      marginVertical: 10,
      // borderRadius: 10,
      }}
    >
    <Stack direction="row">
    <View
      style={{ 
        width: '80%', 
        minHeight: 120, 
        marginVertical: 10, 
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 10,
        }}
    >
    <TouchableOpacity
      onPress={()=>{
        setVisible(true)
      }}
    >
      <Text 
        style={{ 
          fontFamily: 'JosefinSans-BoldItalic', 
          color: '#005000',
          fontSize: 18,
        }}
      >
        {item?.names.otherNames} {item?.names.surname} 
        <Text style={{fontSize: 14, color: 'grey', }}>
          {' '}({new Date().getFullYear() - new Date(item?.birthDate).getFullYear()} anos)
        </Text>
      </Text>
      <Stack direction="row" space={3}>
        <Avatar 
          size={50}
          rounded={true}
          title={getInitials(item?.names.otherNames, item?.names.surname)}
          containerStyle={{ 
            backgroundColor: randomRBG(), 
            marginVertical: 8, 
          }}
        />
        <Box>
          <Stack direction="column">
              <Text style={styles.farmerInfo}>
                Produtor {item?.category}
                {' '}
              </Text>
              <Stack direction="row" space={1}>
                <Box w="50%">
                  <Text selectable={true} 
                    style={styles.farmerInfo}
                  >
                      Tel: {
                    item?.contact?.primaryPhone ? 
                    item?.contact?.primaryPhone :
                    item?.contact?.secondaryPhone ?
                    item?.contact?.secondaryPhone :
                    'Nenhum'
                    }
                  </Text>
                </Box>
                <Box w="50%">
                  <Text style={styles.farmerInfo}>
                    PSP: {item?.isSprayingAgent ? 'Sim': 'Não'}
                  </Text> 
                </Box>
              </Stack>
              <Stack direction="row" space={1}>
                <Box w="50%">
                  <Text style={styles.farmerInfo}>
                    Pomares: {item?.farmlands ? item?.farmlands?.length : 0 }
                  </Text>
                </Box>
                <Box w="50%">
                  <Text style={styles.farmerInfo}>
                    Cajueiros: {item?.farmlands ? item?.farmlands?.length : 0 }
                  </Text>
                </Box>
              </Stack>

          </Stack>
        </Box>
      </Stack>
      </TouchableOpacity>
      <CustomDivider
          // marginVertical="2"
          thickness={1}
          bg="grey"
      />
      <Text style={{textAlign: 'right', fontSize: 12, fontFamily: 'JosefinSans-Italic'}}>Registo aos {new Date(item.createdAt).toLocaleDateString()} por user</Text>
      </View>
      <View
        style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: randomRBG(),
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            navigation.navigate('FarmlandForm1', {
              farmerId: JSON.stringify(item?._id)
            })
          }}
        >
          <Icon 
            name="add"
            color="#ffffff"
            size={40}
          />
        </TouchableOpacity>
      </View>
      </Stack>
    </View>
  )
}

export default FarmerItem