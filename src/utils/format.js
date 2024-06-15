//日期時間, 貨幣, 字串長度等
export const numberWithCommas = number => {
  return number.toLocaleString('zh-tw')
}

export const getDayString = (_date, symbol = ".") => {
  const year = _date.getFullYear();
  const month = (_date.getMonth() + 1).toString().padStart(2, '0');
  const date = _date.getDate().toString().padStart(2, '0');
  return `${year}${symbol}${month}${symbol}${date}`;
};

export const getTimeString = _date => {
  const hour = _date.getHours().toString().padStart(2, '0');
  const minute = _date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minute}`;
};


export const getDateString = (_date, symbol = ".") => {
  const year = _date.getFullYear();
  const month = (_date.getMonth() + 1).toString().padStart(2, '0');
  const date = _date.getDate().toString().padStart(2, '0');

  const hour = _date.getHours().toString().padStart(2, '0');
  const minute = _date.getMinutes().toString().padStart(2, '0');
  return `${year}${symbol}${month}${symbol}${date} ${hour}:${minute}`;
};


