import { useEffect, useState, useRef } from "react";
import NextLink from 'next/link';
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import {
    Button as CrkButton, Box, Spacer, useColorModeValue, Tooltip, Text, Flex, Center, Link,
    Stack, useDisclosure, HStack, IconButton, Show, Hide, Divider
} from '@chakra-ui/react';
import { ArrowForwardIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import Logo from 'src/components/Logo';
import Button from 'src/components/buttons/Button';
import LanguagePopover from "src/components/settings/LanguagePopover";
import ColorModeToggle from "src/components/settings/ToogleMode";
import Iconify from "src/components/icons/Iconify";
import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";

const PopoverWrapperInModal = dynamic(() => import("src/components/wrappers/PopoverWrapper"), { ssr: false });

type Props = {
    children?: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {

    const bg = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box id="landing-layout-box" bg={bg}>
            <Show above='md'>
                <MediumMenu />
            </Show>
            <Hide above='md'>
                <MobileMenu />
            </Hide>
            {children}
        </Box>
    );
}


function MediumMenu() {

    const { t } = useTranslation();
    const [ scroll, setScroll ] = useState(false);
    const bg = useColorModeValue('gray.50', 'gray.900');
    const linkBg = useColorModeValue('gray.200', 'gray.700');

    const changeScroll = () =>
        document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
            ? setScroll(true)
            : setScroll(false);

    useEffect(() => {

        if (window)
            window.addEventListener?.('scroll', changeScroll);

        return () => {

            if (window)
                window.removeEventListener?.('scroll', changeScroll);
        };

    }, [ scroll ]);


    return (
        <Center
            position="sticky"
            zIndex="sticky"
            top="0"
            bg={bg}
            boxShadow={scroll ? 'base' : 'none'}
        >
            <Flex
                alignItems="center"
                h="10vh"
                p="6"
                w="full"
                maxW={"container.xl"}
            >
                <Logo />
                <Spacer />
                <Flex alignItems="center" gap={5} >
                    <Link
                        isExternal
                        px={2}
                        py={1}
                        rounded={'md'}
                        _hover={{
                            textDecoration: 'none',
                            bg: linkBg
                        }}
                        href='https://caw.is'
                    >
                        Manifesto
                    </Link>
                    <Tooltip
                        hasArrow
                        label={t('home.btn_mint_tooltip')}
                        aria-label={t('home.btn_mint_tooltip')}
                    >
                        <div>
                            <NextLink href={PATH_AUTH.mint} passHref>
                                <div>
                                    <Button
                                        aria-label="register"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {t('home.btn_register')}
                                    </Button>
                                </div>
                            </NextLink>
                        </div>
                    </Tooltip>
                    <LanguagePopover />
                    <ColorModeToggle />
                </Flex>
            </Flex>
        </Center>
    );
}


function MobileMenu() {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bg = useColorModeValue('gray.100', 'gray.900');
    const ref = useRef<any>();

    useEffect(() => {

        //* Hook useOutsideClick from chakra-ui was causing a bug therefore I had to use this workaround
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target))
                onClose();
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [ onClose ]);

    return (
        <Box
            id="mobile-menu-box"
            bg={bg}
            px={4}
            position="sticky"
            zIndex="sticky"
            top={"0"}
            boxShadow="base"
        >
            <Flex
                id="mobile-menu-flex"
                h="10vh"
                p="4"
                w="full"
                maxW={"container.xl"}
            >
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <Spacer />
                <Logo />
            </Flex>
            {isOpen ? (
                <PopoverWrapperInModal
                    isOpen={isOpen}
                    onClose={onClose}
                    wrapAbove="md"
                >
                    <Stack
                        id="mobile-menu-stack"
                        as={'nav'}
                        spacing={4}
                        borderRadius={"md"}
                        p={4}
                        ref={ref}
                    >
                        <NextLink href='https://caw.is' passHref target={"_blank"}>
                            <HStack
                                rounded={'md'}
                            >
                                <Text as="b">
                                    Manifesto
                                </Text>
                                <Spacer />
                                <CrkButton
                                    size='sm'
                                    aria-label="mint-btn"
                                    rightIcon={<Iconify icon={'carbon:document-sentiment'} />}
                                    variant='ghost'
                                    colorScheme={"gray"}
                                    sx={{ textTransform: 'uppercase' }}
                                />
                            </HStack>
                        </NextLink>
                        <NextLink href={PATH_DASHBOARD.app.home} passHref>
                            <HStack>
                                <Text>
                                    {t('labels.dashboard')}
                                </Text>
                                <Spacer />
                                <CrkButton
                                    size='sm'
                                    aria-label="mint-btn"
                                    rightIcon={<Iconify icon={'charm:layout-rows'} />}
                                    variant='ghost'
                                    colorScheme={"gray"}
                                    sx={{ textTransform: 'uppercase' }}
                                />
                            </HStack>
                        </NextLink>
                        <Divider />
                        <HStack>
                            <Text>
                                {t('home.btn_register')}
                            </Text>
                            <Spacer />
                            <NextLink href={PATH_AUTH.mint} passHref>
                                <CrkButton
                                    size='sm'
                                    aria-label="mint-btn"
                                    rightIcon={<ArrowForwardIcon />}
                                    variant='outline'
                                    colorScheme={"caw"}
                                    sx={{ textTransform: 'uppercase' }}
                                >
                                    {t('verbs.go')}
                                </CrkButton>
                            </NextLink>
                        </HStack>
                        <HStack>
                            <Text>
                                {t('labels.language')}
                            </Text>
                            <Spacer />
                            <LanguagePopover />
                        </HStack>
                        <HStack>
                            <Text>
                                {t('labels.mode')}
                            </Text>
                            <Spacer />
                            <ColorModeToggle />
                        </HStack>
                    </Stack>
                </PopoverWrapperInModal>
            ) : null}
        </Box>
    );
}
