import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {DrawerContent} from '../component/drawer';

import {BottomNavigator} from './BottomTabNavigator';
import {BottomList, BottomTab} from './model';
import {Header} from '../component/header';
const Drawer = createDrawerNavigator<BottomTab>();

export function DrawerBottomNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Bottom"

      screenOptions={{
        headerTitleStyle: {fontFamily: 'Roboto'},
        drawerStyle: {width: '80%', maxWidth: '100%',overflow:'scroll'},
        headerShown: true,
        swipeEdgeWidth: 0,
        header: props => <Header {...props} />,
      }}

      drawerContent={props => <DrawerContent {...props} />} >
      
      <Drawer.Screen
        name="Bottom"
        component={BottomNavigator}
        // options={{headerShown: false}}
      />
  
    </Drawer.Navigator>
  );
}
