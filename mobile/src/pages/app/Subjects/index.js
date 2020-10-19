import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../services/api';

import { 
  Container,
  Title,
  Theme,
  ThemeImage,
  ThemeImageFilter,
  ThemeTitle,
  SessionHeader,
  SessionLineDecoration,
  SessionTitle,
  Option,
  OptionImage,
  OptionInfos,
  OptionTitle,
  OptionReacts,
  Comments,
  Likes,
  Qtd,
  styles,
  AllThemes
} from './styles';

const Subjects = () => {
  const route = useRoute();
  // const { theme_id } = route.params ? route.params : 0;

  const [themes, setThemes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [foruns, setForuns] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const win = Dimensions.get('window');
  const { navigate } = useNavigation();
  

  async function handleThemeFilter(theme_id) {
    setSelectedTheme(theme_id);

    if (theme_id == 0) {
      const responseArticles = await api.get('article?page=1');
      const responseForuns = await api.get('forum?page=1');

      setArticles(responseArticles.data);
      setForuns(responseForuns.data);

    } else {
      const responseArticles = await api.get(`article/theme/${theme_id}/like?page=1`);
      const responseForuns = await api.get(`forum/theme/${theme_id}/like?page=1`);

      setArticles(responseArticles.data);
      setForuns(responseForuns.data);

    }
  }

  function navigateToArticles(article_id) {
    navigate('Articles', { article_id });
  }

  function navigateToForums(forum_id) {
    navigate('Forums', { forum_id });
  }

  function getTag() {
    try {  
      const { theme_id } = route.params;
    
      handleThemeFilter(theme_id);

    } catch(err) {
      return false;
    }
  }

  useEffect(() => {
    async function getThemes() {
      const responseThemes = await api.get('theme');
      setThemes(responseThemes.data);
    }

    getThemes();
    getTag();
    handleThemeFilter(0);
    
  }, []);
  
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#121212' }}
    >
      <Container>
        <Title>Escolha um assunto</Title>
        <View style={{ marginBottom: 20 }}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 14, alignItems: 'center' }}
          >
            <AllThemes 
              key={String(0)} 
              onPress={() => handleThemeFilter(0)}
            >
              <ThemeImage 
                resizeMode="cover" 
                source={{ uri: 'https://images.unsplash.com/photo-1564115484-a4aaa88d5449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' }} 
              />
              <ThemeImageFilter style={selectedTheme === 0 ? styles.selected : {}} />
              <ThemeTitle>Todos</ThemeTitle>
            </AllThemes>

            {themes.map(item => (
              <Theme 
                key={String(item.theme_id)} 
                onPress={() => handleThemeFilter(item.theme_id)}
              >
                <ThemeImage 
                  resizeMode="cover" 
                  source={{ uri: item.theme_img_id.img_url }} 
                  />
                <ThemeImageFilter style={selectedTheme === item.theme_id ? styles.selected : {}} />
                <ThemeTitle>{item.theme_name}</ThemeTitle>
              </Theme>
            ))}
          </ScrollView>
        </View>

        <SessionHeader>
          <SessionLineDecoration />
              <SessionTitle>Artigos</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        { articles &&
          <Carousel 
            layout="tinder"
            layoutCardOffset={9}
            firstItem={articles.length - 1}
            data={articles}
            itemWidth={win.width * 0.8}
            sliderWidth={win.width}
            renderItem={({ item }) => (
              <Option winWidth={win.width} onPress={() => navigateToArticles(item.article_id)}>
                <OptionImage resizeMode="cover" source={{ uri: item.article_img_id.img_url }} />
                <OptionInfos>
                  <OptionTitle>{item.title}</OptionTitle>
                  <OptionReacts>
                    <Likes>
                    <Feather name="heart" color="#F6F6F6" size={17} />
                      <Qtd>{item.no_like}</Qtd>
                    </Likes>
                  </OptionReacts>
                </OptionInfos>
              </Option>
            )}
          />
        }

        <SessionHeader>
          <SessionLineDecoration />
              <SessionTitle>Salas de conversa</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        { foruns &&
          <Carousel 
            layout="tinder"
            layoutCardOffset={9}
            firstItem={foruns.length - 1}
            data={foruns}
            itemWidth={win.width * 0.8}
            sliderWidth={win.width}
            renderItem={({ item }) => (
              <Option winWidth={win.width} onPress={() => navigateToForums(item.forum_id)}>
                <OptionImage 
                  resizeMode="cover" 
                  source={{ uri: item.img_url }} 
                />
                <OptionInfos>
                  <OptionTitle>{item.title}</OptionTitle>
                  <OptionReacts>
                    <Likes>
                      <Feather name="heart" color="#F6F6F6" size={17} />
                      <Qtd>{item.no_like}</Qtd>
                    </Likes>
                    <Comments>
                      <Feather name="message-square" color="#F6F6F6" size={17} />
                      <Qtd>{item.no_comment}</Qtd>
                    </Comments>
                  </OptionReacts>
                </OptionInfos>  
              </Option>
            )}
          />
        }

      </Container>
    </ScrollView>
  );
}

export default Subjects;