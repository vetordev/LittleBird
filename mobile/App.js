import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import { Ubuntu_500Medium, Ubuntu_700Bold, Ubuntu_400Regular , useFonts } from '@expo-google-fonts/ubuntu';
import { Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import { AuthProvider } from './src/contexts/auth';
import { AvatarProvider } from './src/contexts/useAvatar';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <NavigationContainer>
      <AvatarProvider>
        <AuthProvider>      
          <Routes />
          <StatusBar style="auto" />
        </AuthProvider>
      </AvatarProvider>
    </NavigationContainer>
  );
}
