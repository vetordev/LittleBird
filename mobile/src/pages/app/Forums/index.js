import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HeaderBtnBack from '../../../components/HeaderBtnBack';
import ChatMessage from '../../../components/ChatMessage';
import ModalContainer from '../../../components/ModalContainer';
import TagsThemes from '../../../components/Tags';

import { 
   Container,
   Cover,
   Content,
   Title,
   Option,
   Options,
   Footer,
   InputBlock,
   Input,
   BtnInput,
   Header,
   HeaderBtnInfo,
   InfoIcon,
   ModalTitle,
   ModalDescription,
   ModalContent,
   ModalSubtitle,
   ModalSubtitleText,
   ModalRuleTitle,
   ModalRule,
   ModalRuleImg,
   ModalRuleDescription,
} from './styles';

const Forums = () => {
   const [liked, setLiked] = useState(false);   
   const [displayModal, setModalDisplay] = useState(true);

   function openModal() {
      setModalDisplay(true);
   }

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
         },
         {
            comment_id: 2,
            user_id: 3,
            comment_content: "Lorem ipsum dolxxxxor sit amet.",
            publi_date: "2020-06-13",
            no_like: 3600
         },
         {
            comment_id: 4,
            user_id: 1,
            comment_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            publi_date: "2020-06-13",
            no_like: 3600
         },
         {
            comment_id: 5,
            user_id: 3,
            comment_content: "Lorem...",
            publi_date: "2020-06-13",
            no_like: 3600
         },
      ],
      forum_img: {
        forum_img_id: 1,
        img_url: "https://images.unsplash.com/photo-1575134987638-6c3bc3e2c39a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      no_like: 3600
   }

   return (
      <View style={{ flex: 1 }}>
         { displayModal &&
            <ModalContainer 
               onPress={() => setModalDisplay(false)}
               color_theme="#834397"
               font_color="#E9E9E9"
               btn_title="Entendi!"
            >
               <ModalTitle>Informações importantes</ModalTitle>
               <ModalDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               </ModalDescription>
               
               <TagsThemes />

               <ModalContent>
                  <ModalSubtitle>
                     <ModalSubtitleText>Regras do chat</ModalSubtitleText>
                  </ModalSubtitle>

                  <ModalRuleTitle>1. Lorem Ipsum</ModalRuleTitle>
                  <ModalRule>
                     <ModalRuleImg />
                     <ModalRuleDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. 
                     </ModalRuleDescription>
                  </ModalRule>

                  <ModalRuleTitle>2. Lorem Ipsum</ModalRuleTitle>
                  <ModalRule>
                     <ModalRuleImg />
                     <ModalRuleDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. 
                     </ModalRuleDescription>
                  </ModalRule>

                  {/* <ModalRuleTitle>3. Lorem Ipsum</ModalRuleTitle>
                  <ModalRule>
                     <ModalRuleImg />
                     <ModalRuleDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. 
                     </ModalRuleDescription>
                  </ModalRule> */}
                  
               </ModalContent>
            </ModalContainer>
         }  

         <Container showsVerticalScrollIndicator={false}>
            <Header>
               <HeaderBtnBack />
               <HeaderBtnInfo onPress={openModal}>
                  <InfoIcon>i</InfoIcon>
               </HeaderBtnInfo>
            </Header>

            <Cover resizeMode="cover" source={{ uri: forum.forum_img.img_url }} />
            <Content>
               <Options>
                  <Option onPress={() => setLiked(liked ? false : true)}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={20} color={liked ? '#DA2243' : '#F6F6F6'} />
                  </Option>
               </Options>

               <Title>{forum.title}</Title>

               {forum.comments.map(item => (
                  <ChatMessage key={item.comment_id} data={item} />   
               ))}

            </Content>
         </Container>   
         
         <InputBlock>
            <Input 
               placeholder="Participe da conversa" 
               placeholderTextColor="#4B4B4B"
            />
            <BtnInput>  
               <MaterialIcons name="send" size={20} color="#E9E9E9" />
            </BtnInput>
         </InputBlock>
      </View>
   );
}

export default Forums;