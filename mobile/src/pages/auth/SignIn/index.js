import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useAuth } from '../../../contexts/auth';

import { Container } from './styles';

const SignIn = () => {
  const route = useRoute();
  const email = route.params.data.email;

  const { signed, user, signIn } = useAuth();

  console.log(signed);
  console.log(user);
  
  console.log(email);

  async function handleSignIn() {
    await signIn();
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