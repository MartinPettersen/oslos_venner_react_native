import { View, Text } from 'react-native'
import React from 'react'
import LoginPage from '../components/(login)/LoginPage'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/Types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  return (
    <LoginPage navigation={navigation}/>
  )
}

export default Login