import React, { useCallback } from 'react';
import * as RootNavigation from '../navigation/RootNavigation';
import { Alert, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import Colors from './Colors';
//Upload Image
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const OpenURL = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

//Handle Deep Link
export const urlRedirect = (url) => {
  if (!url) return;
  // parse and redirect to new url
  let { path, queryParams } = Linking.parse(url);
  // console.log(
  //   `Linked to app with path: ${path} and data: ${JSON.stringify(
  //     queryParams
  //   )}`
  // );
  if (path) {
    RootNavigation.navigate(path, queryParams);
  }
};

//Handle Fetching timeout
export const timeoutPromise = (url) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout, Server is not responding'));
    }, 20 * 1000);
    url.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};

export const _pickImage = async (action) => {
  try {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA,
      );
      if (status !== 'granted') {
        return alert(
          'Sorry, we need camera roll permissions to make this work!',
        );
      }
    }
    const type =
      action === 'library'
        ? ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          })
        : ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });

    let result = await type;
    return result;
  } catch (E) {
    console.log(E);
  }
};

export const colorCheck = (colorCode) => {
  switch (colorCode) {
    case 'yellow':
      return Colors.yellow;
    case 'green':
      return Colors.green;
    case 'purple':
      return Colors.purple;
    case 'blue':
      return Colors.water;
    case 'pink':
      return Colors.straw;
    default:
      return Colors.lighter_green;
  }
};

export const daysToMillis = (days) => days * 24 * 60 * 60 * 1000;
