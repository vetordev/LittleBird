import styled from 'styled-components/native';

export const MessageContainer = styled.View`
   margin-bottom: ${props => props.userIsMe ? 7 : 0 }px;
   width: 100%;
   flex-direction: ${props => props.userIsMe ? 'row-reverse' : 'row'};
   padding: 0 25px;
`;

export const MessageHeader = styled.View`
   flex-direction: row;
   align-items: center;
   margin-bottom: 7px;
   display: ${props => props.userIsMe ? 'none' : 'flex'};
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
   background: ${props => props.userIsMe ? '#2C2C2C' : '#BE5320'};
   max-width: 225px;
   padding: 16px;
   border-radius: 13px;
   border-top-left-radius: ${props => props.userIsMe ? 13 : 0}px;
   border-top-right-radius: ${props => props.userIsMe ? 0 : 13}px;
`;

export const MessageText = styled.Text`
   color: ${props => props.userIsMe ? '#FFFFFF80' : '#121212'};
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
   height: 33px;
   /* background: #f00; */
`;

export const TextBtnMessageDetails = styled.Text`
   font-family: Nunito_400Regular;
   font-size: 18px;
   color: #787878;
   letter-spacing: 1.5px;
`;