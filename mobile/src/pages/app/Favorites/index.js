import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';

import themes from '../../../services/themes';
import api from '../../../services/api';

const Favorites = () => {

   useEffect(() => {
      // async function getFavorites() {
      //    const response = await api.get()
      // }
   }, []);

   return (
      <View>
         <FlatList 
            data={themes}
            keyExtractor={theme => String(theme.theme_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <Header title="Favoritos" />
            }
            renderItem={({ item }) => (
               <InterestCard img_url={item.theme_img.img_url} name={item.theme_name} />
            )}
         />
      </View>
   );
}

export default Favorites;