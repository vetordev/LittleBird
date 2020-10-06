import React, { useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';
import Input from '../../../components/Input';

import { Container, Title, ActivityIndicatorContainer } from './styles';
import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignIn = () => {
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);
  const { signIn, loadingAuth } = useAuth();

  async function handleSignIn(data, { reset }) {
    const user = {
      email,
      user_pass: data.password,
    }

    await signIn(user, 'bolinhoroxo');
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
              { loadingAuth ?
                <ActivityIndicatorContainer background="#121212">
                  <ActivityIndicator size="small" color="#690589" />
                </ActivityIndicatorContainer>
                  : 
                <TextBtnLogin color="#690589">próximo</TextBtnLogin>
              }
        </BtnLogin>
      </Form>
    </Container>
  );
}

export default SignIn;