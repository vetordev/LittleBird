import React from 'react';
import { View } from 'react-native';


import { Container, Shimmer } from './styles';

const LoadingHomeContent = () => {
  return (
     <Container>
        <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
     </Container>
  );
}

export default LoadingHomeContent;