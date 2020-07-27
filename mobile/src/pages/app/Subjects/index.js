import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Feather } from '@expo/vector-icons';

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
  Type,
  Qtd
} from './styles';

const Subjects = () => {
  const win = Dimensions.get('window');

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Title>Escolha um assunto</Title>
      <View style={{ marginBottom: 20 }}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 14 }}
        >
          {themes.map(item => (
            <Theme key={String(item.theme_id)}>
              <ThemeImage resizeMode="cover" source={{ uri: item.theme_img.img_url }} />
              <ThemeImageFilter />
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
            <Option winWidth={win.width}>
              <OptionImage resizeMode="cover" source={{ uri: item.theme_img.img_url }} />
              <OptionInfos>
                <OptionTitle>As mudanças durante a puberdade</OptionTitle>
                <OptionReacts>
                  <Type>
                    <Feather name="heart" color="#F6F6F6" size={17} />
                    <Qtd>321</Qtd>
                  </Type>
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
          <Option winWidth={win.width} style={{ marginBottom: 65 }}>
            <OptionImage resizeMode="cover" source={{ uri: item.theme_img.img_url }} />
            <OptionInfos>
              <OptionTitle>As mudanças durante a puberdade</OptionTitle>
              <OptionReacts>
                <Type>
                  <Feather name="heart" color="#F6F6F6" size={17} />
                  <Qtd>321</Qtd>
                </Type>
                <Type>
                  <Feather name="message-square" color="#F6F6F6" size={17} />
                  <Qtd>54</Qtd>
                </Type>
              </OptionReacts>
            </OptionInfos>
          </Option>
        )}
      />

    </Container>
  );
}

export default Subjects;