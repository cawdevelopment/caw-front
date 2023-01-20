import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//* The translations
import enLocales from './en.json';
import deLocales from './de.json';
import esLocales from './es.json';
import plLocales from './pl.json';

let lng = 'en';

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'en';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      es: { translations: esLocales },
      de: { translations: deLocales },
      pl: { translations: plLocales }
    },
    lng,
    fallbackLng: 'en',
    debug: false,
    ns: [ 'translations' ],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
