import React from 'react';

import { Container, Shimmer } from './styles';

const ShimmerHomeContent = () => {
  return (
     <Container>
        <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
     </Container>
  );
}

export default ShimmerHomeContent;