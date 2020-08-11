import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import themes from '../../../services/themes';

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
  const [selectedTheme, setSelectedTheme] = useState(0);
  const win = Dimensions.get('window');
  const navigation = useNavigation();

  function handleThemeFilter(id) {
    setSelectedTheme(selectedTheme === id ? 0 : id);
  }

  function navigateToArticles(item) {
    navigation.navigate('Articles');
  }

  function navigateToForums() {
    navigation.navigate('Forums')
  }
  
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
                  source={{ uri: item.theme_img.img_url }} 
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

          <Carousel 
            layout="tinder"
            layoutCardOffset={9}
            firstItem={themes.length - 1}
            data={themes}
            itemWidth={win.width * 0.8}
            sliderWidth={win.width}
            renderItem={({ item }) => (
              <Option winWidth={win.width} onPress={() => navigateToArticles(item)}>
                <OptionImage resizeMode="cover" source={{ uri: item.theme_img.img_url }} />
                <OptionInfos>
                  <OptionTitle>As mudanças durante a puberdade</OptionTitle>
                  <OptionReacts>
                    <Likes>
                    <Feather name="heart" color="#F6F6F6" size={17} />
                      <Qtd>321</Qtd>
                    </Likes>
                  </OptionReacts>
                </OptionInfos>
              </Option>
            )}
          />

        <SessionHeader>
          <SessionLineDecoration />
              <SessionTitle>Salas de conversa</SessionTitle>
          <SessionLineDecoration />
        </SessionHeader>

        <Carousel 
          layout="tinder"
          layoutCardOffset={9}
          firstItem={themes.length - 1}
          data={themes}
          itemWidth={win.width * 0.8}
          sliderWidth={win.width}
          renderItem={({ item }) => (
            <Option winWidth={win.width} onPress={navigateToForums}>
              <OptionImage 
                resizeMode="cover" 
                source={{ uri: item.theme_img.img_url }} 
              />
              <OptionInfos>
                <OptionTitle>As mudanças durante a puberdade</OptionTitle>
                <OptionReacts>
                  <Likes>
                    <Feather name="heart" color="#F6F6F6" size={17} />
                    <Qtd>321</Qtd>
                  </Likes>
                  <Comments>
                    <Feather name="message-square" color="#F6F6F6" size={17} />
                    <Qtd>54</Qtd>
                  </Comments>
                </OptionReacts>
              </OptionInfos>
            </Option>
          )}
        />

      </Container>
    </ScrollView>
  );
}

export default Subjects;