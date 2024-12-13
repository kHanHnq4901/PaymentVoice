import {navigationStackRoot, store} from '../../component/drawer/controller';

type Props = {
  func: () => void;
  requiredAuth: boolean;
};

export function navigate(props: Props): void {
  if (props.requiredAuth) {
    if (store.state.isSignIn) {
      if (store.state.isBusy) {
        store.setState(state => {
          state.canShowModalBusy = true;
          return {...state};
        });
        return;
      } else {
        props.func();
      }
    } else {
      // naviagte to login
      navigationStackRoot.navigate('Login');
    }
  } else {
    props.func();
  }
}
