import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Feather } from '@expo/vector-icons';

import { 
   Container, 
   TextInput, 
   InputContainer, 
   InputIcon, 
   Legend, 
   Description 
} from './styles';

const Input = ({ name, color, iconName, placeholder, legend, description, defaultValue }) => {
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
            { error && <Feather name="alert-triangle" color="#C80024" size={20} /> }
         <InputContainer color={color}>
         <InputIcon>
            <Feather name={iconName ? iconName : 'send'} color={color == 'dark' ? '#000' : '#F6F6F6'} size={24} />
         </InputIcon>
         <TextInput 
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={color == 'dark' ? 'rgba(0, 0, 0, 0.29)' : 'rgba(255, 255, 255, 0.29)'}
            ref={inputRef}
            color={color}
            keyboardType={name == 'email' ? 'email-address' : 'default'}
            secureTextEntry={name == 'password' ? true: false}
            defaultValue={defaultValue}
            onChangeText={value => {
               if (inputRef.current) {
                  inputRef.current.value = value
               }
            }}
         />
         </InputContainer>
         <Description color={color == 'dark' ? '#000' : '#F6F6F6'}>{description}</Description>
     </Container>   
   );
}

export default Input;