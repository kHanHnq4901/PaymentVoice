import {Dimensions, PixelRatio, Platform} from 'react-native';
import Color from 'color';

export const Colors = {
  // Light mode colors
  primary: '#f71336',
  primaryLight: Color('#f71336').lighten(0.3).toString(), // Lightened primary color for light mode
  secondary: '#0ef76c',
  tertiary: 'white',
  backgroundIcon: '#e6ebeb',
  colorIcon: '#929492',
  text: '#1e1f1e',
  backgroundColor: 'white',
  pink: '#fc8598',
  border: '#dadadd',
  blurPrimary: Color('#f71336').lighten(0.35).toString(),
  caption: Color('#929492').darken(0.2).toString(),
  quaternary: '#1bfa4a',
  lightBlue: '#d7dff5',
  purple: 'purple',
  white: 'white',
  cyan: '#0b80f5',
  yellow: '#f1c236',
  gray: '#808080', 
  lightGray: '#d3d3d3',

  // Dark mode colors
  darkMode: {
    primary: '#f05a5b',
    primaryLight: Color('#f05a5b').lighten(0.2).toString(), // Lightened primary color for dark mode
    secondary: '#0ef76c',
    tertiary: '#333',
    backgroundIcon: '#555',
    colorIcon: '#aaa',
    text: '#e5e5e5',
    backgroundColor: '#222',
    pink: '#fc8598',
    border: '#444',
    blurPrimary: Color('#f05a5b').darken(0.1).toString(),
    caption: Color('#aaa').darken(0.3).toString(),
    quaternary: '#1bfa4a',
    lightBlue: '#444',
    purple: '#7b4b8c',
    white: '#f5f5f5',
    cyan: '#0b80f5',
    yellow: '#f1c236',
    gray: '#777',
    lightGray: '#555',
  },
};


export const storeColors = {
  text: '#0D163A',
  redHeart: '#F73434'
}   
export const Fonts = undefined;
//'SourceCodePro-SemiBold';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
export const sizeScreen = Dimensions.get('screen');

const getSaleWidth = (widthScreen: number): number => {
  let scaleWidth = 1;
  if (widthScreen > 392) {
    scaleWidth = 1 + (widthScreen - 392) / widthScreen;
  } else if (widthScreen < 392) {
    scaleWidth = 1 - (-widthScreen + 392) / widthScreen;
  } else {
    scaleWidth = 1;
  }
  return scaleWidth;
};
const getSaleHeight = (heightScreen: number): number => {
  let scaleWidth = 1;
  if (heightScreen > 776) {
    scaleWidth = 1 + (heightScreen - 776) / heightScreen;
  } else if (heightScreen < 776) {
    scaleWidth = 1 - (-heightScreen + 776) / heightScreen;
  } else {
    scaleWidth = 1;
  }
  return scaleWidth;
};
export const scaleWidth = getSaleWidth(SCREEN_WIDTH);
export const scaleHeight = getSaleHeight(SCREEN_HEIGHT);
export const scale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;

export function normalize(size: number) {
  const newSize = size * scale;
  const obj = Dimensions.get('screen');
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize / obj.fontScale));
  } else {
    return (
      Math.round(PixelRatio.roundToNearestPixel(newSize / obj.fontScale)) - 2
    );
  }
}

console.log('color:', Colors.blurPrimary);
console.log('width:', SCREEN_WIDTH);
console.log('height:', SCREEN_HEIGHT);
console.log('scale:', scale);
console.log('scaleWidth:', scaleWidth);
console.log('scaleHeight:', scaleHeight);

console.log(Dimensions.get('screen'));

export const CommonFontSize = normalize(18);
export const CommonHeight = 45 * scaleHeight;

console.log('CommonFontSize:', CommonFontSize);

export default {Colors, Fonts};
