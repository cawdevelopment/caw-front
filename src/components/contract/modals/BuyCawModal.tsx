import { useTranslation } from "react-i18next";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    Image, Wrap, WrapItem, Link, Text, VStack
} from "@chakra-ui/react";

import Iconify from "src/components/icons/Iconify";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const links = [
    {
        name: 'Uniswap',
        url: 'https://app.uniswap.org/#/tokens/ethereum/0xf3b9569f82b18aef890de263b84189bd33ebe452',
        icon: '/icons/uniswap.png',
        bg: 'purple.200',
        translate: false
    },
    {
        name: 'Dextools',
        url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x48d20b3e529fb3dd7d91293f80638df582ab2daa',
        icon: '/icons/dextools.ico',
        bg: 'blue.200',
        translate: false
    },
    {
        name: 'menu.exp_exchanges',
        url: 'https://coinmarketcap.com/currencies/caw/markets/',
        icon: 'simple-icons:coinmarketcap',
        bg: 'blue.100',
        translate: true
    },
    {
        name: 'menu.exp_exchanges',
        url: 'https://www.coingecko.com/en/coins/a-hunters-dream#markets',
        icon: 'arcticons:coingecko',
        bg: 'yellow.200',
        translate: true
    },
];

export default function BuyCawModal({ isOpen, onClose }: Props) {

    const { t } = useTranslation();

    return (
        <>
            <Modal
                motionPreset='slideInBottom'
                isOpen={isOpen}
                isCentered
                closeOnEsc={true}
                closeOnOverlayClick={true}
                onClose={onClose}
                size='md'
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('labels.buycaw')}</ModalHeader>
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
                                                {link.translate ? t(`${link.name}`) : link.name}
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
