import styled from 'styled-components/native';

export const Container = styled.ScrollView`
   flex: 1;
`;

export const Cover = styled.ImageBackground`
   width: 100%;
   height: 230px;
   background: red;
`;

export const Content = styled.View`
   width: 100%;
   height: 100%;
   z-index: 2;
   top: -40px;
   border-top-left-radius: 50px;
   border-top-right-radius: 50px;
   background: #121212;
   padding: 0 25px;
`;

export const Title = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 24px;
   margin-bottom: 27px;
`;

export const Options = styled.View`
   flex-direction: row-reverse;
   padding: 0 10px;
`;

export const Option = styled.TouchableOpacity`
   width: 52px;
   height: 52px;
   background: #202020;
   border-radius: 26px;
   top: -26px;
   justify-content: center;
   align-items: center;
   margin: 0 5px;
`;

export const MessageContainer = styled.View`
   margin-bottom: 30px;
   width: 100%;
   /* flex-direction: row-reverse; */
   /* background: red; */
`;

export const Message = styled.View`
   background: blue;
   right: 0;
   position: relative;
`;

export const MessageHeader = styled.View`
   flex-direction: row;
   align-items: center;
   margin-bottom: 4px;
   /* max-width: 80%; */
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
   background: #BE5320;
   max-width: 80%;
   padding: 16px;
   border-radius: 13px;
   border-top-left-radius: 0;
`;

export const MessageText = styled.Text`
   color: #121212;
   font-family: Nunito_400Regular;
   font-size: 15px;
`;

export const Footer = styled.View`
   padding: 0 15px 19px;
   /* background: rgba(0, 0, 0, 0); */
`;

export const InputBlock = styled.View`
   background: #212121;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 7px;
   border-radius: 19px;
   margin: 0 10px 10px;
   /* overflow: visible; */
`;

export const Input = styled.TextInput`
   height: 45px;
   padding: 0 15px;
   color: #F6F6F6;
   font-size: 15px;
   flex: 1;
`;

export const BtnInput = styled.TouchableOpacity`
   width: 45px;
   height: 45px;
   background: #BE5320;
   border-radius: 18px;
   padding: 10px;
   justify-content: center;
   align-items: center;
`;
