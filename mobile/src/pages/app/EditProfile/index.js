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

   const [imgs, setImgs] = useState(['https://i.pinimg.com/564x/8b/71/cc/8b71cceff897fc4e9d19205fff28406f.jpg', 'https://i.pinimg.com/564x/2f/e1/0c/2fe10cf1a5e63336cb1ae52c1824c2c8.jpg', 'https://i.pinimg.com/564x/5e/06/89/5e0689b603bb90ecac3bc47b5b39abdf.jpg', 'https://i.pinimg.com/564x/24/ae/47/24ae4734b6f1cc9e76b2184c4cffad5f.jpg']);

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