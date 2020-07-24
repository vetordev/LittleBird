import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Input from '../../../components/Input';

import { Container, Title } from './styles';
import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

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
      <Title>Seja bem-vinde!</Title>
      <Form 
        style={{ width: '100%', alignItems: 'center' }} 
        ref={formRef} 
        onSubmit={handleSignUp1}
      >
        <Input 
          name="username" 
          color="light"
          iconName="user"
          placeholder="exemplo123"
          legend="Seu nome de usuário"
          description="Este nome é o que os outros usuários irão ver. Não revele sua identidade verdadeira para o público."
        />
        <Input 
          name="password" 
          color="light"
          iconName="lock"
          placeholder="amo1FredMeuc@chorro"
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

export default SignUp1;