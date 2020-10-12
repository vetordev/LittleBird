import React from 'react';
import { ScrollView } from 'react-native';

import { 
   Container,
   Content,
   BtnConfirmContainer,
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
         <Container>
            <Content color_theme={color_theme}>
               <ScrollView>
                  <ChildrenContainer>
                     { children }
                  </ChildrenContainer>
               </ScrollView>
               <BtnConfirmContainer color_theme={color_theme}>
                  <BtnConfirm onPress={onPress}>
                     <BtnConfirmText font_color={font_color}>
                        { btn_title }
                     </BtnConfirmText>
                  </BtnConfirm>
               </BtnConfirmContainer>
            </Content>
         </Container>
      // </ScrollView>
   );
}

export default ModalContainer;