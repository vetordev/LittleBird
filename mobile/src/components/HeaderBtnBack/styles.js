import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   position: absolute;
   top: ${Constants.statusBarHeight + 40}px;
   left: 28px;
   width: 30px;
   height: 30px;
   background: #232323;
   border-radius: 4px;
   z-index: 1;
`;
