import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import { Form } from '@unform/mobile';

import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';

import Header from '../../../components/Header';
import ModalContainer from '../../../components/ModalContainer';

import { 
   Container,
   Title,
   Subtitle,
   CheckBoxContainer,
   CheckedIconContainer,
   LegendCheckBox,
   BtnSaveProfile,
   BtnSaveProfileText,
   TextareaLegend,
   Textarea,
   ModalMessage,
   ModalTitle,
   ModalSubtitle,
   ModalMessageContent
} from './styles';

const Report = () => {
   const [displayModal, setModalDisplay] = useState(false);
   const [selectedReportType, setselectedReportType] = useState(0);
   const [reports, setReports] = useState([]);
   const [details, setDetails] = useState('');

   const { token } = useAuth();
   const { goBack } = useNavigation();

   const route = useRoute();
   const { comment_id } = route.params;

   function handleSelectedReports(id) {
      setselectedReportType(id);
   }

   async function sendReport() {
      const response = await api.post(
         `report/comment/${comment_id}`, 
         { 
            report_content: details,
            report_type: selectedReportType,
         }, 
         { 
            headers: {
               Authorization: token
            }
         }
      );

      if (response.status === 204) {
         setModalDisplay(true);
      } else {
         console.log(response.status);
      }
   }

   function handleCloseModal() {
      setModalDisplay(false);
      goBack();
   }
   
   useEffect(() => {
      async function getReports() {
         const response = await api.get('/report/type');

         setReports(response.data);
      }

      getReports();
   }, []);

   return (
      <ScrollView>
         { displayModal &&
            <ModalContainer
               onPress={handleCloseModal}
               color_theme="#01C24E"
               font_color="#121212"
               btn_title="ok"
            >
               <ModalMessageContent>
                  <ModalTitle>Denúncia realizada</ModalTitle>
                  <ModalSubtitle>Analisaremos a situação e as devidas providências serão tomadas.</ModalSubtitle>
               </ModalMessageContent>
            </ModalContainer>
         }
         <Header />
         <Container>
            <Title>O que houve?</Title>
            <Subtitle>Ajude-nos a entender o que há de errado com esse comentário.</Subtitle>

            <Form
               style={{ width: '100%', alignItems: 'center' }} 
            >
               { reports.map(report => (
                  <CheckBoxContainer key={report.report_type_id}>
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
                        checked={selectedReportType === report.report_type_id ? true : false}
                        onPress={() => handleSelectedReports(report.report_type_id)}
                     />
                     <LegendCheckBox>{report.report_type_name}</LegendCheckBox>
                  </CheckBoxContainer>
               ))}

               <TextareaLegend>
                  Se desejar, nos conte um pouco mais sobre o ocorrido.
               </TextareaLegend>

               <Textarea
                  style={{ textAlignVertical: 'top' }}
                  multiline={true}
                  numberOfLines={5}
                  value={details}
                  onChangeText={text => setDetails(text)}
               />

               <BtnSaveProfile onPress={sendReport}>
                  <BtnSaveProfileText>ENVIAR</BtnSaveProfileText>
               </BtnSaveProfile>
            </Form>
         </Container>
      </ScrollView>
   );
}

export default Report;