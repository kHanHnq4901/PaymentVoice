import AsyncStorage from '@react-native-async-storage/async-storage';

const TAG = 'Storage:';
const KEY = 'KEY_APP_SETTING';
export const KEY_USER = 'KEY_USER';

export type PropsAppSetting = {
 
    backgroundRunning : boolean
    repeatNotice : boolean
};
export type PropsAppLogin= {
  account : string ;
  password : string;
};

export function getStorageDefaultValue(): PropsAppSetting {
  const value: PropsAppSetting = {
    backgroundRunning : true,
    repeatNotice : true,
    
  };

  return value;
}
export function getStorageDefaultValueLogin(): PropsAppLogin {
  const value: PropsAppLogin = {
    account : '',
    password : '',
  }
  return value;
}
export async function saveStorageLogin(value: PropsAppLogin) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(value));
    const result = await AsyncStorage.getItem(KEY_USER);
    
    console.log (result)
  } catch (err: any) {
    console.log(TAG, err.message);
  }
}
export async function saveStorage(value: PropsAppSetting) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(value));
    const result = await AsyncStorage.getItem(KEY);
    
    console.log (result)
  } catch (err: any) {
    console.log(TAG, err.message);
  }
}
export async function getStorageLogin(): Promise<PropsAppLogin> {
  const defaultValue = getStorageDefaultValueLogin();
  try {
    const result = await AsyncStorage.getItem(KEY_USER);
    console.log (result )
    if (result) {
      const res: PropsAppLogin = JSON.parse(result);

      for (const key in defaultValue) {
        if (!res[key]) {
          return defaultValue;
        }
      }
      return res;
    } else {
      return defaultValue;
    }
  } catch (err: any) {
    console.log(TAG, err.message);
  }
  return defaultValue;
}
export async function getStorage(): Promise<PropsAppSetting> {
  const defaultValue = getStorageDefaultValue();
  try {
    const result = await AsyncStorage.getItem(KEY);
  
    if (result) {
      const res: PropsAppSetting = JSON.parse(result);

      for (const key in defaultValue) {
        if (!res[key]) {
          return defaultValue;
        }
      }
      return res;
    } else {
      return defaultValue;
    }
  } catch (err: any) {
    console.log(TAG, err.message);
  }
  return defaultValue;
}


