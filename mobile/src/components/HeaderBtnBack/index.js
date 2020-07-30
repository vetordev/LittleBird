import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

const HeaderBtnBack = ({ withoutTop }) => {
   const navigation = useNavigation();

   return (
      <Container onPress={() => navigation.goBack()} withoutTop={withoutTop} >
         <Feather name="chevron-left" size={15} color="#E9E9E9" />
      </Container>
   );
}

export default HeaderBtnBack;