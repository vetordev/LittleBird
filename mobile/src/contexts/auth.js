import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';

import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [loadingSignUp, setLoadingSignUp] = useState(false);
   const [token, setToken] = useState(null);

   useEffect(() => {
      async function loadStoragedData() {

         const storagedUser = await AsyncStorage.getItem('@LittleBird:user');
         const storagedToken = await AsyncStorage.getItem('@LittleBird:token');
         
         setLoading(false);

         console.log('TOKEN:', storagedToken);

         // INCLUIR VERFIFICAÇÃO DE TOKEN
         if (storagedUser) {
            setUser(JSON.parse(storagedUser));
         }
      }

      loadStoragedData();
   }, []);


   async function signIn(user) { // receber por parâmetro as informações do usuário e armazená-las no estado aqui.
      setUser(user);

      await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
      await AsyncStorage.setItem('@LittleBird:token', '194328943s204');
   }

   function signUp(user, userInterests) {

         api.post('user', user, {
            onUploadProgress: () => {
               setLoadingSignUp(true);
            }
         })
         .then(async (responseUser) => {
            console.log('Tudo pronto!');

            setLoadingSignUp(false);

            setUser(user);   
            await setToken('Barer ' + responseUser.data.token);

            console.log('TOKEN:', responseUser.data.token);

            await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
            await AsyncStorage.setItem('@LittleBird:token', token);
         })
         .catch ((error) => { 
            console.log('Ocorreu um erro no cadastro de usuário: ', error);
         }) 
      
   }

   function signOut() {
      AsyncStorage.clear().then(() => {
         BackHandler.exitApp();
         setUser(null);
      })
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, signUp, token, loadingSignUp }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}