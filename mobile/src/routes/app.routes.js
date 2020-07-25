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
   <AppStack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#121212' } }}>
      <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <AppBottom.Screen name="Settings" component={Settings} />
   </AppStack.Navigator>
);

const AppRoutes = () => (
   <AppBottom.Navigator 
      tabBar={props => <BottomTabBar {... props} />} 
      screenOptions={{ cardStyle: { backgroundColor: '#121212' } }}
      initialRouteName={"Home"}
   >
      <AppBottom.Screen 
         name="Subjects" 
         component={Subjects} 
         options={{
            iconName: 'trello', 
            color: '#D85517',
         }} 
      />
      <AppBottom.Screen 
         name="Home" 
         component={StackRoutes} 
         options={{ 
            iconName: 'home', 
            color: '#834397', 
         }} 
      />
      <AppBottom.Screen 
         name="Profile" 
         component={Profile} 
         options={{ 
            iconName: 'user', 
            color: '#01C24E' 
         }} 
      />
   </AppBottom.Navigator>
)

export default AppRoutes;