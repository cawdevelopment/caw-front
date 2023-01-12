import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    useColorModeValue, Button as CrkButton, Text, Popover, PopoverTrigger, PopoverArrow, PopoverBody,
    PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader,
    Portal, List, Link, Divider, ListItem, HStack, Spacer, useDisclosure, Hide
} from '@chakra-ui/react';

import Iconify from "src/components/icons/Iconify";
import { QuickMintingUserName } from "src/sections/compronents/contract/QuickMintUserName";
import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";
import BuyCawModal from "src/sections/compronents/BuyCawModal";
import { UsefulLinksModal } from "src/sections/compronents/UsefulLinksModal";
import { ProtocolCostModal } from "../contract/stats/ProtocolCost";

type MenuItemProps = {
    icon: string,
    label: string,
    useLink: boolean,
    href?: string,
    isExternal?: boolean,
    onClick?: () => void,
}

export function MenuItem({ useLink, href, icon, label, isExternal, onClick }: MenuItemProps) {
    const iconColor = useColorModeValue('gray.500', 'gray.50');
    const hoverColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
    return (
        <ListItem>
            <Link
                as={useLink ? "a" : "div"}
                isExternal={isExternal}
                href={href}
                textDecoration="none"
                cursor="pointer"
                onClick={onClick}
            >
                <HStack
                    borderRadius="md"
                    padding={4}
                    _hover={{ bg: hoverColor }}
                    textDecoration="none"
                >
                    <Iconify icon={icon} color={iconColor} />
                    <Spacer />
                    <Text
                        textDecoration="none"
                    >
                        {label}
                    </Text>
                </HStack>
            </Link>
        </ListItem>
    );
}

function QuickMintUserNameItem() {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useLink={false}
                icon="mdi:thunder-circle"
                label={t('labels.quickmint')}
                onClick={onOpen}
            />
            <QuickMintingUserName isOpen={isOpen} onClose={onClose} />
        </>
    );
}

function BuyCawItem() {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useLink={false}
                icon="cib:experts-exchange"
                label={t('labels.buycaw')}
                onClick={onOpen}
            />
            <BuyCawModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

function MoreLinksItems() {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useLink={false}
                icon="mdi:link-box-variant"
                label={t('labels.linksmenu')}
                onClick={onOpen}
            />
            <UsefulLinksModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

function CalculatorItem() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <MenuItem
                useLink={false}
                icon="mdi:file-table-box"
                label="Calculator"
                onClick={onOpen}
            />
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export function TopBarMenu() {

    const { t } = useTranslation();
    const initialFocusRef = useRef();
    const hoverColor = useColorModeValue('whiteAlpha.100', 'gray.800');
    const iconColor = useColorModeValue('gray.800', 'gray.50');
    const popoverBordercolor = useColorModeValue('gray.700', 'gray.500');

    const learnMoreButtonColor = useColorModeValue('rgb(0, 181, 94)', 'rgb(0, 255, 132)');

    return (
        <Popover
            initialFocusRef={initialFocusRef as any}
            placement='bottom'
        >
            <PopoverTrigger>
                <CrkButton
                    leftIcon={<Iconify icon="ph:dots-nine-bold" color={iconColor} />}
                    _hover={{ bg: hoverColor }}
                    variant={"outline"}
                >
                    {t('menu.menu')}
                </CrkButton>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>
                        {t('menu.menu')}
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <List spacing={1}>
                            <Hide above="md">
                                <CalculatorItem />
                            </Hide>
                            <MenuItem
                                useLink={true}
                                href={PATH_DASHBOARD.swap.mcaw}
                                icon="ri:exchange-fill"
                                label={t('menu.getmCaw')}
                                isExternal={false}
                            />
                            <MenuItem
                                useLink={true}
                                href={PATH_AUTH.mint}
                                icon="mdi:user-add"
                                label={t('labels.mintuser')}
                                isExternal={false}
                            />
                            <QuickMintUserNameItem />
                            <BuyCawItem />
                            <Divider
                                variant="solid"
                                color={popoverBordercolor}
                            />
                            <MenuItem
                                useLink={true}
                                href="https://caw.is"
                                icon="carbon:document-sentiment"
                                label="CAW Manifesto"
                                isExternal={true}
                            />
                            <MenuItem
                                useLink={true}
                                href="https://t.me/AHuntersDreamCAW"
                                icon="simple-icons:telegram"
                                label={t('menu.join_tg')}
                                isExternal={true}
                            />
                            <MenuItem
                                useLink={true}
                                href="https://github.com/cawdevelopment"
                                icon="jam:github"
                                label="Github Caw Development"
                                isExternal={true}
                            />
                            <MenuItem
                                useLink={true}
                                href="https://github.com/cawdevelopment/caw-front/blob/main/docs/CONTRIBUTING.md"
                                icon="carbon:collaborate"
                                label={t('menu.contribution')}
                                isExternal={true}
                            />
                            <MenuItem
                                useLink={true}
                                href="https://github.com/cawdevelopment/caw-front/issues"
                                icon="material-symbols:error-rounded"
                                label={t('menu.bugs_report')}
                                isExternal={true}
                            />
                            <MoreLinksItems />
                        </List>
                    </PopoverBody>
                    <PopoverFooter

                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        pb={4}
                    >
                        <Text as="b">
                            {t('menu.firsttweb3')}
                        </Text>
                        <Link
                            variant="outline"
                            href="https://ethereum.org/en/web3/"
                            isExternal
                            textDecoration="none"
                            padding={2}
                            borderRadius="md"
                            border="none"
                            bg="rgba(0, 181, 94, 0.15)"
                            color={learnMoreButtonColor}
                        >
                            {t('menu.learn_more')}
                        </Link>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}
