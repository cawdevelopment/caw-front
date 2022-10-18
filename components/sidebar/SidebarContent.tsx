import { Box, CloseButton, Flex, useColorModeValue, BoxProps } from '@chakra-ui/react';

import Logo from 'components/Logo';
import ColorModeToggle from "components/settings/ToogleMode";
import { LinkItems } from "./menu";
import { NavItem } from "./NavItem";

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
                <Logo disabledLink={false} />
                <ColorModeToggle />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    name={link.name}
                    icon={link.icon}
                    link={link.link}
                />
            ))}
        </Box>
    );
}
