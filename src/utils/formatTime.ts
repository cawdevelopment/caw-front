import { format, getTime, formatDistanceToNow } from 'date-fns';

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fToNowShorter(date: Date | string | number) {

  let res = fToNow(date);

  if (res === 'less than a minute ago')
    return 'now';

  //* add regex to remove the word ago, about, less thab, almost, over, etc
  res = res.replace(/(about|almost|over|less than|almost|about|over|ago)/g, '');

  //* add regex to replace the word days, hours, minutes, seconds, etc with d, h, m, s
  res = res.replace(/(days|day|hours|hour|minutes|minute|seconds|second)/g, function (x) {

    switch (x) {
      case 'days':
      case 'day':
        return 'd';
      case 'hours':
      case 'hour':
        return 'h';
      case 'minutes':
      case 'minute':
        return 'm';
      case 'seconds':
      case 'second':
        return 's';
      default:
        return x;
    }
  });

  //* add regex to remove the word and, and replace the word comma with a space
  res = res.replace(/(and|,)/g, ' ');

  //* add reg to remove the spaces between the content
  res = res.replace(/\s+/g, '');

  return res;
}
