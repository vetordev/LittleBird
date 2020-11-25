import styled from 'styled-components/native';

export const Menu = styled.View`
   flex-direction: row;
   /* align-items: center; */
   justify-content: center;

`;

export const MenuBtn = styled.TouchableOpacity`
   border-bottom-color: #D85517;
   border-bottom-width: ${props => props.selected ? 3 : 0}px;
   margin: 0 10px;
   margin-bottom: 15px;
   padding-bottom: 8px;
`;

export const MenuBtnText = styled.Text`
   font-family: Ubuntu_400Regular;
   color: ${props => props.selected ? '#B2B2B2' : '#535353'};
   font-size: ${props => props.selected ? 16 : 15}px;
`;