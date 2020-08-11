import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const BtnLogin = styled(RectButton)`
   width: 80%;
   height: 55px;
   margin-top: 15px;
   align-items: center;
   flex-direction: row;
   background: ${props => props.background};
   border-radius: 10px;
`;

export const TextBtnLogin = styled.Text`
   color: ${props => props.color};
   font-family: Ubuntu_700Bold;
   text-transform: uppercase;
   font-size: 20px;
   flex: 1;
   justify-content: center;
   text-align: center;
`;

export const BtnIcon = styled.View`
   height: 100%;
   width: 20%;
   background: ${props => props.background};
   border-top-left-radius: 10px;
   border-bottom-left-radius: 10px;
   justify-content: center;
   align-items: center;
`;