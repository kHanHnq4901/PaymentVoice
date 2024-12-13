import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, scale } from '../theme/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HistoryScreen } from '../screen/historyScreen';
import { HomeScreen } from '../screen/homeScreen';
import { SettingsScreen } from '../screen/settingScreen';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  const inSetSafeArea = useSafeAreaInsets();

  const _renderIcon = (routeName: string, focused: boolean) => {
    let iconName = '';

    switch (routeName) {
      case 'Home':
        iconName = 'home';
        break;
      case 'History':
        iconName = 'time';
        break;
      case 'Settings':
        iconName = 'settings';
        break;
      default:
        iconName = 'help';
        break;
    }

    return (
      <Ionicons
        name={iconName}
        size={scale * (focused ? 30 : 23)}
        color={focused ? Colors.cyan : Colors.gray}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFAFA',
          borderTopWidth: 0,
          elevation: 5,
          height: '7%',
          paddingBottom: inSetSafeArea.bottom > 0 ? inSetSafeArea.bottom : 10,
        },
      }}
    >
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => _renderIcon('History', focused),
          tabBarLabel: 'Lịch Sử', // Custom label
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => _renderIcon('Home', focused),
          tabBarLabel: 'Trang Chủ', // Custom label
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => _renderIcon('Settings', focused),
          tabBarLabel: 'Cài Đặt', // Custom label
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;