import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Input from '../../../components/Input';
import { Container, Title } from './styles';
import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const HomeAuth = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  function handleSignIn(data, { reset }) {

    if (data.email == "vitorinha@hotmail.com") {
      navigation.navigate('SignIn', { data });
      
      return;
    }

    navigation.navigate('SignUp1', { data });
  }

  return (
    <Container>
      <StatusBar style="dark" backgroundColor="#D85517" />
      <Title>Digite seu e-mail</Title>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignIn}
      >
        <Input 
          name="email" 
          color="dark" 
          iconName="mail" 
          placeholder="exemplo@exemplo.com"
        />
        <BtnLogin background="#121212" onPress={() => formRef.current.submitForm()}>
          <BtnIcon background="#000">
            <Feather name="arrow-right" color="#D85517" size={24} />
          </BtnIcon>
          <TextBtnLogin color="#D85517">próximo</TextBtnLogin>
        </BtnLogin>
      </Form>
    </Container>
  );
}

export default HomeAuth;