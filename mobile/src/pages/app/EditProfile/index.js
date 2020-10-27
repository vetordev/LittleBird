import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import * as Yup from 'yup';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ModalContainer from '../../../components/ModalContainer';

import { useAuth } from '../../../contexts/auth';
import { useAvatar } from '../../../contexts/useAvatar';

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
   Image,
   ModalMessage,
   ModalMessageContent
} from './styles';

const EditProfile = () => {
   const [displayModal, setModalDisplay] = useState(false);

   const { user, setUser, token } = useAuth();
   const { avatares, avatar, setAvatar } = useAvatar();
   
   const formRef = useRef(null);

   const { user_img_id } = user;

   async function handleSaveProfile(data) {
      if (data.username === undefined && data.email === undefined && avatar === user_img_id) {
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
           user_img_id: avatar,
           born_in: '2019-08-24'
         }

         setUser(newUser);

         await api.put('user', newUser, { headers: { Authorization: token } });
         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(newUser));

         setModalDisplay(true);

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

   return (
      <>
      { displayModal &&
         <ModalContainer
            onPress={() => setModalDisplay(false)}
            color_theme="#01C24E"
            font_color="#202020"
            btn_title="ok!"
         >
            <ModalMessageContent>
               <SvgUri uri="https://www.flaticon.com/svg/static/icons/svg/3468/3468210.svg" width={135} height={135} />
               <ModalMessage>Dados alterados com sucesso!</ModalMessage>
            </ModalMessageContent>
         </ModalContainer>
      }
      <Container>
         <Header title="Editar perfil" />

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
               ref={formRef} 
               onSubmit={handleSaveProfile}
            >
               <AvataresContainer>
                  <MainAvatar resizeMode="cover" source={{ uri: avatares[avatar - 1].url }} />
                  <FlatList 
                     data={avatares}
                     keyExtractor={avatar => String(avatar.id)}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     renderItem={({ item }) => (
                        <>
                           { avatar !== item.id &&
                              <AvatarOption onPress={() => setAvatar(item.id)}>
                                 <Image resizeMode="cover" 
                                    source={{ uri: avatar !== item.id && item.url }} 
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
      </>
   );
}

export default EditProfile;