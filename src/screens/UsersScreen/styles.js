/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    // SignInScreen
    signInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInTitle: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 26,
        color: '#005000',
    },
    signInSubTitle: {
        fontFamily: 'JosefinSans-Regular',
    },
    signInErrorMessage: {
        fontFamily: 'JosefinSans-Regular',
        textAlign: 'center',
        fontSize: 16,
        color: '#2c2c2c',
        paddingVertical: 10,
    },
    signInLink: {
        color: '#005000',
        textDecorationLine: 'underline',
        fontFamily: 'JosefinSans-Regular',
    },

    // SignUpScreen
    signUpContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    signUpHeaderText: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 30,
        color: '#005000',
    },
    signUpDescription: {
        textAlign: 'left',
        fontFamily: 'JosefinSans-Italic',
        fontSize: 16,
    },
});

export default styles;
