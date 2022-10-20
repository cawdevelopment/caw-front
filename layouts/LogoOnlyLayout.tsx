import React, { useState } from "react";
import { Box, Center, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';

import LanguagePopover from "components/settings/LanguagePopover";
import Logo from '../components/Logo';

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
                    maxW={"container.xl"}
                >
                    <Logo />
                    <Spacer />
                    <LanguagePopover />
                </Flex>
            </Center>
            {children}
        </Box>
    );
}
