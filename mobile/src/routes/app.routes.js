// rotas que o usuário tem acesso quando está autenticado na aplicação
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/app/Home';
import Profile from '../pages/app/Profile';
import Subjects from '../pages/app/Subjects';
import Settings from '../pages/app/Settings';

import BottomTabBar from '../components/BottomTabBar';

const AppStack = createStackNavigator();
const AppBottom = createBottomTabNavigator();

const StackRoutes = () => (
   <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
      <AppBottom.Screen name="Settings" component={Settings} />
   </AppStack.Navigator>
);

const AppRoutes = () => (
   <AppBottom.Navigator tabBar={props => <BottomTabBar {... props} />}>
      <AppBottom.Screen name="Subjects" component={Subjects}/>
      <AppBottom.Screen name="Home" component={StackRoutes} />
      <AppBottom.Screen name="Profile" component={Profile} />
   </AppBottom.Navigator>
)

export default AppRoutes;