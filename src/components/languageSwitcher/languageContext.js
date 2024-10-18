// LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    const lang = i18n.language;
    const newDirection = lang === "ar" ? "rtl" : "ltr";
    setDirection(newDirection);
    document.dir = newDirection;
  }, [i18n.language]);

  return (
    <LanguageContext.Provider value={{ direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
