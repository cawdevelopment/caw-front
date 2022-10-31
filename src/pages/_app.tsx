import "src/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../locales/i18n";

import { ReactElement, ReactNode } from "react";
import App, { AppProps, AppContext } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

//Web3
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import theme from '../theme'

//* Web3 connector and layer
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.goerli,
    chain.mainnet,
    // chain.polygon, chain.optimism, chain.arbitrum
  ],
  [
    infuraProvider({
      apiKey: process.env.INFURA_API_KEY,
      priority: 0,
    }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY, priority: 1 }),
    publicProvider({ priority: 2 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Caw names",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

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
      <ChakraProvider theme={theme} resetCSS>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            {/* This allows us to use diferent layouts for each type of pages (i.e dashboard, landing page, etc) */}
            {getLayout(<Component {...pageProps} />)}
          </RainbowKitProvider>
        </WagmiConfig>
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
