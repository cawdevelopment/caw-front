import { Link, Center, Heading, VStack, Stack, Image, Box, useColorModeValue, Spacer, Code } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";
import { Props } from "./[tx]";

export default function NftNameCard({ userId, userName, image, blockExplorerUrl, openSeaUrl }: Props) {

    const bgBox = useColorModeValue('white', 'gray.800');
    const { t } = useTranslation();

    return (
        <Center py={12}>
            <VStack spacing={8}>
                <Heading size="sm">{t('labels.minted_success')}</Heading>
                <Heading size="md">{t('labels.its_magic')}</Heading>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={bgBox}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${image})`,
                            filter: 'blur(15px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            alt={userName}
                            src={image} />
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Code p={2}>{`#${userId}`}</Code>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {t('labels.check_nft_on')}
                        </Heading>
                        <Spacer h={5} />
                        <Stack direction={'column'} align={'center'}>
                            <Link
                                isExternal
                                color={'blue.400'}
                                target="_blank"
                                href={blockExplorerUrl}
                            >
                                <b>{`${t('labels.the')} ${t('labels.block_explorer')}`}</b> <ExternalLinkIcon mx='2px' />
                            </Link>
                            {` and `}
                            <Link
                                isExternal
                                color={'blue.400'}
                                target="_blank"
                                href={openSeaUrl}
                            >
                                <b>OpenSea</b> <ExternalLinkIcon mx='2px' />
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </VStack>
        </Center>
    );
}
