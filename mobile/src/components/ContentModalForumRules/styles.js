import styled from 'styled-components/native';

export const ModalTitle = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 21px;
   margin-bottom: 22px;
`;

export const ModalDescription = styled.Text`
   font-family: Nunito_400Regular;
   font-size: 15px;
   color: #B8B8B8;
   margin-bottom: 22px;
`;

export const ModalContent = styled.View`
   width: 100%;
`;

export const ModalSubtitle = styled.View`
   border-bottom-width: 3px;
   border-color: #01C24E;
   align-self: flex-start;
`;

export const ModalSubtitleText = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #E9E9E9;
   font-size: 18px;
`;

export const ModalRuleTitle = styled.Text`

   margin-top: 20px;
   font-family: Nunito_700Bold;
   font-size: 17px;
   color: #F6F6F6;
   margin-bottom: 8px;
`;

export const ModalRule = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
`;

export const ModalRuleImg = styled.ImageBackground`
   width: 70px;
   height: 70px;
   background: ${props => props.color + '95'};
   border-radius: 40px;
   margin-right: 3.5px;
   justify-content: center;
   align-items: center;
`;

export const ModalRuleDescription = styled.Text`
   font-family: Ubuntu_400Regular;
   color: #B8B8B8;
   font-size: 14px;
   flex: 1;
   margin-left: 10px;
   line-height: 17px;
`;