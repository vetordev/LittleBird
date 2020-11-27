import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import InputDate from '../../../components/InputDate';

import { 
  Container, 
  Title, 
  CheckedIconContainer, 
  CheckBoxContainer, 
  LegendCheckBox,
  TextBold
} from './styles';

import { BtnLogin, TextBtnLogin, BtnIcon } from '../../../components/BtnNext/styles';

const SignUp1 = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // const [date, setDate] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [dateError, setDateError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.data.email;
  const formRef = useRef(null);

  function validateDate() {
    if (!userBirth) {
      setDateError('Insira uma data de nascimento correta.');
      return false;
    }
    if (moment(userBirth, 'DD/MM/YYYY').isValid()) {
      setDateError(null);
      const finalDate = moment(userBirth, 'DD/MM/YYYY').format('DD-MM-YYYY');
      return finalDate;

    } else {
      setDateError('Insira uma data de nascimento correta.');
      return false;
    }
  }

  async function handleSignUp1 (data) {
    const finalDate = validateDate();

    try {
      const schema = Yup.object().shape({
        fullname: Yup.string().required('Seu nome não pode ser nulo.').min(6, 'O nome completo deve ter pelo menos 6 caracteres.'),
        username: Yup.string().required('O nome de usuário não pode ser nulo.').min(5, 'O nome de usuário deve ter pelo menos 5 caracteres.'),
        password: Yup.string().required('A senha não pode ser nula.').min(5, 'A senha deve ter pelo menos 5 caracteres.'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current.setErrors({});

      if (finalDate !== false) {
        const user = {
          email,
          fullname: data.fullname,
          username: data.username,
          user_pass: data.password,
          user_img_id: 1,
          born_in: finalDate
        }

        if (toggleCheckBox) {
          navigation.navigate('SignUp2', { user });
        } else {
          alert('É preciso concordar com os termos de uso.');
        }
      }

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })
        formRef.current.setErrors(errorMessages);
      }
    }
    
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <StatusBar style="light" />
        <Title>Seja bem-vinde!</Title>
        <Form 
          style={{ width: '100%', alignItems: 'center' }} 
          ref={formRef} 
          onSubmit={handleSignUp1}
        >
          <Input 
            name="fullname" 
            color="light"
            iconName="user"
            placeholder="Harry James Potter"
            legend="Seu nome completo"
            description="Não se preocupe, nenhum outro usuário terá acesso ao seu nome verdadeiro."
            maxLength={45}
          />

          <InputDate 
            iconName="calendar"
            name="birth"
            color="light"
            placeholder="DD / MM / AAAA"
            legend="Sua data de nascimento"
            // value={date}
            // setDate={setDate}
            setUserBirth={setUserBirth}
            error={dateError}
          />

          <Input 
            name="username" 
            color="light"
            iconName="coffee"
            placeholder="exemplo123"
            legend="Seu nome de usuário"
            description="Este nome é o que os outros usuários irão ver. Não revele sua identidade verdadeira para o público."
            maxLength={45}
          />
          
          <Input 
            name="password" 
            color="light"
            iconName="lock"
            secureTextEntry={true}
            placeholder="s3n#@000"
            legend="Sua senha"
            maxLength={64}
          />

          <CheckBoxContainer>
            <CheckBox 
              containerStyle={{ margin: 0, padding: 0 }}
              checkedColor="#f6f6f6"
              checkedIcon={
                <CheckedIconContainer checked={true}>
                  <Feather name="check" size={27} color="#690589" />
                </CheckedIconContainer>
              }
              uncheckedIcon={
                <CheckedIconContainer checked={false}>
                  <Feather name="check" size={27} color="#690589" />
                </CheckedIconContainer>
              }
              size={35}
              checked={toggleCheckBox}
              onPress={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
            />
            <LegendCheckBox>
              Li e concordo com os <TextBold>Termos de Uso</TextBold> e <TextBold>Políticas de Privacidade</TextBold>.
            </LegendCheckBox>
          </CheckBoxContainer>

          <BtnLogin background="#F6F6F6" onPress={() => formRef.current.submitForm()}>
            <BtnIcon background="#E0E0E0">
              <Feather name="arrow-right" color="#690589" size={24} />
            </BtnIcon>
            <TextBtnLogin color="#690589">próximo</TextBtnLogin>
          </BtnLogin>
        </Form>
      </Container>
    </ScrollView>
  );
}

export default SignUp1;