import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

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
  AllThemes,
  WarningContainer,
  WarningContent,
  WarningMessage
} from './styles';

const Subjects = () => {
  const [themes, setThemes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [foruns, setForuns] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const isFocused = useIsFocused();

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

  function navigateToForums(forum_id, forum_title) {
    navigate('Forums', { forum_id, forum_title });
  }

  function getTag() {
    try {  
      const { theme_id } = route.params;
    
      handleThemeFilter(theme_id);

    } catch(err) {
      handleThemeFilter(0);
    }
  }

  async function loadThemes() {
    if (loading) {
      return;
    }

    if (total > 0 && themes.length == total) {
      return;
    }

    setLoading(true);

    const responseThemes = await api.get(`theme?page=${page}`);

    setThemes([... themes, ... responseThemes.data]);

    setTotal(responseThemes.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadThemes();
    getTag();
  }, [isFocused]);
  
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#121212' }}
    >
      <Container>
        <Title>Escolha um assunto</Title>
        <View style={{ marginBottom: 20 }}>
          <FlatList 
            onEndReached={loadThemes}
            onEndReachedThreshold={0.7}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={themes}
            keyExtractor={theme => String(theme.theme_id)}
            contentContainerStyle={{ paddingHorizontal: 14, alignItems: 'center' }}
            ListHeaderComponent= {
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
            }
            renderItem={({ item }) => (
              <Theme onPress={() => handleThemeFilter(item.theme_id)}>
                <ThemeImage 
                  resizeMode="cover" 
                  source={{ uri: item.theme_img_id.img_url }} 
                />
                <ThemeImageFilter style={selectedTheme === item.theme_id ? styles.selected : {}} />
                <ThemeTitle>{item.theme_name}</ThemeTitle>
              </Theme>
            )}
          />
        </View>
        <SessionHeader>
          <SessionLineDecoration />
              <SessionTitle>Artigos</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        { articles.length > 0 ?
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
          :
          <WarningContainer>
            <WarningContent>
              <SvgUri uri="https://www.flaticon.com/svg/static/icons/svg/3468/3468182.svg" width={130} height={130} />
              <WarningMessage>Ainda não temos artigos sobre esse assunto.</WarningMessage>
            </WarningContent>
          </WarningContainer>
        }

        <SessionHeader>
          <SessionLineDecoration />
              <SessionTitle>Salas de conversa</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        { foruns.length > 0 ?
          <Carousel 
            layout="tinder"
            layoutCardOffset={9}
            firstItem={foruns.length - 1}
            data={foruns}
            itemWidth={win.width * 0.8}
            sliderWidth={win.width}
            renderItem={({ item }) => (
              <Option winWidth={win.width} onPress={() => navigateToForums(item.forum_id, item.title)}>
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
          :
          <WarningContainer>
            <WarningContent>
              <SvgUri uri="https://www.flaticon.com/svg/static/icons/svg/3468/3468182.svg" width={130} height={130} />
              <WarningMessage>Ainda não temos salas de conversa sobre esse assunto.</WarningMessage>
            </WarningContent>
          </WarningContainer>
        }
      </Container>
    </ScrollView>
  );
}

export default Subjects;