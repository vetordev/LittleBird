import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
   flex: 1;
   padding-bottom: 30px;
`;

export const AvataresContainer = styled.View`
   flex-direction: row;
   margin-bottom: 30px;
   align-items: center;
   justify-content: center;
   width: 80%;
`;

export const MainAvatar = styled.Image`
   width: 108px;
   height: 108px;
   border-radius: 29px;
   margin-right: 4.5px;
   overflow: hidden;
`;

export const Image = styled.Image`
   flex: 1;
`;

export const AvatarOption = styled.TouchableOpacity`
   width: 50px;
   height: 50px;
   border-radius: 10px;
   margin: 0 4.5px;
   overflow: hidden;
`;

export const BtnSaveProfile = styled(RectButton)`
   width: 80%;
   height: 58px;
   background: #834397;
   border-radius: 10px;
   justify-content: center;
   align-items: center;
   margin: 50px 0 30px;
`;

export const BtnSaveProfileText = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 18px;
`;

export const BtnAlterPassword = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
   /* margin-top: -7px; */
`;

export const BtnAlterPasswordText = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 15px;
   margin-left: 5px;
`;

export const ModalMessageContent = styled.View`
   align-items: center;
   margin: -20px 0;
`;

export const ModalMessage = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 20px;
   max-width: 70%;
   text-align: center;
   margin-top: 8px;
`;