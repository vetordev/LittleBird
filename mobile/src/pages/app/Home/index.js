import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';

import api from '../../../services/api';

import InterestCard from '../../../components/InterestCard';
import ShimmerHomeContent from '../../../components/Shimmer/ShimmerHomeContent';
import ShimmerInterestCard from '../../../components/Shimmer/ShimmerInterestCard';

import { 
  Title,
  UserName,
  InterestsContainer,
  SessionTitleContainer,
  SessionTitle,
  CarouselItem,
  IconContainer,
  InterestOptionsContainer,
  CarouselImageFilter,
  TitleCarouselItem,
  TypeCarouselItem,
  CarouselImageItem,
  IconContainer2,
  InterestsTitleContainer
} from './styles';

const Home = () => {
  const [recentContent, setRecentContent] = useState([]);
  const [interests, setInterests] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingRecentContent, setLoadingRecentContent] = useState(false);
  const [loadingInterests, setLoadingInterests] = useState(false);

  const { user, token } = useAuth();
  const win = Dimensions.get('window');
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  function navigateToArticles(article_id) {
    navigate('Articles', { article_id });
  }

  function navigateToForums(forum_id, forum_title) {
    navigate('Forums', { forum_id, forum_title });
  }

  function navigateToInterests() {
    navigate('Interests');
  }


  async function loadRecentContent() {
    if (loadingRecentContent) {
      return;
    }

    if (total > 0 && recentContent.length == total) {
      return;
    }

    setLoadingRecentContent(true);

    const responseRecentContent = await api.get(`article/forum/date?page=${page}`);
    
    setRecentContent([... recentContent, ... responseRecentContent.data]);

    setTotal(responseRecentContent.headers['x-total-count']);
    setPage(page + 1);
    setLoadingRecentContent(false);
  }

  useEffect(() => {    
    async function getContent() {
      loadRecentContent();

      setLoadingInterests(true);
      const responseInterests = await api.get('interest?page=1', 
        { 
          headers : { 
            Authorization: token 
          }
        });
        
      setInterests(responseInterests.data);
      setLoadingInterests(false);
    }

    getContent();
  }, [isFocused]);

  return (
    <>
      <StatusBar style="light" backgroundColor="#121212" />
      <InterestsContainer>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={loadingInterests ? [<ShimmerInterestCard />] : interests}
          keyExtractor={interest => String(interest.interest_id)}
          numColumns={2}
          columnWrapperStyle={{ marginHorizontal: 15 }}
          ListHeaderComponent={
            <>
              <Title>Olá novamente, <UserName>{user.username}</UserName></Title>
              <IconContainer2 onPress={() => { navigate('Reform') }}>
                <Feather name="bell" size={15} color="#E9E9E9" />
              </IconContainer2>
              <SessionTitleContainer>
                <SessionTitle>Mais recentes</SessionTitle>
              </SessionTitleContainer>

              { loadingRecentContent 
                ?
                  <ShimmerHomeContent />
                : 
                <Carousel 
                  layout="default"
                  data={recentContent}
                  onEndReached={loadRecentContent}
                  onEndReachedThreshold={0.1}
                  itemWidth={win.width * 0.8}
                  sliderWidth={win.width}
                  renderItem={({ item }) => (
                    <>
                    {item.article_id ? 
                      <CarouselItem 
                        winWidth={win.width}
                        onPress={() => navigateToArticles(item.article_id)}
                      >
                        <CarouselImageItem 
                          resizeMode={'cover'} 
                          source={{ uri: item.article_img_id.img_url }} 
                        />
                        <CarouselImageFilter/>
                        <TitleCarouselItem>{item.title}</TitleCarouselItem>
                        <TypeCarouselItem>{'Artigo'}</TypeCarouselItem>
                      </CarouselItem>
                      :
                      <CarouselItem 
                        winWidth={win.width}
                        onPress={() => navigateToForums(item.forum_id, item.title)}
                      >
                        <CarouselImageItem 
                          resizeMode={'cover'} 
                          source={{ uri: item.forum_img_id.img_url }} 
                        />
                        <CarouselImageFilter/>
                        <TitleCarouselItem>{item.title}</TitleCarouselItem>
                        <TypeCarouselItem>{'Salas de conversa'}</TypeCarouselItem>
                      </CarouselItem>
                    }
                    </>
                  )}
                />
              }

              <InterestOptionsContainer>
                <InterestsTitleContainer onPress={navigateToInterests}>
                  <SessionTitle>Seus interesses</SessionTitle>
                </InterestsTitleContainer>
                <IconContainer onPress={navigateToInterests}>
                  <Feather name="plus" size={15} color="#E9E9E9" />
                </IconContainer>
              </InterestOptionsContainer>

            </>
          }
          ListFooterComponent={<View style={{ height: 30 }} />}
          renderItem={({ item }) =>(
             loadingInterests ? 
                item
              :
                <InterestCard 
                  img_url={item.theme_id.theme_img_id.img_url} 
                  name={item.theme_id.theme_name} 
                  notDelete 
                  idTheme={item.theme_id.theme_id}
                />
            )
          }
        />
      </InterestsContainer>
    </>
  );
}

export default Home;