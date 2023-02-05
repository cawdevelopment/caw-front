import { type ReactElement, type ReactNode, lazy, Suspense } from "react";
import { type AppProps } from "next/app";
import { NextPage } from "next/types/index";

import "src/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../locales/i18n";

import Loading from "src/components/loaders/PageLoader";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const Providers = lazy(() => import('src/context/Providers'));

const App = (props: MyAppProps) => {

  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Suspense fallback={<Loading />}>
      <Providers>
        {/* This allows us to use diferent layouts for each type of pages (i.e dashboard, landing page, etc) */}
        {getLayout(<Component {...pageProps} />)}
      </Providers>
    </Suspense>
  );
};

export default App;
