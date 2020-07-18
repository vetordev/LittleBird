import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import Input from '../../../components/Input';

import { Container } from './styles';

const SignUp1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);

  function handleSignUp1 (data, { reset }) {
    const user = {
      email,
      username: data.username,
      password: data.password,
      authorization: true
    }
    
    console.log(user);

    navigation.navigate('SignUp2', { user });
  }

  return (
    <Container>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignUp1}
      >
        <Input name="username" />
        <Input name="password" />
        <TouchableOpacity onPress={() => formRef.current.submitForm()}>
          <Text>próximo</Text>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}

export default SignUp1;