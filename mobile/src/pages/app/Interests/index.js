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
   InterestIcon,
} from './styles';

const Interests = () => {
   const [displayModal, setModalDisplay] = useState(false);
   const [interests, setInterests] = useState([]);
   const [themes, setThemes] = useState([]);
   const [addedInterest, setAddedInterest] = useState([]);
   const { token } = useAuth();

   function openModal() {
      setModalDisplay(true);
   }

   function handleAddInterest(theme_id) {
      const alreadyAdded = addedInterest.findIndex(theme => theme == theme_id);

      if (alreadyAdded >= 0) {
         const filteredThemes = addedInterest.filter(theme => theme !== theme_id);

         setAddedInterest(filteredThemes);
      } else {
         setAddedInterest([...addedInterest, theme_id]);
      }
   }

   function handleSubmitInterests() {
      setModalDisplay(false);

      // console.log(addedInterest);

      // console.log(interests[1].theme_id.theme_id);

      interests.forEach(async interest => {
         const interest_id = interest.theme_id.theme_id;

         if (addedInterest.includes(interest_id)) {
            console.log('sim', interest_id);
            // const response = await api.post('interest', 
            //    { themes: interest_id }, 
            //    { headers: 
            //       {
            //          Authorization: token
            //       } 
            //    }
            // )

            // console.log(response.status);
         }
         
         addedInterest.forEach(added => console.log(added !== interest_id && added))
         // console.log(addedInterest ? addedInterest)


         // addedInterest.forEach(added => {
         //    if (added == interest.theme_id.theme_id){ 
         //       console.log(added, 'oi');
         //       return;
         //    }
         //    else {
         //       console.log(added, 'tchau');
         //       return;
         //    }
         // })
      });

      

      // const arrys = interests.filter(item => addedInterest.includes(item.theme_id.theme_id));
      // // console.log(arrys);

      // addedInterest.map(ad => ad != arrys.map(arry => console.log(arry.theme_id.theme_id)))
      // console.log(addedInterest != arrys.theme_id.theme_id);
   }

   useEffect(() => {
      async function getContent() {
         const responseInterests = await api.get('interest?page=1', { headers: { Authorization: token } });
         const responseThemes = await api.get('theme');

         setInterests(responseInterests.data);
         setThemes(responseThemes.data);

      }

      getContent();
   }, []);

   if (interests.length == 0) return false;

   return (
      <Container>

         { displayModal &&
            <ModalContainer 
               onPress={handleSubmitInterests}
               color_theme="#01C24E"
               font_color="#202020"
               btn_title="SALVAR"
            >
               { themes.map(theme => (
                  <InterestItem key={theme.theme_id}>
                     <InterestInfos>
                        <InterestImg source={{ uri: theme.theme_img_id.img_url }} />
                        <InterestTitle>{theme.theme_name}</InterestTitle>
                     </InterestInfos>
                     <TouchableOpacity onPress={() => handleAddInterest(theme.theme_id)}>
                        { addedInterest.includes(theme.theme_id) ?
                           <Feather name="check" color="#E9E9E9" size={20} /> :
                           <Feather name="plus" color="#01C24E" size={20} /> 
                        }
                     </TouchableOpacity>
                  </InterestItem>
               ))}
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
               <InterestCard 
                  img_url={item.theme_id.theme_img_id.img_url} 
                  name={item.theme_id.theme_name} 
                  idTheme={item.theme_id.theme_id}
               />
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