import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`;

export const Image = styled.Image`
   margin-bottom: 20px;
   width: 100%;
   margin-left: 36px;
   /* background: #fff; */
`;

export const Title = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 30px;
   margin-bottom: 22px;
`;

export const Description = styled.Text`
   text-align: center;
   color: #B8B8B8;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   margin-bottom: 50px;
   width: 75%;
`;

export const BtnReturn = styled(RectButton)`
   width: 80%;
   height: 60px;
   background: #D85517;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
`;

export const TextBtnReturn = styled.Text`
   text-transform: uppercase;
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 18px;
`;