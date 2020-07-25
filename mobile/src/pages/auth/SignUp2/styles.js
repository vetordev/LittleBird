import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   background: #01C24E;
`;

export const Content = styled.View`
   align-items: center;
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

export const InterestsContainer = styled.SafeAreaView`
   background: #01C24E;
   align-items: center;
   justify-content: center;
   /* margin: 0 10px; */
`;

export const Interest = styled.TouchableOpacity.attrs({
   activeOpacity: 0.8
})`
   width: 50%;
   height: 125px;
   padding: 4px;
`;

export const InterestImageFilter = styled.View`
   width: 100%;
   height: 70%;
   z-index: 6;
   position: absolute;
   margin: 4px 0 0 4px;
   background: rgba(0, 0, 0, 0.2);
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
`;

export const InterestImage = styled.Image`
   width: 100%;
   height: 70%;
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
   z-index: 1;
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
   margin: 7px 0 5px;
`;

export const styles = StyleSheet.create({
   selected: {
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: '#000'
   }
})