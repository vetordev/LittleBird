import React, { useState } from 'react';
import { Switch, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import HeaderBtnBack from '../../../components/HeaderBtnBack';

import { 
  Container,
  Title,
  Session,
  SessionHeader,
  SessionTitle,
  SessionOption,
  SessionOptionBtn,
  TitleOption,
  PanicBtn,
  PanicBtnTitle,
  BtnLogout,
  BtnLogoutText
} from './styles';

const Settings = () => {
  const navigation = useNavigation();
  const [darkTheme, setDarkTheme] = useState(true);
  const [keepLogin, setKeepLogin] = useState(true);
  
  const toggleTheme = () => setDarkTheme(previousState => !previousState);
  const toggleKeepLogin = () => setKeepLogin(previousState => !previousState);

  function sendEmail() {
    MailComposer.composeAsync({
      subject: '',
      recipients: ['heyvitoria.lopes@gmail.com'],
      body: ''
    })
  }

  return (
    <Container>
      <HeaderBtnBack />
      <Title>Configurações</Title>

      <Session>
        <SessionHeader>
          <Feather name="smartphone" size={25} color="#01C24E" />
          <SessionTitle>Aplicativo</SessionTitle>
        </SessionHeader>
        <SessionOption>
          <TitleOption>Modo noturno</TitleOption>
          <Switch 
            value={darkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: "#323232", true: "#01C24E" }}
            thumbColor={darkTheme ? "#323232" : "#01C24E"}
          />
        </SessionOption>
        <SessionOption>
          <TitleOption>Manter-me logado</TitleOption>
          <Switch 
            value={keepLogin}
            onValueChange={toggleKeepLogin}
            trackColor={{ false: "#323232", true: "#01C24E" }}
            thumbColor={keepLogin ? "#323232" : "#01C24E"}
          />
        </SessionOption>
      </Session>

      <Session>
        <SessionHeader>
          <Feather name="users" size={25} color="#01C24E" />
          <SessionTitle>Contatos úteis</SessionTitle>
        </SessionHeader>
        <SessionOptionBtn onPress={sendEmail}>
          <TitleOption>Desenvolvedores (reportar erro)</TitleOption>
        </SessionOptionBtn>
        <SessionOptionBtn>
          <TitleOption>Créditos de mídia</TitleOption>
        </SessionOptionBtn>
        <PanicBtn onPress={() => navigation.navigate('PanicBtn')}>
          <Feather name="alert-triangle" size={22} color="#E9E9E9" />
          <PanicBtnTitle>Ajuda ou emergência</PanicBtnTitle>
        </PanicBtn>
      </Session>

      <BtnLogout>
        <BtnLogoutText>Sair</BtnLogoutText>
        <Feather name="log-out" size={20} color="#B8B8B8" />
      </BtnLogout>
    </Container>
  );
}

export default Settings;