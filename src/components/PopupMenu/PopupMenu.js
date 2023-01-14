
import { Icon } from "@rneui/base";
import { StyleSheet, Text, View } from "react-native";
import { Stack, Box, Center } from 'native-base';
import CustomDivider  from '../Divider/CustomDivider'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
   } from "react-native-popup-menu";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

   
   const PopupMenu = ({  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();

    return (

      <MenuProvider
        style={{
          position: 'absolute',
          top: 40,
          left: 30,
          zIndex: 4,
        }}
      >
        <Menu
        renderer={renderers.SlideInMenu}
          opened={true}
          onBackdropPress={() =>{}}
          onSelect={()=>{}}
        >
          <MenuTrigger
            
            customStyles={{
              triggerWrapper: {
                position: 'absolute', 
                top: -30, 
                left: -20,
                zIndex: 6,
              },
            }}
          >
             {/* <Icon
              onPress={()=>setIsOpen(true)}
             name="add-circle" color="#005000" size={80} /> */}
          </MenuTrigger>
          <MenuOptions>
          <View 
            style={{
              flex: 1,
              backgroundColor: 'ghostwhite',
              height: "80%",
              width: '100%',
              paddingBottom: 30,
              zIndex: 4,
            }}
            >
            <Stack direction="row" w="100%">
              <Box w="80%">

                <Text
                  style={{ 
                    color: '#005000', 
                    fontSize: 20, 
                    fontFamily: 'JosefinSans-Bold',
                    marginLeft: 35,
                    paddingVertical: 15,
                  }}
                  >
                  Registar..
                </Text>
              </Box>
              <Box w="20%" style={{
                marginTop: 20,
                paddingRight: 20,
              }}>

                <Icon 
                  onPress={()=>setIsOpen(false)}
                name="close" size={35} color="grey" />
              </Box>
              </Stack>
            <MenuOption 
              customStyles={{
                optionWrapper: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // width: 300,
                  height: 45,
                },
              }}
              onSelect={
                () => navigation.navigate('IndividualFarmerForm', 
                  { user: {
                    name: 'evariste musekwa',
                    district: 'Mogovolas',
                    province: 'Nampula',
                  }})
            }
            >
              <Box
                style={{
                  paddingVertical: 5,
                }}
              >

              <Stack direction="row" space={4}  ml="7" >
              <Icon name="person" size={30} color="grey" />
              <Text 
                style={{
                  color: 'grey', 
                  fontSize: 18, 
                  fontFamily: 'JosefinSans-Bold'
                }}
              >
                Produtor Singular
              </Text>
              </Stack>
            </Box>
            </MenuOption>
            <Center style={{
              width: "80%",
              marginLeft: 35,
              marginVertical: 2,
            }}>
              <CustomDivider thickness={1} my={2}  bg={"#005000"} />
            </Center>
            <MenuOption 
              customStyles={{
                optionWrapper: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 45,
                },
              }}
              onSelect={() => navigation.navigate('InstitutionalFarmerForm')} 
              >
            <Box
              style={{
                paddingVertical: 5,
              }}
             >
              <Stack direction="row" space={4}  ml="7">
                <Icon name="house-siding" size={30} color="grey" />
                <Text 
                  style={{
                    color: 'grey', 
                    fontSize: 18, 
                    fontFamily: 'JosefinSans-Bold'
                  }}
                  >
                    Produtor Institucional
                  </Text>
              </Stack>
            </Box>            
            </MenuOption>
            <Center style={{
              width: "80%",
              marginLeft: 35,
              marginVertical: 2,
            }}>
              <CustomDivider thickness={1} my={2}  bg={"#005000"} />
            </Center>
            <MenuOption 
              customStyles={{
                optionWrapper: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 45,
                },
              }}
              onSelect={() => navigation.navigate('GroupFarmerForm')} 
              >
              <Box
                style={{
                  paddingVertical: 5,
                }}
              >

                <Stack direction="row" space={4}  ml="7">
                  <Icon name="people" size={30} color="grey" />
                  <Text 
                    style={{
                      color: 'grey', 
                      fontSize: 18, 
                      fontFamily: 'JosefinSans-Bold',
                      
                    }}
                    >
                    Grupo de Produtores
                  </Text>
                </Stack>
              </Box>            
            </MenuOption>
            </View>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
   };



// export default function MenuWrapper () {
  
//   return (
//     // <View style={{
//     //   flex: 1,
//     //   backgroundColor: 'ghostwhite',
//     //   maxHeight: "35%",
//     //   width: '100%',
//     //   // position: 'absolute',
//     //   // bottom: 200,
//     //   // left: 0,

//     // }}>

//       <PopupMenu />
//     // </View>
//   )
// } 


   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
})

   export default PopupMenu;