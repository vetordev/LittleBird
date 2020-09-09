import styled from 'styled-components/native';

export const Container = styled.ScrollView`
   flex: 1;
`;

export const Header = styled.View`

`;

export const HeaderBtnInfo = styled.View`
   
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