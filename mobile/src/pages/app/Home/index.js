import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../../contexts/auth';

import { Container } from './styles';

const Home = () => {
  const { signed, signOut } = useAuth();

  console.log(signed);

  function handleSignOut() {
    signOut();
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>sair</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default Home;