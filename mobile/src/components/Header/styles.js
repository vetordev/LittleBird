import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.View`
   width: 100%;
   height: 64px;
   padding: ${Constants.statusBarHeight + 40}px 28px;
   align-items: center;
   margin-bottom: 20px;
`;

export const Title = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #E9E9E9;
   text-transform: uppercase;
   letter-spacing: 2px;
   font-size: 16px;
   margin: 30px 0 40px;
`;
