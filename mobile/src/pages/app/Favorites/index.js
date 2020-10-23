import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';

import themes from '../../../services/themes';
import api from '../../../services/api';

import { useAuth } from '../../../contexts/auth';

import { 
   Menu,
   MenuBtn,
   MenuBtnText,
} from './styles';

const Favorites = () => {
   const [selectedCategory, setSelectedCategory] = useState(true);  // true = artigos, false = chats
   const [articles, setArticles] = useState([]);
   const [foruns, setForuns] = useState([]);
   
   const { token } = useAuth();

   function handleSetSelectedCategory() {
      setSelectedCategory(!selectedCategory);
   }

   useEffect(() => {
      async function getFavorites() {
         const responseArticles = await api.get('/article/user/like?page=1', { headers: { Authorization: token } });
         const responseForuns = await api.get('/forum/user/like?page=1', { headers: { Authorization: token } });

         setArticles(responseArticles.data);
         setForuns(responseForuns.data);

         console.log(responseForuns.data);
      }

      getFavorites();
   }, []);

   return (
      <View>
         <FlatList 
            data={selectedCategory ? articles : foruns}
            keyExtractor={favorite => selectedCategory ? String(favorite.article_id) : String(favorite.forum_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <>
                  <Header title="Favoritos" />
                  <Menu>
                     <MenuBtn 
                        selected={selectedCategory}
                        onPress={handleSetSelectedCategory}
                     >
                        <MenuBtnText selected={selectedCategory}>
                           Artigos
                        </MenuBtnText>
                     </MenuBtn>
                     <MenuBtn 
                        selected={!selectedCategory}
                        onPress={handleSetSelectedCategory}
                     >
                        <MenuBtnText selected={!selectedCategory}>
                           Chats
                        </MenuBtnText>
                     </MenuBtn>
                  </Menu>
               </>
            }
            renderItem={({ item }) => (
               selectedCategory ? 
                  <InterestCard 
                     img_url={item.article_id.article_img_id.img_url} 
                     name={item.article_id.title} 
                     type="article"
                     idContent={item.article_id.article_id}
                     isContent={true}
                  />
               :
                  <InterestCard 
                     img_url={item.forum_img_id.img_url} 
                     name={item.title} 
                     type="forum"
                     idContent={item.forum_id}
                     isContent={true}
                  />
            )}
         />
      </View>
   );
}

export default Favorites;