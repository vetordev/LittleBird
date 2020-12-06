import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
   flex: 1;
   /* padding-top: ${Constants.statusBarHeight}px; */
`;

export const CoverFilter = styled.View`
   width: 100%;
   min-height: 240px;
   background-color: #000;
`;

export const Cover = styled(LinearGradient)`
   flex: 1;
   background-color: #69058970;
   justify-content: center;
   align-items: center;
   padding: 0 60px;
`;

export const MainComment = styled.Text`
   font-family: Ubuntu_700Bold;
   font-size: 18px;
   text-align: center;
   color: #E9E9E9;
   margin-bottom: 6px;
`;

export const CommentAuthor = styled.Text`
   font-family: Nunito_600SemiBold;
   color: #B8B8B8;
   font-size: 15px;
`;