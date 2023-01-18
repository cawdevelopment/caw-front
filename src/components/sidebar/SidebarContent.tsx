import { useTranslation } from "react-i18next";
import { chakra, Box, CloseButton, Flex, useColorModeValue, BoxProps, Spacer, Stack } from '@chakra-ui/react';

import Logo from 'src/components/Logo';
import ColorModeToggle from "src/components/settings/ToogleMode";
import { LinkItems } from "./menu";
import NavItem from "./NavItem";
import NavbarAccount from '../contract/wallet/NavbarAccount';

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {

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
            <Stack
                spacing={0}
                p={0}
                m={0}
                maxH={{ base: 'full', md: 'calc(100vh - 4rem)' }}
                overflow="auto"
            >
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    name={t(link.name)}
                    icon={link.icon}
                    link={link.link}
                />
            ))}
            </Stack>
            <chakra.div
                id="navbar-account-footer"
                position="fixed"
                textAlign="center"
                width="inherit"
                left={0}
                bottom={0}
                padding="0.3rem"
            >
                <NavbarAccount
                    displayAddressMode="full"
                    displaMode="carousel"
                    showFooter={false}
                />
            </chakra.div>
        </Box>

    );
}
