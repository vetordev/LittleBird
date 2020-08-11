import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../contexts/auth';

import InterestCard from '../../../components/InterestCard';

import { 
  Title,
  UserName,
  Interest,
  InterestImage,
  InterestImageFilter,
  InterestTitle,
  InterestTitleContainer,
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
} from './styles';

const Home = () => {
  const { user } = useAuth();
  const win = Dimensions.get('window');
  const navigation = useNavigation();

  console.log('username', user);

  const interests = [
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

  return (
    <>
      <StatusBar style="light" backgroundColor="#121212" />
      <InterestsContainer>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={interests}
          keyExtractor={interest => String(interest.theme_id)}
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
                data={interests}
                firstItem={1}
                itemWidth={win.width * 0.8}
                sliderWidth={win.width}
                renderItem={({ item }) => (
                  <CarouselItem winWidth={win.width}>
                    <CarouselImageItem resizeMode={'cover'} source={{ uri: item.theme_img.img_url }} />
                    <CarouselImageFilter/>
                    <TitleCarouselItem>As mudanças durante a puberdade</TitleCarouselItem>
                    <TypeCarouselItem>Artigo</TypeCarouselItem>
                  </CarouselItem>
                )}
              />

              <InterestOptionsContainer>
                <SessionTitleContainer>
                  <SessionTitle>Seus interesses</SessionTitle>
                </SessionTitleContainer>
                <IconContainer>
                  <Feather name="plus" size={15} color="#E9E9E9" />
                </IconContainer>
              </InterestOptionsContainer>

            </>
          }
          ListFooterComponent={<View style={{ height: 30 }} />}
          renderItem={({ item }) => (
            <InterestCard img_url={item.theme_img.img_url} name={item.theme_name} notDelete />
          )}
        />
      </InterestsContainer>
    </>
  );
}

export default Home;