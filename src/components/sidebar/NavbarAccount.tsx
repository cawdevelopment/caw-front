import React from "react";
import {
  Box, Text, HStack, VStack, useColorModeValue, Image,
  Popover,
  PopoverTrigger,
  PopoverFooter,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';

import { useCawProvider } from "src/context/WalletConnectContext";
import AnimatedAvatar from "src/components/avatar/AnimatedAvatar";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton2";

type Props = {
  displayAddressMode?: 'full' | 'shorten'
}
export default function NavbarAccount({ displayAddressMode = 'shorten' }: Props) {

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const { shortenAddress, address, cawAccount, chain, connected, openChainModal, openAccountModal } = useCawProvider();

  return (
    <Box
      p="3"
      m="3"
      bg={bgColor}
      borderRadius="lg"
    >
      {/* <ConnectWalletButtonOld /> */}
      {connected ?
        <HStack>
          <Popover>
            <PopoverTrigger>
              <AnimatedAvatar src={cawAccount?.avatar || ''} alt={cawAccount?.userName || ''} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <AnimatedAvatar src={cawAccount?.avatar || ''} alt={cawAccount?.userName || ''} />
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack alignItems="flex-start" p={0} m={0} >
                  <Text noOfLines={1} as="b">
                    {cawAccount?.userName || ''}
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
                        />
                      )}
                    </Box>
                    <Text
                      noOfLines={1}
                      fontSize="sm"
                      color="gray.500"
                    >
                      {chain?.name || ''}
                    </Text>
                  </HStack>
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color="gray.600"
                  >
                    {address}
                  </Text>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <VStack alignItems="flex-start" p={0} m={0} >
            <Text noOfLines={1} as="b">
              {cawAccount?.userName || ''}
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
