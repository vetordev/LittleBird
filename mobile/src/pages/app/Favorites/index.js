import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';
import Header from '../../../components/Header';

const Favorites = () => {
   return (
      <Container>
         <Header title="Favoritos" />
      </Container>
   );
}

export default Favorites;