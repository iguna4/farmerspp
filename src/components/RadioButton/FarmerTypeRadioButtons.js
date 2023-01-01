import React from 'react';
import { Box,  Stack, Radio,  } from 'native-base';






const FarmerTypeRadioButtons = ({ farmerType, setFarmerType}) =>{

    return (
        <Box mb="8" alignItems={'center'}>
        <Radio.Group
            name="myRadioGroup"
            value={farmerType}
            defaultValue="Indivíduo"
            onChange={(nextValue) => setFarmerType(nextValue)}
        >
        <Stack 
            direction={{
                base: "row",
                md: "row"
            }} 
            alignItems={{
                base: "center",
                // md: "center"
            }} 
            space={4} 
            w="100%" 
            >
            <Radio 
                _text={{
                    fontFamily: 'JosefinSans-Bold',
                    color: 'white'
                }}
                value="Indivíduo" my="1"  colorScheme="emerald" size="sm">
                Indivíduo
            </Radio>
            <Radio 
                _text={{
                    fontFamily: 'JosefinSans-Bold',
                    color: 'white'
                }}
                value="Instituição" my="1" mx="1" colorScheme="emerald" size="sm">
                Instituição
            </Radio>
            <Radio 
                _text={{
                    fontFamily: 'JosefinSans-Bold',
                    color: 'white'
                }}
                value="Grupo" my="1" mx="1" colorScheme="emerald" size="sm">
                Grupo
            </Radio>
            </Stack>
    </Radio.Group>
</Box>

    )
};

export default FarmerTypeRadioButtons;