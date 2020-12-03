import React, { useState, useEffect } from 'react';
import { View, Keyboard, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import io from 'socket.io-client';
import { GiftedChat } from "react-native-gifted-chat";

import HeaderBtnBack from '../../../components/HeaderBtnBack';
import ChatMessage from '../../../components/ChatMessage';
import ModalContainer from '../../../components/ModalContainer';
import TagsThemes from '../../../components/Tags';
import Reply from '../Reply/index';


import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';

import {
   Container,
   Cover,
   Title,
   Option,
   Options,
   InputContainer,
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
   Desc,

} from './styles';

const Forums = () => {
   const [liked, setLiked] = useState(false);
   const [displayModal, setModalDisplay] = useState(true);
   const [forum, setForum] = useState({});
   const [comments, setComments] = useState([]);
   const [input, setInput] = useState('');
   const [page, setPage] = useState(2);
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(false);

   const [newMessage, setNewMessage] = useState({});
   const [lastMessage, setLastMessage] = useState({});

   const isFocused = useIsFocused();
   const navigation = useNavigation();

   const route = useRoute();
   const { token, user } = useAuth();

   const { forum_id } = route.params;

   const [socket, setSocket] = useState(io(`http://26.57.205.136:3333/forum`));

   useEffect(() => {
      socket.emit('join forum', { idRoom: forum_id });
      socket.on('new message', message => setNewMessage(message))
   }, [socket]);

   useEffect(() => {

      if(newMessage.comment_id == undefined) {
         return;
      }

      async function handleNewMessage() {
         setTotal(prevTotal => prevTotal += 1);

         let message = {
            _id: newMessage.comment_id,
            text: newMessage.comment_content,
            createdAt: newMessage.publi_date,
            user: {
               _id: newMessage.user_id.user_id,
               name: newMessage.user_id.username,
               avatar: newMessage.user_id.user_img_id.img_url
            }
         }
         setComments(prevComments => [message, ...prevComments])
      }

      handleNewMessage();
   }, [newMessage]);

   useEffect(() => {
      async function getContent() {

         loadForumAndComments();
         const responseForumLiked = await api.get(`/forum/user/like?page=1`, {
            headers: {
               Authorization: token
            }
         });

         responseForumLiked.data.map((item) => {
            item.forum_id === forum_id
            ? setLiked(true)
            : ''
         });
      }

      if (comments.length == 0 ) {
         console.log('----------- Iniciando Fórum -------------')
         getContent();
      }
   }, []);


   // useEffect(() => {
   //    socket.emit('leave forum', { idRoom: forum_id });
   // }, [!isFocused])


   // Primeiro loading
   async function loadForumAndComments() {

      setLoading(true);

      const responseForum = await api.get(`forum/${forum_id}/comment?page=${1}`);

      setForum(responseForum.data);

      setTotal(responseForum.headers['x-total-count']);

      let comments = responseForum.data.comments.map((comment) => (
         {
            _id: comment.comment_id,
            text: comment.comment_content,
            createdAt: comment.publi_date,
            user: {
               _id: comment.user_id.user_id,
               name: comment.user_id.username,
               avatar: comment.user_id.user_img_id.img_url
            }
         }
      ))

      setComments(comments)
      setLastMessage(comments[0]);

      setLoading(false);

   }

   async function loadComments() {

      if (loading) {
         return;
      }

      if (total > 0 && comments.length == total) {
         return;
      }

      setLoading(true);

      const responseForum = await api.get(`/comment/forum/${forum_id}?page=${page}&lastMessage=${lastMessage._id}`);
      setTotal(responseForum.headers['x-total-count']);
      setPage(page + 1);

      let earlierComments = responseForum.data.map((comment) => (

         {
            _id: comment.comment_id,
            text: comment.comment_content,
            createdAt: comment.publi_date,
            user: {
               _id: comment.user_id.user_id,
               name: comment.user_id.username,
               avatar: comment.user_id.user_img_id.img_url
            }
         }
      ))
      setComments([...comments, ...earlierComments])

      setLoading(false);
   }

   async function sendComment() {
      Keyboard.dismiss();

      await api.post(
         `/forum/${forum_id}/comment`,
         { comment_content: input },
         { headers: { Authorization: token } },
      );
      
      setInput('');
   }

   async function handleSetLiked() {
      setLiked(liked ? false : true);

      if (!liked) {
         api.post(`forum/${forum_id}/like`, {}, {
            headers: {
               Authorization: token
            }
         })
         .then((response) => {
            if (response.status == 204) {
               setLiked(true);
            }
         })

      } else {
         api.delete(`forum/${forum_id}/like`, {
            headers: {
               Authorization: token
            }
         })
         .then((response) => {
            if (response.status == 204) {
               setLiked(false);
            }
         })
      }
   }

   function openModal() {
      setModalDisplay(true);
   }
   function goToReplies(comment) {
      navigation.navigate('Reply', { comment, forum_id: forum.forum_id })
   };

   if (forum.forum_img_id === undefined) return false;

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
                  {forum.forum_description}
               </ModalDescription>

               <TagsThemes data={forum.themes} />

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

                  <ModalRuleTitle>3. Lorem Ipsum</ModalRuleTitle>
                  <ModalRule>
                     <ModalRuleImg />
                     <ModalRuleDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                     </ModalRuleDescription>
                  </ModalRule>

               </ModalContent>
            </ModalContainer>
         }

         <Container showsVerticalScrollIndicator={false}>
            <>
               <Header>
                  <HeaderBtnBack />
                  <HeaderBtnInfo onPress={openModal}>
                     <InfoIcon>i</InfoIcon>
                  </HeaderBtnInfo>
               </Header>

               <Cover resizeMode="cover" source={{ uri: forum.forum_img_id.img_url }} />

               <Desc>
                  <Options>
                     <Option onPress={handleSetLiked}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={20} color={liked ? '#DA2243' : '#F6F6F6'} />
                  </Option>
                  </Options>

                  <Title>{forum.title}</Title>
               </Desc>
            </>

            <GiftedChat
               messages={comments}
               messagesContainerStyle={{ backgroundColor: '#121212' }}
               user={{
                  _id: user.user_id
               }}
               renderInputToolbar={() => (
                  <InputContainer>
                  <InputBlock>
                        <Input
                           placeholder="Participe da conversa"
                           placeholderTextColor="#4B4B4B"
                           value={input}
                           onChangeText={text => setInput(text)}
                        />
                        <BtnInput onPress={sendComment}>
                           <MaterialIcons name="send" size={20} color="#E9E9E9" />
                        </BtnInput>
                     </InputBlock>
                  </InputContainer>
               )}
               textInputStyle={{   marginBottom: 10   }}
               renderChatFooter={() => {
                  loading &&
                  <ActivityIndicator size="small" color="#E9E9E9" />
               }}
               renderBubble={(props) => (
                  <ChatMessage data={props.currentMessage} goToReplies={() => goToReplies(props.currentMessage)}/>
               )}
               renderAvatar={null}
               infiniteScroll
               loadEarlier
               onLoadEarlier={loadComments}
            />
         </Container>

         <View style={{ marginTop: 20 }} />
      </View>
   );
}

export default Forums;