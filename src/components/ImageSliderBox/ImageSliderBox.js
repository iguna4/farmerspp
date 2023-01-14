
import React, { useState, } from "react";
import { View, } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const initialImageState = [
    '../../../assets/images/home-pic-2',
    '../../../assets/images/home-pic-3',
    '../../../assets/images/home-pic-4',
    '../../../assets/images/home-pic-5',
    '../../../assets/images/home-pic-6',
    '../../../assets/images/home-pic-7',
    '../../../assets/images/home-pic-8',
    '../../../assets/images/home-pic-10',
    '../../../assets/images/home-pic-11',
]

export default function ({ }){
    const [images, setImages] = useState(initialImageState);
    console.log('log:', JSON.stringify(images));

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <SliderBox 
                images={images}
            />
        </View>
    )
}