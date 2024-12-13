import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';

// import {navigation} from '../../screen/homeScreen/controller';

import {getStorage} from '../../service/storage';
// import {
//   getMeterByAccount,
//   subscribeCheckTimeoutAccount,
//   unsubcribeCheckTimeoutAccount,
// } from '../../service/user';
import {PropsStore, storeContext} from '../../store';
import {AppState} from 'react-native';
import { StackRootList } from '../../navigation/model';

const TAG = 'DrawerController:';

type PropsState = {};

type PropsHook = {
  state: PropsState;
  setState: React.Dispatch<React.SetStateAction<PropsState>>;
};

export const hook = {} as PropsHook;
export let store = {} as PropsStore;

export let navigationStackRoot = {} as StackNavigationProp<StackRootList>;

export async function UpdateHook() {

  const [state, setState] = React.useState<PropsState>({});

  hook.state = state;
  hook.setState = setState;

  navigationStackRoot = useNavigation<StackNavigationProp<StackRootList>>();

  store = React.useContext(storeContext);
 
  console.log (TAG)
}

export async function onInit() {
  const appSetting= await getStorage();
  console.log (appSetting)
  // if (store.state.isSignIn) {
  //  // await getMeterByAccount();

  //   AppState.addEventListener('change', state => {
  //     if (state === 'active') {
  //       // subscribeCheckTimeoutAccount({
  //       //   callBack: async () => {
  //       //     console.log(TAG, 'callback called');

  //       //     navigation.removeListener('beforeRemove', () => {
  //       //       console.log(TAG, 'callback remove beforeRemove');
  //       //     });
  //       //     unsubcribeCheckTimeoutAccount();
  //       //     await showAlertAsync('Phiên làm việc của bạn đã hết hạn');
  //       //     navigationStackRoot.push('SignIn');
  //       //   },
  //       // });
  //     } else {
  //     }
  //   });
  // } else {
    
    // const appSetting = await getStorage();
    // console.log (appSetting)
    // changeLanguageByLabel(appSetting.currentLanguage);
    store.setState(state => {
      state.appSetting.server.host = appSetting.server.host;
      state.appSetting.server.port = appSetting.server.port;
      return {...state};
    });
  // }

  //await updateMessageInterval();
}

export function onDeInit() {}
