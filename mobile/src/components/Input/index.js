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
} from './styles';

const Input = ({ name, color, iconName, legend, description, defaultValue, ...rest }) => {
   const inputRef = useRef(null);
   const { fieldName, registerField, error } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })
   }, [fieldName, registerField])

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
            ref={inputRef}
            color={color}
            defaultValue={defaultValue}
            onChangeText={value => {
               if (inputRef.current) {
                  inputRef.current.value = value
               }
            }}
            {...rest}
         />
         </InputContainer>
         { description &&
            <Description color={color == 'dark' ? '#000' : '#F6F6F6'}>{description}</Description>
         }
     </Container>   
   );
}

export default Input;