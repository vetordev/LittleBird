import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

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
   btn_title: String;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ onPress, color_theme, font_color, children, btn_title }) => {
   return (
      // <ScrollView style={{ position: width: '100%', height: '100%'}}>
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
                     { btn_title }
                  </BtnConfirmText>
               </BtnConfirm>
            </Content>
         </Container>
      // </ScrollView>
   );
}

export default ModalContainer;