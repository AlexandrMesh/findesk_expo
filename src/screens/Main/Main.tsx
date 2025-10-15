import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ADD_ASSET_ROUTE, ADD_PORTFOLIO_ROUTE, FULL_ASSET_ROUTE, HOME_ROUTE } from '~constants/routes';
import Home from '~screens/Home';
import AddAsset from '~screens/Home/AddAsset';
import AddPortfolio from '~screens/Home/AddPortfolio';
import FullAsset from '~screens/Home/FullAsset';
import Modals from '~screens/Modals/Modals';
import RateApp from '~UI/RateApp';
import UpdateAppAlert from './UpdateAppAlert';

const Main = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={HOME_ROUTE} component={Home} options={{ headerShown: false }} />
            <Stack.Screen name={ADD_PORTFOLIO_ROUTE} component={AddPortfolio} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={ADD_ASSET_ROUTE} component={AddAsset} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={FULL_ASSET_ROUTE} component={FullAsset} options={{ headerShown: false, presentation: 'modal' }} />
          </Stack.Navigator>
          <Modals />
          <UpdateAppAlert />
          <RateApp />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;
