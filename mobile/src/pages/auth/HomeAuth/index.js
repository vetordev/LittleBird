import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Input from '../../../components/Input';
import { Container, Title, BtnLogin, TextBtnLogin, BtnIcon } from './styles';

const HomeAuth = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  function handleSignIn(data, { reset }) {
    console.log(data);

    if (data.email == "vitorinha@hotmail.com") {
      navigation.navigate('SignIn', { data });
      
      return;
    }

    navigation.navigate('SignUp1', { data });
  }

  return (
    <Container>
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
        <BtnLogin onPress={() => formRef.current.submitForm()}>
          <BtnIcon>
            <Feather name="arrow-right" color="#D85517" size={24} />
          </BtnIcon>
          <TextBtnLogin>login</TextBtnLogin>
        </BtnLogin>
      </Form>
    </Container>
  );
}

export default HomeAuth;