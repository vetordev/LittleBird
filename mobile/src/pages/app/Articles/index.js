import React, { useState, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { 
   Container,
   Content,
   Title,
   Cover,
   Author,
   Text,
   Options,
   Option,
   Recommendations,
   TitleRecommendations,
   Item,
   TitleItem,
   LinkItem,
   LinkItemContainer
} from './styles';

import HeaderBtnBack from '../../../components/HeaderBtnBack';

// const OpenURLButton = ({ url, children }) => {
//    const handlePress = useCallback(async () => {
//       const supported = await Linking.canOpenURL(url);

//       if (supported) {
//          await Linking.openURL(url);
//       } else {
//          Alert.alert('Há um problema com esse link...');
//       }
//    }, [url]);

//    return (
//       <LinkItemContainer onPress={handlePress} title={children}>
//          <LinkItem>www.spotify.br</LinkItem>
//       </LinkItemContainer>
//    )
// }

const Articles = () => {
   const [liked, setLiked] = useState(false);
   const [saved, setSaved] = useState(false);
   const navigation = useNavigation();

   async function handlePress(url) {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
         await Linking.openURL(url);
      } else {
         Alert.alert('Há um problema com esse link...');
      }
   }

   return (
      <Container>
         <HeaderBtnBack />
         <Cover resizeMode="cover" source={{ uri: 'https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' }} ></Cover>
            <Content>
               <Options>
                  <Option onPress={() => setLiked(liked ? false : true)}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={20} color={liked ? '#DA2243' : '#F6F6F6'} />
                  </Option>
                  <Option onPress={() => setSaved(saved ? false : true)}>
                     <MaterialIcons name={saved ? 'bookmark' : 'bookmark-border'} size={20} color="#F6F6F6" />
                  </Option>
               </Options>
               <Title>As mudanças durante a puberdade</Title>
               <Author>Dra. Cláudia Alcubierre</Author>
               <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </Text>
               <Recommendations>
                  <TitleRecommendations>Saiba mais:</TitleRecommendations>
                  <Item>
                     <Feather name="check" color="#834397" size={25} />
                     <TitleItem>Vídeo:</TitleItem>
                     <LinkItemContainer onPress={() => navigation.navigate('Webview')}>
                        <LinkItem>www.com.br</LinkItem>
                     </LinkItemContainer>
                  </Item>
                  <Item>
                     <Feather name="check" color="#834397" size={25} />
                     <TitleItem>Podcast:</TitleItem>
                     <LinkItemContainer>
                        <LinkItem>www.com.br</LinkItem>
                     </LinkItemContainer>
                  </Item>
               </Recommendations>
            </Content>
      </Container>
   );
}

export default Articles;