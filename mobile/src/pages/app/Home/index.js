import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { Dimensions, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';

import api from '../../../services/api';

import InterestCard from '../../../components/InterestCard';

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

  const { user, token } = useAuth();
  const win = Dimensions.get('window');
  const navigation = useNavigation();

  const interestsP = [
    {
      theme_id: 1,
      theme_name: 'Preservativos',
      theme_img: {
          theme_img_id: 1,
          img_url: 'https://images.unsplash.com/photo-1576071804486-b8bc22106dbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1083&q=80'
      }
    },
    {
      theme_id: 2,
      theme_name: 'Masturbação',
      theme_img: {
          theme_img_id: 1,
          img_url: 'https://images.unsplash.com/photo-1568383245703-b6fccedeefba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
      }
    },
    {
      theme_id: 3,
      theme_name: 'Puberdade',
      theme_img: {
          theme_img_id: 1,
          img_url: 'https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
      }
    },
    {
      theme_id: 4,
      theme_name: 'LGBTQ+',
      theme_img: {
          theme_img_id: 1,
          img_url: 'https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
      }
    }
  ]

  function navigateToInterests() {
    navigation.navigate('Interests');
  }

  useEffect(() => {
    async function getContent() {

      console.log('HOMEEEE', token);

      const responseRecentContent = await api.get('article/forum/date?page=1');
      const responseInterests = await api.get('interest?page=1', 
        { 
          headers : { 
            Authorization: token 
          }
        });
        
      setInterests(responseInterests.data);
      setRecentContent(responseRecentContent.data);
    }

    getContent();
  }, []);

  if (token === null) return <AppLoading />;

  return (
    <>
      <StatusBar style="light" backgroundColor="#121212" />
      <InterestsContainer>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={interests}
          keyExtractor={interest => String(interest.interest_id)}
          numColumns={2}
          columnWrapperStyle={{ marginHorizontal: 15 }}
          ListHeaderComponent={
            <>
              <Title>Olá novamente, <UserName>{user.username}</UserName></Title>
              <IconContainer2 onPress={() => { navigation.navigate('Reform') }}>
                <Feather name="bell" size={15} color="#E9E9E9" />
              </IconContainer2>
              <SessionTitleContainer>
                <SessionTitle>Mais recentes</SessionTitle>
              </SessionTitleContainer>

              <Carousel 
                layout="default"
                data={recentContent}
                firstItem={1}
                itemWidth={win.width * 0.8}
                sliderWidth={win.width}
                renderItem={({ item }) => (
                  <CarouselItem winWidth={win.width}>
                  {item.article_id ? 
                    <>
                      <CarouselImageItem 
                        resizeMode={'cover'} 
                        source={{ uri: item.article_img_id.img_url }} 
                      />
                      <CarouselImageFilter/>
                      <TitleCarouselItem>{item.title}</TitleCarouselItem>
                      <TypeCarouselItem>{'Artigo'}</TypeCarouselItem>
                    </>
                    :
                    <>
                      <CarouselImageItem 
                        resizeMode={'cover'} 
                        source={{ uri: item.forum_img_id.img_url }} 
                      />
                      <CarouselImageFilter/>
                      <TitleCarouselItem>{item.title}</TitleCarouselItem>
                      <TypeCarouselItem>{'Salas de conversa'}</TypeCarouselItem>
                    </>
                  }
                  </CarouselItem>
                )}
              />

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
          renderItem={({ item }) => (
            <InterestCard img_url={item.theme_id.theme_img_id.img_url} name={item.theme_id.theme_name} notDelete />
          )}
        />
      </InterestsContainer>
    </>
  );
}

export default Home;