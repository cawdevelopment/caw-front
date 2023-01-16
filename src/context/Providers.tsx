
import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

//Web3
import { RainbowKitProvider, getDefaultWallets, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createClient, configureChains, goerli, mainnet, createStorage } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { DAppProvider } from 'src/context/DAppConnectContext'
import ErrorBoundary from "@components/ErrorBoundary";
import { APP_NAME } from "@utils/constants";
import theme from 'src/theme'


//* Web3 connector and layer
const { chains, provider } = configureChains(
  [ goerli, mainnet ],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY || '', priority: 1, }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || '', priority: 2 }),
    // jsonRpcProvider({ priority: 3, rpc: () => ({ http: process.env.JSON_RPC_URL || '' }) }),  //<<<< New RPC Provider
    publicProvider({ priority: 4 }),
  ]
);

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains });

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  storage: createStorage({ storage: window.localStorage }),
});


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
            theme={lightTheme({
              accentColor: "#623485", //color of wallet  try #703844
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