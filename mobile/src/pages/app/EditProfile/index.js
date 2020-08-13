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
      { id: 0, img: 'https://i.pinimg.com/564x/8b/71/cc/8b71cceff897fc4e9d19205fff28406f.jpg' },
      { id: 1, img: 'https://i.pinimg.com/564x/2f/e1/0c/2fe10cf1a5e63336cb1ae52c1824c2c8.jpg' },
      { id: 2, img: 'https://i.pinimg.com/564x/5e/06/89/5e0689b603bb90ecac3bc47b5b39abdf.jpg' },
      { id: 3, img: 'https://i.pinimg.com/564x/24/ae/47/24ae4734b6f1cc9e76b2184c4cffad5f.jpg' },
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