import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Feather } from '@expo/vector-icons';

import { Container, TextInput, InputContainer, InputIcon } from './styles';

const Input = ({ name, color, iconName, placeholder }) => {
   const inputRef = useRef(null);
   const { fieldName, registerField, defaultValue, error } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })
   }, [fieldName, registerField])

   return (
     <Container>
        <InputContainer color={color}>
         <InputIcon>
            <Feather name={iconName ? iconName : 'send'} color="#000" size={24} />
         </InputIcon>
         <TextInput 
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={color == 'dark' ? 'rgba(0, 0, 0, 0.29)' : '#fff'}
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={value => {
               if (inputRef.current) {
                  inputRef.current.value = value
               }
            }}
         />
        </InputContainer>
     </Container>   
   );
}

export default Input;