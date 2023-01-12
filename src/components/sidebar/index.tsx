import React, { ReactNode } from 'react';
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure, Show, chakra } from '@chakra-ui/react';

import TopBar from "../topbar";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SidebarContent";

export const DASHBOARD_WIDTH = 280;
export default function SimpleSidebar({ children }: { children: ReactNode; }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const borderRightColor = useColorModeValue('gray.400', 'gray.700');
    const bg = useColorModeValue('gray.50', 'gray.900');
    const sidebarBg = useColorModeValue('gray.100', 'gray.900');

    return (
        <Box
            id="sidebar"
            minH="100vh"
            bg={bg}
        >            
            <SidebarContent
                id="sidebar-content"
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                bg={sidebarBg}
                borderRightColor={borderRightColor}
                borderRightStyle="dashed"
                style={{ width: `${DASHBOARD_WIDTH}px` }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>            
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box
                id="main-content"
                ml={{ base: 0, md: DASHBOARD_WIDTH }}
            >
                <Show above="md" >
                    <TopBar />
                </Show>
                <chakra.div
                    id="main-content-wrapper-children"
                    p="4"
                    pt={{ base: 16, md: 8 }}
                >
                {children}                
                </chakra.div>
            </Box>
        </Box>
    );
}
