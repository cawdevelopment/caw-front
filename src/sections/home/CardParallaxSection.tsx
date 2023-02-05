
import { Box, chakra, Flex, Heading, Stack, VStack, Text, useBreakpointValue, Spacer, useColorModeValue, Tag, TagLabel } from "@chakra-ui/react";
import { m, AnimatePresence } from "framer-motion";

import { ParallaxText, ParallaxItemWrapper } from "src/components/animate/ParallaxText";
import { varFade } from "src/components/animate";

import { FlippingText } from "./FlippingText";
import { ContentAlign, DecentralizedTextStyle } from "./HeroSection";
import { DataModel, dataSet1, dataSet2, dataSet3 } from './card-content';

export const CARD_HEIGHT = 267;
export const CARD_WIDTH = 450;

function Card({ data }: { data: DataModel }) {

    return (
        <m.div
            initial={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.6 }}
        >
            <Tag
                minWidth={CARD_WIDTH}
                maxWidth={CARD_WIDTH}
                minHeight={CARD_HEIGHT}
                maxHeight={CARD_HEIGHT}
                colorScheme={data.colorSchema}
                variant='subtle'
                letterSpacing={'0.1em'}
                borderRadius='2xl'
                textTransform={"none"}
                fontSize='md'
                sx={{ wordSpacing: '0.1em' }}
            >
                <TagLabel
                    width='-webkit-fill-available'
                    textAlign='center'
                >
                    {data.title}
                </TagLabel>
            </Tag>
        </m.div>
    );
}

export default function CardParallaxSection() {

    const isMd = useBreakpointValue({ base: false, md: true });
    const px = useBreakpointValue({ base: 4, md: 8 });
    const textColor = useColorModeValue('gray.700', 'gray.100');

    return (
        <>
            <AnimatePresence>
                {isMd && (
                    <m.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <chakra.div
                            id="title-and-text-about-caw-manifesto"
                            position={"absolute"}
                            w={"full"}
                            p={2}
                            textAlign={"center"}                            
                        >
                            <Flex
                                w={'full'}
                                h={'container.lg'}
                                p={2}
                                backgroundPosition={'center center'}>
                                <VStack
                                    w={'full'}
                                    justify={'center'}
                                    px={px}
                                    p={2}
                                >
                                    <Stack
                                        maxW={'2xl'}
                                        align={'flex-start'}
                                        spacing={6}
                                        borderColor={'green'}
                                        // borderWidth={1}
                                        p={2}
                                    >
                                        <Heading
                                            as="h1"
                                            fontSize="9xl"
                                            fontWeight="extrabold"
                                            zIndex={3}
                                            color={"white"}
                                            borderColor={'purple'}
                                            // borderWidth={1}
                                            p={2}
                                        >
                                            <Box w='100%' alignSelf="center"  >
                                                <m.div variants={varFade().inUp}>
                                                    <ContentAlign>
                                                        <Text
                                                            id="decentralized-social-clearing-house"
                                                            color={textColor}
                                                            fontSize="6xl"
                                                            fontWeight="bold"
                                                            textAlign={'center'}
                                                            zIndex={7}
                                                        >
                                                            A
                                                            <br />
                                                            <DecentralizedTextStyle>DECENTRALIZED</DecentralizedTextStyle>
                                                            <br />
                                                            SOCIAL CLEARING HOUSE
                                                        </Text>
                                                    </ContentAlign>
                                                </m.div>                                                
                                                <Spacer h={10} />
                                                <m.div variants={varFade().in}>
                                                    <chakra.div paddingLeft={{ base: 0, md: '30%' }} >
                                                        <FlippingText textColor={textColor} />
                                                    </chakra.div>
                                                </m.div>
                                                <br />
                                            </Box>
                                        </Heading>
                                    </Stack>
                                </VStack>
                            </Flex>
                        </chakra.div>
                    </m.div>
                )}
            </AnimatePresence>
            <Box
                id="social-issues-section"
                p={0}
                m={0}
            >
                <AnimatePresence>
                    {isMd && (
                        <m.div
                            initial={{ rotate: 0, scale: 1.2 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 4 }}
                        >
                            <ParallaxText baseVelocity={isMd ? 1 : 0}>
                                <ParallaxItemWrapper id="pax-group-1"  >
                                    {dataSet1.map((item) => (
                                        <Card key={item.id} data={item} />
                                    ))}
                                </ParallaxItemWrapper>
                            </ParallaxText>
                            <ParallaxText baseVelocity={isMd ? -1 : 0}>
                                <ParallaxItemWrapper id="pax-group-2">
                                    {dataSet2.map((item) => (
                                        <Card key={item.id} data={item} />
                                    ))}
                                </ParallaxItemWrapper>
                            </ParallaxText>
                            <ParallaxText baseVelocity={isMd ? 0.5 : 0}>
                                <ParallaxItemWrapper id="pax-group-3" >
                                    {dataSet3.map((item) => (
                                        <Card key={item.id} data={item} />
                                    ))}
                                </ParallaxItemWrapper>
                            </ParallaxText>
                        </m.div>
                    )}
                </AnimatePresence>
            </Box>
        </>
    );
}