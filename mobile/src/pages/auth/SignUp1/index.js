import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CheckBox } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Input from '../../../components/Input';

import { 
  Container, 
  Title, 
  CheckedIconContainer, 
  CheckBoxContainer, 
  LegendCheckBox,
  TextBold
} from './styles';

import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignUp1 = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);

  function handleSignUp1 (data, { reset }) {
    const user = {
      email,
      username: data.username,
      password: data.password,
      authorization: toggleCheckBox
    }

    navigation.navigate('SignUp2', { user });
  }

  return (
    <Container>
      <StatusBar style="light" />
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
          placeholder="s3n#@000"
          legend="Sua senha"
        />

        <CheckBoxContainer>
          <CheckBox 
            containerStyle={{ margin: 0, padding: 0 }}
            checkedColor="#f6f6f6"
            checkedIcon={
              <CheckedIconContainer checked={true}>
                <Feather name="check" size={27} color="#690589" />
              </CheckedIconContainer>
            }
            uncheckedIcon={
              <CheckedIconContainer checked={false}>
                <Feather name="check" size={27} color="#690589" />
              </CheckedIconContainer>
            }
            size={35}
            checked={toggleCheckBox}
            onPress={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
          />
          <LegendCheckBox>
            Li e concordo com os <TextBold>Termos de Uso</TextBold> e <TextBold>Políticas de Privacidade</TextBold>.
          </LegendCheckBox>
        </CheckBoxContainer>

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