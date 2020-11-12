import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
   flex: 1;
`;

export const AddInterest = styled(RectButton)`
   width: 50%;
   height: 125px !important;
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
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 10px 0;
   margin: 0 10px;
   border-bottom-width: ${ StyleSheet.hairlineWidth }px;
   border-color: #B8B8B880;
`;

export const InterestInfos = styled.View`
   flex-direction: row;
   align-items: center;
`;

export const InterestImg = styled.Image`
   width: 68px;
   height: 45px;
   background: #000;
   border-radius: 7px;
   margin-right: 10px;
`;

export const InterestTitle = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #E9E9E9;
   font-size: 16px;
`;

export const InterestIcon = styled.TouchableOpacity`

`;