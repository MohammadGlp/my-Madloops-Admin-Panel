function getDateFormat(uDate, option) {
  let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
  return date;
}
const dateConvert = (date) => {
  const convertedDate = new Date(date);
  const solarDate = {
    day: getDateFormat(convertedDate, { day: '2-digit' }),
    month: getDateFormat(convertedDate, { month: 'numeric' }),
    monthTitle: getDateFormat(convertedDate, { month: 'long' }),
    year: getDateFormat(convertedDate, { year: 'numeric' }),
    dayWeek: getDateFormat(convertedDate, { weekday: 'long' }),
  };
  return solarDate;
};

const timeConvert = (date) => {
  const d = new Date(date);
  return d.toTimeString().slice(0, 5);
};

const solarDateArrange = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8, 10);
  return `${year}/${month}/${day}`;
};

export { dateConvert, timeConvert, solarDateArrange };
