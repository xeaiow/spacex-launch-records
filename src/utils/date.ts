import dayjs from 'dayjs';
dayjs().format()

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
