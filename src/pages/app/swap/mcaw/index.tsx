import { chakra, Container, Stack, Link, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';

import Block from "src/components/Block";
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import SwapMCAWForm from 'src/views/MintableCawForm';
import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";

SwapMintableCAW.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export default function SwapMintableCAW() {
    const { t } = useTranslation();
    return (
        <PageWrapper title={t('swap_page.title')}>
            <Container w="full" maxW={"container.xl"} h="container.lg" p={2}>
                <br />
                <chakra.div
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"baseline"}
                    textAlign={"center"}
                >                    
                    {`${t('swap_page.goerli_msg_1')} Goerli testnet ${t('swap_page.goerli_msg_2')}`}
                </chakra.div>                
                <br />
                <Stack id="stack-goerli" direction={{ base: 'column', md: 'column' }} spacing={2} p={1} alignItems="center">                    
                    <Text fontSize='xl' textAlign="center">
                        {t('swap_page.get_goerli')}
                    </Text>
                    <Link
                        isExternal
                        color={'blue.400'}
                        href="https://goerlifaucet.com/"
                        target="_blank">
                        Goerli Faucet
                    </Link>
                    <Link
                        isExternal
                        color={'blue.400'}
                        href="https://faucets.chain.link/"
                        target="_blank">
                        Faucets Chain
                    </Link>
                </Stack>
                <Block
                    sx={{ p: 1 }}
                    sxContainer={{ p: 1 }}
                >
                    <SwapMCAWForm />
                </Block>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    rowGap={2}
                    mt={5}
                >
                    <NextLink href={PATH_AUTH.mint} passHref rel="noopener noreferrer">
                        <Link color={'blue.400'}>
                            <b>{t('home.btn_mint')}</b>
                        </Link>
                    </NextLink>
                    <NextLink href={PATH_DASHBOARD.app.home} passHref>
                        <Link color={'blue.400'}>
                            <b>{t('labels.dashboard')}</b>
                        </Link>
                    </NextLink>
                    <NextLink href={PATH_AUTH.connect} passHref rel="noopener noreferrer">
                        <Link color={'blue.400'}>
                            {t('minting_page.already_minted')}
                        </Link>
                    </NextLink>
                </Flex>
            </Container>
        </PageWrapper>
    );
}