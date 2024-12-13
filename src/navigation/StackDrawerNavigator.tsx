import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {DrawerList,} from './model/index';
 import {SupportScreen} from '../screen/supportScreen';
 import {ProfileScreen} from '../screen/profileScreen';
 import {ContactScreen} from '../screen/contactScreen';
 import {ManualScreen} from '../screen/manualScreen';



const Stack = createStackNavigator<DrawerList>();

export function StackDrawerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
        <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: ('screens.InfoUser')}}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{title: ('screens.Settings')}}
      />
         <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{title: ('screens.Settings')}}
      />
         <Stack.Screen
        name="Manual"
        component={ManualScreen}
        options={{title: ('screens.Settings')}}
      />
    
    </Stack.Navigator>
  );
}
