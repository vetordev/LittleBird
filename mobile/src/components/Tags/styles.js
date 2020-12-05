import styled from 'styled-components/native';

export const Tags = styled.ScrollView`
   margin-bottom: 23px;
   margin-right: -5px;
   flex-direction: row;
   width: 100%;
`;

export const Tag = styled.TouchableOpacity`
   border: 1px solid #AE2C6B;
   margin: 0 5px;
   padding: 5px 14px;
   border-radius: 10px;
`;

export const TagSessionTitle = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   margin-bottom: 17px;
`;

export const TagTitle = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #AE2C6B;
`;