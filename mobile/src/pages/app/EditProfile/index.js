import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

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

   async function handleSaveProfile(data) {
      if (data.username === undefined && data.email === undefined) {
         return false;
      }

      try {
         const schema = Yup.object().shape({
           username: Yup.string().min(5, 'O nome de usuário deve ter pelo menos 5 caracteres.'),
           email: Yup.string().min(6, 'O e-mail deve ter pelo menos 7 caracteres.').email('O e-mail deve ser válido'),
         });

         // alert(data.username)
   
         await schema.validate(data, {
           abortEarly: false
         });
   
         console.log(schema);
   
         formRef.current.setErrors({});
   
         const user = {
           email,
           username: data.username,
           user_pass: data.password,
           user_img_id: 1,
           born_in: '2019-08-24'
         }
   
         if (toggleCheckBox) {
           navigation.navigate('SignUp2', { user });
         } else {
           alert('É preciso concordar com os termos de uso.');
         }
   
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