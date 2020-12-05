import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { View } from 'react-native';

import { TextInput } from './styles';

const Textarea = ({ name }) => {
   const inputRef = useRef(null);
   const { fieldName, registerField, defaultValue, error } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })
   }, [fieldName, registerField]);

   return (
      <TextInput 
         style={{ textAlignVertical: 'top' }}
         multiline={true}
         numberOfLines={5}
         defaultValue={defaultValue}
         onChangeText={value => {
            if (inputRef.current) {
               inputRef.current.value = value
            }
         }}
      />
   );
}

export default Textarea;