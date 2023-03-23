import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const BottomNavigationComponent = ({ state, descriptors, navigation }) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.black,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: colors.white,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.yellow,
  },
  activeTabLabel: {
    color: colors.yellow,
  },
});

export default BottomNavigationComponent;
