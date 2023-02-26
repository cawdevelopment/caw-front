import { type ReactNode, forwardRef } from "react";
import { chakra, Box, Stack, styled, useColorMode, Text, Spacer, useMediaQuery, useToken, Image, HStack, Center, useColorModeValue, Button, Show, Hide } from "@chakra-ui/react";
import { m } from "framer-motion";
import NextLink from 'next/link';
import { useTranslation } from "react-i18next";

import { MotionContainer, varFade } from "src/components/animate";
import { PATH_DASHBOARD } from "src/routes/paths";
import Iconify from "src/components/icons/Iconify";
import { FlippingText } from "./FlippingText";

export const DecentralizedTextStyle = styled('span', {
    baseStyle: (prop: any) => ({
        background: `linear-gradient(to right, ${prop?.theme.colors.caw[ `dark` ]} 0%, ${prop?.theme.colors.caw[ `darker` ]}  13%, ${prop?.theme.colors.caw[ `main` ]}  100%)`,
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
    }),
});

type ContentAlignPops = {
    children: ReactNode;
}

export const ContentAlign = forwardRef(({ children }: ContentAlignPops, ref: any) => (
    <>
        <Show above='md'>
            {children}
        </Show>
        <Hide above='md'>
            <Center>
                {children}
            </Center>
        </Hide>
    </>
));

export default function HeroSection() {

    const mode = useColorMode();
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const buttonColor = useColorModeValue('gray.50', 'gray.50');
    const buttonBg = useColorModeValue('blackAlpha.600', 'whiteAlpha.300');
    const buttonBgHover = useColorModeValue('blackAlpha.700', 'whiteAlpha.400');
    const mdSize = useToken('breakpoints', 'md');
    const [ isMd ] = useMediaQuery(`(min-width: ${mdSize})`);
    const { t } = useTranslation();

    return (
        <MotionContainer id="home-hero-section" >
            <chakra.div h={"container.md"}>
                <Image
                    src="assets/images/cawnet.png"
                    alt="caw-image"
                    opacity={0.05}
                    objectFit='scale-down'
                    borderRadius={10}
                    position='absolute'
                    right={0}
                    display={{ base: 'flex', md: 'none' }}
                />
                <Spacer h={100} />
                <Stack direction={[ 'column', 'row' ]} p={2}>
                    <Box w='100%' alignSelf="center"  >
                        <m.div variants={varFade().inDown}>
                            <ContentAlign>
                                <Text
                                    fontSize="4xl"
                                    fontWeight="bold"
                                    textAlign={isMd ? 'left' : 'center'}
                                >
                                    TEH
                                    <br />
                                    <DecentralizedTextStyle>DECENTRALIZED</DecentralizedTextStyle>
                                    <br />
                                    SOCIAL
                                </Text>
                            </ContentAlign>
                        </m.div>
                        <br />
                        <m.div variants={varFade().in}>
                            <ContentAlign>
                                <FlippingText textColor={textColor} />
                            </ContentAlign>
                        </m.div>
                        <Spacer h={20} />
                        <m.div variants={varFade().inDown}>
                            <ContentAlign>
                                <NextLink href={PATH_DASHBOARD.app.home} passHref>
                                    <Button
                                        size={'lg'}
                                        bg={buttonBg}
                                        _hover={{ bg: buttonBgHover }}
                                        color={buttonColor}
                                        colorScheme={'blackAlpha'}
                                        textTransform={'uppercase'}
                                        leftIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} color={"white"} />}
                                    >
                                        {t('verbs.explore')}
                                    </Button>
                                </NextLink>
                            </ContentAlign>
                        </m.div>
                    </Box>
                    <Box w='100%' alignSelf="center">
                        <m.div variants={varFade().inRight}>
                            <HStack>
                                <Spacer />
                                <m.div
                                    whileHover={{
                                        scale: 1.5,
                                        rotate: -90,
                                        borderRadius: "100%"
                                    }}
                                >
                                    <Image
                                        src="assets/images/cawnet.png"
                                        alt="caw-image"
                                        opacity={mode.colorMode === 'dark' ? 0.4 : 1}
                                        boxSize='400px'
                                        objectFit='cover'
                                        borderRadius="100%"
                                        right={0}
                                        display={{ base: 'none', md: 'flex' }}
                                    />
                                </m.div>
                            </HStack>
                        </m.div>
                    </Box>
                </Stack>
            </chakra.div>
        </MotionContainer>
    );
}