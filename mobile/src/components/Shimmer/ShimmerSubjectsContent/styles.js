import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
   width: 100%;
   height: 250px;
   align-items: center;
   margin-bottom: 20px;
`;

export const Shimmer = styled(ShimmerPlaceHolder)`
   flex: 1;
   width: 80%;
   border-radius: 28px;
`;
