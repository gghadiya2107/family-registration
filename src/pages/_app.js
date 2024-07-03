'use client';
import "@/styles/globals.css";
import store from "@/utils/store";
import { Provider } from "react-redux";
import { appWithTranslation } from 'next-i18next';
import '../../i18n'
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "@/utils/LoadingContext";
import { AuthProvider } from "@/utils/AuthContext";


function MyApp({ Component, pageProps }) {
  return (<AuthProvider> <LoadingProvider>
    <Provider store={store}>
      <Toaster position="bottom-center" />

      <Component {...pageProps} />
    </Provider>
  </LoadingProvider></AuthProvider>);
}

export default appWithTranslation(MyApp);
