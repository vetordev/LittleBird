import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';
import ModalContainer from '../../../components/ModalContainer';

import themes from '../../../services/themes';
import api from '../../../services/api';

import { useAuth } from '../../../contexts/auth';

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
   InterestIcon,
} from './styles';

const Interests = () => {
   const [displayModal, setModalDisplay] = useState(false);
   const [interests, setInterests] = useState([]);
   const [addedInterest, setAddedInterest] = useState(false);
   const { token } = useAuth();

   function openModal() {
      setModalDisplay(true);
   }

   useEffect(() => {
      async function getContent() {
         const responseInterests = await api.get('interest?page=1', { headers: { Authorization: token } });
         console.log(responseInterests.data);

         setInterests(responseInterests.data);
      }

      getContent();
   }, []);

   if (interests.length == 0) return false;

   return (
      <Container>

         { displayModal &&
            <ModalContainer 
               onPress={() => setModalDisplay(false)}
               color_theme="#01C24E"
               font_color="#202020"
               btn_title="OK!"
            >
                  <InterestItem>
                     <InterestInfos>
                        <InterestImg source={{ uri: 'https://images.unsplash.com/photo-1590765615405-fd9021ab205d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' }} />
                        <InterestTitle>Menstruação</InterestTitle>
                     </InterestInfos>
                     <Feather name="plus" color="#01C24E" size={20} />
                  </InterestItem>

                  <InterestItem>
                     <InterestInfos>
                        <InterestImg source={{ uri: 'https://images.unsplash.com/photo-1512548438457-4c9584d3766b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' }} />
                        <InterestTitle>Primeira vez</InterestTitle>
                     </InterestInfos>
                     <TouchableOpacity>
                        <Feather name="plus" color="#01C24E" size={20} />
                     </TouchableOpacity>
                  </InterestItem>
            </ModalContainer>
         }  

         <FlatList 
            data={interests}
            keyExtractor={theme => String(theme.interest_id)}
            numColumns={2}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <Header title="Seus interesses" />
            }
            renderItem={({ item }) => (
               <InterestCard img_url={item.theme_id.theme_img_id.img_url} name={item.theme_id.theme_name} />
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