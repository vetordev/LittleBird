import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../contexts/auth';
import { useAvatar } from '../../contexts/useAvatar';

import {
   Container,
   MessageContainer,
   MessageContent,
   MessageUsername,
   MessageText,
   MessageHeader,
   MessageUserAvatar,
   LikeContainer,
   Like,
   NumLikes,
   BtnMessageDetails,
   TextBtnMessageDetails,
   ReplyContainer,
   ReplyNotice,
} from './styles';

const ChatMessage = ({ data, goToReplies }) => {
   const [liked, setLiked] = useState(false);
   const [likeQnt, setLikesQnt] = useState(0);
   const [userAmI, setUserAmI] = useState(false);

   const { user } = useAuth();
   const { navigate } = useNavigation();
   const { avatares } = useAvatar();

   // const user_img = data.user_id.user_img_id.user_img_id;

   function handleLike(comment_id) {
      setLiked(liked ? false : true);
      setLikesQnt(liked ? likeQnt - 1 : likeQnt + 1);
   }


   function navigateToReport() {
      navigate('Report', { comment_id: data._id });
   }

   useEffect(() => {
      // console.log('Conteúdo: ', data.comment_content)
      setUserAmI(data.user.name == user.username ? true : false);
      // console.log(data.user_id.username, user.username);

      // data.user_id.username == user.username ? console.log(true) : console.log(false)
   }, [])

   return (
      <Container>
      <MessageContainer userAmI={userAmI}>
         <TouchableOpacity onPress={goToReplies}>
            <View>
               <MessageHeader userAmI={userAmI}>
                  <MessageUserAvatar resizeMode="cover" source={{ uri: data.user.avatar/*avatares[user_img - 1].url }}*/}} />
                  <MessageUsername>{data.user.name}</MessageUsername>
                  <BtnMessageDetails onPress={navigateToReport}>
                     <Feather name="flag" color="#787878" />
                     {/* <TextBtnMessageDetails>...</TextBtnMessageDetails> */}
                  </BtnMessageDetails>
               </MessageHeader>
               <MessageContent userAmI={userAmI}>
                  <MessageText userAmI={userAmI}>{data.text}</MessageText>
               </MessageContent>

               { data.reply && !userAmI &&
                  <LikeContainer>
                     <Like onPress={() => handleLike(data._id)}>
                        <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={14} color="#DA2243"/>
                        <NumLikes>{likeQnt}</NumLikes>
                     </Like>
                  </LikeContainer>
               }
            </View>
         </TouchableOpacity>
         
      </MessageContainer>
      
      { data.reply && !userAmI &&
         <>
         <ReplyContainer>
            <MessageHeader userAmI={false}>
                  <MessageUserAvatar resizeMode="cover" source={{ uri: data.user.avatar/*avatares[user_img - 1].url }}*/}} />
                  <MessageUsername>{data.user.name}</MessageUsername>
                  <BtnMessageDetails onPress={navigateToReport}>
                     <Feather name="flag" color="#787878" />
                     {/* <TextBtnMessageDetails>...</TextBtnMessageDetails> */}
                  </BtnMessageDetails>
               </MessageHeader>
               <MessageContent userAmI={true}>
                  <MessageText userAmI={true}>{data.reply.reply_content}</MessageText>
               </MessageContent>
         </ReplyContainer>
         {/* <ReplyNotice>E outras respostas...</ReplyNotice> */}
         </>
      }
      </Container>
   );
}

export default ChatMessage;