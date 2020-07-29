import styled from 'styled-components/native';

export const Container = styled.ScrollView`
   flex: 1; 
`;
export const Cover = styled.ImageBackground`
   width: 100%;
   height: 230px;
   /* position: absolute; */
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
   margin: 0 0 8px;
`;

export const Author = styled.Text`
   color: #787878;
   font-family: Nunito_400Regular;
   font-size: 15px;
   margin-bottom: 23px;
`;

export const Text = styled.Text`
   color: #B8B8B8;
   font-family: Nunito_400Regular;
   font-size: 19px;
   line-height: 30px;
   text-align: justify;
`;

export const Options = styled.View`
   /* background: #f00; */
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
   margin: 0 10px;
`;

export const Recommendations = styled.View`
   background: #202020;
   padding: 25px 25px;
   border-radius: 17px;
`;

export const TitleRecommendations = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 20px;
   margin-bottom: 17px;
`;

export const Item = styled.View`
   flex-direction: row;
   align-items: center;
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
`;