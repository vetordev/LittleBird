import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
`;

export const AddInterest = styled(RectButton)`
   width: 50%;
   height: 125px;
   padding: 4px;
   flex: 1;
`;

export const AddInterestContent = styled.View`
   background: #202020;
   flex: 1;
   border-radius: 6px;
   justify-content: center;
   align-items: center;
   padding: 24px;
`;

export const AddInterestText = styled.Text`
   text-align: center;
   font-family: Nunito_700Bold;
   font-size: 14px;
   color: #B8B8B8;
`;
