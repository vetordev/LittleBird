import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Header = styled.View`
   flex-direction: row;
   justify-content: space-between;
`;

export const IconContainer2 = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   position: absolute;
   margin-top: ${Constants.statusBarHeight + 40 + 'px'};
   right: 28px;
   width: 30px;
   height: 30px;
   background: #232323;
   border-radius: 4px;
`;

export const Title = styled.Text`
   margin-left: 28px;
   margin-top: ${Constants.statusBarHeight + 40 + 'px'};
   margin-bottom: 20px;
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 30px;
   max-width: 250px;
`;

export const UserName = styled.Text`
   color: #834397;
`;

export const SessionTitleContainer = styled.View`
   align-self: flex-start;
   margin-left: 28px;
   margin-bottom: 16px;
   border-bottom-width: 3px;
   border-bottom-color: #834397;
`;

export const InterestsTitleContainer = styled.TouchableOpacity`
   align-self: flex-start;
   margin-left: 28px;
   margin-bottom: 16px;
   border-bottom-width: 3px;
   border-bottom-color: #834397;
`;

export const InterestOptionsContainer = styled.View`
   flex-direction: row;
   justify-content: space-between; 
`;

export const IconContainer = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   margin-right: 28px;
   width: 30px;
   height: 30px;
   background: #232323;
   border-radius: 4px;
`;

export const SessionTitle = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 18px; 
`;

export const CarouselItem = styled.TouchableOpacity`
   flex-direction: column-reverse;
   margin-bottom: 35px;
   width: ${props => props.winWidth * 0.8}px;
   height: 175px;
   border-radius: 10px;
   elevation: 7;
`;

export const CarouselImageItem = styled.Image`
   position: absolute;
   width: 100%;
   height: 100%;
   border-radius: 10px;
`;

export const CarouselImageFilter = styled.View`
   position: absolute;
   z-index: 1;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.4);
   border-radius: 10px;
`;

export const TitleCarouselItem = styled.Text`
   color: #E9E9E9;
   font-family: Ubuntu_700Bold;
   font-size: 18px; 
   z-index: 4;
   padding: 0 20px 20px 20px;
`;

export const TypeCarouselItem = styled.Text`
   padding-left: 20px;
   font-family: Ubuntu_500Medium;
   color: #E9E9E9;
   font-size: 15px;
   z-index: 4;
`;

export const InterestsContainer = styled.SafeAreaView`
   background: transparent;
   align-items: center;
   justify-content: center;
   flex: 1;
   background: #121212;
`;