import '../styles/globals.css'
import '../locales/i18n';

import { NextPage } from "next";
import { ReactElement, ReactNode } from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'


import theme from '../theme'
import Head from "next/head";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {

  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ChakraProvider
        theme={theme}
        resetCSS
      >
        {/* This allows us to use diferent layouts for each type of pages (i.e dashboard, landing page, etc) */}
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {

  const appProps = await App.getInitialProps(context);

  return {
    ...appProps,
  };
};

