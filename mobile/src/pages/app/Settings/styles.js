import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
   flex: 1;
   background: #121212;
   padding: ${Constants.statusBarHeight + 40 + 'px'} 28px 20px;
   align-items: center;
`;

export const Title = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #E9E9E9;
   text-transform: uppercase;
   letter-spacing: 2px;
   font-size: 16px;
   margin: 30px 0 40px;
`;

export const Session = styled.View`
   margin: 0 28px 40px;
   width: 100%;
`;

export const SessionHeader = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 0 0 8px;
   border-bottom-width: ${StyleSheet.hairlineWidth}px;
   border-bottom-color: #B8B8B8;
   margin-bottom: 21px;
`;

export const SessionTitle = styled.Text`
   font-family: Nunito_700Bold;
   color: #E9E9E9;
   font-size: 20px;
   margin-left: 13px;
`;

export const SessionOption = styled.View`
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 12px;
`;

export const SessionOptionBtn = styled.TouchableOpacity`
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 12px;
`;

export const TitleOption = styled.Text`
   font-family: Nunito_400Regular;
   color: #E9E9E9;
   font-size: 18px;
`;

export const PanicBtn = styled.TouchableOpacity`
   flex-direction: row;
   background: rgba(154, 36, 36, 0.15);
   padding: 14px 20px;
   border-radius: 5px;
   margin-top: 3px;
`;

export const PanicBtnTitle = styled.Text`
   font-family: Nunito_400Regular;
   color: #E9E9E9;
   font-size: 18px;
   margin-left: 12px;
`;

export const BtnLogout = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
   background: #202020;
   padding: 10px 25px;
   border-radius: 4px;
   position: absolute;
   bottom: 30px;
`;

export const BtnLogoutText = styled.Text`
   font-family: Nunito_400Regular;
   color: #B8B8B8;
   font-size: 18px;
   margin-right: 5px;
`;