import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "ar",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    }
  });

export default i18next;
