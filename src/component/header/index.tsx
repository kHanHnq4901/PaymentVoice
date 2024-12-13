import React, { useRef, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { normalize, scale } from '../../theme';
import { UpdateHook, store } from './controller';

export function Header(props: { navigation: { openDrawer: () => void; }; }) {
  UpdateHook()
  const isDarkMode = store.state.appSetting.isDarkMode;



  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
        paddingTop: Platform.OS === 'android' ? 0 : 0,
      }}
    >
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff' }]}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Avatar.Image
            size={40}
            source={require('../../asset/images/businessman.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          Xin chào {store.state.isSignIn ? store.state.userInfo.USER_NAME : ''}
        </Text>
        <View style={styles.reserve} />
   
      </View>


      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom:  5,
    elevation:  5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:  10,
  },
  avatar: {
    elevation:  5,
    marginLeft:  5,
    zIndex:  100,
  },
  title: {
    fontSize:  14,
    marginLeft:  10,
    letterSpacing:  0.1,
    fontFamily: 'Roboto',
  },
  reserve: { flex: 1 },
  borderIcon: {
    width: 40 ,
    height: 40 ,
    borderRadius:  50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:  5,
  },
});

export default Header;