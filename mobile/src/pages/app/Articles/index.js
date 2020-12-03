import React, { useState, useEffect } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

import HeaderBtnBack from '../../../components/HeaderBtnBack';
import TagsThemes from '../../../components/Tags';

import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';

import { 
   Container,
   Content,
   Title,
   Cover,
   Author,
   AuthorName,
   Options,
   Option,
   Recommendations,
   TitleRecommendations,
   Item,
   TitleItem,
   LinkItem,
   LinkItemContainer,
   styles
} from './styles';

const Articles = () => {
   const [article, setArticle] = useState({});
   const [recommendations, setRecommendations] = useState([]);
   const [themes, setThemes] = useState([]);
   const [liked, setLiked] = useState(false);
   const [saved, setSaved] = useState(false);

   const navigation = useNavigation();
   const route = useRoute();
   const { article_id } = route.params;
   const { token } = useAuth();

   // const articleTxt = '<t>Lorem ipsum dolor sit amet, <marker1>consectetur adipiscing elit</marker1>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>Ut enim ad minim veniam, quis nostrud <marker2>exercitation</marker2> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <marker3>reprehenderit in voluptate</marker3> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</t>'

   function openWebView(url) {
      navigation.navigate('Webview', { link: url });
   }

   async function handleSetSaved() {

      if (!saved) {
         const savedArticles = await AsyncStorage.getItem('@LittleBird:articles');

         if (savedArticles) {
            await AsyncStorage.setItem('@LittleBird:articles', JSON.stringify([... JSON.parse(savedArticles), article]));
         } else {
            await AsyncStorage.setItem('@LittleBird:articles', JSON.stringify([article]));
         }

         setSaved(true);
      } else {
         AsyncStorage.removeItem('@LittleBird:articles');

         setSaved(false);
      }

   }

   async function handleSetLiked() {
      if (!liked) {
         api.post(`article/${article_id}/like`, {}, {
            headers: {
               Authorization: token
            }
         })
         .then((response) => {
            if (response.status == 204) {
               setLiked(true);
            }
         })
         
      } else {
         api.delete(`article/${article_id}/like`, {
            headers: {
               Authorization: token
            }
         })
         .then((response) => {
            if (response.status == 204) {
               setLiked(false);
            }
         })
      }
   }

   useEffect(() => {
      async function getContent() {
         const responseArticle = await api.get(`article/${article_id}`);
         const responseArticlesLiked = await api.get(`/article/user/like?page=1`, {
            headers: {
               Authorization: token
            }
         });

         responseArticlesLiked.data.map((item) => {
            item.article_id.article_id === article_id 
            ? setLiked(true)
            : ''
         });

         setArticle(responseArticle.data.article);
         setRecommendations(responseArticle.data.recommendations);
         setThemes(responseArticle.data.themes);
      }

      getContent();
   }, []);

   if (article.article_img_id === undefined) return false;

   return (
      <Container>
         <HeaderBtnBack />
         <Cover resizeMode="cover" source={{ uri: article.article_img_id.img_url }} />
            <Content>
               <Options>
                  <Option onPress={handleSetLiked}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={20} color={liked ? '#DA2243' : '#F6F6F6'} />
                  </Option>
                  <Option onPress={handleSetSaved}>
                     <MaterialIcons name={saved ? 'bookmark' : 'bookmark-border'} size={20} color="#F6F6F6" />
                  </Option>
               </Options>
               <Title>{article.title}</Title>
               <Author>
                  <AuthorName>{article.article_author}</AuthorName>
                  <MaterialIcons name='verified-user' size={18} color="#3B9E8C" />
               </Author>

               <HTMLView 
                  value={article.article_content}
                  stylesheet={styles}
               />

               <TagsThemes data={themes} />

               { recommendations.length > 0 &&
                  <Recommendations>
                     <TitleRecommendations>Saiba mais:</TitleRecommendations>
                     { recommendations.map(item => (
                        <View key={item.recommendation_id}>
                           <Item>
                              <Feather name="check" color="#834397" size={25} />
                              <TitleItem>{item.recommendation_type}:</TitleItem>
                           </Item>
                           <LinkItemContainer onPress={() => openWebView(item.recommendation_url)}>
                           <LinkItem numberOfLines={1}>{item.title}</LinkItem>
                           </LinkItemContainer>
                        </View>
                     ))}
                  </Recommendations>
               }
            </Content>
      </Container>
   );
}

export default Articles;