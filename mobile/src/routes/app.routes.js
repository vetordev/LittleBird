// rotas que o usuário tem acesso quando está autenticado na aplicação
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/app/Home';

const AppStack = createStackNavigator();

const AppRoutes = () => (
   <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
   </AppStack.Navigator>
);

export default AppRoutes;