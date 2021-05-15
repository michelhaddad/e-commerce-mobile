import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import LocalNotification from './src/components/Notification/LocalNotification';
import { loadAssets } from './src/utils/Initialization';
import store from './src/utils/Store';

export default function App() {
  const [assetLoaded, setAssetLoaded] = useState(false);
  if (!assetLoaded) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setAssetLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar />
      <LocalNotification />
      <AppNavigator />
    </Provider>
  );
}
