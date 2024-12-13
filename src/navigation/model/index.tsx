import { NavigatorScreenParams } from "@react-navigation/native";


export type StackRootList = {
    Login: undefined;
    History : undefined;
    Settings : undefined;
    Home : undefined ;
    DrawerBottom: NavigatorScreenParams<BottomList>;
  };
  export type DrawerTab = {
    Drawer: NavigatorScreenParams<DrawerList>;
  };
  export type DrawerList ={
    Profile: undefined;
    Manual: undefined;
    Contact: undefined;
    Support : undefined;
 }

  export type BottomTab = {
    Bottom: NavigatorScreenParams<BottomList>;
  };
  export type BottomList = {
    HomeStack: NavigatorScreenParams<StackHomeList>;
    History: undefined;
    Home : undefined;
    Setting : undefined;
  };
  export type StackHomeList = {
    Home: undefined;
  };