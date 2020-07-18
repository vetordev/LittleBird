import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../../contexts/auth';

// import { Container } from './styles';

const Home = () => {
  const { signed } = useAuth();

  console.log(signed);
  return <View />;
}

export default Home;