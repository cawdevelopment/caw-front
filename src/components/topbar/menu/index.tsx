import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    useColorModeValue, Text, Popover, PopoverTrigger, PopoverArrow, PopoverBody,
    PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader,
    List, Link, useDisclosure, Hide, IconButton
} from '@chakra-ui/react';

import Iconify from "src/components/icons/Iconify";
import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";
import PopoverWrapper from "src/components/wrappers/PopoverWrapper";

import QuickMintUserNameItem from "./QuickMintUserNameItem";
import BuyCawItem from "./BuyCawItem";
import MoreLinksItems from "./MoreLinksItems";
import CalculatorItem from "./CalculatorItem";
import MenuItem from "./MenuItem";

type Props = {
    textColor: string;
    iconColor: string;
    itemIconColor: string;
}

export default function TopBarMenu({ textColor, iconColor, itemIconColor }: Props) {

    const { t } = useTranslation();
    const initialFocusRef = useRef();
    const hoverColor = useColorModeValue('whiteAlpha.100', 'gray.800');
    const popoverBordercolor = useColorModeValue('gray.300', 'gray.600');
    const learnMoreButtonColor = useColorModeValue('rgb(0, 181, 94)', 'rgb(0, 255, 132)');
    const showIcon = true;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Popover
            initialFocusRef={initialFocusRef as any}
            placement='bottom'
        >
            <PopoverTrigger>
                <IconButton
                    variant={"outline"}
                    aria-label='more-options'
                    _hover={{ bg: hoverColor }}
                    icon={<Iconify icon="ph:dots-nine-bold" color={iconColor} />}
                    onClick={onOpen}
                />
            </PopoverTrigger>

            <PopoverContent
                color={textColor}
                borderColor={popoverBordercolor}
                shadow="md"
            >
                <PopoverArrow />
                <PopoverHeader>
                    <Text as="b">
                        {t('menu.menu')}
                    </Text>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <PopoverWrapper
                        isOpen={isOpen}
                        onClose={onClose}
                        wrapAbove="md"
                    >
                        <List spacing={1}>
                            <Hide above="md">
                                <CalculatorItem useIcon={showIcon} iconColor={itemIconColor} />
                            </Hide>
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href={PATH_DASHBOARD.swap.mcaw}
                                icon="ri:exchange-fill"
                                label={t('menu.getmCaw')}
                                isExternal={false}
                            />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href={PATH_AUTH.mint}
                                icon="mdi:user-add"
                                label={t('labels.mintuser')}
                                isExternal={false}
                            />
                            <QuickMintUserNameItem useIcon={showIcon} iconColor={itemIconColor} />
                            <BuyCawItem useIcon={showIcon} iconColor={itemIconColor} />
                            <hr />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href="https://caw.is"
                                icon="carbon:document-sentiment"
                                label="CAW Manifesto"
                                isExternal={true}
                            />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href="https://t.me/AHuntersDreamCAW"
                                icon="simple-icons:telegram"
                                label={t('menu.join_tg')}
                                isExternal={true}
                            />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href="https://github.com/cawdevelopment"
                                icon="jam:github"
                                label="Github Caw Development"
                                isExternal={true}
                            />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href="https://github.com/cawdevelopment/caw-front/blob/main/docs/CONTRIBUTING.md"
                                icon="carbon:collaborate"
                                label={t('menu.contribution')}
                                isExternal={true}
                            />
                            <MenuItem
                                useIcon={showIcon}
                                iconColor={itemIconColor}
                                useLink={true}
                                href="https://github.com/cawdevelopment/caw-front/issues"
                                icon="material-symbols:error-rounded"
                                label={t('menu.bugs_report')}
                                isExternal={true}
                            />
                            <MoreLinksItems useIcon={showIcon} iconColor={itemIconColor} />
                        </List>
                    </PopoverWrapper>
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
        </Popover>
    );
}
