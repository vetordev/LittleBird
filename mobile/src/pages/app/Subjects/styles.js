import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const Container = styled.ScrollView`
   flex: 1;
   background: #121212;
   padding-top: ${Constants.statusBarHeight + 40}px;
`;

export const Title = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #B8B8B8;
   font-size: 21px;  
   margin-left: 30px;
   margin-bottom: 18px;
`;

export const AllThemes = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   margin: 0 7px;
   background: #000;
   border-radius: 7px;
   height: 75px;
   /* width: 70px; */
`;

export const Theme = styled.TouchableOpacity`
   width: 110px;
   height: 75px;
   margin: 0 7px;
   border-radius: 7px;
   justify-content: center;
   align-items: center;
`;

export const ThemeImage = styled.Image`
   width: 100%;
   height: 100%;
   position: absolute;
   border-radius: 7px;
`;

export const ThemeImageFilter = styled.View`
   position: absolute;
   z-index: 1;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.4);
   border-radius: 6px;
`;

export const ThemeTitle = styled.Text`
   z-index: 2;
   color: #F6F6F6;
   font-family: Ubuntu_700Bold;
   font-size: 14px;
   text-align: center;
   padding: 7px;
`;

export const SessionHeader = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: center; 
   margin: 10px 25px 17px;
`;

export const SessionLineDecoration = styled.View`
   flex: 1;
   height: 1px;
   background: #D85517;
`;

export const SessionTitle = styled.Text`
   /* flex: 0.7; */
   text-align: center;
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 22px;  
   margin: 0 13px;
`;

export const Option = styled.TouchableOpacity.attrs({
   activeOpacity: 1
})`
   width: ${props => props.winWidth * 0.8}px;
   height: 270px;
   border-radius: 28px;
   padding-bottom: 20px;
`;

export const OptionImage = styled.Image`
   flex: 1;
   border-top-left-radius: 28px;
   border-top-right-radius: 28px;
`;

export const OptionInfos = styled.View`
   background: #202020;
   border-bottom-left-radius: 28px;
   border-bottom-right-radius: 28px;
   height: auto;
   min-height: 30%;
   justify-content: center;
   align-items: center;
   padding: 13px 17px;
   elevation: 4;
`;

export const OptionTitle = styled.Text`
   font-family: Nunito_700Bold;
   color: #E9E9E9;
   font-size: 16px;
   text-align: center;
   margin-bottom: 7px;
`;

export const OptionReacts = styled.View`
   flex-direction: row;
   justify-content: space-between;
`;

export const Comments = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 0 5px;
`;

export const Likes = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 0 5px;
`;

export const Qtd = styled.Text`
   font-family: Nunito_700Bold;
   color: #B8B8B8;
   font-size: 14px;
   margin-left: 5px;
`;

export const styles = StyleSheet.create({
   selected: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#D85517'
   }
});