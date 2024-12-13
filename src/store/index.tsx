import React from 'react';
import {getStorageDefaultValue, PropsAppSetting} from '../service/storage';
import {PropsInfoUser, PropsMeterServer} from '../service/user ';
import {PropsMessageStore} from './prototype';
import {Platform} from 'react-native';

type dataListMeterServer = {
  listLine: string[];
  data: PropsMeterServer[];
  listNoMeter: string[];
  listCustomer: string[];
};

export type TYPE_TOUCH_ID = 'FaceID' | 'TouchID' | 'NoSupport';

export type PropsStoreMeter = dataListMeterServer;

type PropsState = {
  userInfo: PropsInfoUser;
  appSetting: PropsAppSetting;
  messages: PropsMessageStore;
  meter: PropsStoreMeter;
  typeTouchID: TYPE_TOUCH_ID;
  isSignIn: boolean;
  isBusy: boolean;
  canShowModalBusy: boolean;
  isCredential: boolean;
};

export type PropsStore = {
  state: PropsState;
  setState: React.Dispatch<React.SetStateAction<PropsState>>;
};

export const storeContext = React.createContext<PropsStore>(
  {} as unknown as PropsStore,
);

const GetInitialValue = (): PropsStore => {
  const userInfo = {} as PropsInfoUser;

  const [state, setState] = React.useState<PropsState>({
    userInfo: userInfo,
    messages: {
      private: {
        messages: [],
        unread: 0,
      },
      public: {
        messages: [],
        unread: 0,
      },
      event: {
        messages: [],
        unread: 0,
      },
      updateApp: {
        messages: [],
        unread: 0,
      },
    },
    appSetting: getStorageDefaultValue(),
    meter: {
      listLine: [],
      data: [],
      listNoMeter: [],
      listCustomer: [],
    },
    typeTouchID: Platform.OS === 'ios' ? 'FaceID' : 'TouchID',
    isSignIn: false,
    isBusy: true,
    canShowModalBusy: false,
    isCredential: false,
  });

  const initialValue = {} as PropsStore;

  initialValue.state = state;
  initialValue.setState = setState;

  return initialValue;
};

export function GetStore(): PropsStore {
  const store = React.useContext(storeContext);
  return store;
}

export function StoreProvider({children}: {children: React.ReactNode}) {
  return (
    <storeContext.Provider value={GetInitialValue()}>
      {children}
    </storeContext.Provider>
  );
}
