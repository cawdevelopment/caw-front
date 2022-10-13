import React, { useEffect } from 'react';
import { Box, CloseButton, Flex, useColorModeValue, Text, BoxProps, useColorMode, Button } from '@chakra-ui/react';

import Logo from 'components/Logo';
import { LinkItems } from "./menu";
import { NavItem } from "./NavItem";

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {

    const { colorMode, toggleColorMode } = useColorMode()

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
            <br></br>
            <Button onClick={toggleColorMode} colorScheme='caw'>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
        </Box>
    );
}
