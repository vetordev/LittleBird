import React from 'react';
import { FlatList } from 'react-native';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';

import themes from '../../../services/themes';

import { Container } from './styles';

const Favorites = () => {
   return (
      <Container>
         <Header title="Favoritos" />

         <FlatList 
            data={themes}
            keyExtractor={theme => String(theme.theme_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            renderItem={({ item }) => (
               <InterestCard img_url={item.theme_img.img_url} name={item.theme_name} />
            )}
         />
         
      </Container>
   );
}

export default Favorites;