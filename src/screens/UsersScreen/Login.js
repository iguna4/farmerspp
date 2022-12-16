import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SignUpScreen from './SignUpScreen'
import SignInScreen from './SignInScreen'

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
  return (
    <>
    {
        !isNewUser 
        ?  <SignInScreen setIsNewUser={setIsNewUser} /> 
        : <SignUpScreen />
    }
    </>
  )
}

export default Login