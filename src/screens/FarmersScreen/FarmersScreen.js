/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {ListItem, Avatar, Icon } from '@rneui/themed';

import { FloatingButton } from '../../components/Buttons/Buttons';
import farmersFakeList from '../../fakedata/farmersFakeList';
import { Box, Center, Pressable, Stack } from 'native-base';
import styles from './styles';
import CustomDivider from '../../components/Divider/CustomDivider';


export default function FarmersCcreen({ navigation }) {


  const keyExtractor = (item, index)=>index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.avatar_url}} />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold', color: 'gray', fontSize: 18}}>{item.name} {' '} <Text style={{fontSize: 10}}>({item.age} anos)</Text></ListItem.Title>
        <ListItem.Subtitle>({item.subcategory})</ListItem.Subtitle>
        <CustomDivider
          my={1}
          thickness={1}
          bg="grey"
        />
        <Stack direction="row">
          <Box w="50%" alignItems="center">
            <Text>Pomares</Text>
          </Box>
        <CustomDivider
          my={1}
          thickness={1}
          bg="grey"
          orientation="vertical"
        />
          <Box w="50%" alignItems="center">
            <Text>Cajueiros</Text>
          </Box>
        </Stack>

        <Stack direction="row">
          <Box w="50%" alignItems="center">
            <Text>{item.farmlands}</Text>
          </Box>
          <CustomDivider
            my={1}
            thickness={1}
            bg="grey"
            orientation="vertical"
          />
          <Box w="50%" alignItems="center">
            <Text>{item.trees}</Text>
          </Box>
        </Stack>
        <CustomDivider
          my={1}
          thickness={1}
          bg="grey"
        />
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}
      <Center>
      <Pressable
        onPress={()=>{
          console.log('hello');
        }}
      >
        <Icon
          name="add-circle"
          color="#005000"
          size={50}
          />
        <Text style={styles.iconDescription}>
          Adicionar
        </Text>
        <Text style={styles.iconDescription}>
          Pomar
        </Text>
        </Pressable>
      </Center>
    </ListItem>
  );

  return (
    // <SafeAreaView style={{flex: 1}}>
    <>
      <FloatingButton
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        size="large"
        color="#005000"
        placement="left"
        style={{position: 'absolute', zIndex: 2}}
        onPress={()=>navigation.navigate('FarmerForm1', { user: {
          name: 'evariste musekwa',
          district: 'Mogovolas',
          province: 'Nampula',
        }})}
      />
      <FlatList
        data={farmersFakeList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      </>
  // </SafeAreaView>
  );
}
