import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from '../navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from '../styled';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isDark = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require('../assets/images/cherry.png'));
        //글씨 폰트 직접 assets 폴더에 업로드해서 하는 것
        // await Font.loadAsync({
        //   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
        // });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
      // Hide the splash screen once the app is ready and the layout has been performed.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {/* BUG 중첩 오류로 인해 independent 추가하였으나 실제 플젝에서 사용 지양 */}
          <NavigationContainer independent={true}>
            <Root />
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
