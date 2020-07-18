import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

const HomeAuth = () => {
  const navigation = useNavigation();

  function navigateToSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <TouchableOpacity onPress={navigateToSignIn}>
        <Text>login</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default HomeAuth;