import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
   const navigation = useNavigation();

   function openPhone(num) {
      Linking.openURL(`tel:${num}`);
   }

   function openSite(url) {
      navigation.navigate('Webview', { link: url })
   }

   return (
      <ScrollView 
         showsVerticalScrollIndicator={false}
         style={{ flex: 1, backgroundColor: '#121212' }}
      >
         <Container>
            <HeaderBtnBack />
            <Title>Se você estiver realmente precisando de ajuda, entre em contato:</Title>

            <Card>
               <EmergencyTitle>Violência doméstica</EmergencyTitle>
               <CardContact>
                  <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
                  <ContactContainer onPress={() => openPhone('(11) 4138-3409')}> 
                     <Contact>(11) 4138-3409</Contact>
                     <Feather name="chevron-right" size={25} color="#121212" />
                  </ContactContainer>
               </CardContact>
            </Card>

            <Card>
               <EmergencyTitle>Violência doméstica</EmergencyTitle>
               <CardContact>
                  <Instituition>Delegacia de Polícia de Defesa da Mulher</Instituition>
                  <ContactContainer onPress={() => openSite('https://www.delegaciaeletronica.policiacivil.sp.gov.br/ssp-de-cidadao/pages/comunicar-ocorrencia/violencia-domestica/triagem-de-vitima')}>
                     <Contact>Site</Contact>
                     <Feather name="chevron-right" size={25} color="#121212" />
                  </ContactContainer>
               </CardContact>
            </Card>
         </Container>
      </ScrollView>
   );
}

export default PanicBtn;