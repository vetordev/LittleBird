import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../../contexts/auth';

import { Container } from './styles';

const SignIn = () => {
  const { signed, user, signIn } = useAuth();

  console.log(signed);
  console.log(user);

  async function handleSignIn() {
    signIn();
    console.log(signed);
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleSignIn}>
        <Text>entrar</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default SignIn;