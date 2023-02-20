import {
    Box, Button, ButtonProps, HStack, Menu, MenuButton, MenuButtonProps, MenuItem,
    MenuList, MenuListProps, useColorMode, useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDisconnect } from 'wagmi';
import Image from 'next/image';

import Iconify from "src/components/icons/Iconify";
import { useDappProvider } from "src/context/DAppConnectContext";
import { isInWalletBrowser, isMobileDevice } from "src/utils/helper";
import { BrowserMessageModal } from "./BrowserMessageModal";

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
    connectButtonLabel?: string;
    buttonProps?: ButtonProps;
    menuButtonProps?: MenuButtonProps;
    menuButtonvariant?: 'outline' | 'ghost'
    menuListProps?: MenuListProps;
    addressTextColor?: string;
    iconColor?: string;
    hoverColor?: string;
}

export function WalletButton(props: WalletButtonProps) {

    const { t } = useTranslation();
    const { disconnect } = useDisconnect();
    const { chain, status, openChainModal, openConnectModal, openAccountModal, shortenAddress } = useDappProvider();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { connectButtonLabel, menuButtonProps = { padding: 0.5 },
        menuButtonvariant = 'ghost', iconColor, menuListProps = { shadow: "md" }, buttonProps = { variant: "ghost" } } = props;

    const handleOpenAccountModal = () => {


        if ((isMobileDevice()) && !isInWalletBrowser()) {

            if (!isOpen) {
                onOpen();
                return;
            }
        }

        openConnectModal();
    }

    if (status === 'disconnected') {
        return (
            <>
                <Button
                    {...buttonProps}
                    onClick={handleOpenAccountModal}
                >
                    {connectButtonLabel || t('labels.wallet')}
                </Button>
                <BrowserMessageModal isOpen={isOpen} onClose={onClose} openConnectModal={openConnectModal} />
            </>
        );
    }

    if (status === 'connecting' || status === 'reconnecting') {
        return (
            <>
                <Button
                    {...buttonProps}
                    onClick={handleOpenAccountModal}
                >
                    {t('buttons.btn_connecting')}
                </Button>
                <BrowserMessageModal isOpen={isOpen} onClose={onClose} openConnectModal={openConnectModal} />
            </>
        );
    }

    if (!chain || chain?.unsupported) {
        return (
            <Button
                {...buttonProps}
                onClick={openChainModal}
            >
                {t('buttons.btn_wrong_network')}
            </Button>
        );
    }

    return (
        <Menu>
            <MenuButton
                {...menuButtonProps}
                as={Button}
                variant={menuButtonvariant}
                leftIcon={<Iconify icon="ph:wallet-fill" color={iconColor} />}
                rightIcon={<ChevronDownIcon />}
            >
                {shortenAddress}
            </MenuButton>
            <MenuList
                id="wallet-button-menu-list"
                {...menuListProps}
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
                    onClick={chain?.name ? openChainModal : handleOpenAccountModal}
                    icon={<NetworkIcon />}
                >

                    {t('labels.network')} ({chain?.name || t('labels.unknownChain')})
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


export default function WalletOptions(props: WalletButtonProps = {}) {

    const { colorMode } = useColorMode();
    const defaultHover = colorMode === 'light' ? 'gray.200' : 'whiteAlpha.200';
    const defaultBorderColor = colorMode === 'light' ? 'gray.300' : 'gray.600';
    const { hoverColor } = props;

    return (
        <HStack
            id="wallet-options-stack"
            spacing={0}
            alignItems="center"
            border="1px"
            borderRadius="md"
            borderColor={defaultBorderColor}
            _hover={{ bg: hoverColor || defaultHover }}
        >
            <WalletButton
                {...props}
            />
        </HStack>
    );
}