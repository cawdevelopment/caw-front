
import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

//Web3
import {
  RainbowKitProvider, lightTheme, DisclaimerComponent, connectorsForWallets
} from "@rainbow-me/rainbowkit";

import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { DAppProvider } from 'src/context/DAppConnectContext'
import ErrorBoundary from "src/components/ErrorBoundary";
import { APP_NAME, DEFAULT_JSON_RPC_URL } from "src/utils/constants";
import theme from 'src/theme'


//* Web3 connector and layer
const { chains, provider } = configureChains(
  [ goerli ],
  [
    publicProvider({ priority: 1 }),
    infuraProvider({ apiKey: process.env.INFURA_API_KEY || '', priority: 2, }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || '', priority: 3 }),
    jsonRpcProvider({ priority: 4, rpc: () => ({ http: process.env.JSON_RPC_URL || DEFAULT_JSON_RPC_URL }) }),  //<<<< New RPC Provider
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      coinbaseWallet({ chains, appName: APP_NAME }),
      rainbowWallet({ chains, shimDisconnect: true }),
      metaMaskWallet({ chains, shimDisconnect: true }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      walletConnectWallet({ chains }),
      injectedWallet({ chains, shimDisconnect: true })
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,  
  connectors,
  provider,
});


const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text
  >
    <b>
      This app runs on the Goerli testnet
    </b>
    <br />
    <b
      style={{ color: "red" }}
    >
      Connect a wallet that supports testnets, like Coinbase, Rainbow Wallet, or MetaMask.
    </b>
  </Text>
);

const Providers = ({ children }: { children: ReactNode }) => (
  <>
    <ErrorBoundary>
      <ChakraProvider theme={theme} resetCSS>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            coolMode={false}
            showRecentTransactions={true}
            modalSize="wide"
            appInfo={{
              appName: APP_NAME,
              disclaimer: Disclaimer,
            }}
            theme={lightTheme({
              accentColor: "#f7c034",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
            })}
          >
            <DAppProvider>
              {children}
            </DAppProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </ErrorBoundary>
  </>
);

export default Providers;