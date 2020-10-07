import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import Input from '../../../components/Input';

import { useAuth } from '../../../contexts/auth';

import { 
   Container, 
   BtnSaveProfile, 
   BtnSaveProfileText,
   BtnAlterPassword,
   BtnAlterPasswordText,
   MainAvatar,
   AvataresContainer,
   AvatarOption,
   Image
} from './styles';

const EditProfile = () => {
   const [selectedAvatar, setSelectedAvatar] = useState(0);
   const [lastSelectedAvatar, setLastSelectedAvatar] = useState(0); 
   const { user } = useAuth();

   const formRef = useRef(null);

   function handleSaveProfile() {}

   const [imgs, setImgs] = useState([
      'https://image.freepik.com/vetores-gratis/ilustracao-de-fatia-de-pizza_179407-45.jpg', 
      'https://i.pinimg.com/originals/90/1d/45/901d45d05461495b1c0700ce47517135.jpg', 
      'https://www.nicepng.com/png/detail/147-1477699_hand-drawn-smiling-sun-vector-encapsulated-postscript.png', 
      'https://cdn.dribbble.com/users/2172174/screenshots/10754281/image7344.png'
   ]);

   function handleEditAvatar(newId) {
      setLastSelectedAvatar(selectedAvatar);
      setSelectedAvatar(newId);

      let array_aux = imgs;

      const aux = array_aux[0];
      array_aux[0] = array_aux[newId];
      array_aux[newId] = aux;

      setImgs(array_aux);
   }

   return (
      <Container>
         <Header title="Editar perfil" />

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
               ref={formRef} 
               onSubmit={handleSaveProfile}
            >
               <AvataresContainer>
                  <FlatList 
                     data={imgs}
                     keyExtractor={avatar => String(avatar)}
                     horizontal
                     contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                     renderItem={({ item, index }) => 
                        index === 0 ? 
                           <MainAvatar resizeMode="cover" source={{ uri: imgs[0] }} />
                        : (
                           <AvatarOption onPress={() => handleEditAvatar(index)}>
                              <Image resizeMode="cover" 
                                 source={{ uri: item }} 
                              />
                           </AvatarOption>
                        )
                     }
                  />
               </AvataresContainer>

               <Input 
                  name="username"
                  color="light"
                  iconName="user"
                  placeholder=""
                  legend="Seu nome de usuário"
                  defaultValue={user.username}
               />

               <Input 
                  name="mail"
                  color="light"
                  iconName="mail"
                  placeholder=""
                  legend="Seu e-mail"
                  defaultValue={user.email}
               />

               <View style={{ width: '80%' }}>
                  <BtnAlterPassword>
                     <Feather name="lock" color="#E9E9E9" size={20} />
                     <BtnAlterPasswordText>
                        Alterar senha
                     </BtnAlterPasswordText>
                  </BtnAlterPassword>
               </View>

               <BtnSaveProfile>
                  <BtnSaveProfileText>
                     Salvar alterações
                  </BtnSaveProfileText>
               </BtnSaveProfile>
            </Form>
      </Container>
   );
}

export default EditProfile;