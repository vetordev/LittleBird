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

export const InterestItem = styled.View`
   /* width: 100%; */
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const InterestInfos = styled.View`
   flex-direction: row;
   align-items: center;
`;

export const InterestImg = styled.Image`
   width: 68px;
   height: 45px;
   background: #f00;
   border-radius: 7px;
   margin-right: 10px;
`;

export const InterestTitle = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #E9E9E9;
   font-size: 16px;
`;

export const Intetest = styled.View`
   ${InterestItem}:nth-child(2){
      background: #0ff;
   }
`;