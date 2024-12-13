export function ConvertTime2ServerTime(date: Date): string {
    let str = '';
  
    str =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0') +
      '000000';
  
    return str;
  }
  export function GetFormatMonth(date: Date): string {
    let str = '';
  
    str =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0');
  
    return str;
  }
  
  export function GetOnlyDateMonthFromDate(date: string | Date): string {
    let time: Date;
    if (typeof date === 'string') {
      time = new Date(date);
    } else {
      time = date;
    }
  
    let str =
      time.getDate().toString().padStart(2, '0') +
      '-' +
      (time.getMonth() + 1).toString().padStart(2, '0');
  
    return str;
  }
  