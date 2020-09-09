import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { 
   Container,
   Content
} from './styles';

interface ModalContainerProps {
   onPress: void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ onPress }) => {
   return (         
      <Container activeOpacity={1} onPress={onPress}>
         <Content>

         </Content>
      </Container>
   );
}

export default ModalContainer;