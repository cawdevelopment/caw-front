import React, { useState } from "react";
import { Box, Center, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';

import LanguagePopover from "src/components/settings/LanguagePopover";
import ColorModeToggle from "src/components/settings/ToogleMode";
import Logo from 'src/components/Logo';
import WalletOptions from 'src/sections/compronents/Wallet';

type Props = {
    children?: React.ReactNode;
};

export default function LogoOnlyLayout({ children }: Props) {

    const bg = useColorModeValue('gray.50', 'gray.900');
    const [ scroll, setScroll ] = useState(false);

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
        <Box id="logo-only-layout-box" bg={bg}>
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
                    gap={2}
                    maxW={"container.xl"}
                >
                    <Logo />
                    <Spacer />
                    <LanguagePopover />
                    <WalletOptions />
                    <ColorModeToggle />
                </Flex>
            </Center>
            {children}
        </Box>
    );
}
