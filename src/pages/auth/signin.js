import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/components/icon/logo";
import { ROUTES } from "@/config/routes";
import AuthContent from "@/components/pages/auth/authContent";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/languageSwitcher";
import { useLanguage } from "@/components/languageSwitcher/languageContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  const { direction } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t("email_and_password_are_required"));
      return;
    }
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setLoading(false);
      setError(res.error);
    } else {
      setLoading(false);
      router.push(ROUTES.DASHBOARD);
      toast.success(t("login_successfully"));
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary relative flex items-center justify-center overflow-hidden">
      <div className="h-full w-full relative min-h-[100vh] lg:block flex items-center justify-center">
        <Image
          height={802}
          width={1203}
          alt="AuthBackgroundImage"
          src="/images/AuthBackgroundImage4k.jpg"
          className={`absolute w-full h-full top-0 ${
            direction === "ltr"
              ? "-left-80 animate-auth-image"
              : "-right-80 animate-arabic-auth-image"
          }  opacity-20 mix-blend-luminosity hidden 2xl:block  `}
        />
        <Image
          height={802}
          width={1203}
          alt="AuthBackgroundImage"
          src={"/images/AuthBackgroundImage.svg"}
          className={`absolute w-full h-full top-0 ${
            direction === "ltr"
              ? "-left-[88px] animate-auth-image"
              : "-right-[88px] animate-arabic-auth-image"
          }  opacity-20 animate-auth-image mix-blend-luminosity hidden lg:block 2xl:hidden`}
        />
        <AuthContent />
        <div
          className={`h-[94%] static lg:absolute top-6 ${
            direction === "ltr"
              ? "right-0 rounded-r-none"
              : "left-0 rounded-l-none"
          } rounded-[40px] bg-white/40 w-5/12 hidden lg:block`}
        ></div>
        <form
          onSubmit={handleSubmit}
          className={`static lg:absolute ${
            direction === "ltr"
              ? "right-0 lg:rounded-r-none"
              : "left-0 lg:rounded-l-none"
          } top-0 w-11/12 md:w-6/12 lg:w-2/5 h-full mx-auto lg:mx-0 bg-white rounded-xl lg:rounded-[40px] px-5 md:px-8 lg:px-14 xl:px-28 flex flex-col items-center gap-5 xl:gap-6 justify-center py-5 lg:py-0 shadow-lg lg:shadow-none`}
        >
          <div className="absolute top-3 right-5 text-white lg:text-primary">
            <LanguageSwitcher />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Logo height="20" width="20" color="primary" />
            <h1 className="text-secondary font-extrabold text-base lexend-deca-font">
              {t("title")}
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl lg:text-3xl text-secondary">
              {t("hi_welcome")}
            </h1>
            <Image
              height={30}
              width={30}
              alt="wave"
              src="/images/Wave.svg"
              className="h-5 w-5 lg:h-auto lg:w-auto"
            />
          </div>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeHolder={t("email")}
            padding="py-2 lg:py-4"
            value={email}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeHolder={t("password")}
            padding="py-3 lg:py-4"
            value={password}
            errors={error}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary cursor-pointer"
              />
              <p className="text-secondary text-sm">{t("remember_me")}</p>
            </div>
            <p className="text-secondary text-sm cursor-pointer">
              {t("forgot_password")}
            </p>
          </div>
          <Button
            text={t("log_in")}
            padding="py-3 lg:py-4"
            radius="rounded-[51px]"
            className="w-full text-sm lg:text-base font-extrabold"
            isLoader={loading}
            disabled={loading}
            animation
          />
          <h1
            onClick={() => router.push(ROUTES.SIGN_UP)}
            className="text-sm roboto-font text-gray cursor-pointer lg:mt-6"
          >
            {t("don't_have_an_account")}{" "}
            <span className="text-primary font-semibold">{t("signup")}</span>
          </h1>
        </form>
      </div>
    </div>
  );
}

SignIn.layout = {
  layout: "none",
};
