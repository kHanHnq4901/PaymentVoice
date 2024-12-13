import {IMessage} from 'react-native-gifted-chat';

export type ServerInfo = {
  ip: string;
  port: string;
};

export type PropsMessageStore = {
  private: {
    messages: IMessage[];
    unread: number;
  };
  public: {
    messages: IMessage[];
    unread: number;
  };
  event: {
    messages: IMessage[];
    unread: number;
  };
  updateApp: {
    messages: (IMessage & {onPress?: () => {}})[];
    unread: number;
  };
};
