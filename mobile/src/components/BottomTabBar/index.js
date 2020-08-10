import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, OptionNotSelected, OptionSelected, BtnSelected, Content } from './styles';

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
               
            const isFocused = state.index === index;
            
            const navigateTo = () => {
               const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
               });

               if (!isFocused && !event.defaultPrevent) {
                  navigation.navigate(route.name);
               }
            }

            return (
               <Content key={label}>
                  { isFocused ? 
                     <OptionSelected>
                        <BtnSelected
                           accessibilityStates={isFocused ? ['selected'] : []}
                           accessibilityLabel={options.tabBarAccessibilityLabel}
                           testID={options.tabBarTestID}
                           onPress={navigateTo}
                           color={options.color}
                        >
                           <Text>
                              <Feather name={options.iconName} size={26} color="#eee" />
                           </Text>
                        </BtnSelected>
                     </OptionSelected>
                  : 
                     <OptionNotSelected
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={navigateTo}
                     >
                        <Text>
                           <Feather name={options.iconName} size={26} color="#eee" />
                        </Text>
                     </OptionNotSelected>
                  }
               </Content>
            )
         })}
      </Container>
   )
}

export default BottomTabBar;