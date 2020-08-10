// rotas que o usuário tem acesso quando está autenticado na aplicação
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/app/Home';
import Profile from '../pages/app/Profile';
import Subjects from '../pages/app/Subjects';
import Settings from '../pages/app/Settings';
import Articles from '../pages/app/Articles';
import Webview from '../pages/app/Webview';
import Reform from '../pages/app/Reform';
import Notifications from '../pages/app/Notifications';
import PanicBtn from '../pages/app/PanicBtn';
import Favorites from '../pages/app/Favorites';
import Interests from '../pages/app/Interests';

import BottomTabBar from '../components/BottomTabBar';
import HeaderBtnBack from '../components/HeaderBtnBack';

const AppStack = createStackNavigator();
const AppBottom = createBottomTabNavigator();

const AppRoutes = () => (
   <AppStack.Navigator 
      screenOptions={{ 
         cardStyle: { backgroundColor: '#121212' },
         headerShown: false
         // header: props => <HeaderBtnBack {... props} />
      }}>
      <AppStack.Screen name="Home" component={BottomRoutes} />
      <AppBottom.Screen name="Webview" component={Webview} options={{ headerShown: true, headerTitle: '' }} />
      <AppBottom.Screen name="Settings" component={Settings} />
      <AppBottom.Screen name="Articles" component={Articles} />
      <AppBottom.Screen name="Reform" component={Reform} />
      <AppBottom.Screen name="Notifications" component={Notifications} />
      <AppBottom.Screen name="PanicBtn" component={PanicBtn} />
      <AppBottom.Screen name="Favorites" component={Favorites} />
      <AppBottom.Screen name="Interests" component={Interests} />
   </AppStack.Navigator>
);

const BottomRoutes = () => (
   <AppBottom.Navigator 
      tabBar={props => <BottomTabBar {... props} />} 
      screenOptions={{ cardStyle: { backgroundColor: '#121212' } }}
      initialRouteName={"Home"}
   >
      <AppBottom.Screen 
         name="Subjects" 
         component={Subjects} 
         options={{
            iconName: 'grid', 
            color: '#D85517',
         }} 
      />
      <AppBottom.Screen 
         name="Home" 
         component={Home} 
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