import 'react-native-gesture-handler';
import './src/config/Reactotron';

import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import AppRoutes from './src/routes';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { Store } from './src/redux/store';
import Loading from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    AxiformaRegular: require('./assets/fonts/AxiformaRegular.otf'),
    AxiformaLight: require('./assets/fonts/AxiformaLight.otf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={Store as any}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppRoutes onLayoutRootView={onLayoutRootView} />
          <Loading />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider >
  );
}