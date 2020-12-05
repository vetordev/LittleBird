import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const Notifications = () => {
  const { navigate } = useNavigation();
  navigate('Reform');

  return <View />;
}

export default Notifications;