import { Stack, Box, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { m } from 'framer-motion';

import { MotionViewport, varFade } from 'src/components/animate';
import PoweredCardInfo from './PoweredCard';
import { ReactNode } from "react";

const CARDS = [
    {
        icon: 'eos-icons:blockchain',
        title: 'home.blockchain_title',
        description: 'home.blockchain_label',
    },
    {
        icon: 'tabler:currency-ethereum',
        title: 'home.ethereum_title',
        description: 'home.ethereum_label',
    },
    {
        icon: 'fluent:people-community-16-filled',
        title: 'home.community_title',
        description: 'home.community_label',
    },
];


function CardWrapper({ children }: { children: ReactNode, index: number }) {

    const borderColor = useColorModeValue('gray.200', 'gray.500');
    return (
        <Box
            mb={"8"}
            shadow="none"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={borderColor}
            borderRadius={'xl'}
        >
            {children}
        </Box>
    );
}

export default function PoweredSection() {

    const { t } = useTranslation();
    const bg = useColorModeValue('gray.100', 'blackAlpha.50');

    return (
        <Box id="home-powered-section" bg={bg} py={"20"} as={MotionViewport}>
            <VStack spacing={2} textAlign="center">
                <m.div variants={varFade().inDown}>
                    <Heading as="h1" fontSize="4xl" color="gray.600">
                        {t('home.caw_is')}
                    </Heading>
                </m.div>
                <m.div variants={varFade().inDown} >
                    <Text fontSize="3xl" as="b">
                        {t('home.censorship_title')}
                    </Text>
                </m.div>
            </VStack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}
            >
                {CARDS.map((card, index) => (
                    <m.div variants={varFade().inUp} key={card.title}>
                        <CardWrapper index={index}>
                            <PoweredCardInfo
                                index={index}
                                key={card.title}
                                title={t(card.title)}
                                description={t(card.description)}
                                icon={card.icon}
                            />
                        </CardWrapper>
                    </m.div>
                ))}
            </Stack>
        </Box>
    );
} 