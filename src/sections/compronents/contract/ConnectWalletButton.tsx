import { Button, Image, Box, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useCawProvider } from 'src/context/WalletConnectContext'

const ConnectWalletButton = () => {

  const { chain, status, openChainModal, openConnectModal } = useCawProvider();
  const { t } = useTranslation();

  if (status === 'disconnected') {
    return (
      <Button
        variant="ghost"
        onClick={openConnectModal}
      >
        {t('buttons.btn_connect_wallet')}
      </Button>
    );
  }

  if (chain?.unsupported) {
    return (
      <Button
        variant="ghost"
        onClick={openChainModal}
      >
        {t('buttons.btn_wrong_network')}
      </Button>
    );
  }

  return (
    <Box>
      <VStack>
        <Button
          onClick={openChainModal}
          width="15vw"
          variant="outline"
          bgGradient="linear(to-l, brand.100, brand.200)"
        >
          {chain?.hasIcon && (
            <Box
              style={{
                background: chain?.iconBackground,
                width: 12,
                height: 12,
                borderRadius: 999,
                overflow: "hidden",
                marginRight: 4,
              }}
            >
              {chain?.iconUrl && (
                <Image
                  alt={chain.name ?? "Chain icon"}
                  src={chain.iconUrl}
                  style={{ width: 12, height: 12 }}
                />
              )}
            </Box>
          )}
          {chain?.name}
        </Button>
      </VStack>
    </Box>
  );
};

export default ConnectWalletButton;
