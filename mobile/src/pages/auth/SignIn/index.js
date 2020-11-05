import React, { useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import { useAuth } from '../../../contexts/auth';

import Input from '../../../components/Input';
import ModalContainer from '../../../components/ModalContainer';
import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

import { Container, Title, ActivityIndicatorContainer } from './styles';

const SignIn = () => {
  const [displayModal, setModalDisplay] = useState(false);

  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);
  const { signIn, loadingAuth } = useAuth();

  function openModal() {
    setModalDisplay(true);
 }

  async function handleSignIn(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha não pode ser nula.').min(5, 'A senha deve ter pelo menos 5 caracteres.'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current.setErrors({});

      const user = {
        email,
        password: data.password,
      }

      const responseLogin = await signIn(user);
      
      if (responseLogin !== 201) {
        setModalDisplay(true);
      }

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      { displayModal &&
        <ModalContainer
          onPress={() => setModalDisplay(false)}
          color_theme="#D85517"
          font_color="#202020"
          btn_title="ok!"
        >

        </ModalContainer>
      }
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
            secureTextEntry={true}
            maxLength={64}
          />
          <BtnLogin background="#F6F6F6" onPress={() => formRef.current.submitForm()}>
            <BtnIcon background="#E0E0E0">
              <Feather name="log-in" color="#690589" size={24} />
            </BtnIcon>
                { loadingAuth ?
                  <ActivityIndicatorContainer background="#121212">
                    <ActivityIndicator size="small" color="#690589" />
                  </ActivityIndicatorContainer>
                    : 
                  <TextBtnLogin color="#690589">entrar</TextBtnLogin>
                }
          </BtnLogin>
        </Form>
      </Container>
    </>
  );
}

export default SignIn;