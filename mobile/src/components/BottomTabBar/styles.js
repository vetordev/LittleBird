import styled from 'styled-components/native';

export const Container = styled.View`
   flex-direction: row;
   height: 55px;
   background-color: #191919;
   padding: 0 10px;
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
      elevation: 7;
`;

export const BtnSelected = styled.TouchableOpacity`
   background-color: ${props => props.color};
   padding: 15px;
   border-radius: 100px;
   elevation: 7;
`;