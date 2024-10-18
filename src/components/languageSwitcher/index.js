import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      document.dir = lng === "ar" ? "rtl" : "ltr";
    });
  };

  return (
    <div className="flex items-center gap-2 text-xs md:text-base">
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ar")}>عربي</button>
    </div>
  );
}
