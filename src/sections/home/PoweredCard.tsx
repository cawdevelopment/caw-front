import { m } from 'framer-motion';
import { Box, Center, useColorModeValue, Heading, Text, Stack, useToken, useMediaQuery } from '@chakra-ui/react';
import Iconify from "src/components/icons/Iconify";

type Props = {
    icon: string;
    title: string;
    description: string;
    index: number;
};

export default function PoweredCardInfo({ icon, title, description, index }: Props) {

    const mdSize = useToken('breakpoints', 'md');
    const [ isMd ] = useMediaQuery(`(min-width: ${mdSize})`)
    const iconColor = useColorModeValue('gray.900', 'gray.50');
    const pairCardColor = useColorModeValue('white', 'gray.800');
    const oddCardColor = useColorModeValue('gray.200', 'whiteAlpha.50');
    const titleColor = useColorModeValue('gray.700', 'gray.50');
    const subTitleColor = useColorModeValue('gray.600', 'gray.50');
    const bgCardColor = index % 2 === 0 ? oddCardColor : pairCardColor;

    return (
        <Center py={isMd ? (index == 1 ? 12 : 24) : 6}>
            <m.div whileHover={{ scale: 1.05 }} >
                <Box
                    role={'group'}
                    p={6}
                    minW={'380px'}
                    maxW={'380px'}
                    minHeight={'440px'}
                    w={'full'}
                    bg={bgCardColor}
                    boxShadow={'2xl'}
                    rounded={'xl'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'50px'}
                    >
                        <Center>
                            <Iconify icon={icon} width={50} height={50} color={iconColor} />
                        </Center>
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Heading fontSize="2xl" color={titleColor} as="b">
                            {title}
                        </Heading>
                        <br />
                        <Text fontSize="md" color={subTitleColor}>
                            {description}
                        </Text>
                    </Stack>
                </Box>
            </m.div>
        </Center>
    );
}