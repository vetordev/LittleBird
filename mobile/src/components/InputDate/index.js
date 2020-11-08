import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { 
   Container, 
   TextInput, 
   InputContainer, 
   InputIcon, 
   Legend, 
   Description,
   ErrorContainer,
   ErrorMessage,
   ErrorDetail,
   ErrorContent,
} from '../Input/styles';

const InputDate = ({ name, color, iconName, legend, description, defaultValue, error, value, onChangeText, ...rest }) => {
  return (
   <Container>
      <Legend color={color == 'dark' ? '#000' : '#F6F6F6'}>{legend}</Legend>
      { error &&
         <ErrorContainer>
            <ErrorContent>
               <Feather name="alert-triangle" color="#FF5520" size={20} />
               <ErrorMessage>{error}</ErrorMessage>
            </ErrorContent>
            <ErrorDetail />
         </ErrorContainer>
      }        
      <InputContainer color={color}>
      <InputIcon>
         <Feather name={iconName ? iconName : 'send'} color={color == 'dark' ? '#000' : '#F6F6F6'} size={24} />
      </InputIcon>
      <TextInput 
         placeholderTextColor={color == 'dark' ? 'rgba(0, 0, 0, 0.29)' : 'rgba(255, 255, 255, 0.29)'}
         color={color}
         value={value}
         onChangeText={onChangeText}
         defaultValue={defaultValue}
         maxLength={10}
         {...rest}
      />
      </InputContainer>
   </Container>   
  );
}

export default InputDate;