import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import { Ubuntu_500Medium, Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Nunito_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}
