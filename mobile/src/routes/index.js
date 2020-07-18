// controla qual rota estará disponível para o usuário
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
   const { signed, loading } = useAuth();

   // console.log(loading);

   if (loading) {
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#999" />
         </View>
      )
   }

   return signed ? <AppRoutes/> : <AuthRoutes />
}

export default Routes;