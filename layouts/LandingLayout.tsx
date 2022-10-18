import React, { useState } from "react";
import { Box, Spacer, useColorModeValue, Tooltip, Flex, Center } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

import Logo from 'components/Logo';
import Button from 'components/buttons/Button';
import LanguagePopover from "components/settings/LanguagePopover";
import ColorModeToggle from "components/settings/ToogleMode";

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
                        <Tooltip
                            hasArrow
                            label={t('home.btn_mint_tooltip')}
                            aria-label={t('home.btn_mint_tooltip')}
                        >
                            <div>
                                <Button
                                    aria-label="change language"
                                    sx={{ textTransform: 'none' }}
                                >
                                    {t('home.btn_mint')}
                                </Button>
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
