import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import i18n from '~translations/i18n';
import { RU } from '~constants/languages';
import { getT } from '~translations/i18n';

const showRelativeDate = (date: number, withTime?: boolean) => {
  const locale = i18n.language === RU ? 'ru-RU' : 'en-EN';
  const inString = withTime ? getT('common')('at') : '';
  const localeTimeString = withTime ? new Date(date).toLocaleTimeString(locale) : '';
  if (isToday(new Date(date))) {
    return `${getT('common')('today')} ${inString} ${localeTimeString}`.trim();
  } else if (isYesterday(new Date(date))) {
    return `${getT('common')('yesterday')} ${inString} ${localeTimeString}`.trim();
  } else {
    return `${new Date(date).toLocaleDateString(locale)} ${inString} ${localeTimeString}`.trim();
  }
};

export const showLocalDate = (date: Date) => {
  const locale = i18n.language === RU ? 'ru-RU' : 'en-EN';
  return new Date(date).toLocaleDateString(locale);
};

export default showRelativeDate;
