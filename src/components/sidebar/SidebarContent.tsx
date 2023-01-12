import { useTranslation } from "react-i18next";
import { chakra, Box, CloseButton, Flex, useColorModeValue, BoxProps, Spacer } from '@chakra-ui/react';

import Logo from 'src/components/Logo';
import ColorModeToggle from "src/components/settings/ToogleMode";
import { LinkItems } from "./menu";
import { NavItem } from "./NavItem";
import NavbarAccount from './NavbarAccount';

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {

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
            <chakra.div
                position="fixed"
                width="inherit"
                left={0}
                bottom={0}
                textAlign="center"
            >
                <NavbarAccount displaMode="carousel" showFooter={false} />
            </chakra.div>
        </Box>

    );
}
