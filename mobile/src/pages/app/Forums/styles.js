import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.View`
   flex: 1;
   background: #f00;
`;

export const Header = styled.View`
   justify-content: space-between;
   /* padding: 0 -25px; */
`;

export const HeaderBtnInfo = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   position: absolute;
   top: ${props => props.withoutTop ? 0 : Constants.statusBarHeight + 40}px;
   right: 28px;
   width: 30px;
   height: 30px;
   background: #232323;
   border-radius: 4px;
   z-index: 1;
`;

export const Desc = styled.View`
   padding: 0 25px;
   border-top-left-radius: 50px;
   border-top-right-radius: 50px;
   z-index: 3;
   background: #121212;
   margin-top: -44px;
`;

export const InfoIcon = styled.Text`
   color: #E9E9E9;
   font-family: Nunito_800ExtraBold;
   font-size: 16px;
`;

export const Cover = styled.ImageBackground`
   width: 100%;
   height: 230px;
   background: red;
   /* margin: 0 -25px; */
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

export const Footer = styled.View`
   padding: 0 15px 19px;
`;

export const InputBlock = styled.View`
   background: #212121;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 7px;
   border-radius: 19px;
   margin: 0 10px 10px;
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

export const ModalTitle = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 21px;
   margin-bottom: 22px;
`;

export const ModalDescription = styled.Text`
   font-family: Nunito_400Regular;
   font-size: 15px;
   color: #B8B8B8;
   margin-bottom: 22px;
`;

export const ModalContent = styled.View`
   width: 100%;
`;

export const ModalSubtitle = styled.View`
   border-bottom-width: 3px;
   border-color: #01C24E;
   align-self: flex-start;
   margin-bottom: 7px;
`;

export const ModalSubtitleText = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #E9E9E9;
   font-size: 18px;
`;

export const ModalRuleTitle = styled.Text`

   margin-top: 11px;
   font-family: Nunito_700Bold;
   font-size: 17px;
   color: #F6F6F6;
   margin-bottom: 8px;
`;

export const ModalRule = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
`;

export const ModalRuleImg = styled.Image`
   width: 70px;
   height: 70px;
   background: #f0f;
   border-radius: 40px;
   margin-right: 3.5px;
`;

export const ModalRuleDescription = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #B8B8B8;
   font-size: 13px;
   flex: 1;
   margin-left: 3.5px;
   line-height: 17px;
`;