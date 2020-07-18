import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useAuth } from '../../../contexts/auth';

import { Container } from './styles';

const SignUp2 = () => {
  const route = useRoute();
  const user = route.params;
  const { signUp } = useAuth();

  async function handleSignUp() {
    console.log(user);
    await signUp(user);
  }
  
  return (
    <Container>
      <TouchableOpacity onPress={handleSignUp}>
        <Text>entrar</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default SignUp2;