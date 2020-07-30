import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

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
  const [isEnabled, setIsEnabled] = useState(true);
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: "#323232", true: "#01C24E" }}
            thumbColor={isEnabled ? "#323232" : "#01C24E"}
          />
        </SessionOption>
        <SessionOption>
          <TitleOption>Manter-me logado</TitleOption>
          <Switch 
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: "#323232", true: "#01C24E" }}
            thumbColor={isEnabled ? "#323232" : "#01C24E"}
          />
        </SessionOption>
      </Session>

      <Session>
        <SessionHeader>
          <Feather name="users" size={25} color="#01C24E" />
          <SessionTitle>Contatos úteis</SessionTitle>
        </SessionHeader>
        <SessionOptionBtn>
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