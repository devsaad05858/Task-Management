import Logo from "@/components/icon/logo";
import { useLanguage } from "@/components/languageSwitcher/languageContext";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const AuthContent = () => {
  const { t } = useTranslation("common");
  const { direction } = useLanguage();

  return (
    <div
      className={`py-28 ${
        direction === "ltr" ? "pl-20" : "pr-20"
      } xl:pl-36 hidden lg:flex flex-col gap-6 2xl:gap-12 w-6/12 relative`}
    >
      <div className="flex items-center gap-1 2xl:gap-3">
        <Logo />
        <h1 className="text-white font-extrabold text-3xl 2xl:text-4xl lexend-deca-font">
          {t("title")}
        </h1>
      </div>
      <Image
        height={352}
        width={416}
        className="mix-blend-luminosity 2xl:h-8/12 2xl:w-8/12"
        alt="mainImage"
        src="/images/AuthMainImage.svg"
      />
      <div className="flex flex-col text-white gap-1 2xl:gap-3">
        <h1 className="text-3xl 2xl:text-4xl font-extrabold">{t("title")}</h1>
        <p className="text-sm 2xl:text-lg leading-normal opacity-80">
          {t("sign_in_description")}
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
