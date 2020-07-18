import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   function signIn(user) { // receber por parâmetro as informações do usuário e armazená-las no estado aqui.
      console.log(user);
      setUser(user);

      // await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(response.user));
      // await AsyncStorage.setItem('@LittleBird:token', response.token);
   }

   function signUp(user) {
      console.log(user);
      setUser(user);
   }

   function signOut() {
      setUser(null);
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, signUp }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}