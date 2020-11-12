import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
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

const InputDate = ({ name, color, iconName, legend, description, defaultValue, onChangeText, setDate, setUserBirth, ...rest }) => {
   const inputRef = useRef(null);
   const { fieldName, registerField, error } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })
   }, [fieldName, registerField])


   function handleSetDate(text) {
      if (text.length === 2) {
        setDate(text + "/");
      }
      else if (text.length === 5) {
        setDate(text + "/");
      }
      else {
        setDate(text);
      }
  
      if (text.length === 10) {
        const day = String(text[0]) + String(text[1]);
        const month = String(text[3]) + String(text[4]);
        const year = String(text[6]) + String(text[7]) + String(text[8]) + String(text[9]);
  
        setUserBirth(`${year}-${month}-${day}`);
      }
   }

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
            // value={defaultValue}
            onChangeText={text => handleSetDate(text)}
            keyboardType="numeric"
            defaultValue={defaultValue}
            maxLength={10}
            {...rest}
         />
         </InputContainer>
      </Container>   
  );
}

export default InputDate;