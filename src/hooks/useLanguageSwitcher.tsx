import { useTranslation } from 'react-i18next';
import { defaultLanguages } from '../i18n';

export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lang: string) => {
    if (lang !== currentLanguage) {
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    defaultLanguages,
  };
};
