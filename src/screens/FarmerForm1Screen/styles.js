/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    headerText: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 30,
        color: '#005000',
    },
    description: {
        textAlign: 'left',
        fontFamily: 'JosefinSans-Italic',
         color: '#005000',
        fontSize: 16,
    },
    datepicker: {
        // backgroundColor: 'grey',
        borderRadius: 10,
    },
});

export default styles;
