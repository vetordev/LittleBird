import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';
import ModalContainer from '../../../components/ModalContainer';

import themes from '../../../services/themes';

import { 
   Container, 
   AddInterest, 
   AddInterestText, 
   AddInterestContent,
   InterestItem,
   InterestImg,
   InterestTitle,
   InterestInfos,
   Intetest,
} from './styles';

const Interests = () => {
   const [displayModal, setModalDisplay] = useState(false);

   function openModal() {
      setModalDisplay(true);
   }

   return (
      <Container>

         { displayModal &&
            <ModalContainer 
               onPress={() => setModalDisplay(false)}
               color_theme="#01C24E"
               font_color="#202020"
               btn_title="OK!"
            >
               <Intetest>
                  <InterestItem>
                     <InterestInfos>
                        <InterestImg />
                        <InterestTitle>Lorem Ipsum</InterestTitle>
                     </InterestInfos>
                     <Feather name="plus" color="#01C24E" size={20} />
                  </InterestItem>

                  <InterestItem>
                     <InterestInfos>
                        <InterestImg />
                        <InterestTitle>Lorem Ipsum</InterestTitle>
                     </InterestInfos>
                     <Feather name="plus" color="#01C24E" size={20} />
                  </InterestItem>
               </Intetest>
            </ModalContainer>
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