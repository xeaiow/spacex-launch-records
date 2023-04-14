import dayjs from 'dayjs';
dayjs().format()

export const prettyDateFormat = (date: string) => {
  const timeString = date.slice(11);
  return timeString;
};

export const unixConvertDate = (unix: number) => {
  return dayjs.unix(unix).format('YYYY-MM-DD');
};
