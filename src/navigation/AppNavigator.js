import React, { useEffect, useState } from 'react';
import { AsyncStorage, YellowBox } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { DrawerNavigator, IntroStackScreen } from './StoneNavigator';
import { useDispatch } from 'react-redux';
import { Logout } from '../reducers';
//Modalize
import { Host } from 'react-native-portalize';
//Deep Link
import { daysToMillis, urlRedirect } from '../utils/Tools';
import * as Linking from 'expo-linking';

YellowBox.ignoreWarnings(['Setting a timer']);

export const AppNavigator = () => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const isFirstOpen = useSelector((state) => state.store.isFirstOpen);

  const autoLogout = async () => {
    const getUser = await AsyncStorage.getItem('user');
    if (getUser) {
      const user = await JSON.parse(getUser);
      if (Date.now() - user.data.tokenCreationDate > daysToMillis(28)) {
        dispatch(Logout());
      }
    }
  };

  useEffect(() => {
    // listen for new url events coming from Expo
    Linking.addEventListener(
      'url',
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect],
    );
    Linking.getInitialURL().then(urlRedirect);
    Linking.removeEventListener(
      'url',
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect],
    );
  }, [urlRedirect]);

  useEffect(() => {
    const isFirstTime = async () => {
      const firstOpen = await AsyncStorage.getItem('isFirstTime');
      setValue(firstOpen);
    };
    isFirstTime();
    autoLogout();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        {/* <IntroStackScreen /> */}
        {(isFirstOpen || value !== null) && <DrawerNavigator />}
        {!isFirstOpen && value === null && <IntroStackScreen />}
      </Host>
    </NavigationContainer>
  );
};
