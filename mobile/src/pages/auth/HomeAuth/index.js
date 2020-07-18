import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import Input from '../../../components/Input';
import { Container } from './styles';

const HomeAuth = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  function handleSignIn(data, { reset }) {
    console.log(data);

    if (data.email == "vitorinha@hotmail.com") {
      navigation.navigate('SignUp1', { data });
      
      return;
    }

    navigation.navigate('SignIn', { data });
  }

  return (
    <Container>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignIn}
      >
        <Input name="email" />

        <TouchableOpacity onPress={() => formRef.current.submitForm()}>
          <Text>login</Text>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}

export default HomeAuth;