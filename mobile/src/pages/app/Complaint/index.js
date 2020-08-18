import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Form } from '@unform/mobile';

import Header from '../../../components/Header';
import Textarea from '../../../components/Textarea';

import { 
   Container,
   Title,
   Subtitle,
   CheckBoxContainer,
   CheckedIconContainer,
   LegendCheckBox,
   BtnSaveProfile,
   BtnSaveProfileText,
   TextareaLegend
} from './styles';

const Complaint = () => {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);

   return (
      <ScrollView>
         <Header />
         <Container>
            <Title>O que houve?</Title>
            <Subtitle>Ajude-nos a entender o que há de errado com esse comentário.</Subtitle>

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
            >
               <CheckBoxContainer>
                  <CheckBox 
                     containerStyle={{ margin: 0, padding: 0 }}
                     checkedColor="#834397"
                     checkedIcon={
                     <CheckedIconContainer checked={true}>
                        <Feather name="check" size={27} color="#F6F6F6" />
                     </CheckedIconContainer>
                     }
                     uncheckedIcon={
                     <CheckedIconContainer checked={false}>
                        <Feather name="check" size={27} color="#121212" />
                     </CheckedIconContainer>
                     }
                     size={35}
                     checked={toggleCheckBox}
                     onPress={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
                  />
                  <LegendCheckBox>É suspeito ou está enviando spam</LegendCheckBox>
               </CheckBoxContainer>

               <CheckBoxContainer>
                  <CheckBox 
                     containerStyle={{ margin: 0, padding: 0 }}
                     checkedColor="#834397"
                     checkedIcon={
                     <CheckedIconContainer checked={true}>
                        <Feather name="check" size={27} color="#F6F6F6" />
                     </CheckedIconContainer>
                     }
                     uncheckedIcon={
                     <CheckedIconContainer checked={false}>
                        <Feather name="check" size={27} color="#121212" />
                     </CheckedIconContainer>
                     }
                     size={35}
                     checked={toggleCheckBox}
                     onPress={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
                  />
                  <LegendCheckBox>É abusivo ou nocivo</LegendCheckBox>
               </CheckBoxContainer>

               <CheckBoxContainer>
                  <CheckBox 
                     containerStyle={{ margin: 0, padding: 0 }}
                     checkedColor="#834397"
                     checkedIcon={
                     <CheckedIconContainer checked={true}>
                        <Feather name="check" size={27} color="#F6F6F6" />
                     </CheckedIconContainer>
                     }
                     uncheckedIcon={
                     <CheckedIconContainer checked={false}>
                        <Feather name="check" size={27} color="#121212" />
                     </CheckedIconContainer>
                     }
                     size={35}
                     checked={toggleCheckBox}
                     onPress={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
                  />
                  <LegendCheckBox>Manifesta intenções de automutilação ou suicídio</LegendCheckBox>
               </CheckBoxContainer>

               <TextareaLegend>
                  Se desejar, nos conte um pouco mais sobre o ocorrido.
               </TextareaLegend>
               <Textarea name="report" />

               <BtnSaveProfile>
                  <BtnSaveProfileText>Enviar</BtnSaveProfileText>
               </BtnSaveProfile>
            </Form>
         </Container>
      </ScrollView>
   );
}

export default Complaint;