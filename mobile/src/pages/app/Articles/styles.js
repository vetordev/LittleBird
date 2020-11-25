import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.ScrollView`
   flex: 1; 
`;
export const Cover = styled.ImageBackground`
   width: 100%;
   height: 230px;
`;

export const Content = styled.View`
   width: 100%;
   height: 100%;
   z-index: 2;
   top: -40px;
   border-top-left-radius: 50px;
   border-top-right-radius: 50px;
   background: #121212;
   padding: 0 25px;
`;

export const Title = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 24px;
   margin-bottom: 8px;
`;

export const Author = styled.View`
   flex-direction: row;
   align-items: center;
   margin-bottom: 25px;
`;

export const AuthorName = styled.Text`
   color: #787878;
   font-family: Nunito_400Regular;
   font-size: 15px;
   margin-right: 4px;
`;

export const Options = styled.View`
   flex-direction: row-reverse;
   padding: 0 10px;
`;

export const Option = styled.TouchableOpacity`
   width: 52px;
   height: 52px;
   background: #202020;
   border-radius: 26px;
   top: -26px;
   justify-content: center;
   align-items: center;
   margin: 0 5px;
`;

export const TagSessionTitle = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   margin-bottom: 17px;
`;

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

export const TagTitle = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #AE2C6B;
`;

export const Recommendations = styled.View`
   background: #202020;
   padding: 25px 25px;
   border-radius: 17px;
   width: 100%;
   /* overflow: hidden; */
`;

export const TitleRecommendations = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   margin-bottom: 17px;
`;

export const Item = styled.View`
   flex-direction: row;
   
`;

export const TitleItem = styled.Text`
   color: #E9E9E9;
   font-family: Nunito_800ExtraBold;
   font-size: 18px;
   margin-left: 7px;
`;

export const LinkItem = styled.Text`
   color: #E9E9E9;
   font-family: Nunito_400Regular;
   font-size: 18px;
`;

export const LinkItemContainer = styled.TouchableOpacity`
   align-self: flex-start;
   margin-left: 7px;
   border-bottom-width: 3px;
   border-bottom-color: #834397;
   max-width: 100%;
   margin-bottom: 15px;
`;

export const styles = StyleSheet.create({
   t: {
      color: '#B8B8B8',
      fontFamily: 'Nunito_400Regular',
      fontSize: 19,
      lineHeight: 30,
      textAlign: 'justify',
   },

   marker1: {
      backgroundColor: 'rgba(215, 76, 176, 0.24)',
   },

   marker2: {
      backgroundColor: 'rgba(76, 190, 215, 0.24)',
   },

   marker3: {
      backgroundColor: 'rgba(154, 76, 215, 0.24)',
   }
});