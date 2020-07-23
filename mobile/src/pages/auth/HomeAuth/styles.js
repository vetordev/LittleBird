import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   background: #D85517;
`;

export const Title = styled.Text`
   color: #121212;
   font-family: Ubuntu_700Bold;
   font-size: 48px;
   margin-left: 30px;
   margin-bottom: 52px;
   width: 300px;
`;

export const BtnLogin = styled.TouchableOpacity.attrs({
   activeOpacity: 0.95
})`
   width: 80%;
   height: 55px;
   margin-top: 15px;
   align-items: center;
   flex-direction: row;
   background: #121212;
   border-radius: 10px;
`;

export const TextBtnLogin = styled.Text`
   color: #D85517;
   font-family: Ubuntu_700Bold;
   text-transform: uppercase;
   font-size: 20px;
   flex: 1;
   justify-content: center;
   text-align: center;
`;

export const BtnIcon = styled.View`
   height: 100%;
   width: 20%;
   background: #000;
   border-radius: 10px;
   justify-content: center;
   align-items: center;
`;