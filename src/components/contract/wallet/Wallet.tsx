import {
    Box, Button, ButtonGroup, ButtonGroupProps, ButtonProps, HStack, IconButton,
    Menu, MenuButton, MenuButtonProps, MenuItem, MenuList, useColorMode
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDisconnect } from 'wagmi'
import Image from 'next/image'

import Iconify from "src/components/icons/Iconify";
import { useDappProvider } from "src/context/DAppConnectContext";

function NetworkIcon() {

    const { chain } = useDappProvider();

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

type WalletButtonProps = {
    buttonProps?: ButtonProps;
    menuButtonProps?: MenuButtonProps
}

function WalletButton({ menuButtonProps, buttonProps }: WalletButtonProps) {

    const { t } = useTranslation();
    const { disconnect } = useDisconnect();
    const { connected, chain, status, openChainModal, openConnectModal, openAccountModal, shortenAddress } = useDappProvider();

    if (status === 'disconnected' || !connected) {
        return (
            <Button
                {...buttonProps}
                variant="ghost"
                onClick={openConnectModal}
            >
                {t('labels.wallet')}
            </Button>
        );
    }

    if (chain?.unsupported) {
        return (
            <Button
                {...buttonProps}
                variant="ghost"
                onClick={openChainModal}
            >
                {t('buttons.btn_wrong_network')}
            </Button>
        );
    }

    return (
        <Menu isLazy>
            <MenuButton
                {...menuButtonProps}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                transition='all 0.2s'
            >
                {shortenAddress}
            </MenuButton>
            <MenuList
                id="wallet-button-menu-list"
                shadow="md"
            >
                <MenuItem
                    value='account'
                    onClick={openAccountModal}
                    icon={<Iconify icon="ion:wallet" width={16} height={16} />}
                >
                    {t('labels.wallet')}
                </MenuItem>
                <MenuItem
                    value='network'
                    onClick={openChainModal} icon={<NetworkIcon />}
                >

                    {t('labels.network')} ({chain?.name || ''})
                </MenuItem>
                <MenuItem
                    value='disconnect'
                    onClick={() => disconnect()}
                    icon={<Iconify icon="uil:exit" width={16} height={16} />}
                >
                    {t('labels.disconnect')}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

interface Props extends WalletButtonProps {
    iconColor?: string;
    hoverColor?: string;
    buttonGroup?: ButtonGroupProps
}

export default function WalletOptions({ iconColor, hoverColor, menuButtonProps, buttonProps, buttonGroup }: Props = {}) {

    const { colorMode } = useColorMode();

    return (
        <HStack
            id="wallet-options-stack"
            spacing={1}
            alignItems="center"
            borderRadius="md"
            border="1px"
            borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
        >
            <ButtonGroup
                {...buttonGroup}
                size='sm'
                isAttached
                variant='ghost'
            >
                <IconButton
                    aria-label='Wallet icon'
                    icon={<Iconify icon="ph:wallet-fill" color={iconColor} />}
                    _hover={hoverColor ? { bg: hoverColor } : undefined}
                />
                <WalletButton
                    buttonProps={buttonProps}
                    menuButtonProps={menuButtonProps}
                />
            </ButtonGroup>
        </HStack>
    );
}