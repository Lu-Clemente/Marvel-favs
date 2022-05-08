import 'react-native-gesture-handler';
import './src/config/Reactotron';

import { Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={Store as any}>
      <SafeAreaProvider>
        <ThemeProvider>
          <View><Text>Hello world</Text></View>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider >
  );
}