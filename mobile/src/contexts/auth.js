import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';

import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [loadingAuth, setLoadingAuth] = useState(false);
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


   async function signIn(userLogin, username) { // receber por parâmetro as informações do usuário e armazená-las no estado aqui.
      const user = { 
         email: userLogin.email,
         password: userLogin.password,
         username: username,
      };

      // api.post('auth/login', userLogin, {
      //    onUploadProgress: () => {
      //       setLoadingAuth(true);
      //    }
      // })
      // .then(async (responseUser) => {
      //    console.log('Tudo pronto!');

         setLoadingAuth(false);

         setUser(user);   
         await setToken('Bearer 2918SDHDSJJK923HDSHDB');


         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
         await AsyncStorage.setItem('@LittleBird:token', token);
      // })
      // .catch ((error) => { 
      //    console.log('Ocorreu um erro no login de usuário: ', error);
      //    setLoadingAuth(false);
      // }) 
   }

   function signUp(user, userInterests) {

         api.post('user', user, {
            onUploadProgress: () => {
               setLoadingAuth(true);
            }
         })
         .then(async (responseUser) => {
            console.log('Tudo pronto!');
            console.log(responseUser.data.token);

            await setToken('Bearer ' + responseUser.data.token);

            api.post('interest', '1, 2, 3', {
               headers: { 
                  Authorization: responseUser.data.token 
               }
            }) 
            .then(async () => {
               setLoadingAuth(false);
               setUser(user);   
   

               // const responseInterests = api.get('interest?page=1', {
               //    headers: { 
               //       Authorization: 'Bearer ' + responseUser.data.token 
               //    }
               // })

               // console.log(responseInterests);

               // console.log('TOKEN:', responseUser.data.token);
   
               await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
               await AsyncStorage.setItem('@LittleBird:token', responseUser.data.token);
            })
         })
         .catch ((error) => { 
            console.log('Ocorreu um erro no cadastro de usuário: ', error);
            setLoadingAuth(false);
         }) 
   }

   function signOut() {
      AsyncStorage.clear().then(() => {
         BackHandler.exitApp();
         setUser(null);
      })
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, signUp, token, loadingAuth }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}