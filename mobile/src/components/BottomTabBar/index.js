import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// import { Container } from './styles';

const BottomTabBar = ({ state, descriptors, navigation }) => {
   return (
      <View style={{ flexDirection: 'row', backgroundColor: '#f0f' }}>
         {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
               options.tabBarLabel !== undefined
               ? options.tabBarLabel
               : options.title !== undefined
               ? options.title
               : route.name;

            const isFocused = state.index === index;
            
            const onPress = () => {
               const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
               });

               if (!isFocused && !event.defaultPrevent) {
                  navigation.navigate(route.name);
               }
            }

            return (
               <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={{ flex: 1 }}
               >
                  <Text>
                     {label}
                  </Text>
               </TouchableOpacity>
            )
         })}
      </View>
   )
}

export default BottomTabBar;