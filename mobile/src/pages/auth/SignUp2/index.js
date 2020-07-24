import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';

import { 
  Container, 
  Title, 
  Description, 
  InterestsContainer, 
  Interest, 
  InterestTitle,
  InterestImage,
  InterestTitleContainer,
  LoadInterests,
  Content,
  styles
} from './styles';

import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignUp2 = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params;
  const { signUp } = useAuth();

  navigation.setOptions({
    headerStyle: {
       elevation: 0,
       backgroundColor: '#01C24E',
    },
    headerTintColor: '#202020'
 })

  async function handleSignUp() {
    console.log(user);
    await signUp(user);
  }

  function handleSelectedInterests(id) {
    const alreadySelected = selectedInterests.findIndex(item => item === id);

    if (alreadySelected >= 0){
      const filteredItems = selectedInterests.filter(item => item !== id) // todos os itens, exceto o selecionado

      setSelectedInterests(filteredItems);
    } else {
      setSelectedInterests([...selectedInterests, id])
    }
  }

  const interests = [
    {
      theme_id: 1,
      theme_name: 'Gravidez',
      theme_img: {
          theme_img_id: 1,
          img_url: "https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      }
    },
    {
      theme_id: 2,
      theme_name: 'Gravidez',
      theme_img: {
          theme_img_id: 1,
          img_url: "https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      }
    },
    {
      theme_id: 3,
      theme_name: 'Gravidez',
      theme_img: {
          theme_img_id: 1,
          img_url: "https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      }
    },
    {
      theme_id: 4,
      theme_name: 'Gravidez',
      theme_img: {
          theme_img_id: 1,
          img_url: "https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      }
    }
  ]
  
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Content>
        <StatusBar style="dark" />
        <Title>Por quais desses assuntos você se interessa?</Title>
        <Description>Escolha no mínimo 3. Estamos preparando um ambiente que combine com você :)</Description>

        <InterestsContainer>
          <FlatList 
            data={interests}
            keyExtractor={interest => String(interest.theme_id)}
            numColumns={2}
            renderItem={({ item }) => (
              <Interest onPress={() => handleSelectedInterests(item.theme_id)}>
                <InterestImage 
                  resizeMode={'cover'} 
                  source={{ uri: item.theme_img.img_url }} 
                  style={selectedInterests.includes(item.theme_id) ? styles.selected : {}} 
                />
                <InterestTitleContainer>
                  <InterestTitle>{item.theme_name}</InterestTitle>
                </InterestTitleContainer>
              </Interest>
            )}
          />
        </InterestsContainer>
        
        <LoadInterests>
          <Feather name="plus" size={30} color="#01C24E" />
        </LoadInterests>

          <BtnLogin background="#121212" onPress={handleSignUp}>
            <BtnIcon background="#000">
              <Feather name="log-in" color="#01C24E" size={24} />
            </BtnIcon>
            <TextBtnLogin color="#01C24E">entrar</TextBtnLogin>
          </BtnLogin>
      </Content>
    </Container>
  );
}

export default SignUp2;