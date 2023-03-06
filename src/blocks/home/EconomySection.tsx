import NextLink from 'next/link';
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { chakra, Box, useColorModeValue, VStack, Text, Stack, Button, HStack, Image } from "@chakra-ui/react";

import { MotionViewport, varFade } from "src/components/animate";
import { alpha } from 'src/theme/foundations/colors';
import { PATH_PAGE } from "src/routes/paths";


const COMMON = {
    scaleX: 0.86,
    skewY: 8,
    skewX: 0,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 0,
    zIndex: 0,
};

const variantScreenLeft = {
    initial: { ...COMMON, zIndex: 3 },
    animate: { ...COMMON, translateX: '50%', translateY: 40, opacity: 1 },
};

const variantScreenCenter = {
    initial: { ...COMMON, zIndex: 2 },
    animate: { ...COMMON, opacity: 1 },
};

const variantScreenRight = {
    initial: { ...COMMON, zIndex: 0 },
    animate: { ...COMMON, translateX: '-50%', translateY: -40, opacity: 1 },
};

const screenLeftAnimate = variantScreenLeft;
const screenCenterAnimate = variantScreenCenter;
const screenRightAnimate = variantScreenRight;
const animation = [ screenLeftAnimate, screenCenterAnimate, screenRightAnimate ];

export default function HomeEconomySection() {

    const { t } = useTranslation();
    const isRTL = false;

    const buttonColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    const buttonBorderColor = useColorModeValue('gray.400', 'gray.900');
    const textColor = useColorModeValue('gray.600', 'gray.50');
    const backgroundColorDivImg = useColorModeValue('gray.300', 'gray.600');
    const boxShadowColor = useColorModeValue('gray.600', 'gray.900');

    return (
        <Box id="home-economy-section" py={"24"} as={MotionViewport}>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: 4, lg: 10 }}
                py={10}
            >
                <HStack>
                    <VStack spacing={2} textAlign="left" alignItems={"ba"}>
                        <m.div variants={varFade().inUp} >
                            <Text
                                as="b"
                                fontSize="md"
                                textTransform={'uppercase'}
                                mb={2}
                                color={textColor}
                                textAlign="left"
                            >
                                {t('home.social_eco')}
                            </Text>
                        </m.div>
                        <m.div variants={varFade().inUp}>
                            <Text
                                as="b"
                                fontSize="5xl"
                                mb={3}
                                textAlign="left"
                            >
                                {t('home.social_eco_label_1')} <br />
                                {t('home.social_eco_label_2')}
                            </Text>
                        </m.div>
                        <m.div variants={varFade().inUp}>
                            <Text mb={5} color={textColor} textAlign="left">
                                {t('home.social_eco_label_3')}
                                <br />
                                <br />
                                <span>
                                    {t('home.social_eco_label_4')}
                                </span>
                            </Text>
                        </m.div>
                        <m.div variants={varFade().inUp}>
                            <NextLink href={PATH_PAGE.discover} passHref>
                                <Button
                                    size='lg'
                                    bg={buttonColor}
                                    borderColor={buttonBorderColor}
                                    borderWidth='thin'
                                    textTransform={'capitalize'}
                                    variant="solid"
                                >
                                    {t('verbs.find_out')} {t('labels.more')}
                                </Button>
                            </NextLink>
                        </m.div>
                    </VStack>
                </HStack>
                <VStack spacing={2} textAlign={{ base: 'left', sm: 'center' }}>
                    <Box
                        display='flex'
                        alignItems='center'
                        position='relative'
                        justifyContent='center'
                        gap={4}
                    >
                        {[ ...Array(3) ].map((_, index) => {

                            const _zIndex = 3 - index;
                            return (
                                <m.div
                                    id={`m.div-${_zIndex}`}
                                    key={index}
                                    variants={{ ...(animation[ index ]) }}
                                    transition={{ duration: 0.72, ease: 'easeOut' }}
                                    whileHover={{ scale: 1.1, zIndex: _zIndex }}
                                    whileTap={{ scale: 1.3, zIndex: 5 }}
                                >
                                    <chakra.div
                                        id={`chk.div-${index}`}
                                        paddingRight={{ base: 1, sm: 2 }}
                                        paddingBottom={{ base: 1, sm: "inherit" }}
                                        borderRadius={{ base: 8, sm: 12 }}
                                        maxWidth={{ base: 160, sm: 320 }}
                                        backgroundColor={backgroundColorDivImg}
                                        sx={{ boxShadow: `${isRTL ? -80 : 80}px -40px 80px ${alpha(boxShadowColor, 0.48)}` }}
                                    >
                                        <Image
                                            id={`img-${index}`}
                                            borderRadius={{ base: 8, sm: 12 }}
                                            alt={`screen ${index + 1}`}
                                            src={`/assets/screens/screen_dark_${index + 1}.png`}
                                        />
                                    </chakra.div>
                                </m.div>
                            )
                        })}
                    </Box>
                </VStack>
            </Stack>
        </Box>
    );
}
