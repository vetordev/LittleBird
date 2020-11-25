// rotas que o usuário tem acesso enquanto ainda não está autenticado na aplicação (telas de login/cadastro)
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeAuth from '../pages/auth/HomeAuth';
import SignIn from '../pages/auth/SignIn';
import SignUp1 from '../pages/auth/SignUp1';
import SignUp2 from '../pages/auth/SignUp2';

const AuthStack = createStackNavigator();

const headerStyle = {
   headerTitle: '',
   headerStyle: {
      elevation: 0,
      backgroundColor: '#690589',
      height: 80
   },
   headerTintColor: '#F6F6F6'
}

const AuthRoutes = () => (
   <AuthStack.Navigator initialRouteName={"HomeAuth"}>
      <AuthStack.Screen name="HomeAuth" component={HomeAuth} options={{ headerShown: false }} />
      <AuthStack.Screen name="SignIn" component={SignIn} options={headerStyle} />
      <AuthStack.Screen name="SignUp1" component={SignUp1} options={headerStyle} />
      <AuthStack.Screen name="SignUp2" component={SignUp2} options={headerStyle} />
   </AuthStack.Navigator>
);

export default AuthRoutes;