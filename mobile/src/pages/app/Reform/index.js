import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
   Image,
   Title,
   Description,
   Container,
   BtnReturn,
   TextBtnReturn
} from './styles';

const Reform = () => {
   const navigation = useNavigation();

   return (
     <Container>
        <Image resizeMode="contain" source={require('../../../assets/reform-illustration.png')} />
        <Title>Página em reforma</Title>
        <Description>Estamos preparando algo especial para você, volte em breve para conferir.</Description>
        <BtnReturn onPress={() => navigation.goBack()}>
           <TextBtnReturn>ok, até mais!</TextBtnReturn>
        </BtnReturn>
     </Container>
   );
}

export default Reform;