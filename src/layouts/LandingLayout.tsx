import React, { useState } from "react";
import { Box, Spacer, useColorModeValue, Tooltip, Flex, Center, Link } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';

import Logo from 'src/components/Logo';
import Button from 'src/components/buttons/Button';
import LanguagePopover from "src/components/settings/LanguagePopover";
import ColorModeToggle from "src/components/settings/ToogleMode";
import { PATH_AUTH } from "src/routes/paths";

type Props = {
    children?: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {

    const { t } = useTranslation();
    const [ scroll, setScroll ] = useState(false);
    const bg = useColorModeValue('gray.50', 'gray.900');

    const changeScroll = () =>
        document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
            ? setScroll(true)
            : setScroll(false);

    React.useEffect(() => {

        if (window)
            window.addEventListener?.('scroll', changeScroll);

        return () => {

            if (window)
                window.removeEventListener?.('scroll', changeScroll);
        };

    }, [ scroll ]);


    return (
        <Box id="landing-layout-box" bg={bg}>
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
                        <Link href='https://caw.is' isExternal>
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
                                            aria-label="change language"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {t('home.btn_mint')}
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
            {children}
        </Box>
    );
}
