import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { 
   Container,
   Content,
   BtnConfirm,
   BtnConfirmText,
   ChildrenContainer
} from './styles';

interface ModalContainerProps {
   onPress: () => {};
   color_theme: String;
   font_color: String;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ onPress, color_theme, font_color, children }) => {
   return (         
      <Container activeOpacity={1}>
         <Content 
            activeOpacity={1}
            onPress={() => { return false }}
            color_theme={color_theme}
         >
            <ChildrenContainer>
               { children }
            </ChildrenContainer>
            <BtnConfirm 
               onPress={onPress} 
               color_theme={color_theme}
            >
               <BtnConfirmText font_color={font_color}>
                  OK!
               </BtnConfirmText>
            </BtnConfirm>
         </Content>
      </Container>
   );
}

export default ModalContainer;