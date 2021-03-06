import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';

import themes from '../../../services/themes';

const SavedItems = () => {
   const [articles, setArticles] = useState({});

   useEffect(() => {

      async function getSavedArticles() {
         const savedArticles = await AsyncStorage.getItem('@LittleBird:articles');

         setArticles(JSON.parse(savedArticles));
      }

      getSavedArticles();
   }, [])

   return (
      <View>
         <FlatList 
            data={articles}
            keyExtractor={article => articles && String(article.article.article_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <Header title="Itens salvos" />
            }
            renderItem={({ item }) => (
               articles &&
               <InterestCard 
                  img_url={item.article.article_img_id.img_url} 
                  name={item.article.title} 
                  isContent={true}
                  type="article"
                  content={item}
               />
            )}
         />
      </View>
   );
}

export default SavedItems;