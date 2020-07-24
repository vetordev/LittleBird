import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.ScrollView`
   flex: 1;
   /* align-items: center; */
   background: #01C24E;
`;

export const Content = styled.View`
   align-items: center;
   padding-bottom: 25px;
`;

export const Title = styled.Text`
   color: #202020;
   font-family: Ubuntu_700Bold;
   font-size: 36px;
   margin-bottom: 20px;
   width: 300px;
`;

export const Description = styled.Text`
   margin: 0 30px 20px;
   font-family: Nunito_400Regular;
   font-size: 16px;
`;

export const InterestsContainer = styled.View`
   height: 250px;
   width: 90%;
   background: #01C24E;
   margin-bottom: 7px;
   /* align-items: center; */
`;

export const Interest = styled.TouchableOpacity.attrs({
   activeOpacity: 0.8
})`
   width: 50%;
   height: 125px;
   padding: 4px;
`;

export const InterestImage = styled.Image`
   width: 100%;
   height: 70%;
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
`;

export const InterestTitleContainer = styled.View`
   background: #202020;
   flex: 1;
   justify-content: center;
   align-items: center;
   border-bottom-left-radius: 6px;
   border-bottom-right-radius: 6px;
`;

export const InterestTitle = styled.Text`
   color: #B8B8B8;
   font-size: 14px;
   font-family: Nunito_700Bold;
`;

export const LoadInterests = styled.TouchableOpacity`
   width: 40px;
   height: 40px;
   background: #202020;
   border-radius: 20px;
   justify-content: center;
   align-items: center;
   margin-bottom: 5px;
`;

export const styles = StyleSheet.create({
   selected: {
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: '#000'
   }
})