import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
   position: absolute;
   width: 100%;
   height: 100%;
   background: #00000080;
   z-index: 5;
   justify-content: center;
   align-items: center;
`;

export const Content = styled.View`
   width: 80%;
   height: 200px;
   background: #ff0;
`;