import { ReactNode } from 'react';
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import {
    Box, useColorModeValue, Drawer, DrawerContent, useDisclosure, Show, chakra, DrawerOverlay,
    DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex
} from '@chakra-ui/react';

import ColorModeToggle from "src/components/settings/ToogleMode";
import Logo from "src/components/Logo";

import { LinkItems } from "./menu";
import NavbarAccount from "../contract/wallet/NavbarAccount";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";
import NavItem from "./NavItem";

const TopBar = dynamic(() => import("../topbar"), { ssr: false, loading: () => <p>loading...</p> });

export const DASHBOARD_WIDTH = 280;
export default function SimpleSidebar({ children }: { children: ReactNode; }) {

    const { t } = useTranslation();
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
                onClose={onClose}
                display={{ base: 'none', md: 'block' }}
                bg={sidebarBg}
                borderRightColor={borderRightColor}
                borderRightStyle="dashed"
                style={{ width: `${DASHBOARD_WIDTH}px` }}
            />
            <Drawer
                allowPinchZoom
                closeOnEsc
                closeOnOverlayClick
                returnFocusOnClose
                preserveScrollBarGap
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
                            <Logo disabledLink={false} />
                            <ColorModeToggle />
                        </Flex>
                        <hr />
                    </DrawerHeader>
                    <DrawerBody
                        overflow="auto"
                        onClick={onClose}
                    >
                        {LinkItems.map((link) => (
                            <NavItem
                                key={link.name}
                                name={t(link.name)}
                                icon={link.icon}
                                link={link.link}
                                onClick={onClose}
                            />
                        ))}
                    </DrawerBody>
                    <DrawerFooter
                        id="drawer-footer"
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                        alignContent={"center"}                        
                    >
                        <NavbarAccount displaMode="carousel" displayAddressMode="full" showFooter={false} />
                    </DrawerFooter>
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
