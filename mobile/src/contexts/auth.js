import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';

import api from '../services/api';

import { useAvatar } from '../contexts/useAvatar';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [token, setToken] = useState(null);

   const { setAvatar } = useAvatar();

   useEffect(() => {
      async function loadStoragedData() {

         const storagedUser = await AsyncStorage.getItem('@LittleBird:user');
         const storagedToken = await AsyncStorage.getItem('@LittleBird:token');
         // const notKeepLogin = await AsyncStorage.getItem('@LittleBird:notKeepLogin');
         
         setLoading(false);

         console.log('TOKENOW:', storagedToken);

         // if (notKeepLogin === 'true') {
         //    setUser(null);
         //    await AsyncStorage.setItem('@LittleBird:user', '');
         // }

         if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
            setToken(storagedToken);
            setAvatar(JSON.parse(storagedUser).user_img_id);
         }
      }

      loadStoragedData();
   }, []);


   async function signIn(userLogin) {
      try {
         // const user = { 
         //    email: userLogin.email,
         //    username: 'username',
         //    user_img_id: 1,
         //    born_in: '2019-08-24',
         // };
   
         const userLoginObj = {
            email: userLogin.email,
            user_pass: userLogin.password
         }

         const responseUser = await api.post('auth/login', userLoginObj, {
            onUploadProgress: () => {
               setLoadingAuth(true);
            }
         });

         const user = responseUser.data;

         console.log(responseUser.data);

         setUser(user); 
         setToken('Bearer ' + responseUser.data.token);
         
         await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
         await AsyncStorage.setItem('@LittleBird:token', 'Bearer ' + responseUser.data.token);
            
         setLoadingAuth(false);

         return responseUser.status;
      }

      catch(error) {
         setLoadingAuth(false);
         return error;
      }
   }

   function signUp(user, userInterests) {
      user.id = 2;
      console.log(user);
      console.log(userInterests);

      api.post('user', user, {
         onUploadProgress: () => {
            setLoadingAuth(true);
         }
      })
      .then((responseUser) => {
         console.log('Tudo pronto!');
         console.log(responseUser.data.token);

         setToken('Bearer ' + responseUser.data.token);

         api.post('interest', { themes: String(userInterests) }, {
            headers: { 
               Authorization: 'Bearer ' + responseUser.data.token 
            }
         }) 
         .then(async () => {
            user.user_id = responseUser.data.user_id;

            setUser(user);   
            setLoadingAuth(false);

            await AsyncStorage.setItem('@LittleBird:user', JSON.stringify(user));
            await AsyncStorage.setItem('@LittleBird:token', 'Bearer ' + responseUser.data.token);
         }).catch((error) => {
            console.log('Ocorreu um erro no cadastro de interesses: ', error);   
         })
      })
      .catch ((error) => { 
         console.log('Ocorreu um erro no cadastro: ', error);
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
      <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, signUp, token, loadingAuth, setUser }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}