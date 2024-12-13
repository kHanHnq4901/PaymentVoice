import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screen/settingScreen';
import { StackRootList } from './model';
import { UpdateHook, store } from './controller';
import { LoginScreen } from '../screen/loginScreen';
import { HomeScreen } from '../screen/homeScreen';
import { HistoryScreen } from '../screen/historyScreen';
import { DrawerBottomNavigator } from './BottomNavigator';

const Stack = createNativeStackNavigator<StackRootList>();
export const navigationRef = createNavigationContainerRef<StackRootList>();

export const StackRootNavigator = () => {
  UpdateHook();
  
  const isDarkMode = store.state.appSetting.isDarkMode;
  
  const headerStyle = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };
  
  const headerTintColor = isDarkMode ? '#fff' : '#000';
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
       
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            headerBackTitle: 'welcome.title',
            headerTitle: 'login.login',
            headerStyle,
            headerTintColor,
          }}
        />  
        
        <Stack.Screen name="DrawerBottom" component={DrawerBottomNavigator} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};