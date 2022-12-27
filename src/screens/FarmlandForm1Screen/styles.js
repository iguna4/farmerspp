/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'ghostwhite',
    },
    headerText: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 24,
        color: 'white',
    },
    description: {
        textAlign: 'left',
        fontFamily: 'JosefinSans-Italic',
         color: 'white',
        fontSize: 16,
    },
    secondDescription: {
        textAlign: 'center',
        fontFamily: 'JosefinSans-Italic',
         color: '#005000',
        fontSize: 18,
        lineHeight: 30,
    },
    formSectionDescription: {
        textAlign: 'center',
        fontFamily: 'JosefinSans-Italic',
        color: '#005000',
        fontSize: 16,
        paddingVertical: 10,
    },
    datepicker: {
        // backgroundColor: 'grey',
        borderRadius: 10,
    },
});

export default styles;
