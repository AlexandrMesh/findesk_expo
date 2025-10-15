import i18n from '~translations/i18n';

export default (value: number, toFixed: number = 2) => {
  return Number(value.toFixed(toFixed)).toLocaleString(i18n.language, { maximumFractionDigits: toFixed });
};
