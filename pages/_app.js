import PageWrapper from "/components/PageWrapper";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const ethers = require("ethers");

// const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY)

//overide default text color to white for black background.  Adding brand colors
const theme = extendTheme({
  components: {
    Text: {
      baseStyle: { color: "white" },
    },
  },
  colors: {
    brand: {
      100: "#f2e266",
      200: "#e3d464",
      900: "#1a202c",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
