import { Icon, Text, Button, Show, Hide } from "@chakra-ui/react";
import { FaConnectdevelop, FaListUl } from "react-icons/fa";

const ConnectWalletButton = ({
  connectWalletPressedProp,
  walletAddressProp,
}) => (
  <Button
    onClick={connectWalletPressedProp}
    width="10vw"
    variant="outline"
    bgGradient="linear(to-l, brand.100, brand.200)"
  >
    {walletAddressProp?.length > 0 ? (
      <>
        <Hide below="lg">
          <Text p="2" fontSize="xl" color="black">
            {String(walletAddressProp).substring(0, 6) +
              "..." +
              String(walletAddressProp).substring(38)}
          </Text>
        </Hide>
        <Show below="md">
          <Icon color="black" w={7} h={7} as={FaConnectdevelop} />
        </Show>
      </>
    ) : (
      <>
        <Hide below="md">
          <Text p="2" fontSize="xl" color="black">
            Connect
          </Text>
        </Hide>
        <Show below="md">
          <Icon color="black" w={7} h={7} as={FaConnectdevelop} />
        </Show>
      </>
    )}
  </Button>
);

export default ConnectWalletButton;
