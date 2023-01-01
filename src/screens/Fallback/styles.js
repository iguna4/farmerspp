/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    // SignInScreen
    loginContainer: {
        flex: 1,
        // marginVertical: 5,
        backgroundColor: 'ghostwhite',
    },
    signInTitle: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 26,
        color: '#005000',
        textAlign: 'center',
    },
    signInSubTitle: {
        fontFamily: 'JosefinSans-Regular',
        textAlign: 'center',
    },
    signInErrorMessage: {
        fontFamily: 'JosefinSans-Regular',
        textAlign: 'center',
        fontSize: 16,
        color: 'red',
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
