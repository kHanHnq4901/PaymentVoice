

export const TAG = 'USER Service:';

const api = '/Api';

export const endPoints = {
  manual : '/Content/assets/pdf/Tailieu.pdf',
  login: '/Login',
  getChartWarning: '/GetChartDataColumn',
  getLineSideBarMap: '/LoadTableDashBoard',
  getLocationMap : '/GetLocationDashBoard',
  getTableDashBoard: '/LoadTableDashBoard',
  getMeterList: '/GetMeterList',
  GetMeterListByDate: '/GetMeterListByDate',
  getDailyBilling: '/GetDailyBilling',
  getInstantData: '/GetInstant',
  getEvent: '/GetEvent',
  getMonthy: '/GetMonthy',
  deleteAccount: '/DeleteAccount',
  getMeterRate: '/GetMeterRate',
  getConVersion: '/GetConversation',
  markReadMessage: '/MarkReadMessage',
};

export function getUrlManual (host : string,port: string,endPoint: string): string {
  let url = '';
  if (host.includes('http')) {
  } else {
    url += 'http://';
  }
  url += host;
  if (port.length > 0) {
    url += ':' + port;
  }
  url += endPoint;
  url += `?timestamp=${new Date().getTime()}`;
  return url;
}

export function getUrl(host:string,port: string,endPoint: string): string {
  let url = '';
  if (host.includes('http')) {
  } else {
    url += 'http://';
  }
  url += host;
  if (port.length > 0) {
    url += ':' + port;
  }
  url += api;
  url += endPoint;
  //url += `?timestamp=${new Date().getTime()}`;
  return url;
}

export type PropsResponse = {
  succeed: boolean;
  message: string;
  data: any;
};
export type PropsResponseData = {
  data: any;
};
export type PropsInfoUser = {
    USER_ACCOUNT : string 
    USER_NAME: string;
  };
  export type PropsLineServer = {
    CODE : string; 
    LINE_ID:string;
    LINE_NAME:string;
    LINE_TYPE : string;
    SUBSTATION_ID :number;
    ADDRESS : string ;
    NOTE : string;
  
  }
  export type PropsLineDataServer ={
    LINE_ID : number;   
    CODE : string;
    NOTE :string;
    LINE_NAME : string;
    SUBSTATION_ID : number;
    MBA_Count : number ;
    MBA_Count_Data_Today: number;
  }
  export type PropsMeterServer = {
    METER_NAME: string;
    METER_NO: string;
   
    MA_DDO: string;
    TEN_KHANG: string;
    DIA_CHI: string;
    CT_NAME: string;
    PT_NAME: string;
    TODAY_DATA: '1' | '0';
  };

  // export function resetTimeoutAccount() {
  //   // console.log('request reset timeout account');
  
  //   throterFunc();
  // }
  export type LoadProfile2LabelType =
  | 'PExport'
  | 'PImport'
  | 'QExport'
  | 'QImport';
  export type PropsInstantLabel =
  | 'voltage'
  | 'current'
  | 'cosPhi'
  | 'activePower'
  | 'negativePower';


  