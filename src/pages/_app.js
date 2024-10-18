import "../../i18n";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import MainLayout from "@/layout";
import { store } from "@/store";
import { Provider } from "react-redux";
import ModalWrapper from "@/components/modal";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/components/languageSwitcher/languageContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // Ensure the Socket.IO server is initialized
    const initializeSocketServer = async () => {
      await fetch("/api/socket");
    };

    initializeSocketServer();
  }, []);
  const componentLayout = Component.layout;

  if (!isReady) return null;

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <LanguageProvider>
          <MainLayout {...componentLayout}>
            <Component {...pageProps} />
          </MainLayout>
          <ModalWrapper />
          <Toaster position="bottom-center" reverseOrder={false} />
        </LanguageProvider>
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
