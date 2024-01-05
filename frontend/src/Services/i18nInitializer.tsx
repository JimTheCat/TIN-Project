import i18next from "i18next";

// polish translations
import plHeader from "../Translations/pl/header.json";
import plFooter from "../Translations/pl/footer.json";
import plModalLogin from "../Translations/pl/modalLogin.json";
import plModalRegister from "../Translations/pl/modalRegister.json";

// english translations
import enHeader from "../Translations/en/header.json";
import enFooter from "../Translations/en/footer.json";
import enModalLogin from "../Translations/en/modalLogin.json";
import enModalRegister from "../Translations/en/modalRegister.json";

export const i18nInitializer = () => {
  const language = localStorage.getItem('language') == null ? 'en' : localStorage.getItem('language') as string | undefined;

  return i18next.init({
    interpolation: { escapeValue: false },
    lng: language,
    resources: {
      en: {
        header: enHeader,
        footer: enFooter,
        modalLogin: enModalLogin,
        modalRegister: enModalRegister,
      },
      pl: {
        header: plHeader,
        footer: plFooter,
        modalLogin: plModalLogin,
        modalRegister: plModalRegister,
      }
    }
  });

}