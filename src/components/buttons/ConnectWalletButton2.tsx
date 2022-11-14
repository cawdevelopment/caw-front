import {
  Text,
  Button,
  Image,
  Box,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverFooter,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Avatar,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";

import { useWallet } from 'src/context/WalletConnectContext'
import { AllNFTNames } from "src/components/userName/AllNFTNames";
import { MintNFTName } from "src/components/userName/MintNFTName";
import { useTranslation } from "react-i18next";


const ConnectWalletButton2 = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ userName, setUserName ] = useState("");
  const { account, chain, status, openAccountModal, openChainModal, openConnectModal } = useWallet();
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
        <Box width="15vw">
          <Popover>
            <PopoverTrigger
            >
              <HStack
                _hover={{
                  background: "grey",
                  transition: "all 0.7s",
                  transform: "scale(1.005)",
                }}
                rounded="lg"
              >
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
                <VStack spacing={1}>
                  <Text as="b" noOfLines={1}>
                    {userName}
                  </Text>
                </VStack>
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />{" "}
                {account?.displayBalance || ""}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <AllNFTNames setUserName={setUserName} />
                <Box m={5} />
                <Button onClick={onOpen}>Mint Username</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Mint Username</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <MintNFTName />
                    </ModalBody>
                    <ModalFooter />
                  </ModalContent>
                </Modal>
              </PopoverBody>
              <PopoverFooter>
                <Button
                  onClick={openAccountModal}
                  width="15vw"
                  variant="outline"
                  bgGradient="linear(to-l, brand.100, brand.200)"
                >
                  {account?.displayName || "Account"}
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>


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

export default ConnectWalletButton2;
