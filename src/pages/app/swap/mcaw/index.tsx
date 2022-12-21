import { Container, Heading, Highlight, Stack, Link, Text, Center, Flex, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import SwapMCAWForm from 'src/views/MintableCawForm';
import { PATH_AUTH } from "src/routes/paths";

SwapMintableCAW.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export default function SwapMintableCAW() {
    const { t } = useTranslation();
    return (
        <PageWrapper title={t('swap_page.title')}>
            <Container w="full" maxW={"container.xl"} h="container.lg" p={0}>
                <Center>
                    <Heading lineHeight='short' fontSize='xl'>
                        <Highlight
                            query='Goerli testnet'
                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                        >
                            {t('swap_page.goerli_msg')}
                        </Highlight>
                    </Heading>
                </Center>
                <br />
                <Center>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={0.5} p={1} align='center' alignItems="baseline">
                        <Text fontSize='xl'>
                            {t('swap_page.get_goerli')}
                        </Text>
                        <Link
                            color={'blue.400'}
                            href="https://goerlifaucet.com/"
                            target="_blank">
                            Goerli Faucet
                        </Link>
                        <Text fontSize='xl'>
                            {t('prepos.or')}
                        </Text>
                        <Link
                            color={'blue.400'}
                            href="https://faucets.chain.link/"
                            target="_blank">
                            Faucets Chain
                        </Link>
                    </Stack>
                </Center>
                <SwapMCAWForm />
                <Flex p={3}>
                    <NextLink href={PATH_AUTH.mint} passHref>
                        <Link color={'blue.400'}>{t('home.btn_mint')}</Link>
                    </NextLink>
                    <Spacer />
                    <NextLink href={PATH_AUTH.connect} passHref>
                        <Link color={'blue.400'}>{t('minting_page.already_minted')}</Link>
                    </NextLink>
                </Flex>
            </Container>
        </PageWrapper>
    );
}