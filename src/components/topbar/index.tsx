import {
    Wrap, WrapItem, useColorModeValue, Button, Text,
    Center, useDisclosure, VStack, useToken
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";

import CawPrice from 'src/components/contract/stats/CawPrice';
import EthPrice from 'src/components/contract/stats/EthPrice';
import Wallet from 'src/components/contract/wallet/Wallet';
import Iconify from "src/components/icons/Iconify";
import LanguagePopover from 'src/components/settings/LanguagePopover';
import { PATH_DASHBOARD } from "src/routes/paths";
import TopBarMenuButton from "./menu";

const ProtocolCostModal = dynamic(() => import("src/components/contract/modals/ProtocolCostModal"), { ssr: false });

function ItemWrapper({ children, padding, minW = "6rem" }: { children: React.ReactNode, padding?: string, minW?: string }) {

    return (
        <WrapItem
            borderRadius="md"
            _hover={{ bg: 'whiteAlpha.100' }}
            p={padding ?? '0.2rem'}
            minW={minW}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
        >
            {children}
        </ WrapItem>
    );
}

function CalculatorItem({ iconColor, textColor }: { iconColor: string, textColor: string }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack
            onClick={onOpen}
            cursor="pointer"
        >
            <Text fontSize="medium" color={textColor} >
                CALC
            </Text>
            <Iconify icon="mdi:file-table-box" color={iconColor} />
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}

export default function TopBar() {

    const path = usePathname();
    const showNewPostButton = path !== PATH_DASHBOARD.app.home;
    const showLanguagePopover = path !== PATH_DASHBOARD.app.settings;

    const wBgDark = useColorModeValue('blueCaw.500', 'gray.800');
    const wBgLight = `background-color: #FAD961;
    background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%);
    `
    const bg = useColorModeValue(wBgLight, wBgDark);

    const textColor = useColorModeValue('gray.50', 'gray.50');
    const walletMenuTextColor = useColorModeValue('gray.800', 'gray.50');
    const iconColor = useColorModeValue('gray.50', 'gray.800');
    const [ icLight, icDark ] = useToken('colors', [ 'gray.300', 'gray.500' ]);
    const menuItemIconColor = useColorModeValue(icLight, icDark);
    const hoverColor = useColorModeValue('whiteAlpha.50', 'whiteAlpha.50');
    const shadowBottom = '0 0 20px 20px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)';

    return (
        <Wrap
            id="main-content-wrapper-topbar-options"
            align='center'
            justify={{ base: 'center', md: 'space-between', lg: 'flex-end' }}
            border="ActiveBorder"
            bg={bg}
            color={textColor}
            p='0.5rem'
            spacing={5}
            shadow={shadowBottom}
            overflow="hidden"
        >
            <ItemWrapper>
                <CalculatorItem iconColor={iconColor} textColor={textColor} />
            </ItemWrapper>
            <ItemWrapper>
                <CawPrice watch />
            </ItemWrapper>
            <ItemWrapper>
                <EthPrice watch />
            </ItemWrapper>
            {showNewPostButton && (
                <ItemWrapper padding="0.0rem" minW="0.0rem">
                    <Button
                        _hover={{ bg: hoverColor }}
                        variant={"ghost"}
                    >
                        + Post
                    </Button>
                </ItemWrapper>
            )}
            {showLanguagePopover && (
                <ItemWrapper padding="0.0rem" minW="0.0rem">
                    <Center>
                        <LanguagePopover />
                    </Center>
                </ItemWrapper>
            )}
            <ItemWrapper padding="0.0rem" minW="0.0rem">
                <Wallet
                    addressTextColor={textColor}
                    iconColor={iconColor}
                    hoverColor={hoverColor}
                    buttonProps={{
                        color: textColor,
                        variant: 'ghost',
                        _hover: {
                            bg: hoverColor,
                        }
                    }}
                    menuButtonProps={{
                        color: textColor,
                        _hover: {
                            bg: hoverColor,
                        },
                        _active: {
                            bg: hoverColor,
                        }
                    }}
                    menuListProps={{
                        color: walletMenuTextColor
                    }}
                />
            </ItemWrapper>
            <ItemWrapper padding="0.0rem" minW="0.0rem">
                <TopBarMenuButton
                    iconColor={textColor}
                    textColor={textColor}
                    itemIconColor={menuItemIconColor}
                />
            </ItemWrapper>
        </Wrap>
    );
}