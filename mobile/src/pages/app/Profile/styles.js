import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.View`
   flex: 1;
   background: #121212;
   padding-top: ${Constants.statusBarHeight + 40 + 'px'};
   padding-bottom: 20px;
   align-items: center;
`;

export const Header = styled.View`
   flex-direction: row;
   justify-content: space-between;
   width: 100%;
   padding: 0 28px 28px;
`;

export const IconContainer = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   /* margin-right: 28px; */
   width: 30px;
   height: 30px;
   background: #232323;
   border-radius: 4px;
`;

export const Title = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #E9E9E9;
   text-transform: uppercase;
   letter-spacing: 2px;
   font-size: 16px;
   margin-top: 30px;
`;

export const ProfilePicture = styled.Image`
   width: 130px;
   height: 130px;
   border-radius: 34px;
   margin-bottom: 12px;
`;

export const Username = styled.Text`
   font-family: Ubuntu_700Bold;
   color: #E9E9E9;
   font-size: 16px;
   margin-bottom: 30px;
`;

export const ProfileSession = styled.TouchableOpacity`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 85%;
   background: #202020;
   padding: 25px;
   border-radius: 21px;
   margin-bottom: 15px;
   elevation: 5;
`;

export const Part1 = styled.View`
   flex-direction: row;
   align-items: center;
`;

export const IconContainerSession = styled.View`
   width: 40px;
   height: 40px;
   background: ${props => props.color};
   justify-content: center;
   align-items: center;
   border-radius: 9px;
   margin-right: 17px;
`;

export const SessionName = styled.Text`
   font-family: Ubuntu_500Medium;
   color: #E9E9E9;
   font-size: 16px;
`;
