import React from 'react';
import { View, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

import HeaderBtnBack from '../../../components/HeaderBtnBack';

import { 
   Container,
   Title,
   Card,
   EmergencyTitle,
   CardContact,
   Instituition,
   Contact,
   ContactContainer
} from './styles';

const PanicBtn = () => {

   function openPhone() {
      Linking.openURL('tel:(11) 4138-3409');
   }

   return (
      <Container>
         <HeaderBtnBack withoutTop={true} />
         <Title>Se você estiver realmente precisando de ajuda, entre em contato:</Title>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>

         <Card>
            <EmergencyTitle>Violência doméstica</EmergencyTitle>
            <CardContact>
               <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
               <ContactContainer onPress={openPhone}>
                  <Contact>(11) 4138-3409</Contact>
                  <Feather name="chevron-right" size={25} color="#121212" />
               </ContactContainer>
            </CardContact>
         </Card>
      </Container>
   );
}

export default PanicBtn;