import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.TouchableOpacity.attrs({
   activeOpacity: 0.8
})`
   width: 50%;
   min-height: 125px;
   padding: 4px;
   /* flex: 1; */
   /* background: red; */
`;

export const InterestImageFilter = styled.View`
   width: 100%;
   height: 87.5px;
   z-index: 6;
   position: absolute;
   margin: 4px 0 0 4px;
   background: rgba(0, 0, 0, 0.2);
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
`;

export const InterestImage = styled.ImageBackground`
   width: 100%;
   height: 87.5px;
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
   overflow: hidden;
   z-index: 1;
   flex-direction: row-reverse;
`;

export const InterestTitleContainer = styled.View`
   background: #202020;
   flex: 1;
   justify-content: center;
   align-items: center;
   border-bottom-left-radius: 6px;
   border-bottom-right-radius: 6px;
   padding: 7px 5px;
`;

export const InterestTitle = styled.Text`
   color: #B8B8B8;
   font-size: 14px;
   font-family: Nunito_700Bold;
   text-align: center;
`;

export const InterestDelete = styled.TouchableOpacity`
   width: 20px;
   height: 20px;
   background: #FFF;
   opacity: 0.5;
   margin: 7px;
   border-radius: 4px;
   justify-content: center;
   align-items: center;
`;

export const DeleteIcon = styled.Text`
   font-family: Nunito_800ExtraBold;
   color: #F6F6F6;
   font-size: 12px;
   justify-content: center;
   align-items: center;
`;