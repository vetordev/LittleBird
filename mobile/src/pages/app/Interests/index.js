import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';
import ModalContainer from '../../../components/ModalContainer';

import themes from '../../../services/themes';

import { Container, AddInterest, AddInterestText, AddInterestContent } from './styles';

const Interests = () => {
   const [displayModal, setModalDisplay] = useState(true);

   function openModal() {
      setModalDisplay(true);
   }

   return (
      <Container>

         { displayModal &&
            <ModalContainer onPress={() => setModalDisplay(false)} />
         }  

         <FlatList 
            data={themes}
            keyExtractor={theme => String(theme.theme_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <Header title="Seus interesses" />
            }
            renderItem={({ item }) => (
               <InterestCard img_url={item.theme_img.img_url} name={item.theme_name} />
            )}
            ListFooterComponent={
               <AddInterest onPress={openModal}>
                  <AddInterestContent>
                     <Feather name="plus" size={40} color="#01C24E" />
                     <AddInterestText>Adicionar novo interesse</AddInterestText>
                  </AddInterestContent>
               </AddInterest>
            }
            ListFooterComponentStyle={{ marginHorizontal: 15 }}
         />
         
      </Container>
   );
}

export default Interests;