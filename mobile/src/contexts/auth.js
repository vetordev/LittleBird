import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@reac'

import * as auth from  '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   async function signIn() {
      // receber por parâmetro as informações do usuário e armazená-las no estado aqui.
      const response = await auth.signIn();

      console.log(response);

      setUser(response.user);
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}