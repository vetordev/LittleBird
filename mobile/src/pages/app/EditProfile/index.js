import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import * as Yup from 'yup';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import InputDate from '../../../components/InputDate';
import ModalContainer from '../../../components/ModalContainer';

import { useAuth } from '../../../contexts/auth';
import { useAvatar } from '../../../contexts/useAvatar';

import api from '../../../services/api';
import formatDateToAPI from '../../../utils/formatDateToAPI';

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
   const { user, setUser, token } = useAuth();

   const [displayModal, setModalDisplay] = useState(false);
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState(user.born_in);
   const [userBirth, setUserBirth] = useState('');

   const { avatares, avatar, setAvatar } = useAvatar();
   
   const formRef = useRef(null);

   const { user_img_id } = user;

   async function handleSaveProfile(data) {
      if (data.username === undefined && data.birth === undefined && data.email === undefined && data.fullname === undefined && avatar === user_img_id) {
         return false;
      }

      try {
         // setLoading(true);
         // let dateFormat;
         const schema = Yup.object().shape({
            fullname: Yup.string().min(6, 'O nome completo deve ter pelo menos 6 caracteres.'),
            username: Yup.string().min(5, 'O nome de usuário deve ter pelo menos 5 caracteres.'),
            email: Yup.string().min(6, 'O e-mail deve ter pelo menos 7 caracteres.').email('O e-mail deve ser válido'),
            birth: Yup.date().transform((value, originalValue) => {               

               formatDateToAPI(originalValue).then((dateFormated) => {
                  console.log(moment(dateFormated).isValid());

                  console.log(dateFormated);
   
                  return moment(dateFormated).isValid() ? formRef.current.setFieldError('birth', null) : formRef.current.setFieldError('birth', 'Insira uma data de nascimento válida.');
               });
               // const day = String(originalValue[0]) + String(originalValue[1]);
               // const month = String(originalValue[3]) + String(originalValue[4]);
               // const year = String(originalValue[6]) + String(originalValue[7]) + String(originalValue[8]) + String(originalValue[9]);
               
               // const dateFormated = moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');

               
            })
         });

         console.log('birth', data);
   
         await schema.validate(data, {
           abortEarly: false
         });

         formRef.current.setErrors({});

         // const newUser = {
         //    fullname: data.fullname === undefined ? user.fullname : data.fullname,
         //    email: data.email === undefined ? user.email : data.email,
         //    username: data.username === undefined ? user.username : data.username,
         //    user_img_id: avatar,
         //    born_in: '2019-08-24'
         // }

         // setUser(newUser);

         // await api.put('user', newUser, { headers: { Authorization: token } });
         // await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(newUser));

         // setModalDisplay(true);
         // setLoading(false);

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
      setDate(user.born_in);
   });

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
                  name="fullname"
                  color="light"
                  iconName="user"
                  legend="Seu nome completo"
                  maxLength={45}
                  defaultValue={user.fullname}
               />

               <InputDate 
                  iconName="calendar"
                  name="birth"
                  color="light"
                  placeholder="DD / MM / AAAA"
                  legend="Sua data de nascimento"
                  defaultValue={user.born_in}
               />
               
               <Input 
                  name="username"
                  color="light"
                  iconName="coffee"
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
                  { loading ?
                     <ActivityIndicator size="small" color="#E9E9E9" />
                     :
                     <BtnSaveProfileText>
                        Salvar alterações
                     </BtnSaveProfileText>
                  }
                  
               </BtnSaveProfile>
            </Form>
      </Container>
      </>
   );
}

export default EditProfile;