import { Box, Button, ButtonGroup, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDisconnect } from 'wagmi'
import Image from 'next/image'

import Iconify from "src/components/icons/Iconify";
import { useCawProvider } from "src/context/WalletConnectContext";

function NetworkIcon() {

    const { chain } = useCawProvider();

    if (chain?.hasIcon)
        return (
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
                        width={12}
                        height={12}
                    />
                )}
            </Box>
        );

    return null;
}

function WalletButton() {

    const { t } = useTranslation();
    const { disconnect } = useDisconnect();
    const { chain, status, openChainModal, openConnectModal, openAccountModal, shortenAddress } = useCawProvider();

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
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {shortenAddress}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={openAccountModal} icon={<Iconify icon="ion:wallet" width={16} height={16} />}>
                    {t('labels.wallet')}
                </MenuItem>

                <MenuItem onClick={openChainModal} icon={<NetworkIcon />}>

                    {t('labels.network')} ({chain?.name || ''})
                </MenuItem>
                <MenuItem onClick={() => disconnect()} icon={<Iconify icon="uil:exit" width={16} height={16} />}>
                    {t('labels.disconnect')}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default function WalletOptions() {

    const { colorMode } = useColorMode();

    return (
        <HStack
            spacing={1}
            alignItems="center"
            borderRadius="md"
            border="1px"
            borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
        >
            <ButtonGroup size='sm' isAttached variant='ghost'>
                <IconButton aria-label='Wallet icon' icon={<Iconify icon="ph:wallet-fill" />} />
                <WalletButton />
            </ButtonGroup>
        </HStack>
    );
}