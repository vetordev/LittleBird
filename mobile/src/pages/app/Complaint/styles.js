import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   padding: 0 25px 20px;
   margin-top: -20px;
`;

export const Title = styled.Text`
   font-family: Ubuntu_700Bold;
   font-size: 40px;
   color: #E9E9E9;
   margin-bottom: 5px;
`;

export const Subtitle = styled.Text`
   font-family: Nunito_700Bold;
   font-size: 18px;
   color: #929292;
   margin-bottom: 40px;
`;

export const CheckBoxContainer = styled.View`
   flex-direction: row;
   align-items: center;
   width: 100%;
   margin-bottom: 20px;
   padding-right: 25px;
`;

export const CheckedIconContainer = styled.View`
   border: 2px solid #834397;
   background: ${props => props.checked ? '#834397' : '#121212' };
   border-radius: 6px;
   position: relative;
   left: -10px;
`;

export const LegendCheckBox = styled.Text`
   font-family: Nunito_400Regular;
   color: #B8B8B8;
   font-size: 17px;
   position: relative;
   left: -10px;
`;

export const BtnSaveProfile = styled(RectButton)`
   width: 80%;
   height: 58px;
   background: #834397;
   border-radius: 10px;
   justify-content: center;
   align-items: center;
   margin: 22px 0 30px;
`;

export const BtnSaveProfileText = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 18px;
`;

export const TextareaLegend = styled.Text`
   font-family: Nunito_400Regular;
   color: #929292;
   font-size: 14px;
   margin: 10px 0 15px;
`;