import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import { useAuth } from '../../../contexts/auth';
import Input from '../../../components/Input';

import { Container } from './styles';

const SignIn = () => {
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);
  const { signIn } = useAuth();

  async function handleSignIn(data, { reset }) {
    const user = {
      email,
      password: data.password
    }

    await signIn(user);
  }

  return (
    <Container>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignIn}
      >
        <Input name="password" />
        <TouchableOpacity onPress={() => formRef.current.submitForm()}>
          <Text>entrar</Text>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}

export default SignIn;