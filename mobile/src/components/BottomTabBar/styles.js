import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

export const Container = styled.View`
   flex-direction: row;
   height: 55px;
   background-color: #191919;
   padding: 0 10px;
`;

export const Content = styled.View`
      flex: 1;
`;

export const OptionNotSelected = styled(RectButton)`
      justify-content: center;
      align-items: center;
      flex: 1;
`;

export const OptionSelected = styled(Animated.View)`
      flex: 1;
      justify-content: center;
      align-items: center;
      position: relative;
      bottom: 0px;
      elevation: 7;
`;

export const BtnSelected = styled(RectButton)`
   background-color: ${props => props.color};
   padding: 15px;
   border-radius: 100px;
   elevation: 7;
`;

