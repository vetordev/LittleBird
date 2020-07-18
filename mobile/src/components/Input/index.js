import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container, TextInput } from './styles';

const Input = ({ name }) => {
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
        <TextInput 
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={value => {
               if (inputRef.current) {
                  inputRef.current.value = value
               }
            }}
        />
     </Container>   
   );
}

export default Input;