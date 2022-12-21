import React from "react";
import { Box, Text, HStack, VStack, useColorModeValue, Image } from '@chakra-ui/react';

import { useCawProvider } from "src/context/WalletConnectContext";
import ConnectWalletButton from "src/sections/compronents/contract/ConnectWalletButton";
import PopoverAccount, { PopoverAccountProps } from "src/sections/compronents/contract/PopoverAccount";

interface Props extends PopoverAccountProps {
  displayAddressMode?: 'full' | 'shorten',
}

export default function NavbarAccount({ displayAddressMode = 'shorten', showFooter }: Props) {

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const { shortenAddress, address, cawAccount, chain, openChainModal, openAccountModal } = useCawProvider();
  const { connected } = useCawProvider();

  return (
    <Box
      p="3"
      m="3"
      bg={bgColor}
      borderRadius="lg"
    >
      {connected ?
        <HStack>
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
                color="gray.500"
                cursor={'pointer'}
                onClick={openChainModal}
              >
                {chain?.name || ''}
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
