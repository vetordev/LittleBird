import styled from 'styled-components/native';

export const Container = styled.View`
   flex-direction: row;
   height: 55px;
   background-color: #191919;
`;

export const OptionNotSelected = styled.TouchableOpacity`
      justify-content: center;
      align-items: center;
      flex: 1;
`;

export const OptionSelected = styled.View`
      flex: 1;
      justify-content: center;
      align-items: center;
      position: relative;
      bottom: 25px;
`;

export const BtnSelected = styled.TouchableOpacity`
   background-color: ${props => props.color};
   padding: 17px;
   border-radius: 100px;
   border-color: #000;
   border-bottom-width: 0;
   shadow-color: #f00;
   shadow-offset: 0 2px;
   shadow-opacity: 0.8;
   shadow-radius: 2px;
   elevation: 15;
   /* border-width: 1px; */
`;