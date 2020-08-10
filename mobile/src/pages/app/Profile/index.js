import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { 
   Container, 
   Header,
   IconContainer,
   Title,
   ProfilePicture,
   Username,
   ProfileSession,
   Part1,
   IconContainerSession,
   SessionName,
   Part2
} from './styles';

const Profile = () => {
   const { navigate } = useNavigation();

   function navigateToSettings() {
      navigate('Settings');
   }

   function navigateToFavorites() {
      navigate('Favorites');
   }

   function navigateToInterests() {
      navigate('Interests');
   }

  return (
      <ScrollView 
         showsVerticalScrollIndicator={false}
         style={{ flex: 1, backgroundColor: '#121212' }}
      >
         <Container>
            <Header>
               <IconContainer onPress={navigateToSettings}>
                  <Feather name="settings" size={15} color="#E9E9E9" />
               </IconContainer>

               <Title>seu perfil</Title>

               <IconContainer>
                  <Feather name="edit" size={15} color="#E9E9E9" />
               </IconContainer>
            </Header>
            
            <ProfilePicture resizeMode="contain" source={require('../../../assets/profilePicture1.png')} />
            <Username>@bolinhorosa</Username>

            <ProfileSession onPress={navigateToInterests}>
               <Part1>
                  <IconContainerSession color="#01C24E">
                     <Feather name="smile" size={20} color="#eee" />
                  </IconContainerSession>
                  <SessionName>Interesses</SessionName>
               </Part1>
               <Feather name="chevron-right" size={20} color="#01C24E" />
            </ProfileSession>

            <ProfileSession onPress={navigateToFavorites}>
               <Part1>
                  <IconContainerSession color="#D85517">
                     <Feather name="heart" size={20} color="#eee" />
                  </IconContainerSession>
                  <SessionName>Favoritos</SessionName>
               </Part1>
               <Feather name="chevron-right" size={20} color="#D85517" />
            </ProfileSession>

            <ProfileSession>
               <Part1>
                  <IconContainerSession color="#834397">
                     <Feather name="bookmark" size={20} color="#eee" />
                  </IconContainerSession>
                  <SessionName>Itens salvos</SessionName>
               </Part1>
               <Feather name="chevron-right" size={20} color="#834397" />
            </ProfileSession>
         </Container>
     </ScrollView>
  );
}

export default Profile;