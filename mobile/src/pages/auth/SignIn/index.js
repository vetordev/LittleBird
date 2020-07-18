import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { signIn } from '../../../services/auth';

import { Container } from './styles';

const SignIn = () => {

  async function handleSignIn() {
    const response = await signIn();

    console.log(response);
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