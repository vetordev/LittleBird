import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
   flex: 1;
   padding-top: ${Constants.statusBarHeight}px;
`;

export const CoverFilter = styled.View`
   width: 100%;
   height: 200px;
   background-color: #000;
`;

export const Cover = styled.View`
   flex: 1;
   background-color: #69058970;
   justify-content: center;
   align-items: center;
`;

export const MainComment = styled.Text`
   font-family: Ubuntu_700Bold;
   font-size: 17px;
   text-align: center;
   color: #E9E9E9;
`;