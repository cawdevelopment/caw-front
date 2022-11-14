import React from "react";
import { Box, Text, HStack, VStack, useColorModeValue, Image } from '@chakra-ui/react';

import Avatar from 'src/components/avatar/Avatar';
import ConnectWalletButton from "../buttons/ConnectWalletButton2";
import { useWallet } from "src/context/WalletConnectContext";

type Props = {
  displayAddressMode?: 'full' | 'shorten'
}
export default function NavbarAccount({ displayAddressMode = 'shorten' }: Props) {

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const { shortenAddress, address, cawName, chain, connected, openChainModal, openAccountModal } = useWallet();

  return (
    <Box
      p="3"
      m="3"
      bg={bgColor}
      borderRadius="lg"
    >
      {connected ?
        <HStack>
          <Avatar
            name={cawName}
            size="md"
            color="white"
            src={cawName}
            type={"ntf"}
          />
          <VStack alignItems="flex-start" p={0} m={0} >
            <Text noOfLines={1} as="b">
              {cawName || ''}
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
