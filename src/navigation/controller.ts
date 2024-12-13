
import { GetStore, PropsStore, storeContext } from '../store';
import React from 'react';
import { TextInput } from 'react-native';

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
 
export const hook = {} as PropsHook;
  
 export function UpdateHook() {
   const [state, setState] = React.useState<PropsState>({
    password: '', //'kcntienhai@123',
    btnSignInBusy: false,
    status: '',
    isShowPassword: false,
  });
  hook.state = state;
  hook.setState = setState;
  hook.refPassword = React.createRef<TextInput>();

  store = GetStore();
 }