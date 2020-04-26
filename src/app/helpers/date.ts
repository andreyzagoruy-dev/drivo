const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

function getPrettyDate(date: Date): string {
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${date.getDate()} ${month} ${year}`;
}

export { getPrettyDate };
