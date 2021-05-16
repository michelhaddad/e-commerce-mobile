import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const loadAssets = async () => {
  const imageAssets = Asset.loadAsync([
    require('../assets/Images/banner1.jpg'),
    require('../assets/Images/banner3.jpg'),
    require('../assets/Images/banner4.jpg'),
    require('../assets/Images/banner5.jpg'),
    require('../assets/Images/banner6.jpg'),
    require('../assets/Images/bg1.jpg'),
    require('../assets/Images/bg2.jpg'),
    require('../assets/Images/bg3.jpg'),
    require('../assets/Images/defaultprofile.jpg'),
    require('../assets/Images/flower3.jpg'),
    require('../assets/Images/logoNoText.png'),
    require('../assets/Images/logo1.png'),
    require('../assets/Images/logoTextWhite.png'),
    require('../assets/Images/cocktail.jpg'),
    require('../assets/Images/slide1.png'),
    require('../assets/Images/slide2.png'),
    require('../assets/Images/slide3.png'),
    require('../assets/Images/social1.png'),
    require('../assets/Images/social2.png'),
    require('../assets/Images/social3.png'),
    require('../assets/Images/creditcards.png'),
    require('../assets/Images/faceid.png'),
  ]);

  const fetchFonts = Font.loadAsync({
    'Roboto-Bold': require('../assets/Fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('../assets/Fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('../assets/Fonts/Roboto-Italic.ttf'),
    'Roboto-LightItalic': require('../assets/Fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('../assets/Fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('../assets/Fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('../assets/Fonts/Roboto-Regular.ttf'),
  });

  return await Promise.all([imageAssets, fetchFonts]);
};
