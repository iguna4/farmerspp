/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';


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
        color: COLORS.main,
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
        color: COLORS.main,
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
        color: COLORS.main,
    },
    signUpDescription: {
        textAlign: 'left',
        fontFamily: 'JosefinSans-Italic',
        fontSize: 16,
    },
    background: {
        position: 'absolute',
        width: 1200,
        height: 1600,
        top: 0,
        opacity: 1,
        transform: [
          {
            translateX: 0,
          },
          {
            translateY: 0,
          },
        ],      
      }, 
});

export default styles;
