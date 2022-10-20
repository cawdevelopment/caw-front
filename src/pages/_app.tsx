import 'src/styles/globals.css'
import '../locales/i18n';

import { ReactElement, ReactNode } from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react'
import { SnackbarProvider } from 'notistack';

import theme from '../theme'


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
        <SnackbarProvider maxSnack={3}>
          {/* This allows us to use diferent layouts for each type of pages (i.e dashboard, landing page, etc) */}
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
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

