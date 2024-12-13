import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StoreProvider } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationProvider } from './src/component/flatListNotification';
import { StackRootNavigator } from './src/navigation/StackRootNavigator';

// Định nghĩa theme
const theme = {
  dark: false,
};

// Thành phần App chính
function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StoreProvider> 
            <KeyboardAvoidingView
              style={{ flex: 1, backgroundColor: 'white' }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <NotificationProvider>
                <StackRootNavigator />
              </NotificationProvider>
            </KeyboardAvoidingView>
          </StoreProvider> 
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});