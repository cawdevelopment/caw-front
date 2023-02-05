import { useEffect, useState } from "react";
import { Container, Center, Stack, Button, Divider, Spacer, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'next/navigation';
import NextLink from 'next/link';

import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";
import { WrapperFadeAnimation } from 'src/components/animate'
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { useDappProvider } from "src/context/DAppConnectContext";
import { getExplorerUrl, getOpenSeaUrl } from 'src/hooks/contracts/helper'
import { useCawNameMinterContract, useCawNamesContract, useAppConfigurations } from "src/hooks";

import LoaderCard from "./LoaderCard";
import NftNameCard from "./NftNameCard";

MintedUserNamePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export type Props = {
    userId: number;
    userName: string;
    image: string;
    blockExplorerUrl: string;
    openSeaUrl: string;
}

export default function MintedUserNamePage() {

    const { contracts: { CAW_NAME: { address: cawNamesAddress } } } = useAppConfigurations();
    const { initialized: cMinterInitialized, getIdByUserName } = useCawNameMinterContract();
    const { initialized: cNamesInitialized, read: { getTokenURI } } = useCawNamesContract();
    const searchParams = useSearchParams();
    const userName = searchParams.get('username');
    const transactionHash = searchParams.get('tx');

    const [ loading, setLoading ] = useState(true);
    const [ userId, setUserId ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ error, setError ] = useState('');
    const { chain } = useDappProvider();
    const { t } = useTranslation();


    const nftURL = getOpenSeaUrl(chain?.id || 0, cawNamesAddress, userId);
    const explorerUrl = getExplorerUrl({
        network: chain?.id || 0,
        addressOrTx: transactionHash as string,
        type: 'tx'
    });


    useEffect(() => {

        let active = true;

        if (!cMinterInitialized)
            return;

        if (!userName)
            return;

        const cb = async () => {
            try {
                setLoading(true)
                const id = await getIdByUserName(userName as string);

                if (!active)
                    return;

                setUserId(id);
                setLoading(false);
            }
            catch (error: any) {
                console.error("error : ", error);
                if (!active)
                    return;

                setLoading(false);
                setError(error?.message || 'Something went wrong');
            }
        }

        cb();

        return () => { active = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cMinterInitialized, userName ]);

    useEffect(() => {

        let active = true;
        if (!cNamesInitialized)
            return;


        const cb = async () => {
            try {

                setLoading(true);
                if (userId <= 0)
                    return;

                const uri = await getTokenURI(userId);
                if (!active)
                    return;

                setImage(uri.image);
                setLoading(false);
            }
            catch (error: any) {
                console.error("error : ", error);
                if (!active)
                    return;

                setError('Could not fetch image, however you can still check your NFT on the block explorer and OpenSea, or try refreshing the page.');
                setLoading(false);
            }
        }

        cb();

        return () => { active = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cNamesInitialized, userId ]);

    return (
        <PageWrapper title={t('minted_page.title')}>
            <Container maxW={"container.xl"} h="container.lg" pt={10}>
                <WrapperFadeAnimation show={Boolean(error)} >
                    <Center>
                        <Text fontSize="xl" fontWeight="bold" color="tomato">
                            {error}
                        </Text>
                    </Center>
                </WrapperFadeAnimation>
                <WrapperFadeAnimation show={loading} >
                    <LoaderCard />
                </WrapperFadeAnimation>
                <WrapperFadeAnimation show={!loading}>
                    <Box>
                        <NftNameCard
                            blockExplorerUrl={explorerUrl}
                            openSeaUrl={nftURL}
                            image={image}
                            userId={userId}
                            userName={userName as string}
                        />
                        <Divider />
                        <Spacer h={10} />
                        <Center>
                            <Stack
                                spacing={5}
                                direction={[ 'column', 'row' ]}
                                w={{ base: "-webkit-fill-available", md: 'inherit' }}
                            >
                                <NextLink href={PATH_AUTH.mint} passHref>
                                    <Button colorScheme='caw' w='-webkit-fill-available'>
                                        {t('buttons.btn_mint_again')}
                                    </Button>
                                </NextLink>
                                <NextLink href={PATH_DASHBOARD.app.home} passHref>
                                    <Button colorScheme='caw' variant="outline" w='-webkit-fill-available'>
                                        {t('buttons.btn_access')}
                                    </Button>
                                </NextLink>
                            </Stack>
                        </Center>
                    </Box>
                </WrapperFadeAnimation>
            </Container>
        </PageWrapper>
    );
}