import { useNavigation } from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import { GetStore, PropsStore, storeContext } from '../../store';
import { PropsAppSetting, getStorage, getStorageLogin } from '../../service/storage';
import React from 'react';
import { TextInput } from 'react-native';
import { StackRootList } from '../../navigation/model';


type PropsState = {
  password: string;
  btnSignInBusy: boolean;
  status: string;
  isShowPassword: boolean;
};
type PropsHook= {
  state: PropsState;
  setState: React.Dispatch<React.SetStateAction<PropsState>>;
  refPassword: React.RefObject<TextInput>;
};
export let store = {} as PropsStore;
export let navigation = {} as StackNavigationProp<StackRootList>;
 
export const hook = {} as PropsHook;
  
 export async function UpdateHook() {

   const [state, setState] = React.useState<PropsState>({
    password: '', //'kcntienhai@123',
    btnSignInBusy: false,
    status: '',
    isShowPassword: false,
  });
  hook.state = state;
  hook.setState = setState;
  hook.refPassword = React.createRef<TextInput>();
  
  //const appSetting = await getStorage();
  store = GetStore();
  navigation = useNavigation<StackNavigationProp<StackRootList>>();
 }
 export const olState = {
  userName: '',
};


export async function onInit() {
  const user = await getStorageLogin();
  //   changeLanguageByLabel(appSetting.currentLanguage);
  //   store.setState(state => {
  //     state.appSetting= appSetting;
  //     return {...state};
  //   });
  console.log(user)
   }
// export async function onInit() {
//   navigation.addListener('focus', async () => {
//     checkUpdateFromStore();
//     hook.setState(state => {
//       state.password = '';
//       return {...state};
//     });

//     // const appSetting = await getStorage();
//     const appSetting = store.state.appSetting;

//     const user = await getUserStorage();

//     olState.userName = user.userAccount;

//     let typeTouchID: TYPE_TOUCH_ID = 'TouchID';
//     try {
//       let isSupport = await TouchID.isSupported();
//       if (isSupport === 'FaceID') {
//         typeTouchID = 'FaceID';
//       } else if (isSupport === 'TouchID') {
//         typeTouchID = 'TouchID';
//       }
//     } catch (e) {
//       typeTouchID = 'NoSupport';
//     } finally {
//     }
//     store.setState(state => {
//       state.appSetting = appSetting;
//       state.userInfo.USER_ACCOUNT = user.userAccount;
//       state.typeTouchID = typeTouchID;
//       state.isSignIn = false;
//       return {...state};
//     });

//     unsubcribeCheckTimeoutAccount();

//     if (
//       appSetting.server.host.trim().length === 0
//       // ||
//       // appSetting.server.port.trim().length === 0
//     ) {
//       showToast(t('login.handle.settingIP'));
//       navigation.navigate('Setting');
//       return;
//     } else {
//       if (firstTime && typeTouchID !== 'NoSupport') {
//         firstTime = false;
//         console.log('here');
//         onFingerPress(false);
//       }
//     }
//   });

//   // navigation.addListener('beforeRemove', e => {
//   //   //console.log('e:', e);
//   //   e.preventDefault();
//   // });
// }

// export function onDeInit() {}
