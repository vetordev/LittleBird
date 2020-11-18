import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import api from '../../../services/api';

import NoticeinScreen from '../../../components/NoticeInScreen';
import ShimmerSubjectsContent from '../../../components/Shimmer/ShimmerSubjectsContent';

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
} from './styles';

const Subjects = () => {
  const [themes, setThemes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [foruns, setForuns] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(0);
  // const [lastSelectedTheme, setLastSelectedTheme] = useState(0);
  const [pageThemes, setPageThemes] = useState(1);
  const [totalThemes, setTotalThemes] = useState(0);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [pageArticles, setPageArticles] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [pageForums, setPageForums] = useState(1);
  const [totalForums, setTotalForums] = useState(0);
  const [loadingForums, setLoadingForums] = useState(false);

  const route = useRoute();
  const isFocused = useIsFocused();

  const win = Dimensions.get('window');
  const { navigate } = useNavigation();
  

  async function handleThemeFilter(theme_id) {    
    setSelectedTheme(theme_id);

    let responseForuns;
    let responseArticles;

    if (theme_id == 0) {
      responseForuns = await api.get('forum?page=1');
      responseArticles = await api.get('article?page=1');
      
    } else {
      responseForuns = await api.get(`forum/theme/${theme_id}/like?page=1`);
      responseArticles = await api.get(`article/theme/${theme_id}/like?page=1`);
    }

    setForuns(responseForuns.data);
    setArticles(responseArticles.data);

    setLoadingArticles(false);
    setLoadingForums(false);
  }

  async function loadArticles() {
    if (loadingArticles) {
      return;
    }

    if (totalArticles > 0 && articles.length == totalArticles) {
      return;
    }
    
    setLoadingArticles(true);

    let responseArticles;

    if (selectedTheme == 0) {
      responseArticles = await api.get(`article?page=${pageArticles}`);

    } else {
      responseArticles = await api.get(`article/theme/${selectedTheme}/like?page=${pageArticles}`);
    }

    setArticles([... articles, ... responseArticles.data]);
    setTotalArticles(responseArticles.headers['x-total-count']);
    setPageArticles(pageArticles + 1);
    setLoadingArticles(false);
  }

  async function loadForums() {
    if (loadingForums) {
      return;
    }

    if (totalForums > 0 && articles.length == totalForums) {
      return;
    }
    
    setLoadingForums(true);

    let responseForums;

    if (selectedTheme == 0) {
      responseForums = await api.get(`forum?page=${pageForums}`);

    } else {
      responseForums = await api.get(`forum/theme/${selectedTheme}/like?page=${pageForums}`);
    }

    setForuns([... foruns, ... responseForums.data]);
    setTotalForums(responseForums.headers['x-total-count']);
    setPageForums(pageForums + 1);
    setLoadingForums(false);
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
    if (loadingThemes) {
      return;
    }

    if (totalThemes > 0 && themes.length == totalThemes) {
      return;
    }

    setLoadingThemes(true);

    const responseThemes = await api.get(`theme?page=${pageThemes}`);

    setThemes([... themes, ... responseThemes.data]);

    setTotalThemes(responseThemes.headers['x-total-count']);
    setPageThemes(pageThemes + 1);
    setLoadingThemes(false);
  }

  useEffect(() => {
    setLoadingArticles(true);
    setLoadingForums(true);
    
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
            // initialScrollIndex={themes.indexOf(selectedTheme)}
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

        { loadingArticles ?
          <ShimmerSubjectsContent />
          : (
            articles.length > 0 ?
            <Carousel 
              layout="tinder"
              layoutCardOffset={9}
              onEndReached={loadArticles}
              onEndReachedThreshold={0.7}
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
            <NoticeinScreen
              img_url="https://www.flaticon.com/svg/static/icons/svg/3468/3468182.svg"
              message="Ainda não temos artigos sobre esse assunto."
            />)
        }

        <SessionHeader>
          <SessionLineDecoration />
            <SessionTitle>Salas de conversa</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        { loadingForums ?
          <ShimmerSubjectsContent />
        : (
            foruns.length > 0 ?
              <Carousel 
                layout="tinder"
                layoutCardOffset={9}
                onEndReached={loadForums}
                onEndReachedThreshold={0.7}
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
              <NoticeinScreen
                img_url="https://www.flaticon.com/svg/static/icons/svg/3468/3468182.svg"
                message="Ainda não temos salas de conversa sobre esse assunto."
              />
          )
        }
      </Container>
    </ScrollView>
  );
}

export default Subjects;