import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

const Profile = () => {
   const navigation = useNavigation();

   function navigateToSettings() {
      navigation.navigate('Settings');
   }

  return (
     <Container>
        <TouchableOpacity onPress={navigateToSettings}>
           <Text>settings</Text>
        </TouchableOpacity>
     </Container>
  );
}

export default Profile;