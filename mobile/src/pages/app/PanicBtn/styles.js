import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
`;

export const Title = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 20px;
   margin: -20px 36px 40px;
`;

export const Card = styled.View`
   margin: 0 16px 23px;
`;

export const EmergencyTitle = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #B8B8B8;
   font-size: 17px;
   margin-bottom: 6px;
`;

export const CardContact = styled.View`
   background: #01C24E;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 13px 15px;
   border-radius: 5px;
`;

export const Instituition = styled.Text`
   max-width: 60%;
   font-family: Nunito_700Bold;
   color: #121212;
   font-size: 16px;
`;

export const Contact = styled.Text`
   font-family: Nunito_400Regular;
   color: #121212;
   font-size: 12px;
`;

export const ContactContainer = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;