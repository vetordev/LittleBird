import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

const HeaderBtnBack = () => {
   const navigation = useNavigation();
   return (
      <Container onPress={() => navigation.goBack() } >
         <Feather name="chevron-left" size={15} color="#E9E9E9" />
      </Container>
   );
}

export default HeaderBtnBack;