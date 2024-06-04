'use client';
import "@/styles/globals.css";
import store from "@/utils/store";
import { Provider } from "react-redux";
import { appWithTranslation } from 'next-i18next';
import '../../i18n'
import { Toaster } from "react-hot-toast";


function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
            <Toaster position="bottom-center" />

  <Component {...pageProps} />
</Provider>;
}

export default appWithTranslation(MyApp);
