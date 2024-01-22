import i18next from "i18next";

// polish translations
import plHeader from "../Translations/pl/header.json";
import plFooter from "../Translations/pl/footer.json";
import plModalLogin from "../Translations/pl/modalLogin.json";
import plModalRegister from "../Translations/pl/modalRegister.json";
import plModalUserDetails from "../Translations/pl/modalUserDetails.json";
import plBookCard from "../Translations/pl/bookCard.json";
import plModalAddBook from "../Translations/pl/modalAddBook.json";
import plModalAuthor from "../Translations/pl/modalAuthor.json";
import plModalDeleteBook from "../Translations/pl/modalDeleteBook.json";
import plModalEditBook from "../Translations/pl/modalEditBook.json";
import plModalMoreInformation from "../Translations/pl/modalMoreInformation.json";
import plModalRating from "../Translations/pl/modalRating.json";
import plModalReserve from "../Translations/pl/modalReserve.json";

// english translations
import enHeader from "../Translations/en/header.json";
import enFooter from "../Translations/en/footer.json";
import enModalLogin from "../Translations/en/modalLogin.json";
import enModalRegister from "../Translations/en/modalRegister.json";
import enModalUserDetails from "../Translations/en/modalUserDetails.json";
import enBookCard from "../Translations/en/bookCard.json";
import enModalAddBook from "../Translations/en/modalAddBook.json";
import enModalAuthor from "../Translations/en/modalAuthor.json";
import enModalDeleteBook from "../Translations/en/modalDeleteBook.json";
import enModalEditBook from "../Translations/en/modalEditBook.json";
import enModalMoreInformation from "../Translations/en/modalMoreInformation.json";
import enModalRating from "../Translations/en/modalRating.json";
import enModalReserve from "../Translations/en/modalReserve.json";

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
        modalUserDetails: enModalUserDetails,
        bookCard: enBookCard,
        modalAddBook: enModalAddBook,
        modalAuthor: enModalAuthor,
        modalDeleteBook: enModalDeleteBook,
        modalEditBook: enModalEditBook,
        modalMoreInformation: enModalMoreInformation,
        modalRating: enModalRating,
        modalReserve: enModalReserve,
      },
      pl: {
        header: plHeader,
        footer: plFooter,
        modalLogin: plModalLogin,
        modalRegister: plModalRegister,
        modalUserDetails: plModalUserDetails,
        bookCard: plBookCard,
        modalAddBook: plModalAddBook,
        modalAuthor: plModalAuthor,
        modalDeleteBook: plModalDeleteBook,
        modalEditBook: plModalEditBook,
        modalMoreInformation: plModalMoreInformation,
        modalRating: plModalRating,
        modalReserve: plModalReserve,
      }
    }
  });

}