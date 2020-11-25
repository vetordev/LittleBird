import React from 'react';

import { Container, Shimmer, Row } from './styles';

const ShimmerInterestCard = () => {
  return (
      <Container>
         <Row>
            <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
            <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
         </Row>
         <Row>
            <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
            <Shimmer shimmerColors={['#2F2F2F', '#3D3D3D', '#2F2F2F']} />
         </Row>
      </Container>
  );
}

export default ShimmerInterestCard;