import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/colors';
import styles from './BottomNavigation.styles';

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <Ionicons name={options.iconName} size={24} color={isFocused ? colors.yellow : colors.white} />
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
