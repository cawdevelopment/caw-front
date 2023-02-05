import { useRef } from "react";
import {
  Flex, IconButton, Code, Box, Image, chakra, Tooltip, Text,
  useDisclosure, useColorModeValue, useBreakpointValue, useOutsideClick
} from '@chakra-ui/react';
import Iconify from "src/components/icons/Iconify";
import { DownloadIcon } from '@chakra-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

import { getOpenSeaUrl } from "src/hooks/contracts/helper";
import { useDappProvider } from "src/context/DAppConnectContext";
import useAppConfigurations from "src/hooks/useAppConfigurations";

interface Props {
  userId: number;
  avatar: string;
  username: string;
  onConnect?: (userName: string) => void;
}


function NftUsernameCard({ userId, avatar, username, onConnect }: Props) {

  const ref = useRef();
  const { chain } = useDappProvider();
  const { t } = useTranslation();
  const { isOpen: isVisible, onOpen, onClose, onToggle } = useDisclosure();
  const { contracts: { CAW_NAME: { address: cawNamesAddress } } } = useAppConfigurations();
  const isMd = useBreakpointValue({ base: true, md: false });
  useOutsideClick({ ref: ref as any, handler: () => onClose(), });


  const nftURL = getOpenSeaUrl(chain?.id || 0, cawNamesAddress, userId);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = avatar;
    downloadLink.download = `${username}.svg`;
    downloadLink.click();
  }

  const handleConnect = () => {
    onConnect?.(username);
  }

  return (
    <motion.div
      ref={ref as any}
      onHoverStart={onOpen}
      onHoverEnd={onClose}
      onClick={onToggle}
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { ease: 'easeOut' },
      }}
    >
      <Flex
        id={`card-${username}`}
        p={{ base: 4, md: 2 }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          id={`flex-box-${username}`}
          bg={useColorModeValue('white', 'gray.800')}
          maxW={80}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <AnimatePresence>
            {(isVisible || isMd) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <chakra.a
                  href={nftURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  position="absolute"
                  top={2}
                  right={2}
                >
                  {/* <Iconify icon={'simple-icons:opensea'} color="#407fdb" /> */}
                  <IconButton
                    aria-label="OpenSea"
                    size='sm'
                    colorScheme='gray'
                    icon={<Iconify icon={'simple-icons:opensea'} color="#407fdb" />}
                  />
                </chakra.a>
                <IconButton
                  aria-label="Download"
                  position="absolute"
                  top={14}
                  right={2}
                  size='sm'
                  colorScheme='gray'
                  onClick={handleDownload}
                  icon={<DownloadIcon />}
                />
                <Tooltip
                  label={`${t('labels.connectas')}: ${username}`}
                >
                  <IconButton
                    aria-label={t('labels.connectas')}
                    position="absolute"
                    top={24}
                    right={2}
                    size='sm'
                    colorScheme='gray'
                    onClick={handleConnect}
                    icon={<Iconify icon='ri:user-heart-fill' />}
                  />
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            id={`image-${username}`}
            src={avatar}
            alt={`Picture of ${username}`}
            roundedTop="lg"            
          />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Code p={1} rounded="md" fontSize="0.8em">{`#${userId}`}</Code>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="xl"
                fontWeight="semibold"
                // as="h4"
                lineHeight="tight"
                isTruncated
              >
                <Text
                  maxWidth={230}
                  noOfLines={1}
                >
                  {username}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
}

export default NftUsernameCard;