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
   const [displayModal, setModalDisplay] = useState(false);
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState('');
   const [userBirth, setUserBirth] = useState('');
   const [dateError, setDateError] = useState(null);
   
   const { user, setUser, token } = useAuth();
   const { avatares, avatar, setAvatar } = useAvatar();
   
   const formRef = useRef(null);

   const { user_img_id } = user;

   function validateDate() {
      if (!userBirth) {
         return false;
      }
      if (moment(userBirth, 'DD/MM/YYYY').isValid()) {
         setDateError(null);
         const finalDate = moment(userBirth, 'DD/MM/YYYY').format('DD-MM-YYYY');
         return finalDate;

      } else {
         setDateError('Insira uma data de nascimento correta.');
         return false;
      }
    }

   async function handleSaveProfile(data) {
      const finalDate = validateDate();

      if (data.username === undefined && data.email === undefined && data.fullname === undefined && avatar === user_img_id && !finalDate) {
         return false;
      }

      try {
         const schema = Yup.object().shape({
            fullname: Yup.string().min(6, 'O nome completo deve ter pelo menos 6 caracteres.'),
            username: Yup.string().min(5, 'O nome de usuário deve ter pelo menos 5 caracteres.'),
            email: Yup.string().min(6, 'O e-mail deve ter pelo menos 7 caracteres.').email('O e-mail deve ser válido')
         });
   
         await schema.validate(data, {
           abortEarly: false
         });

         formRef.current.setErrors({});

         const newUser = {
            fullname: data.fullname === undefined ? user.fullname : data.fullname,
            email: data.email === undefined ? user.email : data.email,
            username: data.username === undefined ? user.username : data.username,
            user_img_id: avatar,
            born_in: !finalDate ? user.born_in : finalDate,
         }
         console.log('newUser', newUser);
         
         setUser(newUser);
         setLoading(true);

         await api.put('user', newUser, { headers: { Authorization: token } });
         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(newUser));

         setLoading(false);
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

   useEffect(() => {
      setDate(moment(user.born_in, 'DD-MM-YYYY').format('DD/MM/YYYY'));
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
                  defaultValue={moment(user.born_in, 'DD-MM-YYYY').format('DD/MM/YYYY')}
                  value={date}
                  setDate={setDate}
                  setUserBirth={setUserBirth}
                  error={dateError}
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