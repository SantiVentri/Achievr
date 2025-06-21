import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.getLocales()[0].languageCode, // Get first locale's language code
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    interpolation: {
      escapeValue: false
    },
    debug: true, // Enable debug mode
  });

console.log('i18n initialized with language:', Localization.getLocales()[0].languageCode);
console.log('Available resources:', Object.keys(i18n.options.resources));

export default i18n;
