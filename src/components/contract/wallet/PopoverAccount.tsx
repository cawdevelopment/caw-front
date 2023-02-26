import { useRef } from "react";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';
import {
    Box, Text, HStack, VStack, Popover, PopoverTrigger, PopoverFooter, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, 
    Button, Divider, ButtonGroup, Avatar, AvatarBadge, chakra, Tooltip, Spacer, Flex, useColorModeValue, useDisclosure, Show, Link
} from '@chakra-ui/react';

import { useDappProvider } from "src/context/DAppConnectContext";
import StoryStyledAvatar from "src/components/avatar/StoryStyledAvatar";
import Iconify from "src/components/icons/Iconify";
import PopoverWrapperInModal from "src/components/wrappers/PopoverWrapper";

import { PATH_DASHBOARD } from "src/routes/paths";
import { fDecimal } from "src/utils/formatNumber";
import { CawUserName } from "src/types/dtos";
import { useETHBalance } from "src/hooks";

import { QuickMintingUserNameButton } from "../modals/QuickMintUserName";

export interface PopoverAccountProps {
    displaMode: 'list' | 'carousel';
    showFooter: boolean;
}

function MotionContainer({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -10 } }}
            whileHover={{
                scale: 1.2,
                marginRight: '5px',
                zIndex: 1,
                transition: { ease: 'easeOut' },
            }}
        >
            {children}
        </motion.div>
    );
}

function Footer() {
    const { t } = useTranslation();
    return (
        <>
            <Box fontSize='sm'>{t('labels.options')}</Box>
            <ButtonGroup size='sm'>
                <QuickMintingUserNameButton />
                <Button
                    colorScheme='blue'
                    variant={"ghost"}
                    size="sm"
                >
                    {t('labels.balance')}
                </Button>
            </ButtonGroup>
        </>
    );
}

export default function PopoverAccount({ displaMode, showFooter }: PopoverAccountProps) {

    const initialFocusRef = useRef();
    const { t } = useTranslation();
    const { address, cawAccount, cawAccounts, changeCawAccount, chain } = useDappProvider();
    const { balance, fetchingETH } = useETHBalance({ account: address, chainId: chain?.id || 0, chainName: chain?.name || '' });
    const contentWrapper = useRef<HTMLDivElement>(null);
    const popoverBordercolor = useColorModeValue('gray.300', 'gray.600');
    const { isOpen, onOpen, onClose } = useDisclosure();


    const sideScroll = (element: HTMLDivElement | null, speed: number, distance: number, step: number) => {

        if (!element)
            return;

        let scrollAmount = 0;

        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };

    const handleSlideLeft = () => {
        sideScroll(contentWrapper?.current, 25, 100, -10);
    }

    const handleSlideRight = () => {
        sideScroll(contentWrapper?.current, 25, 100, 10);
    }

    const handleCawAccountChange = (cawAccount: CawUserName) => () => {
        changeCawAccount(cawAccount, true);
    }

    return (
        <Popover
            initialFocusRef={initialFocusRef as any}
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <VStack alignItems="flex-start" p={0} m={0} onClick={onOpen}>
                    <HStack>
                        <StoryStyledAvatar
                            src={cawAccount?.avatar || ''}
                            alt={cawAccount?.userName || ''}
                        />
                    </HStack>
                </VStack>
            </PopoverTrigger>
            <PopoverContent
                borderColor={popoverBordercolor}
                shadow="md"
            >
                <PopoverWrapperInModal
                    isCentered
                    isOpen={isOpen}
                    onClose={onClose}
                    wrapAbove="md"
                >
                    <PopoverArrow
                        color={popoverBordercolor}
                        borderColor={popoverBordercolor}
                    />
                    <Show above="md">
                        <PopoverCloseButton />
                    </Show>
                    <PopoverHeader pt={4}>
                        <Text fontWeight='bold' textAlign="left" >
                            {t('labels.manage_accounts')}
                        </Text>
                        <VStack spacing={1} pt={4} textAlign="left" alignItems="flex-start">
                            <Text >
                                {t('labels.connectedto')}: <b>{cawAccount?.userName || '🌙'}</b>
                            </Text>
                            <Text >
                                {t('labels.balance')}: <b>{`(${fetchingETH ? '...' : fDecimal(balance)}) ETH`}</b>
                            </Text>
                        </VStack>
                    </PopoverHeader>
                    <PopoverBody id="popover-acc-body" m={0} p={0}>
                        <Flex m={2}>
                            <Text>
                                <b>{t('labels.accounts')}</b>
                            </Text>
                            <Spacer />
                            <Link
                                as={NextLink}
                                href={PATH_DASHBOARD.app.accounts}
                                rel="noopener noreferrer"
                                size="xs"
                                colorScheme="white"
                                variant="ghost"
                            >
                                {t('labels.viewall')}
                            </Link>
                        </Flex>
                        <chakra.div
                            id="container"
                            display='flex'
                            alignItems='center'
                            alignContent="center"
                            width='full'
                            height='full'
                            overflow='hidden'
                            p={2}
                        >
                            <Button
                                leftIcon={<Iconify icon='ic:round-arrow-back-ios-new' />}
                                size='xs'
                                // colorScheme='whiteAlpha'
                                variant='ghost'
                                onClick={handleSlideLeft}
                            />
                            <chakra.div
                                id='content-wrapper'
                                display='flex'
                                overflow='hidden'
                                height='6.25rem'
                                width='full'
                                alignItems="center"
                                alignContent="center"
                                ref={contentWrapper}
                            >
                                {cawAccounts.map((acc) => (
                                    <MotionContainer key={acc.id}>
                                        <Tooltip
                                            hasArrow
                                            gutter={8}
                                            placement="top"
                                            label={acc.userName}
                                            borderRadius="sm"
                                        >
                                            <Avatar
                                                name={acc.userName}
                                                src={acc.avatar}
                                                cursor='pointer'
                                                onClick={handleCawAccountChange(acc)}
                                            >
                                                {acc.userName === cawAccount?.userName ? <AvatarBadge boxSize='1em' bg='cyan.500' /> : null}
                                            </Avatar>
                                        </Tooltip>
                                    </MotionContainer>
                                ))}
                            </chakra.div>
                            <Button
                                rightIcon={<Iconify icon='ic:baseline-arrow-forward-ios' />}
                                size='xs'
                                // colorScheme='whiteAlpha'
                                variant='ghost'
                                onClick={handleSlideRight}
                            />
                        </chakra.div>

                    </PopoverBody>
                    <Divider />
                    {showFooter && (
                        <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            pb={4}
                        >
                            <Footer />
                        </PopoverFooter>
                    )}
                </PopoverWrapperInModal>
            </PopoverContent>
        </Popover >
    );
}
