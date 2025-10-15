import i18n from 'i18next';
import { RU, EN } from '~constants/languages';
import detectLanguage from '~utils/detectLanguage';
import common from './locales/ru/common.json';
import asset from './locales/ru/asset.json';
import portfolio from './locales/ru/portfolio.json';
import purchase from './locales/ru/purchase.json';
import errors from './locales/ru/errors.json';
import commonEn from './locales/en/common.json';
import assetEn from './locales/en/asset.json';
import portfolioEn from './locales/en/portfolio.json';
import purchaseEn from './locales/en/purchase.json';
import errorsEn from './locales/en/errors.json';

const LanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const language = await detectLanguage();
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n.use(LanguageDetector).init({
  fallbackLng: EN,
  compatibilityJSON: 'v3',
  languages: [RU, EN],
  whitelist: [RU, EN],
  resources: {
    [RU]: {
      common,
      asset,
      portfolio,
      purchase,
      errors
    },
    [EN]: {
      common: commonEn,
      asset: assetEn,
      portfolio: portfolioEn,
      purchase: purchaseEn,
      errors: errorsEn
    }
  }
});

export const getT = (namespace) => i18n.getFixedT(i18n.language, namespace);

export default i18n;
