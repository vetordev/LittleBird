import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, OptionNotSelected, OptionSelected, BtnSelected } from './styles';

const BottomTabBar = ({ state, descriptors, navigation }) => {
   const focusedOptions = descriptors[state.routes[state.index].key].options;

   if (focusedOptions.tabBarVisible === false) {
     return null;
   }

   return (
      <Container>
         {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
               options.tabBarLabel !== undefined
               ? options.tabBarLabel
               : options.title !== undefined
               ? options.title
               : route.name;
            
            const icons = 
            options.tabBarIcon !== undefined 
            ? options.tabBarIcon : '';

            const isFocused = state.index === index;
            
            const onPress = (e) => {
               console.log(e.clientX);
               const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
               });

               if (!isFocused && !event.defaultPrevent) {
                  navigation.navigate(route.name);
               }
            }

            return (
               <>
               { isFocused ? 
                  <OptionSelected>
                     <BtnSelected
                        key={options.tabBarTestID}
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        color={options.color}
                     >
                        <Text>
                           <Feather name={options.iconName} size={30} color="#eee" />
                        </Text>
                     </BtnSelected>
                  </OptionSelected>
               : 
                  <OptionNotSelected
                     key={options.tabBarTestID}
                     accessibilityStates={isFocused ? ['selected'] : []}
                     accessibilityLabel={options.tabBarAccessibilityLabel}
                     testID={options.tabBarTestID}
                     onPress={onPress}
                  >
                     <Text>
                        <Feather name={options.iconName} size={30} color="#eee" />
                     </Text>
                  </OptionNotSelected>
                  }
               </>
            )
         })}
      </Container>
   )
}

export default BottomTabBar;