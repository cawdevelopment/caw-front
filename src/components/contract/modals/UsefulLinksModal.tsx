import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text,
    ModalBody, ModalFooter, VStack, Wrap, WrapItem, Link, Image
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import Iconify from "src/components/icons/Iconify";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const links = [
    {
        name: 'Dextools',
        url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x48d20b3e529fb3dd7d91293f80638df582ab2daa',
        icon: '/icons/dextools.ico',
        bg: 'blue.200'
    },
    {
        name: 'CoinGecko',
        url: 'https://www.coingecko.com/en/coins/a-hunters-dream',
        icon: 'arcticons:coingecko',
        bg: 'yellow.200'
    },
    {
        name: 'CoinMarketCap',
        url: 'https://coinmarketcap.com/currencies/caw/',
        icon: 'simple-icons:coinmarketcap',
        bg: 'blue.100'
    },
    {
        name: 'Contract',
        url: 'https://etherscan.io/token/0xf3b9569F82B18aEf890De263B84189bd33EBe452',
        icon: '/icons/etherscan.ico',
        bg: 'linkedin.200'
    }
];


export default function UsefulLinksModal({ isOpen, onClose }: Props) {

    const { t } = useTranslation();
    return (
        <>
            <Modal
                isCentered
                motionPreset='slideInBottom'
                isOpen={isOpen}
                closeOnEsc={true}
                closeOnOverlayClick={true}
                onClose={onClose}
                size='md'
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('labels.linksmenu')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Wrap>
                            {links.map((link) => (
                                <WrapItem key={link.name}>
                                    <Link
                                        isExternal
                                        href={link.url}
                                        rel="noopener noreferrer nofollow"
                                    >
                                        <VStack
                                            width="sm"
                                            h='80px'
                                            bg={link.bg}
                                            p={2}
                                        >
                                            {link.icon.startsWith('/icons') ?
                                                <Image
                                                    src={link.icon}
                                                    alt={link.name}
                                                    w='24px'
                                                /> :
                                                <Iconify icon={link.icon} />
                                            }
                                            <Text
                                                color={"gray.800"}
                                            >
                                                {link.name}
                                            </Text>
                                        </VStack>
                                    </Link>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </ModalBody>
                    <ModalFooter alignItems="center" />
                </ModalContent>
            </Modal>
        </>
    );
}
