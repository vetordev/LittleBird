import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
   width: 100%;
   min-height: 125px;
   /* margin: 4px 0 0 4px; */
`;

export const Row = styled.View`
   flex-direction: row;
   margin-bottom: 5px;
`;

export const Shimmer = styled(ShimmerPlaceHolder)`
   flex: 1;
   width: 100%;
   border-radius: 10px;
   height: 110px;
   margin: 0 2.5px;
`;

