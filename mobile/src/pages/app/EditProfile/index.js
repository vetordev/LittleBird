import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import Header from '../../../components/Header';
import Input from '../../../components/Input';

import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

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
   const [avatarId, setAvatarId] = useState(2);
   const { user, setUser, token } = useAuth();
   const formRef = useRef(null);

   const { user_img_id } = user;

   const [imgs, setImgs] = useState([
      {
         id: 1,
         url: 'https://image.freepik.com/vetores-gratis/ilustracao-de-fatia-de-pizza_179407-45.jpg'
      },
      {
         id: 2,
         url: 'https://i.pinimg.com/originals/90/1d/45/901d45d05461495b1c0700ce47517135.jpg'
      },
      {
         id: 3,
         url: 'https://www.nicepng.com/png/detail/147-1477699_hand-drawn-smiling-sun-vector-encapsulated-postscript.png', 
      },
      {
         id: 4,
         url: 'https://cdn.dribbble.com/users/2172174/screenshots/10754281/image7344.png'
      }
   ]);

   function handleEditAvatar(id) {
      setAvatarId(id);
   }

   async function handleSaveProfile(data) {
      if (data.username === undefined && data.email === undefined && avatarId === user_img_id) {
         return false;
      }

      try {
         const schema = Yup.object().shape({
           username: Yup.string().min(5, 'O nome de usuário deve ter pelo menos 5 caracteres.'),
           email: Yup.string().min(6, 'O e-mail deve ter pelo menos 7 caracteres.').email('O e-mail deve ser válido'),
         });
   
         await schema.validate(data, {
           abortEarly: false
         });
   
         formRef.current.setErrors({});

         const newUser = {
           email: data.email === undefined ? user.email : data.email,
           username: data.username === undefined ? user.username : data.username,
           user_img_id: avatarId,
           born_in: '2019-08-24'
         }

         setUser(newUser);

         await api.put('user', newUser, { headers: { Authorization: token } });
         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(newUser));

       } catch (err) {
         if (err instanceof Yup.ValidationError) {
           const errorMessages = {};
   
           err.inner.forEach(error => {
             errorMessages[error.path] = error.message;
           })
   
           formRef.current.setErrors(errorMessages);
         }
       }
   }

   useEffect(() => {
      setAvatarId(user_img_id);
   }, []);

   return (
      <Container>
         <Header title="Editar perfil" />

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
               ref={formRef} 
               onSubmit={handleSaveProfile}
            >
               <AvataresContainer>
                  <MainAvatar resizeMode="cover" source={{ uri: imgs[avatarId - 1].url }} />
                  <FlatList 
                     data={imgs}
                     keyExtractor={avatar => String(avatar.id)}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     renderItem={({ item }) => (
                        <>
                           { avatarId !== item.id &&
                              <AvatarOption onPress={() => handleEditAvatar(item.id)}>
                                 <Image resizeMode="cover" 
                                    source={{ uri: avatarId !== item.id && item.url }} 
                                 />
                              </AvatarOption>
                           }
                        </>
                        )
                     }
                  />
               </AvataresContainer>

               <Input 
                  name="username"
                  color="light"
                  iconName="user"
                  legend="Seu nome de usuário"
                  maxLength={45}
                  defaultValue={user.username}
               />

               <Input 
                  name="email"
                  color="light"
                  iconName="mail"
                  legend="Seu e-mail"
                  maxLength={100}
                  keyboardType="email-address"
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

               <BtnSaveProfile onPress={() => formRef.current.submitForm()}>
                  <BtnSaveProfileText>
                     Salvar alterações
                  </BtnSaveProfileText>
               </BtnSaveProfile>
            </Form>
      </Container>
   );
}

export default EditProfile;