import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   background: #690589;
   padding-bottom: 50px;
`;

export const Title = styled.Text`
   color: #F6F6F6;
   font-family: Ubuntu_700Bold;
   font-size: 44px;
   margin: 20px 0 44px 30px;
   width: 300px;
`;

export const CheckBoxContainer = styled.View`
   flex-direction: row;
   align-items: center;
   /* background: #d00; */
   padding: 0;
   width: 80%;
   margin: -15px 0 20px 0;
`;

export const CheckedIconContainer = styled.View`
   border: 2px solid #F6F6F6;
   margin: 0;
   padding: 0;
   background: ${props => props.checked ? '#F6F6F6' : '#690589' };
   border-radius: 6px;

   position: relative;
   left: -10px;
`;

export const LegendCheckBox = styled.Text`
   font-family: Nunito_400Regular;
   color: #F6F6F6;
   /* font-size: 14px; */

   position: relative;
   left: -10px;
`;

export const TextBold = styled.Text`
   font-family: Nunito_800ExtraBold;
`;