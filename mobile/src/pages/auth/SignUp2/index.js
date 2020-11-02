import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

import { 
  Container, 
  Title, 
  Description, 
  InterestsContainer, 
  Interest, 
  InterestTitle,
  InterestImageFilter,
  InterestImage,
  InterestTitleContainer,
  LoadInterests,
  Content,
  ActivityIndicatorContainer,
  styles
} from './styles';

import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignUp2 = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [themes, setThemes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();
  const { signUp, loadingAuth } = useAuth();

  const route = useRoute();
  const { user } = route.params;
  
  navigation.setOptions({
    headerStyle: {
       elevation: 0,
       backgroundColor: '#01C24E',
    },
    headerTintColor: '#202020'
  })

  async function handleSignUp() {
    // const interests = { interests: selectedInterests }
    // Object.assign(user, interests);

    await signUp(user, selectedInterests);
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

  async function loadThemes() {
    if (total > 0 && themes.length == total) {
      return;
   }

    const response = await api.get(`theme?page=${page}`);
  
    setThemes([... themes, ... response.data]);
    setTotal(response.headers['X-Total-Count']);
    setPage(page + 1);
  }

  useEffect(() => {
    loadThemes();
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      <InterestsContainer>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={themes}
          keyExtractor={interest => String(interest.theme_id)}
          numColumns={2}
          columnWrapperStyle={{ marginHorizontal: 15 }}
          ListHeaderComponent={
            <Content>
              <Title>Por quais desses assuntos você se interessa?</Title>
              <Description>Escolha no mínimo 3. Estamos preparando um ambiente que combine com você :)</Description>
            </Content>
          }
          ListFooterComponent={
            <Content>
            { themes.length < total &&
              <LoadInterests onPress={loadThemes}>
                <Feather name="plus" size={30} color="#01C24E" />
              </LoadInterests>
            }

            <BtnLogin background="#121212" onPress={handleSignUp} style={{ marginBottom: 25 }}>
              <BtnIcon background="#000">
                <Feather name="log-in" color="#01C24E" size={24} />
              </BtnIcon>

              { loadingAuth ?
                  <ActivityIndicatorContainer background="#121212">
                    <ActivityIndicator size="small" color="#01C24E" />
                  </ActivityIndicatorContainer>
                : 
                  <TextBtnLogin color="#01C24E">entrar</TextBtnLogin>
              }

            </BtnLogin>
            </Content>
          }
          renderItem={({ item }) => (
            <Interest onPress={() => handleSelectedInterests(item.theme_id)}>
              <InterestImageFilter
                style={
                  selectedInterests.includes(item.theme_id) ? styles.selected : {}
                } 
              />
                <InterestImage 
                  resizeMode={'cover'} 
                  source={{ uri: item.theme_img_id.img_url }} 
                />
              <InterestTitleContainer>
                <InterestTitle>{item.theme_name}</InterestTitle>
              </InterestTitleContainer>
            </Interest>
          )}
        />
      </InterestsContainer>
    </Container>
  );
}

export default SignUp2;