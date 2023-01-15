import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, HStack, VStack, useColorModeValue, Image } from '@chakra-ui/react';

import { useDappProvider } from "src/context/DAppConnectContext";
import ConnectWalletButton from "src/components/contract/wallet/ConnectWalletButton";
import PopoverAccount, { PopoverAccountProps } from "src/components/contract/wallet/PopoverAccount";

interface Props extends PopoverAccountProps {
  displayAddressMode?: 'full' | 'shorten',
  borderBottomLeftRadius?: string,
  borderBottomRightRadius?: string,
}

export default function NavbarAccount({ displayAddressMode = 'shorten', showFooter, borderBottomLeftRadius, borderBottomRightRadius }: Props) {

  const { t } = useTranslation();
  const bgColor = useColorModeValue('gray.400', 'gray.800');
  const { connected, shortenAddress, address, cawAccount, chain, openChainModal, openAccountModal } = useDappProvider();

  return (
    <Box
      p="3"
      bg={bgColor}
      borderRadius="lg"
      borderBottomLeftRadius={borderBottomLeftRadius || "lg"}
      borderBottomRightRadius={borderBottomRightRadius || "lg"}
      width={'100%'}
    >
      {connected ?
        <HStack
          width={'100%'}
        >
          <PopoverAccount displaMode="carousel" showFooter={showFooter} />
          <VStack textAlign="left" alignItems="flex-start">
            <Text noOfLines={1} as="b">
              {cawAccount?.userName || '🌙'}
            </Text>
            <HStack>
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
              <Text
                noOfLines={1}
                fontSize="sm"
                color="gray.600"
                cursor={'pointer'}
                onClick={chain?.name ? openChainModal : openAccountModal}
              >
                {chain?.name || t('labels.unknownChain')}
              </Text>
            </HStack>
            <Text
              noOfLines={1}
              fontSize="sm"
              color="gray.600"
              cursor={'pointer'}
              wordBreak="break-all"
              as="p"
              onClick={openAccountModal}
            >
              {displayAddressMode === 'shorten' ? shortenAddress : address}
            </Text>
          </VStack>
        </HStack>
        :
        <ConnectWalletButton />
      }
    </Box>
  );
}
