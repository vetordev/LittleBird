import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HeaderBtnBack from '../../../components/HeaderBtnBack';

import { 
   Container,
   Cover,
   Content,
   Title,
   Option,
   Options,
   MessageContainer,
   MessageContent,
   MessageUsername,
   MessageText,
   MessageHeader,
   MessageUserAvatar,
   Message,
   Footer,
   InputBlock,
   Input,
   BtnInput
} from './styles';

const Forums = () => {
   const [liked, setLiked] = useState(false);

   const forum = {
      forum_id: 1,
      title: "Camisinha incomoda?",
      theme: {
        theme_id: 1,
        theme_name: "Relacionamento"
      },
      comments: [
         {
            comment_id: 1,
            user_id: 1,
            comment_content: "Lorem ipsum dolor sit amet.",
            publi_date: "2020-06-13",
            no_like: 3600
         }
      ],
      forum_img: {
        forum_img_id: 1,
        img_url: "https://images.unsplash.com/photo-1575134987638-6c3bc3e2c39a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      no_like: 3600
    }

   return (
      <View style={{ flex: 1 }}>
         <Container>
            <HeaderBtnBack />

            <Cover resizeMode="cover" source={{ uri: forum.forum_img.img_url }} />
            <Content>
               <Options>
                  <Option onPress={() => setLiked(liked ? false : true)}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={20} color={liked ? '#DA2243' : '#F6F6F6'} />
                  </Option>
               </Options>

               <Title>{forum.title}</Title>

               <MessageContainer>
                  {/* <Message> */}
                  <MessageHeader>
                     <MessageUserAvatar resizeMode="cover" source={{ uri: 'https://i.pinimg.com/564x/34/43/71/344371e32e903084adccaace156dcb4e.jpg' }} />
                     <MessageUsername>bolinhorosa</MessageUsername>
                  </MessageHeader>
                  <MessageContent>
                     <MessageText>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MessageText>
                  </MessageContent>
                  {/* </Message> */}
               </MessageContainer>

               <MessageContainer>
                  {/* <Message> */}
                  <MessageHeader>
                     <MessageUserAvatar resizeMode="cover" source={{ uri: 'https://i.pinimg.com/564x/34/43/71/344371e32e903084adccaace156dcb4e.jpg' }} />
                     <MessageUsername>bolinhorosa</MessageUsername>
                  </MessageHeader>
                  <MessageContent>
                     <MessageText>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MessageText>
                  </MessageContent>
                  {/* </Message> */}
               </MessageContainer>
            </Content>
         </Container>   
         
         {/* <Footer> */}
            <InputBlock>
               <Input 
                  placeholder="Participe da conversa" 
                  placeholderTextColor="#4B4B4B"
               />
               <BtnInput>  
                  <MaterialIcons name="send" size={20} color="#E9E9E9" />
               </BtnInput>
            </InputBlock>
         {/* </Footer> */}
      </View>
   );
}

export default Forums;