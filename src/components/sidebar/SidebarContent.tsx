import { useTranslation } from "react-i18next";
import { chakra, Box, CloseButton, Flex, useColorModeValue, BoxProps, Spacer } from '@chakra-ui/react';

import Logo from 'src/components/Logo';
import ColorModeToggle from "src/components/settings/ToogleMode";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";
import { LinkItems } from "./menu";
import { NavItem } from "./NavItem";
import UserAccount from './NavbarAccount';

export interface SidebarProps extends BoxProps {
    onClose: () => void;
    addUserAccount: boolean;
}

export function SidebarContent({ onClose, addUserAccount, ...rest }: SidebarProps) {

    const { t } = useTranslation();
    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            bg={bg}
            borderRight="1px"
            borderRightColor={borderColor}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
                <Logo disabledLink={false} />
                <Spacer />
                <ColorModeToggle />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    name={t(link.name)}
                    icon={link.icon}
                    link={link.link}
                />
            ))}

            {addUserAccount && (
                <chakra.div
                    position="fixed"
                    width="inherit"
                    left={0}
                    bottom={0}
                    textAlign="center"
                >
                    <ConnectWalletButton
                        connectWalletPressedProp={false}
                        walletAddressProp={''}
                    />
                    <UserAccount isCollapse={false} />
                </chakra.div>
            )}
        </Box>

    );
}
