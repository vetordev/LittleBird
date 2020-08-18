import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { 
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
} from './styles';

const ChatMessage = ({ data }) => {
   const [liked, setLiked] = useState(false);
   const [likeQnt, setLikesQnt] = useState(0);

   const { navigate } = useNavigation();

   const userIsMe = data.user_id == 3 ? true : false;

   function handleLike(comment_id) {
      setLiked(liked ? false : true);
      setLikesQnt(liked ? likeQnt - 1 : likeQnt + 1);
   }

   function navigateToComplaint() {
      navigate('Complaint');
   }

   return (
      <MessageContainer userIsMe={userIsMe}>
         <View>
            <MessageHeader userIsMe={userIsMe}>
               <MessageUserAvatar resizeMode="cover" source={{ uri: 'https://i.pinimg.com/564x/34/43/71/344371e32e903084adccaace156dcb4e.jpg' }} />
               <MessageUsername>bolinhorosa</MessageUsername>
               <BtnMessageDetails onPress={navigateToComplaint}>
                  <TextBtnMessageDetails>...</TextBtnMessageDetails>
               </BtnMessageDetails>
            </MessageHeader>
            <MessageContent userIsMe={userIsMe}>
               <MessageText userIsMe={userIsMe}>{data.comment_content}</MessageText>
            </MessageContent>
            <LikeContainer>
               <Like onPress={() => handleLike(data.comment_id)}>
                  <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={14} color="#DA2243"/>
                  <NumLikes>{likeQnt}</NumLikes>
               </Like>
            </LikeContainer>
         </View>
      </MessageContainer>
   );
}

export default ChatMessage;