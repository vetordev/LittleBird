import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';

import Header from '../../../components/Header';
import Input from '../../../components/Input';

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
   const [happened, setHappened] = useState(false);

   const formRef = useRef(null);

   function handleSaveProfile() {}

   async function handleEditAvatar(newId) {
      
      await setLastSelectedAvatar(selectedAvatar);
      setHappened(true);

      setSelectedAvatar(newId);
      console.log(lastSelectedAvatar)
      console.log(selectedAvatar)

   }

   const avatares = [
      { id: 0, img: 'https://images.unsplash.com/photo-1594123865210-a0639bb17f6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
      { id: 1, img: 'https://images.unsplash.com/photo-1596878673925-c8dbf655e8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { id: 2, img: 'https://images.unsplash.com/photo-1596860618905-10d5b5a6b22d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' },
      { id: 3, img: 'https://images.unsplash.com/photo-1489731110502-23f1239ea56c?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
   ]

   return (
      <Container>
         <Header title="Editar perfil" />

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
               ref={formRef} 
               onSubmit={handleSaveProfile}
            >
               <AvataresContainer>
                  {/* <MainAvatar resizeMode="cover" source={{ uri: avatares[0].img }} /> */}

                  <FlatList 
                     data={avatares}
                     keyExtractor={avatar => String(avatar.id)}
                     horizontal
                     contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                     renderItem={({ item, index }) => 
                        index === 0 ? 
                           <MainAvatar resizeMode="cover" source={{ uri: avatares[selectedAvatar].img }} />
                        : (
                           <AvatarOption onPress={() => handleEditAvatar(item.id)}>
                              <Image resizeMode="cover" source={{ uri: (item.id === selectedAvatar ? avatares[lastSelectedAvatar].img : item.img) }} />
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
               />

               <Input 
                  name="mail"
                  color="light"
                  iconName="mail"
                  placeholder=""
                  legend="Seu e-mail"
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