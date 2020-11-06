import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import { useAvatar } from '../../contexts/useAvatar';

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
   const [userAmI, setUserAmI] = useState(false);

   const { user } = useAuth();
   const { navigate } = useNavigation();
   const { avatares } = useAvatar();

   const user_img = data.user_id.user_img_id.user_img_id;

   function handleLike(comment_id) {
      setLiked(liked ? false : true);
      setLikesQnt(liked ? likeQnt - 1 : likeQnt + 1);
   }

   function navigateToComplaint() {
      navigate('Report');
   }

   useEffect(() => {
      setUserAmI(data.user_id.username == user.username ? true : false);
      // console.log(data.user_id.username, user.username);

      // data.user_id.username == user.username ? console.log(true) : console.log(false)
   }, [])

   return (
      <MessageContainer userAmI={userAmI}>
         <View>
            <MessageHeader userAmI={userAmI}>
               <MessageUserAvatar resizeMode="cover" source={{ uri: avatares[user_img - 1].url }} />
               <MessageUsername>{data.user_id.username}</MessageUsername>
               <BtnMessageDetails onPress={navigateToComplaint}>
                  <TextBtnMessageDetails>...</TextBtnMessageDetails>
               </BtnMessageDetails>
            </MessageHeader>
            <MessageContent userAmI={userAmI}>
               <MessageText userAmI={userAmI}>{data.comment_content}</MessageText>
            </MessageContent>

            { !userAmI &&
               <LikeContainer>
                  <Like onPress={() => handleLike(data.comment_id)}>
                     <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={14} color="#DA2243"/>
                     <NumLikes>{likeQnt}</NumLikes>
                  </Like>
               </LikeContainer>
            }
         </View>
      </MessageContainer>
   );
}

export default ChatMessage;