import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import Spinner from '~UI/Spinner/Spinner';
import i18n from './src/translations/i18n';
import { store, persistor } from './src/redux/store/configureStore';
import Main from './src/screens/Main';
import BannerAd from './components/BannerAd';

const AppContent = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const isExpoGo = Constants.appOwnership === 'expo';
    if (!isExpoGo) {
      try {
        const { MobileAds } = require('yandex-mobile-ads');
        MobileAds.initialize();
      } catch (error) {
        console.warn('Yandex Mobile Ads not available:', error);
      }
    }
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Main />
      </View>
      <View style={{ paddingBottom: insets.bottom }}>
        <BannerAd />
      </View>
    </>
  );
};

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  </I18nextProvider>
);

export default App;
