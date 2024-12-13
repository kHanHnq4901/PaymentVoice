import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { Avatar, Divider, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, normalize, scale } from '../../theme';
import { version } from '../../shared';
import { UpdateHook, navigationStackRoot, store } from './controller';
import { DrawerItem } from './drawerItem';
import Clipboard from '@react-native-clipboard/clipboard';
import { BottomTab, DrawerTab } from '../../navigation/model';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<DrawerNavigationProp<BottomTab>>();
  const navigationDrawer = useNavigation<DrawerNavigationProp<DrawerTab>>();
  UpdateHook();

  const insets = useSafeAreaInsets();

  const handleCopyID = () => {
    Clipboard.setString("ID123456");
  };

  return (
    <ImageBackground
      source={require('../../asset/images/background-5.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <DrawerContentScrollView {...props}>
          <View style={styles.centeredContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.userInfo}>
                <Avatar.Image
                  size={90}
                  source={require('../../asset/images/businessman.png')}
                  style={styles.avatar}
                />
                <View style={styles.userDetails}>
                  <Text style={[styles.userName, { color: '#4CAF50' }]}>Nguyễn Khánh</Text>
                  <View style={styles.idContainer}>
                    <Text style={[styles.userID, { color: '#000000' }]}>ID123456</Text>
                    <IconButton
                      icon="clipboard"
                      size={24}
                      onPress={handleCopyID}
                    />
                  </View>
                  <Text style={[styles.expirationDate, { color: '#FF5722' }]}>
                    Ngày hết hạn: 31/12/2024
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.body}>
              <DrawerItem
                label={'Trang chủ'}
                icon="home"
                colorLabel={'#000000'}
                colorIcon={'#4CAF50'}
                onPress={() => {
                  navigation.navigate('Bottom', {
                    screen: 'HomeStack',
                    params: { screen: 'Home' },
                  });
                }}
              />

              <DrawerItem
                label={'Thông tin'}
                icon="person"
                colorLabel={'#000000'}
                colorIcon={'#4CAF50'}
                onPress={() => {
                  navigationDrawer.navigate('Drawer', { screen: 'Profile' });
                }}
              />
       
              <DrawerItem
                label={'Hướng dẫn sử dụng'}
                icon="document-text"
                colorLabel={'#000000'}
                colorIcon={'#4CAF50'}
                onPress={() => {
                  navigationDrawer.navigate('Drawer', { screen: 'Manual' });
                }}
              />
  
              <DrawerItem
                label={'Liên hệ'}
                icon="information-circle"
                colorLabel={'#000000'}
                colorIcon={'#4CAF50'}
                onPress={() => {
                  navigationDrawer.navigate('Drawer', { screen: 'Contact' });
                }}
              />
      
              <DrawerItem
                label={'Đăng xuất'}
                colorLabel={'#000000'}
                icon="log-out"
                onPress={() => {
                  navigationStackRoot.replace('Login');
                }}
                colorIcon={'#4CAF50'}
              />
           
              <DrawerItem
                label={'Thoát'}
                icon="power"
                colorLabel={'#000000'}
                colorIcon={'#4CAF50'}
                onPress={() => {
                  Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn thoát?', [
                    {
                      text: 'Hủy',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        RNExitApp.exitApp();
                      },
                    },
                  ]);
                }}
              />
            </View>
          </View>
        </DrawerContentScrollView>

        <View style={styles.footer}>
          <Text style={[styles.textVersion, { color: '#000000' }]}>Phiên bản: <Text style={[styles.textVersion, { color: '#4CAF50' }]}>{version}</Text></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    margin: 10,
    padding: 15,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  userDetails: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 24,
    marginVertical: 5,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userID: {
    fontSize: 18,
    marginRight: 10,
    fontStyle: 'italic',
  },
  expirationDate: {
    fontSize: 16,
    marginTop: 5,
    fontStyle: 'italic',
  },
  avatar: {
    backgroundColor: '#4CAF50',
   
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  body: {
    marginHorizontal: 20,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textVersion: {
    fontSize: 16,
    fontWeight: 'bold',

  },
});

export default DrawerContent;