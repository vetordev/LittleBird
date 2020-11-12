import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import InterestCard from '../../../components/InterestCard';
import ModalContainer from '../../../components/ModalContainer';

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
   const [addedThemeId, setAddedThemeId] = useState([]);
   const [removedThemeId, setRemovedThemeId] = useState([]);
   const [pageInterests, setPageInterests] = useState(1);
   const [totalInterests, setTotalInterests] = useState(0);
   const [loadingInterests, setLoadingInterests] = useState(false);
   const [pageThemes, setPageThemes] = useState(1);
   const [totalThemes, setTotalThemes] = useState(0);
   const [loadingThemes, setLoadingThemes] = useState(false);
   const { token } = useAuth();

   let interestAux = [];

   function openModal() {
      setModalDisplay(true);

      interests.forEach(interest => interestAux.push(interest.theme_id.theme_id));

      setAddedThemeId([... addedThemeId, ... interestAux]);
   }

   function handleAddInterest(theme_id) {
      if (addedThemeId.includes(theme_id)){
         addedThemeId.splice(addedThemeId.indexOf(theme_id), 1);
         setRemovedThemeId([... removedThemeId, theme_id]);
      } else {
         removedThemeId.splice(removedThemeId.indexOf(theme_id), 1);
         setAddedThemeId([... addedThemeId, theme_id]);
      }
   }

   async function handleSubmitInterests() {
      setModalDisplay(false);

      await api.post(
         'interest', 
         { themes: addedThemeId.toString() }, 
         {
            headers: {
               Authorization: token
            }
         }
      )

      if (removedThemeId != '') {
         let interestsToRemove = interests.filter(interest => removedThemeId.includes(interest.theme_id.theme_id));
         let interestsIdsToRemove = interestsToRemove.map(interest => interest.interest_id);

         const headers = {
            'Authorization': token
          }
          const data = {
            interests: interestsIdsToRemove.toString()
          }

         await api.delete('interest', { headers, data });
      }
   }

   async function loadInterests() {
      if (loadingInterests) {
         return;
      }

      if (totalInterests > 0 && interests.length == totalInterests) {
         return;
      }

      setLoadingInterests(true);

      const responseInterests = await api.get(`interest?page=${pageInterests}`, { headers: { Authorization: token } });

      setInterests([... interests, ... responseInterests.data]); 

      setTotalInterests(responseInterests.headers['x-total-count']);
      setPageInterests(pageInterests + 1);
      setLoadingInterests(false);
   }

   async function loadThemes() {
      if (loadingThemes) {
         return;
       }
   
       if (totalThemes > 0 && themes.length == totalThemes) {
         return;
       }
   
       setLoadingThemes(true);
   
       const responseThemes = await api.get(`theme?page=${pageThemes}`);
   
       setThemes([... themes, ... responseThemes.data]);
   
       setTotalThemes(responseThemes.headers['x-total-count']);
       setPageThemes(pageThemes + 1);
       setLoadingThemes(false);
   }

   useEffect(() => {
      loadInterests();
      loadThemes();
   }, []);

   return (
      <Container>

         { displayModal &&
            <ModalContainer 
               onPress={handleSubmitInterests}
               color_theme="#01C24E"
               font_color="#202020"
               btn_title="SALVAR"
            >
               <FlatList 
                  data={themes}
                  keyExtractor={theme => String(theme.theme_id)}
                  onEndReached={loadThemes}
                  onEndReachedThreshold={0.7}
                  renderItem={({ item: theme }) => (
                     <InterestItem>
                        <InterestInfos>
                           <InterestImg source={{ uri: theme.theme_img_id.img_url }} />
                           <InterestTitle>{theme.theme_name}</InterestTitle>
                        </InterestInfos>
                        <TouchableOpacity
                           onPress={() => handleAddInterest(theme.theme_id)}
                        >
                           { addedThemeId.includes(theme.theme_id) ?
                              <Feather name="check" color="#E9E9E9" size={20} /> :
                              <Feather name="plus" color="#01C24E" size={20} />
                           }
                        </TouchableOpacity>
                     </InterestItem>
                  )} 
               />
               
            </ModalContainer>
         }  

         <FlatList 
            data={interests}
            keyExtractor={theme => String(theme.interest_id)}
            numColumns={2}
            onEndReached={loadInterests}
            onEndReachedThreshold={0.8}
            columnWrapperStyle={{ marginHorizontal: 15 }}
            ListHeaderComponent={
               <Header title="Seus interesses" />
            }
            renderItem={({ item }) => 
               interests.length !== 0 && (
                  <InterestCard 
                     img_url={item.theme_id.theme_img_id.img_url} 
                     name={item.theme_id.theme_name} 
                     idTheme={item.theme_id.theme_id}
                  />
               )
            }
            ListFooterComponent={
               !loadingInterests && (
                  <AddInterest onPress={openModal}>
                     <AddInterestContent>
                        <Feather name="plus" size={40} color="#01C24E" />
                        <AddInterestText>Adicionar novo interesse</AddInterestText>
                     </AddInterestContent>
                  </AddInterest>
               )
            }
            ListFooterComponentStyle={{ marginHorizontal: 15 }}
         />
         
         
      </Container>
   );
}

export default Interests;