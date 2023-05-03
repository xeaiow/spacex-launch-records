import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs().format();
dayjs.extend(utc);
dayjs.extend(timezone);

export const prettyDateFormat = (date: string) => {
  const timeString = date.slice(11);
  return timeString;
};

export const unixConvertDate = (unix: number) => {
  return dayjs.unix(unix).format('YYYY-MM-DD');
};

export const utcConvertTimestamp = (dateString: string) => {
  const dateFormat = dayjs(dateString).format('YYYY-MM-DD');
  return dayjs(dateFormat).unix() * 1000;
};

export const dateFormat = (dateString: string) => {
  const dateFormat = dayjs(dateString).format('YYYY-MM-DD');
  return dayjs(dateFormat).unix() * 1000;
};

export const getCurrTimezoneDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY/M/DD HH:mm:ss');
};
