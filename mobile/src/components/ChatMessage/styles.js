import styled from 'styled-components/native';

export const Container = styled.View`
   padding: 0 25px;
   width: 100%;
`;

export const MessageContainer = styled.View`
   margin-bottom: ${props => props.userAmI ? 7 : 7 }px;
   width: 100%;
   flex-direction: ${props => props.userAmI ? 'row-reverse' : 'row'};
`;

export const MessageHeader = styled.View`
   flex-direction: row;
   align-items: center;
   margin-bottom: 7px;
   display: ${props => props.userAmI ? 'none' : 'flex'};
`;

export const MessageUserAvatar = styled.Image`
   width: 30px;
   height: 30px;
   border-radius: 7px;
   margin-right: 7px;
`;

export const MessageUsername = styled.Text`
   color: #787878;
   font-family: Ubuntu_400Regular;
   font-size: 13px;
`;

export const MessageContent = styled.View`
   background: ${props => props.userAmI ? '#2C2C2C' : '#BE5320'};
   max-width: 225px;
   padding: 16px;
   border-radius: 13px;
   border-top-left-radius: ${props => props.userAmI ? 13 : 0}px;
   border-top-right-radius: ${props => props.userAmI ? 0 : 13}px;
`;

export const MessageText = styled.Text`
   color: ${props => props.userAmI ? '#FFFFFF80' : '#121212'};
   font-family: Nunito_400Regular;
   font-size: 15px;
`;

export const LikeContainer = styled.View`
   top: -10px;
   flex-direction: row-reverse;
`;

export const Like = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
   background: #B8B8B8;
   padding: 3px 7px;
   border-radius: 9px;
   margin-right: 18px;
`;

export const NumLikes = styled.Text`
   margin-left: 2px;
   font-family: Nunito_400Regular;
   font-size: 12px;
`;

export const BtnMessageDetails = styled.TouchableOpacity`
   margin-left: 7px;
   /* height: 33px; */
`;

export const TextBtnMessageDetails = styled.Text`
   font-family: Nunito_400Regular;
   font-size: 18px;
   color: #787878;
   letter-spacing: 1.5px;
`;

export const ReplyContainer = styled.View`
   border-left-color: #BE5320;
   border-left-width: 3px;
   padding-left: 10px;
   margin-left: 30px;
   max-width: 60%;
`;

export const ReplyNotice = styled.Text`
   align-self: flex-end;
   font-family: Ubuntu_400Regular;
   color: #B8B8B8;
   font-size: 13px;
   margin-top: 7px;
`;