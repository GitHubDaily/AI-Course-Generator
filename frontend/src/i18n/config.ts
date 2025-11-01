/**
 * i18n 配置文件
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh';
import en from './locales/en';

// 从 localStorage 读取保存的语言设置,默认为中文
const savedLanguage = localStorage.getItem('language') || 'zh';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh,
      en,
    },
    lng: savedLanguage,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
