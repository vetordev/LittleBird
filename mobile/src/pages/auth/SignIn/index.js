import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';
import Input from '../../../components/Input';

import { Container, Title } from './styles';
import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignIn = () => {
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);
  const { signIn } = useAuth();

  async function handleSignIn(data, { reset }) {
    const user = {
      email,
      password: data.password,
      username: 'bolinhoroxo'
    }

    await signIn(user);
  }

  return (
    <Container>
      <StatusBar style="light" backgroundColor="#690589" />
      <Title>Bem-vinde de volta, bolinhorosa!</Title>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignIn}
      >
        <Input 
          name="password" 
          color="light"
          iconName="lock"
          placeholder="s3n#@000"
          legend="Sua senha"
        />
        <BtnLogin background="#F6F6F6" onPress={() => formRef.current.submitForm()}>
          <BtnIcon background="#E0E0E0">
            <Feather name="arrow-right" color="#690589" size={24} />
          </BtnIcon>
          <TextBtnLogin color="#690589">próximo</TextBtnLogin>
        </BtnLogin>
      </Form>
    </Container>
  );
}

export default SignIn;