import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';

import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [token, setToken] = useState(null);

   // const token = '3afdsfdmalfhjfds943hjdf1z0';

   useEffect(() => {
      async function loadStoragedData() {

         const storagedUser = await AsyncStorage.getItem('@LittleBird:user');
         const storagedToken = await AsyncStorage.getItem('@LittleBird:token');
         
         setLoading(false);

         if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
         }
      }

      loadStoragedData();
   }, []);


   async function signIn(user) { // receber por parâmetro as informações do usuário e armazená-las no estado aqui.
      // console.log('auth', user);
      setUser(user);

      await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
      await AsyncStorage.setItem('@LittleBird:token', token);
   }

   async function signUp(user, userInterests) {

      try {
         const responseUser = await api.post('user', user);
         setUser(user);   
         setToken(responseUser.data.token);

         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
         await AsyncStorage.setItem('@LittleBird:token', token);

      } catch (error) {
         console.log('Erro no cadastro de usuário.');
      }
      
   }

   function signOut() {
      AsyncStorage.clear().then(() => {
         BackHandler.exitApp();
         setUser(null);
      })
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, signUp, token }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}