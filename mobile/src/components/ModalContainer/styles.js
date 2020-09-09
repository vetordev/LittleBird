import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   position: absolute;
   width: 100%;
   height: 100%;
   background: #00000080;
   z-index: 5;
   justify-content: center;
   align-items: center;
`;

export const Content = styled.View`
   width: 90%;
   min-height: 150px;
   background: #202020;
   border-top-width: 12px;
   border-color: ${props => props.color_theme};
   border-radius: 16px;
   /* max-height: 90%; */
`;

export const ChildrenContainer = styled.View`
   padding: 34px 18px;
   align-items: center;
   /* max-height: 70%; */
`;

export const BtnConfirm = styled(RectButton)`
   background: ${props => props.color_theme};
   position: relative;
   bottom: 0px;
   width: 100%;
   justify-content: center;
   align-items: center;
   border-radius: 16px;
   border-bottom-left-radius: 16px;
   border-bottom-right-radius: 17px;
`;

export const BtnConfirmText = styled.Text`
   padding: 17px 0;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   color: ${props => props.font_color};
`;